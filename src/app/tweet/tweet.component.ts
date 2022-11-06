import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EditTweetDialogComponent } from '../edit-tweet-dialog/edit-tweet-dialog.component';

@Component({
  selector: 'app-tweet',
  templateUrl: './tweet.component.html',
  styleUrls: ['./tweet.component.scss'],
})
export class TweetComponent {
  longText = `The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog
  from Japan. A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was
  originally bred for hunting.`;

  animal!: string;
  name!: string;
  constructor(private _dialog: MatDialog, private _snackBar: MatSnackBar) {}

  openDialog(): void {
    const dialogRef = this._dialog.open(EditTweetDialogComponent, {
      width: '50%',
      data: { name: '', animal: this.longText },
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
