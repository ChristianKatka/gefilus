import { Component } from '@angular/core';
import { AuthSignInSelectors } from '@auth/store/selectors';
import { Store } from '@ngrx/store';
import { SignInData } from '../../models/sign-in-data.model';
import { AuthSignInActions } from '../../store/actions';
import { AuthExtendedAppState } from '../../store/reducers';

@Component({
  templateUrl: './sign-in.container.html',
})
export class SignInContainerComponent {
  isLoading$ = this.store.select(AuthSignInSelectors.isLoading);

  isWrongUsernameOrPassword$ = this.store.select(
    AuthSignInSelectors.isWrongUsernameOrPassword
  );

  constructor(private store: Store<AuthExtendedAppState>) {}

  onSignIn(signInData: SignInData) {
    this.store.dispatch(AuthSignInActions.authenticateUser({ signInData }));
  }
}
