import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Tweet } from '../types/test';

@Injectable({
  providedIn: 'root',
})
export class TweetsStore {
  $tweets = new BehaviorSubject<Tweet[]>([]);
  constructor() {}
}
