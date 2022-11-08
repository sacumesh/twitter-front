import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Tweet } from 'src/app/types/test';

export interface DialogData {
  tweet: Tweet;
}

@Component({
  selector: 'app-edit-tweet-dialog',
  templateUrl: './edit-tweet-dialog.component.html',
  styleUrls: ['./edit-tweet-dialog.component.scss'],
})
export class EditTweetDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<EditTweetDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
