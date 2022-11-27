import { Injectable, OnInit, Optional } from '@angular/core';
import { Web3Service } from './web3.service';
import { Contract } from 'web3-eth-contract';
import { abi } from '../smart-contract/abi';
import { environment } from 'src/environments/environment';
import { Tweet } from '../types/app.types';

@Injectable({ providedIn: 'root' })
export class ContractService {
  smartContract!: Contract;

  constructor(private _web3Service: Web3Service) {
    this.smartContract = new (this._web3Service.web3 as any).eth.Contract(
      abi,
      environment.contractAddress
    );
  }

  async createTweet(content: string): Promise<void> {
    const account = await this._web3Service.getAccount();
    return this.smartContract.methods
      .createTweet(content)
      .send({ from: account });
  }

  async updateTweet(id: number, content: string): Promise<void> {
    const account = await this._web3Service.getAccount();
    return this.smartContract.methods
      .updateTweet(id, content)
      .send({ from: account });
  }

  async deleteTweet(id: number): Promise<void> {
    const account = await this._web3Service.getAccount();
    return this.smartContract.methods.deleteTweet(id).send({ from: account });
  }

  async getTweets(): Promise<Tweet[]> {
    return this.smartContract.methods
      .getTweets()
      .call()
      .then(this.mapTweetsResponseToTweets);
  }

  mapTweetsResponseToTweets(response: any): Tweet {
    return response.map((tweet: any) => {
      return {
        author: tweet.author,
        content: tweet.content,
        timestamp: tweet.timestamp,
        status: tweet.status,
        id: tweet.id,
      };
    });
  }
}
