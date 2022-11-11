import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NavbarService {
  showProgressBar$ = new BehaviorSubject<boolean>(false);
  constructor() {}
}
