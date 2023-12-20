import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, map, switchMap, withLatestFrom } from 'rxjs/operators';
import * as fromServices from '../../services/cognito.service';
import {
  AuthSignInActions,
  AuthSignUpActions,
  AuthenticatedActions,
} from '../actions';
import { AuthExtendedAppState } from '../reducers';
import { AuthSignInSelectors } from '../selectors';

@Injectable()
export class SignInEffects {
  signInAKAauthenticateUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthSignInActions.authenticateUser),
      switchMap(({ signInData }) =>
        this.cognitoService
          .authenticateUser(signInData.username, signInData.password)
          .pipe(
            map((result: any) => {
              if (result.challengeName === 'NEW_PASSWORD_REQUIRED') {
                // CREATED USER FROM AWS CONSOLE
                return AuthSignInActions.newPasswordRequired();
              }
              return AuthenticatedActions.authenticateUserSuccess();
            }),
            catchError((error: any) => {
              // REGISTERED FROM THE APP BUT NEVER CONFIRMED ACCOUNT WITH EMAIL CODE
              if (error.code === 'UserNotConfirmedException') {
                return of(
                  AuthSignUpActions.redirectToEmailConfirmationView({
                    username: signInData.username,
                    password: signInData.password,
                  })
                );
                // WRONG PASSWORD
              } else if (error.code === 'NotAuthorizedException') {
                return of(
                  AuthSignInActions.authenticateUserFailureNotAuthorized()
                );
                // WRONG USERNAME AKA EMAIL
              } else if (error.code === 'UserNotFoundException') {
                return of(
                  AuthSignInActions.authenticateUserFailureNotAuthorized()
                );
              }
              return of(AuthenticatedActions.authenticateUserFailure(error));
            })
          )
      )
    )
  );

  authenticateUserNewPasswordRequired$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthSignInActions.newPasswordRequired),
      map(() => AuthSignInActions.redirectToNewPasswordRequired())
    )
  );

  changeNewPassword$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthSignInActions.changeNewPassword),
      map((action) => action.newPassword),
      withLatestFrom(this.store.select(AuthSignInSelectors.getSignInUserName)),
      switchMap(([newPassword, username]) => {
        if (!username) {
          return of(
            AuthSignInActions.changeNewPasswordFailure({
              error: 'Cannot change new password if username doesnt exist.',
            })
          );
        }
        return this.cognitoService.changePassword(newPassword).pipe(
          map(() =>
            AuthSignInActions.authenticateUser({
              signInData: { username, password: newPassword },
            })
          ),
          catchError((error: any) =>
            of(AuthSignInActions.changeNewPasswordFailure(error.code))
          )
        );
      })
    )
  );

  constructor(
    private actions$: Actions,
    private cognitoService: fromServices.CognitoService,
    private store: Store<AuthExtendedAppState>
  ) {}
}
