import { createSelector } from '@ngrx/store';
import { getSignInState } from '../reducers/index';

export const isLoading = createSelector(
  getSignInState,
  (state) => state.loading
);

export const isWrongUsernameOrPassword = createSelector(
  getSignInState,
  (state) => state.wrongUserNameOrPassword
);

export const getSignInUserName = createSelector(
  getSignInState,
  (state) => state.username
);
