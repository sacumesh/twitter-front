import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Tweet } from 'src/app/types/app.types';
import { createEmptyTextValidator } from 'src/app/validators/empty-text.validator';

export interface DialogData {
  tweet: Tweet;
}

@Component({
  selector: 'app-edit-tweet-dialog',
  templateUrl: './edit-tweet-dialog.component.html',
  styleUrls: ['./edit-tweet-dialog.component.scss'],
})
export class EditTweetDialogComponent implements OnInit {
  editForm!: FormGroup;
  author!: string;
  constructor(
    private _fb: FormBuilder,
    private _dialogRef: MatDialogRef<EditTweetDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private _data: DialogData
  ) {}

  ngOnInit(): void {
    this.author = this._data.tweet.author;
    this.editForm = this._fb.group({
      content: [
        this._data.tweet.content,
        [
          Validators.required,
          Validators.maxLength(280),
          createEmptyTextValidator(),
        ],
      ],
    });
  }

  get content(): string {
    return this.editForm.get('content')?.value;
  }

  onNoClick(): void {
    this._dialogRef.close();
  }
}
