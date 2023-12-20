import { createSelector } from '@ngrx/store';

import { getAuthenticatedState } from '../reducers/index';

export const isAuthenticated = createSelector(
  getAuthenticatedState,
  (state) => state.authenticated
);
