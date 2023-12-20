import { Injectable } from '@angular/core';
import { State } from '@app/store';
import { CognitoService } from '@auth/services/cognito.service';
import { AuthenticatedActions } from '@auth/store/actions';
import { Store } from '@ngrx/store';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthenticatedGuard {
  constructor(
    private store: Store<State>,
    private cognitoService: CognitoService
  ) {}

  canActivate(): Observable<boolean> {
    return this.cognitoService.isSessionValid().pipe(
      tap((loggedIn) => {
        this.ifUserTypesUnAllowedPathInUrlThenRedirect(loggedIn);
      })
    );
  }

  ifUserTypesUnAllowedPathInUrlThenRedirect(loggedIn: boolean) {
    if (!loggedIn) {
      this.store.dispatch(AuthenticatedActions.redirectToUnauthenticatedHome());
    }
  }
}
