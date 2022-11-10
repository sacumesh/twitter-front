import { Component, NgZone, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, delay, Observable, of } from 'rxjs';
import { ContractService } from 'src/app/services/contract.service';
import { Web3Service } from 'src/app/services/web3.service';
import { TweetsStore } from 'src/app/store/tweets.store';
import { Tweet } from 'src/app/types/test';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  tweets$!: BehaviorSubject<Tweet[]>;
  isConnectedToMetaMask$ = of(false);
  activeAccount$!: Observable<string>;
  isLoading = false;

  constructor(
    private _web3Service: Web3Service,
    private _contractService: ContractService,
    private _tweetsStore: TweetsStore
  ) {}

  async ngOnInit(): Promise<void> {
    this.tweets$ = this._tweetsStore.$tweets;
    if (this._tweetsStore.$tweets.getValue().length > 0) {
    } else {
      const tweets = await this._contractService.getTweets();
      this.tweets$.next(tweets);
    }
    this.activeAccount$ = this._web3Service.selectedAccount$;
    this.isConnectedToMetaMask$ = this._web3Service.isConnected$;
  }

  async connectToMetaMask(): Promise<void> {
    await this._web3Service.connect();
  }

  async onCreateTweet(tweet: any) {
    this.isLoading = true;
    try {
      await this._contractService.createTweet(tweet);
      const tweets = await this._contractService.getTweets();
      this._tweetsStore.$tweets.next(tweets);
    } catch (error) {
      this._web3Service.handleError(error);
    }
    this.isLoading = false;
  }

  async onDeleteTweet(content: string, tweet: Tweet) {
    try {
      await this._contractService.deleteTweet(1);
      const tweets = await this._contractService.getTweets();
      this._tweetsStore.$tweets.next(tweets);
    } catch (error) {
      this._web3Service.handleError(error);
    }
  }

  async onUpdateTweet(content: string, tweet: Tweet) {
    try {
      await this._contractService.updateTweet(1, content);
      const tweets = await this._contractService.getTweets();
      this._tweetsStore.$tweets.next(tweets);
    } catch (error) {
      this._web3Service.handleError(error);
    }
  }
}
