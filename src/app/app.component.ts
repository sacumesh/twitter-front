import { Component, OnDestroy, OnInit, Optional } from '@angular/core';
import { Subscription } from 'rxjs';
import { Web3Service } from './services/web3.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'twitter-front';
  constructor(@Optional() private _web3Service: Web3Service) {}

  selectedAccountSubscription!: Subscription;

  ngOnInit(): void {
    if (this._web3Service) {
      this.selectedAccountSubscription =
        this._web3Service.selectedAccount$.subscribe(account => {
          console.log('account changed');
          this._web3Service.selectedAccount = account;
        });
    }
  }
  ngOnDestroy(): void {
    this.selectedAccountSubscription?.unsubscribe();
  }
}
