import { Component } from '@angular/core';
import { AuthenticatedActions } from '@auth/store/actions';
import { AuthExtendedAppState } from '@auth/store/reducers';
import { Store } from '@ngrx/store';

@Component({
  templateUrl: 'welcome.container.html',
})
export class WelcomeContainerComponent {
  constructor(private store: Store<AuthExtendedAppState>) {}

  onStartUsingApp() {
    this.store.dispatch(AuthenticatedActions.redirectToHome());
  }
}
