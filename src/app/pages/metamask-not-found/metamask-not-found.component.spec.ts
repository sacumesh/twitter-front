import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MetamaskNotFoundComponent } from './metamask-not-found.component';

describe('MetamaskNotFoundComponent', () => {
  let component: MetamaskNotFoundComponent;
  let fixture: ComponentFixture<MetamaskNotFoundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MetamaskNotFoundComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MetamaskNotFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
