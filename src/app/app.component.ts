import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { NavbarService } from './services/navbar.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  showProgressBar$!: BehaviorSubject<boolean>;

  constructor(private _navbarService: NavbarService) {
    this.showProgressBar$ = this._navbarService.showProgressBar$;
  }
}
