import { SignUpUserData } from '../../models/sign-up-user-data.model';
import { createAction, props } from '@ngrx/store';

export const redirectToEmailConfirmationView = createAction(
  '[Auth] Redirect to Email Confirmation View',
  props<{
    username: string;
    password?: string;
  }>()
);

export const sendNewEmailConfirmationCode = createAction(
  '[Auth] Send New Email Confirmation Code'
);
export const sendNewEmailConfirmationCodeSuccess = createAction(
  '[Auth] Send New Email Confirmation Code Success',
  props<{ email: string }>()
);
export const sendNewEmailConfirmationCodeFailure = createAction(
  '[Auth] Send New Email Confirmation Code Failure',
  props<{ error: string }>()
);
export const sendNewEmailConfirmationCodeFailureLimitExceeded = createAction(
  '[Auth] Send New Email Confirmation Code Failure, limit exceeded'
);

export const confirmRegistrationByEmailCode = createAction(
  '[Auth] Confirm Registration By Email Code',
  props<{ code: string }>()
);
export const confirmRegistrationByEmailCodeSuccess = createAction(
  '[Auth] Confirm Registration By Email Code Success',
  props<{ username: string; password: string; code: string }>()
);
export const confirmRegistrationByEmailCodeFailure = createAction(
  '[Auth] Confirm Registration By Email Code Failure',
  props<{ error: string }>()
);
export const confirmRegistrationByEmailCodeFailureCodeMismatch = createAction(
  '[Auth] Confirm Registration By Email Code Failure, Code Mismatch'
);

export const signUpFailureUsernameAlreadyExists = createAction(
  '[Auth] Sign Up Failure, Username Already Exists',
  props<{ username: string }>()
);

export const signUp = createAction(
  '[Auth] Sign Up',
  props<{ signUpUserData: SignUpUserData }>()
);

export const signUpSuccess = createAction(
  '[Auth] Sign Up Success',
  props<{ signUpUserData: SignUpUserData }>()
);

export const signUpFailure = createAction(
  '[Auth] Sign Up Failure',
  props<{ error: string }>()
);

export const redirectToSignUp = createAction('[Auth] Redirect to Sign Up');
