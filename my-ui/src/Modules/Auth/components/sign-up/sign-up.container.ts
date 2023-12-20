import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthSignUpActions } from '../../store/actions';
import { AuthExtendedAppState } from '../../store/reducers';
// import { AboutActions } from 'src/About/store/actions';
import { AuthSignUpSelectors } from '@auth/store/selectors';
import { SignUpUserData } from '../../models/sign-up-user-data.model';

@Component({
  templateUrl: './sign-up.container.html',
})
export class SignUpContainerComponent {
  isLoading$ = this.store.select(AuthSignUpSelectors.isLoading);

  usernameAlreadyExists$ = this.store.select(
    AuthSignUpSelectors.usernameAlreadyExists
  );

  constructor(private store: Store<AuthExtendedAppState>) {}

  onShowPrivacyPolicy() {
    // this.store.dispatch(AboutActions.showPrivacyPolicy());
  }

  onShowTermsOfService() {
    // this.store.dispatch(AboutActions.showTermsOfService());
  }

  onSignUp(signUpUserData: SignUpUserData) {
    console.log('First step signup data:');
    console.log(signUpUserData);

    this.store.dispatch(
      AuthSignUpActions.signUp({
        signUpUserData,
      })
    );
  }
}
