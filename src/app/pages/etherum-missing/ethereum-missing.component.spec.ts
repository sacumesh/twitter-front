import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EthereumMissingComponent } from './ethereum-missing.component';

describe('MetamaskNotFoundComponent', () => {
  let component: EthereumMissingComponent;
  let fixture: ComponentFixture<EthereumMissingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EthereumMissingComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EthereumMissingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
