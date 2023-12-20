import { createReducer, on, Action } from '@ngrx/store';
import { AuthenticatedActions } from '../actions';

export interface AuthenticatedState {
  isAuthenticated: boolean;
}

export const initialState: AuthenticatedState = {
  isAuthenticated: false,
};

const authenticatedReducer = createReducer(
  initialState,
  on(AuthenticatedActions.authenticateUserSuccess, () => ({
    ...initialState,
    isAuthenticated: true,
  })),
  on(AuthenticatedActions.signOutSuccess, () => ({
    ...initialState,
    isAuthenticated: false,
  })),
  on(AuthenticatedActions.signOut, () => initialState)
);

export const reducer = (
  state: AuthenticatedState | undefined,
  action: Action
) => authenticatedReducer(state, action);
