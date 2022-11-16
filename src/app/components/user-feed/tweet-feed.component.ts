import { Component, EventEmitter, HostBinding } from '@angular/core';

@Component({
  selector: 'app-tweet-feed',
  templateUrl: './tweet-feed.component.html',
  styleUrls: ['./tweet-feed.component.scss'],
})
export class TweetFeedComponent {
  @HostBinding('class.tweet-feed') private isHostClassShown = true;
  constructor() {}
}
