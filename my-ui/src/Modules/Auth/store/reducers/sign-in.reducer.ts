import { createReducer, on, Action } from '@ngrx/store';
import {
  AuthSignInActions,
  AuthSignUpActions,
  AuthenticatedActions,
} from '../actions';

export interface SignInState {
  username: string | undefined;
  loading: boolean;
  wrongUserNameOrPassword: boolean;
}

export const initialState: SignInState = {
  username: undefined,
  loading: false,
  wrongUserNameOrPassword: false,
};

const signInReducer = createReducer(
  initialState,

  on(AuthSignInActions.authenticateUser, (state, { signInData }) => ({
    ...state,
    username: signInData.username,
    loading: true,
  })),
  on(AuthenticatedActions.authenticateUserSuccess, (state) => ({
    ...state,
    loading: false,
    wrongUserNameOrPassword: false,
  })),
  on(AuthSignInActions.authenticateUserFailureNotAuthorized, (state) => ({
    ...state,
    loading: false,
    wrongUserNameOrPassword: true,
  })),
  on(
    AuthSignUpActions.redirectToEmailConfirmationView,
    (state, { username }) => ({
      ...state,
      username,
      loading: false,
    })
  ),
  on(AuthenticatedActions.signOut, () => initialState)
);

export const reducer = (state: SignInState | undefined, action: Action) =>
  signInReducer(state, action);
