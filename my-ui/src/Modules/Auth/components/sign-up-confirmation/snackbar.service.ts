import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NewConfirmationCodeSentSnackbarComponent } from './new-confirmation-code-sent-snackbar/new-confirmation-code-sent-snackbar.component';

@Injectable()
export class SnackbarService {
  snackbarDurationInSeconds = 10;

  constructor(private snackBar: MatSnackBar) {}

  openNewConfirmationCodeSentSnackbar() {
    this.snackBar.openFromComponent(NewConfirmationCodeSentSnackbarComponent, {
      duration: this.snackbarDurationInSeconds * 1000,
    });
  }
}
