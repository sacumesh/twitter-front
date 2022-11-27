import { Component, HostListener, NgZone, OnInit } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';

import {
  BehaviorSubject,
  firstValueFrom,
  Observable,
  of,
  Subscription,
  switchMap,
  timer,
} from 'rxjs';
import { ConfirmComponent } from 'src/app/dialogs/confirm/confirm.component';
import { EditTweetDialogComponent } from 'src/app/dialogs/edit-tweet-dialog/edit-tweet-dialog.component';
import { ContractService } from 'src/app/services/contract.service';
import { NavbarService } from 'src/app/services/navbar.service';
import { Web3Service } from 'src/app/services/web3.service';
import { TweetsStore } from 'src/app/store/tweets.store';
import { Tweet } from 'src/app/types/app.types';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  tweets$ = new BehaviorSubject<Tweet[]>([]);
  isConnectedToMetaMask$ = of(false);
  activeAccount$!: Observable<string>;
  isLoading = false;
  tweetsloadingState: { [id: number]: boolean } = {};
  isFeedLoading = false;
  pollingSubscription!: Subscription;

  constructor(
    private _web3Service: Web3Service,
    private _contractService: ContractService,
    private _tweetsStore: TweetsStore,
    private _navbarService: NavbarService,
    private _dialog: MatDialog
  ) {}

  async ngOnInit(): Promise<void> {
    this.tweets$ = this._tweetsStore.$tweets;
    this.isFeedLoading = true;
    try {
      //polling for new tweets
      this.pollingSubscription = timer(0, 5000)
        .pipe(switchMap(() => this._contractService.getTweets()))
        .subscribe(tweets => {
          this.tweets$.next(tweets);
        });
    } catch (e) {
      this._web3Service.handleError(e);
    }
    this.isFeedLoading = true;
    this.activeAccount$ = this._web3Service.selectedAccount$;
    this.isConnectedToMetaMask$ = this._web3Service.isConnected$;
  }

  async connectToMetaMask(): Promise<void> {
    this._navbarService.showProgressBar$.next(true);
    await this._web3Service.connect();
    this._navbarService.showProgressBar$.next(true);
  }

  async onCreateTweet(tweet: any): Promise<void> {
    this._navbarService.showProgressBar$.next(true);
    try {
      await this._contractService.createTweet(tweet);
      const tweets = await this._contractService.getTweets();
      this._tweetsStore.$tweets.next(tweets);
    } catch (error) {
      this._web3Service.handleError(error);
    }
    this._navbarService.showProgressBar$.next(false);
  }

  async onDeleteTweet(tweet: Tweet): Promise<void> {
    //if user clicked cancel or closed the dialog
    const dialogRef = this._dialog.open(ConfirmComponent, {
      data: { msg: 'Confirm delete' },
    });
    const dialogResult = await firstValueFrom(dialogRef.afterClosed());
    if (!dialogResult) {
      return;
    }
    this.changeTweetLoadingState(tweet.id, true);
    try {
      await this._contractService.deleteTweet(tweet.id);
      const tweets = await this._contractService.getTweets();
      this._tweetsStore.$tweets.next(tweets);
    } catch (error) {
      this._web3Service.handleError(error);
    }
    this.changeTweetLoadingState(tweet.id, false);
  }

  async onUpdateTweet(tweet: Tweet): Promise<void> {
    const dialogRef = this._dialog.open(EditTweetDialogComponent, {
      data: { tweet },
    });

    const dialogResult = await firstValueFrom(dialogRef.afterClosed());
    //if user clicked cancel or closed the dialog
    if (!dialogResult) {
      return;
    }

    this.changeTweetLoadingState(tweet.id, true);
    try {
      await this._contractService.updateTweet(tweet.id, dialogResult);
      const tweets = await this._contractService.getTweets();
      this._tweetsStore.$tweets.next(tweets);
    } catch (error) {
      this._web3Service.handleError(error);
    }
    this.changeTweetLoadingState(tweet.id, false);
  }

  changeTweetLoadingState(id: number, state: boolean): void {
    this.tweetsloadingState[id] = state;
  }
}
