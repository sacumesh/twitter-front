import { Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ContractService } from 'src/app/services/contract.service';

@Component({
  selector: 'app-user-feed',
  templateUrl: './user-feed.component.html',
  styleUrls: ['./user-feed.component.scss'],
})
export class UserFeedComponent implements OnInit {
  tweets$!: BehaviorSubject<any[]>;

  constructor(private _contractService: ContractService) {}

  ngOnInit(): void {
    this.tweets$ = this._contractService.tweets$;
  }
}
