import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TweetFeedComponent } from './tweet-feed.component';

describe('UserFeedComponent', () => {
  let component: TweetFeedComponent;
  let fixture: ComponentFixture<TweetFeedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TweetFeedComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TweetFeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
