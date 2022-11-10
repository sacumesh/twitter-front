import { Injectable, OnInit, Optional } from '@angular/core';
import { BehaviorSubject, catchError, from, Observable, of } from 'rxjs';
import { Web3Service } from './web3.service';
import { Contract } from 'web3-eth-contract';
import { abi } from '../smart-contract/abi';
import { environment } from 'src/environments/environment';
import { Tweet } from '../types/test';

@Injectable({ providedIn: 'root' })
export class ContractService {
  smartContract!: Contract;

  constructor(private _web3Service: Web3Service) {
    this.smartContract = new (this._web3Service.web3 as any).eth.Contract(
      abi,
      environment.contractAddress
    );
  }

  async createTweet(tweet: any): Promise<void> {
    const account = await this._web3Service.getAccount();
    return this.smartContract.methods
      .createTweet(tweet)
      .send({ from: account });
  }

  async updateTweet(id: any, tweet: any): Promise<void> {
    const account = await this._web3Service.getAccount();
    return this.smartContract.methods.updateTweet(id, tweet).send({ account });
  }

  async deleteTweet(id: any): Promise<void> {
    const account = await this._web3Service.getAccount();
    return this.smartContract.methods.deleteTweet(id).send({ from: account });
  }

  async getTweets(): Promise<Tweet[]> {
    return this.smartContract.methods
      .getTweets()
      .call()
      .then(this.mapTweetsResponseToTweets);
  }

  mapTweetsResponseToTweets(response: any) {
    const newTweets = [];
    for (let i = response[0].length - 1; i >= 0; i--) {
      newTweets.push({
        author: response[0][i],
        content: response[1][i],
        timestamp: response[2][i],
        id: response[3][i],
        isLoading: false,
      });
    }
    return newTweets;
  }
}
