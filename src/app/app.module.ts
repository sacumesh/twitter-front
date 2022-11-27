import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TweetComponent } from './components/tweet/tweet.component';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CreateTweetComponent } from './components/create-tweet/create-tweet.component';
import { MatInputModule } from '@angular/material/input';
import { EditTweetDialogComponent } from './dialogs/edit-tweet-dialog/edit-tweet-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {
  MatSnackBarModule,
  MAT_SNACK_BAR_DEFAULT_OPTIONS,
} from '@angular/material/snack-bar';

import { HomeComponent } from './pages/home/home.component';
import { EthereumMissingComponent } from './pages/etherum-missing/ethereum-missing.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ConfirmComponent } from './dialogs/confirm/confirm.component';
import { TweetStatePipe } from './pipes/tweet-state.pipe';
import { TweetFeedComponent } from './components/tweet-feed/tweet-feed.component';
@NgModule({
  declarations: [
    AppComponent,
    TweetComponent,
    CreateTweetComponent,
    EditTweetDialogComponent,
    TweetFeedComponent,
    HomeComponent,
    EthereumMissingComponent,
    ConfirmComponent,
    TweetStatePipe,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatProgressBarModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatDialogModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
  ],
  providers: [
    {
      provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
      useValue: {
        duration: 2500,
        verticalPosition: 'center',
        horizontalPosition: 'center',
      },
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
