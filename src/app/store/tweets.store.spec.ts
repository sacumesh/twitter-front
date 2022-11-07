import { TestBed } from '@angular/core/testing';

import { TweetsStore } from './tweets.store';

describe('TweetsStoreService', () => {
  let service: TweetsStore;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TweetsStore);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
