import { animate, style, transition, trigger } from '@angular/animations';
import {
  Component,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { firstValueFrom } from 'rxjs';
import { ConfirmComponent } from 'src/app/dialogs/confirm/confirm.component';
import { Tweet } from 'src/app/types/test';
import { EditTweetDialogComponent } from '../../dialogs/edit-tweet-dialog/edit-tweet-dialog.component';

@Component({
  selector: 'app-tweet',
  templateUrl: './tweet.component.html',
  styleUrls: ['./tweet.component.scss'],
  animations: [
    trigger('inOutAnimation', [
      transition(':enter', [
        style({ height: 0, opacity: 0, margin: 0 }),
        animate('200ms', style({ height: '*', opacity: 1, margin: 16 })),
      ]),
      transition(':leave', [
        style({ height: '*', opacity: 1, margin: 16 }),
        animate('200ms', style({ height: 0, opacity: 0, margin: 0 })),
      ]),
    ]),
  ],
})
export class TweetComponent {
  @Input() tweet!: Tweet;
  @Output() delete = new EventEmitter();
  @Output() update = new EventEmitter();
  @Input() readonly = true;
  @Input() isLoading = false;
  rippleDisabled = false;
  test = false;
  k = false;

  @HostBinding('class.tweet') private isHostClassShown = true;
  constructor(private _dialog: MatDialog) {}

  @HostListener('click') onClick() {
    this.test = !this.test;
  }

  async onUpdate(): Promise<void> {
    const dialogRef = this._dialog.open(EditTweetDialogComponent, {
      data: { tweet: this.tweet },
    });

    const dialogResult = await firstValueFrom(dialogRef.afterClosed());
    if (dialogResult) {
      this.update.emit(dialogResult);
    }
  }

  async onDelete(): Promise<void> {
    const dialogRef = this._dialog.open(ConfirmComponent, {
      data: { msg: 'Confirm delete' },
    });
    const dialogResult = await firstValueFrom(dialogRef.afterClosed());
    if (dialogResult) {
      this.delete.emit(dialogResult);
    }
  }

  disableRipple(): void {
    this.rippleDisabled = true;
  }

  enableRipple(): void {
    this.rippleDisabled = false;
  }
  t() {
    this.k = !this.k;
  }
}
