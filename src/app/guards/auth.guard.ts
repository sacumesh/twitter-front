import { Injectable, Optional } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { Web3Service } from '../services/web3.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    @Optional() private _web3Service: Web3Service,
    private _router: Router
  ) {}

  async canActivate(): Promise<boolean> {
    if (!this._web3Service) {
      this._router.navigateByUrl('/metamask-not-found');
      return false;
    }

    return true;
  }
}
