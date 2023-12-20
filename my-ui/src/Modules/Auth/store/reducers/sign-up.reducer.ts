import { createReducer, on, Action } from '@ngrx/store';
import { AuthenticatedActions, AuthSignUpActions } from '../actions';

export interface SignUpState {
  username: string | undefined;
  password: string | undefined;
  email: string | undefined;
  loading: boolean;
  usernameAlreadyExists: boolean;
  emailConfirmationCodeMismatch: boolean;
  newConfirmationCodeSent: boolean;
  newConfirmationCodeLimitExceeded: boolean;
}

export const initialState: SignUpState = {
  username: undefined,
  password: undefined,
  email: undefined,
  loading: false,
  usernameAlreadyExists: false,
  emailConfirmationCodeMismatch: false,
  newConfirmationCodeSent: false,
  newConfirmationCodeLimitExceeded: false,
};

const signUpReducer = createReducer(
  initialState,
  on(AuthSignUpActions.signUp, (state, { signUpUserData }) => ({
    ...state,
    loading: true,
    username: signUpUserData.username,
    password: signUpUserData.password,
    email: signUpUserData.email,
  })),
  on(AuthSignUpActions.signUpSuccess, (state, { signUpUserData }) => ({
    ...state,
    loading: false,
    username: signUpUserData.username,
    password: signUpUserData.password,
    email: signUpUserData.email,
  })),
  on(AuthSignUpActions.signUpFailureUsernameAlreadyExists, (state) => ({
    ...state,
    loading: false,
    usernameAlreadyExists: true,
  })),
  on(
    AuthSignUpActions.confirmRegistrationByEmailCodeFailureCodeMismatch,
    (state) => ({
      ...state,
      loading: false,
      emailConfirmationCodeMismatch: true,
    })
  ),
  on(AuthSignUpActions.sendNewEmailConfirmationCode, (state) => ({
    ...state,
    loading: true,
  })),
  on(AuthSignUpActions.sendNewEmailConfirmationCodeSuccess, (state) => ({
    ...state,
    loading: false,
    newConfirmationCodeSent: true,
  })),
  on(
    AuthSignUpActions.sendNewEmailConfirmationCodeFailureLimitExceeded,
    (state) => ({
      ...state,
      loading: false,
      newConfirmationCodeLimitExceeded: true,
    })
  ),
  on(AuthSignUpActions.confirmRegistrationByEmailCode, (state) => ({
    ...state,
    loading: true,
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
