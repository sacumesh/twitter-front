import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';
import { Tweet } from '../types/app.types';

@Pipe({
  name: 'tweetState',
})
export class TweetStatePipe implements PipeTransform {
  transform(value: Tweet): string {
    console.log(value);
    if (value.updatedAt !== 0) {
      return `Edited ${moment(value.updatedAt * 1000).fromNow()}`;
    } else if (value.createdAt !== 0) {
      return `Created ${moment(value.createdAt * 1000).fromNow()}`;
    }

    return '';
  }
}
