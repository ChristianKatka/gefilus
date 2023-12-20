import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthSignUpActions } from '../../store/actions';
import { AuthExtendedAppState } from '../../store/reducers';
import { AuthSignUpSelectors } from '../../store/selectors';
import { SnackbarService } from './snackbar.service';

@Component({
  selector: 'app-asdasd',
  templateUrl: './sign-up-confirmation.container.html',
  providers: [SnackbarService],
})
export class SignUpConfirmationContainerComponent {
  isLoading$: Observable<boolean> = this.store.select(
    AuthSignUpSelectors.isLoading
  );

  newConfirmationCodeSent$: Observable<boolean> = this.store.select(
    AuthSignUpSelectors.isNewConfirmationCodeSent
  );

  // To show user which email has the new confirmation code sent
  email$ = this.store.select(AuthSignUpSelectors.getEmail);

  emailConfirmationCodeMismatch$: Observable<boolean> = this.store.select(
    AuthSignUpSelectors.isEmailConfirmationCodeMismatch
  );

  newConfirmationCodeLimitExceeded$: Observable<boolean> = this.store.select(
    AuthSignUpSelectors.newConfirmationCodeLimitExceeded
  );

  constructor(
    private store: Store<AuthExtendedAppState>,
    private snackbarService: SnackbarService
  ) {}

  onConfirmationCodeSubmitted(code: string) {
    this.store.dispatch(
      AuthSignUpActions.confirmRegistrationByEmailCode({ code })
    );
  }

  onSendNewEmailConfirmationCode() {
    this.snackbarService.openNewConfirmationCodeSentSnackbar();
    this.store.dispatch(AuthSignUpActions.sendNewEmailConfirmationCode());
  }
}
