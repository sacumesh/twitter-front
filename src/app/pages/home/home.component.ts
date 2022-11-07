import { Component, NgZone, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, delay, Observable, of } from 'rxjs';
import { ContractService } from 'src/app/services/contract.service';
import { Web3Service } from 'src/app/services/web3.service';
import { TweetsStore } from 'src/app/store/tweets.store';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  tweets$!: BehaviorSubject<any[]>;
  isConnectedToMetaMask$!: Observable<boolean>;
  account$!: Observable<string>;

  constructor(
    private _web3Service: Web3Service,
    private _contractService: ContractService,
    private _tweetsStore: TweetsStore
  ) {}

  ngOnInit(): void {
    this.tweets$ = this._tweetsStore.$tweets;
    this.account$ = this._web3Service.selectedAccount$;
    this.isConnectedToMetaMask$ = this._web3Service.isConnected$;
  }

  async connectToMetaMask() {
    await this._web3Service.connect();
  }

  onCreateTweet(msg: any) {
    const currTweets = this.tweets$.getValue();
    currTweets.push(msg);
    this.tweets$.next(currTweets);
  }

  onDeleteTweet(msg: any) {
    console.log('delete tweet');
  }

  onUpdateTweet(msg: any) {
    console.log('update tweet');
  }
}
