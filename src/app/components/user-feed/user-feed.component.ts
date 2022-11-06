import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-feed',
  templateUrl: './user-feed.component.html',
  styleUrls: ['./user-feed.component.scss'],
})
export class UserFeedComponent implements OnInit {
  @Input() tweets = [1, 2, 3];

  constructor() {}

  ngOnInit(): void {}
}
