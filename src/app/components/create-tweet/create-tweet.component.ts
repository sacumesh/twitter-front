import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { createEmptyTextValidator } from 'src/app/validators/empty-text.validator';

@Component({
  selector: 'app-create-tweet',
  templateUrl: './create-tweet.component.html',
  styleUrls: ['./create-tweet.component.scss'],
})
export class CreateTweetComponent implements OnInit {
  tweetForm!: FormGroup;
  @Output() create = new EventEmitter<any>();
  @Input() disabled = true;

  constructor(private _fb: FormBuilder) {}

  ngOnInit(): void {
    this.tweetForm = this._fb.group({
      msg: [
        '',
        [
          Validators.required,
          Validators.maxLength(280),
          createEmptyTextValidator(),
        ],
      ],
    });
  }

  async onSubmit() {
    const msg = this.tweetForm.get('msg')?.value;
    this.tweetForm.reset();
    this.create.emit(msg);
  }
}
