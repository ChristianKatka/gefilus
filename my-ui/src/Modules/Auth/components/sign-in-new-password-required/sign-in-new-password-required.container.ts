import { AuthSignInActions } from '../../store/actions';
import { Component } from '@angular/core';
import { AuthExtendedAppState } from '../../store/reducers';
import { Store } from '@ngrx/store';

@Component({
  templateUrl: 'sign-in-new-password-required.container.html',
})
export class SignInNewPasswordRequiredContainerComponent {
  constructor(private store: Store<AuthExtendedAppState>) {}

  onNewPasswordSubmitted(newPassword: string) {
    this.store.dispatch(AuthSignInActions.changeNewPassword({ newPassword }));
  }
}
