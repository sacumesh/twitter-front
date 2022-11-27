import {
  Component,
  EventEmitter,
  HostBinding,
  Input,
  Output,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Tweet } from 'src/app/types/app.types';

@Component({
  selector: 'app-tweet',
  templateUrl: './tweet.component.html',
  styleUrls: ['./tweet.component.scss'],
})
export class TweetComponent {
  @Input() tweet!: Tweet;
  @Output() delete = new EventEmitter(true);
  @Output() update = new EventEmitter(true);
  @Input() readonly = true;
  @Input() isLoading = false;
  tweetState!: string;

  @HostBinding('class.tweet') private isHostClassShown = true;
  constructor(private _dialog: MatDialog) {}

  async onUpdate(): Promise<void> {
    this.update.emit();
  }

  async onDelete(): Promise<void> {
    this.delete.emit();
  }
}
