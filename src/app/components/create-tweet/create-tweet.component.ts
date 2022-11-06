import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ContractService } from 'src/app/services/contract.service';

@Component({
  selector: 'app-create-tweet',
  templateUrl: './create-tweet.component.html',
  styleUrls: ['./create-tweet.component.scss'],
})
export class CreateTweetComponent implements OnInit {
  tweetForm!: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _contractService: ContractService
  ) {}

  ngOnInit(): void {
    this.tweetForm = this._fb.group({
      msg: [],
    });
  }

  createTweet() {
    const t = this.tweetForm.getRawValue();
    this._contractService.createTweet(t.msg);
  }
}
