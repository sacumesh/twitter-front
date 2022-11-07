import { Component, NgZone, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { delay, Observable, of } from 'rxjs';
import { ContractService } from 'src/app/services/contract.service';
import { Web3Service } from 'src/app/services/web3.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(
    private _web3Service: Web3Service,
    private _ngZone: NgZone,
    private _contractService: ContractService
  ) {}
  test!: any;
  account$!: Observable<string>;

  ngOnInit(): void {
    this.test = this._web3Service.isConnected$;
    this.account$ = this._web3Service.selectedAccount$;
  }

  async connect() {
    try {
      await this._web3Service.connect();
    } catch (e) {
      console.log(e);
    }
  }

  async t() {}
}
