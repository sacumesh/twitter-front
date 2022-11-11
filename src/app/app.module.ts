import { NgModule, NgZone, Provider } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TweetComponent } from './components/tweet/tweet.component';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CreateTweetComponent } from './components/create-tweet/create-tweet.component';
import { MatInputModule } from '@angular/material/input';
import { EditTweetDialogComponent } from './dialogs/edit-tweet-dialog/edit-tweet-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {
  MatSnackBarModule,
  MAT_SNACK_BAR_DEFAULT_OPTIONS,
} from '@angular/material/snack-bar';
import { UserFeedComponent } from './components/user-feed/user-feed.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { HomeComponent } from './pages/home/home.component';
import { EthereumMissingComponent } from './pages/etherum-missing/ethereum-missing.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ConfirmComponent } from './dialogs/confirm/confirm.component';
import { MatRippleModule } from '@angular/material/core';

const providers: Provider[] = [
  {
    provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
    useValue: {
      duration: 2500,
      verticalPosition: 'center',
      horizontalPosition: 'center',
    },
  },
];

@NgModule({
  declarations: [
    AppComponent,
    TweetComponent,
    CreateTweetComponent,
    EditTweetDialogComponent,
    UserFeedComponent,
    HomeComponent,
    EthereumMissingComponent,
    ConfirmComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatDividerModule,
    MatProgressBarModule,
    MatButtonModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatSnackBarModule,
    MatListModule,
    MatProgressSpinnerModule,
    ScrollingModule,
    MatRippleModule,
  ],
  providers,
  bootstrap: [AppComponent],
})
export class AppModule {}
