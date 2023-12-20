import { SignInData } from '../../models/sign-in-data.model';
import { createAction, props } from '@ngrx/store';

// AKA Sign in
export const authenticateUser = createAction(
  '[Auth] Authenticate User',
  props<{ signInData: SignInData }>()
);

export const authenticateUserFailureNotAuthorized = createAction(
  '[Auth] Authenticate User Failure, Not authorized (wrong username or password)'
);

export const newPasswordRequired = createAction('[Auth] New Password Required');

export const redirectToNewPasswordRequired = createAction(
  '[Auth] Redirect to New Password Required'
);

// after this action: successfull authenticate user
export const changeNewPassword = createAction(
  '[Auth] Change New Password',
  props<{ newPassword: string }>()
);
export const changeNewPasswordFailure = createAction(
  '[Auth] Change New Password Failure',
  props<{ error: string }>()
);
