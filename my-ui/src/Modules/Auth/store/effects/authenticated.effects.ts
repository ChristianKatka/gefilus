import { Injectable } from '@angular/core';
import { RouterActions } from '@app/store/actions';
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

  signOutSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        AuthenticatedActions.signOutSuccess,
        AuthenticatedActions.userNotRemembered
      ),
      map(() =>
        RouterActions.navigate({
          commands: ['/sign-in'],
        })
      )
    )
  );

  authSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        AuthenticatedActions.authenticateUserAfterUserEmailConfirmedSuccess,
        AuthenticatedActions.authenticateUserSuccess,
        AuthenticatedActions.userRemembered
      ),
      map(() => AuthenticatedActions.redirectToAuthenticatedHome())
    )
  );

  constructor(
    private actions$: Actions,
    private cognitoService: fromServices.CognitoService
  ) {}
}
