import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TweetsStore {
  $tweets = new BehaviorSubject<any[]>([1, 2, 3, 4]);
  constructor() {}
}
