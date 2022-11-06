import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ContractService {
  tweets$ = new BehaviorSubject<any[]>([]);
  constructor() {}

  createTweet(tweet: any) {
    const currentTweets = this.tweets$.getValue();
    currentTweets.push(tweet);
    this.tweets$.next(currentTweets);
  }
}
