import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EditTweetDialogComponent } from '../../dialogs/edit-tweet-dialog/edit-tweet-dialog.component';

@Component({
  selector: 'app-tweet',
  templateUrl: './tweet.component.html',
  styleUrls: ['./tweet.component.scss'],
})
export class TweetComponent {
  @Input() msg = '';
  animal!: string;
  name!: string;
  constructor(private _dialog: MatDialog, private _snackBar: MatSnackBar) {}

  openDialog(): void {
    const dialogRef = this._dialog.open(EditTweetDialogComponent, {
      width: '50%',
      data: { name: '', animal: this.msg },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }

  openSnackBar() {
    this._snackBar.open('PizzaPartyComponent');
  }
}
