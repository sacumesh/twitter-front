import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Tweet } from '../types/app.types';

@Injectable({
  providedIn: 'root',
})
export class TweetsStore {
  $tweets = new BehaviorSubject<Tweet[]>([]);
  constructor() {}
}
