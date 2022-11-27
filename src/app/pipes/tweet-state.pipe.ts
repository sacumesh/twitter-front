import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';
import { Tweet, TweetStatus } from '../types/app.types';

@Pipe({
  name: 'tweetState',
})
export class TweetStatePipe implements PipeTransform {
  transform(value: Tweet): string {
    switch (value.status) {
      case TweetStatus.CREATED:
        return `Created ${moment.unix(value.timestamp).fromNow()}`;
      case TweetStatus.DELETED:
        //for completeness - this should never happen
        return `Deleted ${moment.unix(value.timestamp).fromNow()}`;
      case TweetStatus.UPDATED:
        return `Updated ${moment.unix(value.timestamp).fromNow()}`;
      default:
        return '';
    }
  }
}
