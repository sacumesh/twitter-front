import { TestBed } from '@angular/core/testing';

import { EthereumGuard } from './ethereum.guard';

describe('AuthGuard', () => {
  let guard: EthereumGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(EthereumGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
