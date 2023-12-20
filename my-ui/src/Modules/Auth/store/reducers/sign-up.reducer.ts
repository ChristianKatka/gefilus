import { createReducer, on, Action } from '@ngrx/store';
import { AuthenticatedActions, AuthSignUpActions } from '../actions';

export interface SignUpState {
  username: string | undefined;
  password: string | undefined;
  email: string | undefined;
  isLoading: boolean;
  usernameAlreadyExists: boolean;
  emailConfirmationCodeMismatch: boolean;
  newConfirmationCodeSent: boolean;
  newConfirmationCodeLimitExceeded: boolean;
}

export const initialState: SignUpState = {
  username: undefined,
  password: undefined,
  email: undefined,
  isLoading: false,
  usernameAlreadyExists: false,
  emailConfirmationCodeMismatch: false,
  newConfirmationCodeSent: false,
  newConfirmationCodeLimitExceeded: false,
};

const signUpReducer = createReducer(
  initialState,
  on(AuthSignUpActions.signUp, (state, { signUpUserData }) => ({
    ...state,
    isLoading: true,
    username: signUpUserData.username,
    password: signUpUserData.password,
    email: signUpUserData.email,
  })),
  on(AuthSignUpActions.signUpSuccess, (state, { signUpUserData }) => ({
    ...state,
    isLoading: false,
    username: signUpUserData.username,
    password: signUpUserData.password,
    email: signUpUserData.email,
  })),
  on(AuthSignUpActions.signUpFailureUsernameAlreadyExists, (state) => ({
    ...state,
    isLoading: false,
    usernameAlreadyExists: true,
  })),
  on(
    AuthSignUpActions.confirmRegistrationByEmailCodeFailureCodeMismatch,
    (state) => ({
      ...state,
      isLoading: false,
      emailConfirmationCodeMismatch: true,
    })
  ),
  on(AuthSignUpActions.sendNewEmailConfirmationCode, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(AuthSignUpActions.sendNewEmailConfirmationCodeSuccess, (state) => ({
    ...state,
    isLoading: false,
    newConfirmationCodeSent: true,
  })),
  on(
    AuthSignUpActions.sendNewEmailConfirmationCodeFailureLimitExceeded,
    (state) => ({
      ...state,
      isLoading: false,
      newConfirmationCodeLimitExceeded: true,
    })
  ),
  on(AuthSignUpActions.confirmRegistrationByEmailCode, (state) => ({
    ...state,
    isLoading: true,
  })),

  // When user ask new confirmation code, we can show which email it was sent
  on(
    AuthSignUpActions.redirectToEmailConfirmationView,
    (state, { username, password }) => ({
      ...state,
      username,
      password: password ? password : state.password,
    })
  ),
  on(AuthenticatedActions.signOut, () => initialState)
);

export const reducer = (state: SignUpState | undefined, action: Action) =>
  signUpReducer(state, action);
