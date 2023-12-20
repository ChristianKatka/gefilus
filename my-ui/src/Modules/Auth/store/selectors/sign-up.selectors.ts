import { createSelector } from '@ngrx/store';
import { getSignUpState } from '../reducers';

export const isLoading = createSelector(
  getSignUpState,
  (state) => state.isLoading
);

export const usernameAlreadyExists = createSelector(
  getSignUpState,
  (state) => state.usernameAlreadyExists
);

export const isEmailConfirmationCodeMismatch = createSelector(
  getSignUpState,
  (state) => state.emailConfirmationCodeMismatch
);

export const isNewConfirmationCodeSent = createSelector(
  getSignUpState,
  (state) => state.newConfirmationCodeSent
);

export const newConfirmationCodeLimitExceeded = createSelector(
  getSignUpState,
  (state) => state.newConfirmationCodeLimitExceeded
);

export const getEmail = createSelector(
  getSignUpState,
  (state) => state.username
);

export const getSignUpUserNameAndPassword = createSelector(
  getSignUpState,
  (state) => ({
    username: state.username,
    password: state.password,
  })
);

// export const signUpControlData = createSelector(getSignUpState, (state) => ({
//   email: state.username,
//   username: state.username,
//   password: state.password,
//   isLoading: state.isLoading,
//   errorAndOrInfoMessages: {
//     usernameAlreadyExists: state.usernameAlreadyExists,
//     emailConfirmationCodeMismatch: state.emailConfirmationCodeMismatch,
//     newConfirmationCodeSent: state.newConfirmationCodeSent,
//     newConfirmationCodeLimitExceeded: state.newConfirmationCodeLimitExceeded,
//   },
// }));
