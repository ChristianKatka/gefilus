import {
  createFeatureSelector,
  ActionReducerMap,
  createSelector,
} from '@ngrx/store';

import * as fromSignIn from './sign-in.reducer';
import * as fromSignUp from './sign-up.reducer';
import * as fromAuthenticated from './authenticated.reducer';
import { State } from '@app/store/reducers';

export const featureKey = 'auth';

export interface AuthFeatureState {
  signIn: fromSignIn.SignInState;
  signUp: fromSignUp.SignUpState;
  authenticated: fromAuthenticated.AuthenticatedState;
}

export interface AuthExtendedAppState extends State {
  auth: AuthFeatureState;
}

export const reducers: ActionReducerMap<AuthFeatureState> = {
  signIn: fromSignIn.reducer,
  signUp: fromSignUp.reducer,
  authenticated: fromAuthenticated.reducer,
};

export const getAuthState = createFeatureSelector<
  AuthExtendedAppState,
  AuthFeatureState
>(featureKey);
export const getSignIn =
  createFeatureSelector<fromSignIn.SignInState>('signIn');
export const getSignUp =
  createFeatureSelector<fromSignUp.SignUpState>('signUp');
export const getAuthenticated =
  createFeatureSelector<fromAuthenticated.AuthenticatedState>('authenticated');

export const getSignInState = createSelector(getAuthState, getSignIn);

export const getSignUpState = createSelector(getAuthState, getSignUp);

export const getAuthenticatedState = createSelector(
  getAuthState,
  getAuthenticated
);
