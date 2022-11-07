import { Injectable, NgZone } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  catchError,
  distinctUntilChanged,
  from,
  fromEvent,
  map,
  merge,
  Observable,
  of,
  switchMap,
} from 'rxjs';
import Web3 from 'web3';
import { enterZone } from '../utils/rxjs-operators/enter-zone';

@Injectable()
export class Web3Service {
  constructor(private _ngZone: NgZone, private _snackBar: MatSnackBar) {}
  isConnected$!: Observable<boolean>;
  selectedAccount$!: Observable<string>;
  web3!: Web3;
  ethereum!: any;

  init(ethereum: any): void {
    this.ethereum = ethereum;
    this.web3 = new Web3(ethereum);
    const accounts$ = from(ethereum.request({ method: 'eth_accounts' }));
    const accountsChanged$ = fromEvent(ethereum, 'accountsChanged');

    const selectedAccount$ = merge(accounts$, accountsChanged$).pipe(
      map((accounts: any) => (accounts?.length > 0 ? accounts[0] : null))
    );

    this.selectedAccount$ = selectedAccount$.pipe(enterZone(this._ngZone));
    this.isConnected$ = selectedAccount$.pipe(
      map(account => !!account),
      distinctUntilChanged(),
      enterZone(this._ngZone)
    );
  }

  async connect(): Promise<void> {
    try {
      await this.ethereum.request({
        method: 'eth_requestAccounts',
      });
    } catch (error) {
      this.handleError(error);
    }
  }

  handleError(e: any) {
    let errorMsg: string;
    switch (e.code) {
      case -32700:
        errorMsg = 'Parse error	Invalid JSON	standard';
        break;
      case -32600:
        errorMsg = 'Invalid request	JSON is not a valid request object	standard';
        break;
      case -32601:
        errorMsg = 'Method not found	Method does not exist	standard';
        break;
      case -32602:
        errorMsg = 'Invalid params	Invalid method parameters	standard';
        break;
      case -32603:
        errorMsg = 'Internal error	Internal JSON-RPC error	standard';
        break;
      case -32000:
        errorMsg = 'Invalid input	Missing or invalid parameters	non-standard';
        break;
      case -32001:
        errorMsg = 'Resource not found	Requested resource not found	non-standard';
        break;
      case -32002:
        errorMsg =
          'Resource unavailable	Requested resource not available	non-standard';
        break;
      case -32003:
        errorMsg =
          'Transaction rejected	Transaction creation failed	non-standard';
        break;
      case -32004:
        errorMsg = 'Method not supported	Method is not implemented	non-standard';
        break;
      case -32005:
        errorMsg = 'Limit exceeded	Request exceeds defined limit	non-standard';
        break;
      case -32006:
        errorMsg = 'JSON-RPC version not supported';
        break;
      case 4001:
        errorMsg = 'User Rejected Request	The user rejected the request.';
        break;
      case 4100:
        errorMsg =
          'Unauthorized	The requested method and/or account has not been authorized by the user.';
        break;
      case 4200:
        errorMsg =
          'Unsupported Method	The Provider does not support the requested method.';
        break;
      case 4900:
        errorMsg = 'Disconnected The Provider is disconnected from all chains.';
        break;
      case 4901:
        errorMsg = 'Chain Disconnected';
        break;
      default:
        errorMsg = 'Unknow Error';
    }
    this._snackBar.open(errorMsg);
  }
}
