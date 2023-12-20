import { Injectable } from '@angular/core';
import { State } from '@app/store';
import { CognitoService } from '@auth/services/cognito.service';
import { AuthenticatedActions } from '@auth/store/actions';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UnauthenticatedGuard {
  constructor(
    private store: Store<State>,
    private cognitoService: CognitoService
  ) {}

  canActivate(): Observable<boolean> {
    return this.cognitoService.isSessionValid().pipe(
      map((isLoggedIn) => this.checkIfUserIsUnauthenticated(isLoggedIn)),
      tap((isUnAuthenticated) => {
        this.ifUserTypesUnAllowedPathInUrlThenRedirect(isUnAuthenticated);
      })
    );
  }

  checkIfUserIsUnauthenticated(isLoggedIn: boolean): boolean {
    // if user is logged in we dont want him to acces login page
    if (isLoggedIn) {
      return false;
    } else {
      return true;
    }
  }

  ifUserTypesUnAllowedPathInUrlThenRedirect(isUnAuthenticated: boolean) {
    const userIsLoggedInSoRedirectToHome = !isUnAuthenticated;

    if (userIsLoggedInSoRedirectToHome) {
      this.store.dispatch(AuthenticatedActions.redirectToHome());
    }
  }
}
