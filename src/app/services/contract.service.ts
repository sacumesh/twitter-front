import { Injectable, OnInit, Optional } from '@angular/core';
import { BehaviorSubject, catchError, from, Observable, of } from 'rxjs';
import { Web3Service } from './web3.service';
import { Contract } from 'web3-eth-contract';
import { abi } from '../smart-contract/abi';
import { environment } from 'src/environments/environment';

@Injectable()
export class ContractService {
  tweets$ = new BehaviorSubject<any[]>([]);

  smartContract!: Contract;

  constructor(private _web3Service: Web3Service) {}

  init() {
    this.smartContract = new this._web3Service.web3.eth.Contract(
      abi,
      environment.contractAddress
    );
  }

  createTweet(tweet: any): Observable<void> {
    const t = this.smartContract.methods
      .createTweet()
      .send({ from: 'account ' }) as Promise<void>;
    return from(t).pipe(
      catchError(err => {
        this._web3Service.handleError(err);
        return of();
      })
    );
  }

  updateTweet(id: any, tweet: any): Observable<any> {
    const t = this.smartContract.methods
      .updateTweet(id, tweet)
      .send({ from: 'account' }) as Promise<void>;
    return from(t).pipe(
      catchError(err => {
        this._web3Service.handleError(err);
        return of();
      })
    );
  }

  deleteTweet(id: any): Observable<void> {
    const t = this.smartContract.methods
      .deleteTweet(id)
      .send({ from: 'account' }) as Promise<void>;
    return from(t).pipe(
      catchError(err => {
        this._web3Service.handleError(err);
        return of();
      })
    );
  }

  getTweets(): Observable<any[]> {
    const t = this.smartContract.methods.getTweets().call() as Promise<any[]>;
    return from(t).pipe(
      catchError(err => {
        this._web3Service.handleError(err);
        return [];
      })
    );
  }
}
