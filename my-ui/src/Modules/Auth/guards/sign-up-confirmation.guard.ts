import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import _ from 'lodash';
import { Observable } from 'rxjs';
import { map, tap, withLatestFrom } from 'rxjs/operators';
import { CognitoService } from '../services/cognito.service';
import { AuthSignUpActions } from '../store/actions';
import { AuthExtendedAppState } from '../store/reducers';
import { AuthSignUpSelectors } from '../store/selectors';

@Injectable({
  providedIn: 'root',
})
export class SignUpConfirmationGuard {
  constructor(
    private store: Store<AuthExtendedAppState>,
    private cognitoService: CognitoService
  ) {}

  canActivate(): Observable<boolean> {
    return this.cognitoService.isSessionValid().pipe(
      map((loggedIn) => !loggedIn),
      withLatestFrom(
        this.store.select(AuthSignUpSelectors.getSignUpUserNameAndPassword)
      ),
      map(
        ([notLoggedIn, userNameAndPassword]) =>
          notLoggedIn && _.isString(userNameAndPassword.username)
      ),
      tap((notLoggedInAndHasSignUpUserName) => {
        if (!notLoggedInAndHasSignUpUserName) {
          this.store.dispatch(AuthSignUpActions.redirectToSignUp());
        }
      })
    );
  }
}
