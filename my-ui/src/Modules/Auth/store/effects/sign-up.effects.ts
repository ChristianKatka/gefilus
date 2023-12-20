import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, map, switchMap, withLatestFrom } from 'rxjs/operators';
import * as fromServices from '../../services/cognito.service';
import { AuthSignUpActions, AuthenticatedActions } from '../actions';
import { AuthExtendedAppState } from '../reducers';
import { AuthSignUpSelectors } from '../selectors';

@Injectable()
export class SignUpEffects {
  signUp$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthSignUpActions.signUp),
      switchMap(({ signUpUserData }) =>
        this.cognitoService.signUp(signUpUserData).pipe(
          map(() =>
            AuthSignUpActions.signUpSuccess({
              signUpUserData,
            })
          ),
          catchError((error: any) => {
            if (error.code === 'UsernameExistsException') {
              return of(
                AuthSignUpActions.signUpFailureUsernameAlreadyExists({
                  username: signUpUserData.username,
                })
              );
            }
            return of(AuthSignUpActions.signUpFailure(error));
          })
        )
      )
    )
  );

  signUpSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthSignUpActions.signUpSuccess),
      map(({ signUpUserData }) =>
        AuthSignUpActions.redirectToEmailConfirmationView({
          username: signUpUserData.username,
          password: signUpUserData.password,
        })
      )
    )
  );

  confirmRegistrationByEmailCode$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthSignUpActions.confirmRegistrationByEmailCode),
      withLatestFrom(
        this.store.select(AuthSignUpSelectors.getSignUpUserNameAndPassword)
      ),
      switchMap(([{ code }, { username, password }]) => {
        if (username === undefined || password === undefined) {
          return of(
            AuthSignUpActions.confirmRegistrationByEmailCodeFailure({
              error:
                'Cannot confirm registration if username or password is missing.',
            })
          );
        }

        return this.cognitoService
          .confirmRegistrationByEmailCode(username, code)
          .pipe(
            map(() =>
              AuthSignUpActions.confirmRegistrationByEmailCodeSuccess({
                username,
                password,
                code,
              })
            ),
            catchError((error: any) => {
              if (error.code === 'CodeMismatchException') {
                return of(
                  AuthSignUpActions.confirmRegistrationByEmailCodeFailureCodeMismatch()
                );
              }
              return of(
                AuthSignUpActions.confirmRegistrationByEmailCodeFailure(
                  error.code
                )
              );
            })
          );
      })
    )
  );

  sendNewEmailConfirmationCode$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthSignUpActions.sendNewEmailConfirmationCode),
      withLatestFrom(this.store.select(AuthSignUpSelectors.getEmail)),
      switchMap(([payload, email]) => {
        if (!email) {
          return of(
            AuthSignUpActions.sendNewEmailConfirmationCodeFailure({
              error: 'No email provided',
            })
          );
        }

        return this.cognitoService.sendNewEmailConfirmationCode(email).pipe(
          map(() =>
            AuthSignUpActions.sendNewEmailConfirmationCodeSuccess({
              email,
            })
          ),

          catchError((error: any) => {
            if (error.code === 'LimitExceededException') {
              return of(
                AuthSignUpActions.sendNewEmailConfirmationCodeFailureLimitExceeded()
              );
            } else {
              return of(
                AuthSignUpActions.sendNewEmailConfirmationCodeFailure({
                  error: error.code,
                })
              );
            }
          })
        );
      })
    )
  );

  confirmRegistrationSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthSignUpActions.confirmRegistrationByEmailCodeSuccess),
      map(({ username, password }) =>
        AuthenticatedActions.verifyUserAfterUserEmailConfirmed({
          username,
          password,
        })
      )
    )
  );

  verifyUserAfterUserEmailConfirmed$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthenticatedActions.verifyUserAfterUserEmailConfirmed),
      switchMap(({ username, password }) =>
        this.cognitoService.authenticateUser(username, password).pipe(
          map(() =>
            AuthenticatedActions.verifyUserAfterUserEmailConfirmedSuccess()
          ),
          catchError((error: any) =>
            of(AuthenticatedActions.authenticateUserFailure(error))
          )
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private cognitoService: fromServices.CognitoService,
    private store: Store<AuthExtendedAppState>
  ) {}
}
