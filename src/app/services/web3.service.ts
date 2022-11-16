import { Injectable, NgZone } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { utils } from 'ethers';
import {
  distinctUntilChanged,
  from,
  fromEvent,
  map,
  merge,
  Observable,
  of,
} from 'rxjs';
import { environment } from 'src/environments/environment';
import Web3 from 'web3';
import { enterZone } from '../utils/rxjs-operators/enter-zone';

@Injectable({ providedIn: 'root' })
export class Web3Service {
  isConnected$ = of(false);
  selectedAccount$!: Observable<string>;
  web3!: Web3;
  ethereum!: any;

  constructor(private _ngZone: NgZone, private _snackBar: MatSnackBar) {
    this.initService();
  }

  initService(): void {
    const ethereum = (window as any).ethereum;
    if (ethereum !== undefined) {
      this.ethereum = ethereum;
      this.web3 = new Web3(ethereum);
      const accounts$ = from(this.web3.eth.getAccounts());

      const accountsChanged$ = fromEvent<string[]>(ethereum, 'accountsChanged');

      const selectedAccount$ = merge(accounts$, accountsChanged$).pipe(
        map((accounts: string[]) =>
          // https://github.com/MetaMask/metamask-extension/issues/10671
          accounts?.length > 0 ? utils.getAddress(accounts[0]) : ''
        )
      );

      this.selectedAccount$ = selectedAccount$.pipe(enterZone(this._ngZone));

      this.isConnected$ = selectedAccount$.pipe(
        map(account => !!account),
        distinctUntilChanged(),
        enterZone(this._ngZone)
      );
    } else {
      this.web3 = new Web3.providers.WebsocketProvider(
        environment.web3WebsocketProviderHost
      ) as unknown as Web3;
    }
  }

  async connect(): Promise<void> {
    try {
      await this.web3.eth.requestAccounts();
    } catch (error) {
      this.handleError(error);
    }
  }

  async getAccount(): Promise<string> {
    let account = '';
    try {
      account = (await this.web3.eth.getAccounts())[0];
    } catch (error) {
      this.handleError(error);
    }
    return account;
  }

  handleError(e: any): void {
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
    console.error(e);
    this._snackBar.open(errorMsg);
  }
}
