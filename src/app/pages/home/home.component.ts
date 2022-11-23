import { Component, HostListener, NgZone, OnInit } from '@angular/core';
import { fakeAsync } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, delay, merge, Observable, of } from 'rxjs';
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
  selectedTweetId = -1;
  isLoading = false;
  tweetsloadingState: { [id: number]: boolean } = {};
  isFeedLoading = false;

  constructor(
    private _web3Service: Web3Service,
    private _contractService: ContractService,
    private _tweetsStore: TweetsStore,
    private _navbarService: NavbarService
  ) {}

  async ngOnInit(): Promise<void> {
    this.tweets$ = this._tweetsStore.$tweets;
    this.isFeedLoading = true;
    try {
      const tweets = await this._contractService.getTweets();
      this.tweets$.next(tweets);
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

  onClickTweet(tweet: Tweet): void {
    if (this.selectedTweetId == tweet.id) {
      this.selectedTweetId = -1;
    } else {
      this.selectedTweetId = tweet.id;
    }
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

  async onUpdateTweet(content: string, tweet: Tweet): Promise<void> {
    this.changeTweetLoadingState(tweet.id, true);
    let tweets;
    const old = this.tweets$.getValue();
    try {
      await this._contractService.updateTweet(tweet.id, content);
      tweets = await this._contractService.getTweets();
      this._tweetsStore.$tweets.next(tweets);
    } catch (error) {
      this._web3Service.handleError(error);
    }
    this.changeTweetLoadingState(tweet.id, false);
  }

  changeTweetLoadingState(id: number, state: boolean): void {
    this.tweetsloadingState[id] = state;
    if (state && id === this.selectedTweetId) {
      this.selectedTweetId = -1;
    }
  }
}
