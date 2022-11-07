import { Injectable, OnInit, Optional } from '@angular/core';
import { BehaviorSubject, firstValueFrom, lastValueFrom } from 'rxjs';
import { Web3Service } from './web3.service';
import { Contract } from 'web3-eth-contract';
import { abi } from '../smart-contract/abi';
import { environment } from 'src/environments/environment';

@Injectable()
export class ContractService {
  tweets$ = new BehaviorSubject<any[]>([]);

  smartContract!: Contract;

  constructor(private _web3Service: Web3Service) {}

  async init() {
    this.smartContract = new this._web3Service.web3.eth.Contract(
      abi,
      environment.contractAddress
    );
    this._web3Service.selectedAccount$.subscribe(async account => {
      if (account) {
        await this.refreshTweets();
      } else {
        this.tweets$.next([]);
      }
    });
    await this.refreshTweets();
  }

  async createTweet(tweet: any): Promise<void> {
    try {
      const account = await lastValueFrom(this._web3Service.selectedAccount$);
      await this.smartContract.methods.createTweet().send({ from: account });
      await this.refreshTweets();
    } catch (e) {
      this._web3Service.handleError(e);
    }
  }

  async updateTweet(id: any, tweet: any): Promise<void> {
    try {
      const account = await lastValueFrom(this._web3Service.selectedAccount$);
      this.smartContract.methods.updateTweet(id, tweet).send({ from: account });
      await this.refreshTweets();
    } catch (e) {
      this._web3Service.handleError(e);
    }
  }

  async deleteTweet(id: any): Promise<void> {
    try {
      const account = await lastValueFrom(this._web3Service.selectedAccount$);
      await this.smartContract.methods.deleteTweet(id).send({ from: account });
      await this.refreshTweets();
    } catch (e) {
      this._web3Service.handleError(e);
    }
  }

  async refreshTweets(): Promise<void> {
    let tweets = this.tweets$.getValue();
    try {
      tweets = await this.smartContract.methods.getTweets().call();
      console.log(tweets);
    } catch (e) {
      this._web3Service.handleError(e);
    }
    this.tweets$.next(tweets);
  }
}
