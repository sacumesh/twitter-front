import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { firstValueFrom } from 'rxjs';
import { ConfirmComponent } from 'src/app/dialogs/confirm/confirm.component';
import { EditTweetDialogComponent } from '../../dialogs/edit-tweet-dialog/edit-tweet-dialog.component';

@Component({
  selector: 'app-tweet',
  templateUrl: './tweet.component.html',
  styleUrls: ['./tweet.component.scss'],
})
export class TweetComponent {
  @Input() msg = '';
  @Output() delete = new EventEmitter();
  @Output() update = new EventEmitter();
  constructor(private _dialog: MatDialog) {}

  async onUpdate(): Promise<void> {
    const dialogRef = this._dialog.open(EditTweetDialogComponent, {
      data: { msg: this.msg },
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
}
