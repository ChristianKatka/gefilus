import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import * as fromServices from '../../services/cognito.service';
import { AuthenticatedActions } from '../actions';

@Injectable()
export class AuthenticatedEffects {
  checkOldUserSession$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthenticatedActions.checkOldUserSession),
      switchMap(() => this.cognitoService.isSessionValid()),
      switchMap((isValid) => {
        if (isValid) {
          return this.cognitoService.getCurrentUser();
        } else {
          return of(undefined);
        }
      }),
      map((user) => {
        if (user) {
          return AuthenticatedActions.userRemembered({
            username: user.getUsername(),
          });
        } else {
          return AuthenticatedActions.userNotRemembered();
        }
      })
    )
  );

  signOut$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthenticatedActions.signOut),
      tap(() => {
        this.cognitoService.signOut();
      }),
      map(() => AuthenticatedActions.signOutSuccess())
    )
  );

  authSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        AuthenticatedActions.verifyUserAfterUserEmailConfirmedSuccess,
        AuthenticatedActions.authenticateUserSuccess,
        AuthenticatedActions.userRemembered
      ),
      map(() => AuthenticatedActions.redirectToHome())
    )
  );

  keksi$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthenticatedActions.verifyUserAfterUserEmailConfirmedSuccess),
      map(() => AuthenticatedActions.redirectToWelcomePage())
    )
  );

  constructor(
    private actions$: Actions,
    private cognitoService: fromServices.CognitoService
  ) {}
}
