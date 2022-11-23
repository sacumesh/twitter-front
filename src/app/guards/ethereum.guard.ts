import { Injectable, Optional } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Web3Service } from '../services/web3.service';

@Injectable({
  providedIn: 'root',
})
export class EthereumGuard implements CanActivate {
  constructor(
    @Optional() private _web3Service: Web3Service,
    private _router: Router
  ) {}

  async canActivate(): Promise<boolean> {
    if (!this._web3Service.web3?.eth) {
      this._router.navigateByUrl('/ethereum-missing');
      return false;
    }

    return true;
  }
}
