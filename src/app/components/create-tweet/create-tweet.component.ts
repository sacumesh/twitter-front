import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ContractService } from 'src/app/services/contract.service';

@Component({
  selector: 'app-create-tweet',
  templateUrl: './create-tweet.component.html',
  styleUrls: ['./create-tweet.component.scss'],
})
export class CreateTweetComponent implements OnInit {
  tweetForm!: FormGroup;
  @Output() the = new EventEmitter<any>();

  constructor(
    private _fb: FormBuilder,
    private _contractService: ContractService
  ) {}

  ngOnInit(): void {
    this.tweetForm = this._fb.group({
      msg: [],
    });
  }

  async onSubmit() {
    const msg = this.tweetForm.get('msg')?.value;
    this.the.emit(msg);
  }
}
