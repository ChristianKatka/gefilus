import { createAction, props } from '@ngrx/store';

export const checkOldUserSession = createAction(
  '[Auth] Check Old User Session'
);
export const userRemembered = createAction(
  '[Auth] User Remembered',
  props<{ username: string }>()
);
export const userNotRemembered = createAction('[Auth] User Not Remembered');

export const authenticateUserSuccess = createAction(
  '[Auth] Authenticate User Success'
);

export const authenticateUserFailure = createAction(
  '[Auth] Authenticate User Failure',
  props<{ error: string }>()
);

export const verifyUserAfterUserEmailConfirmed = createAction(
  '[Auth] Authenticate User After User Email Confirmed',
  props<{ username: string; password: string }>()
);
export const verifyUserAfterUserEmailConfirmedSuccess = createAction(
  '[Auth] Authenticate User After User Email Confirmed Success'
);

export const redirectToWelcomePage = createAction(
  '[Auth] Redirect To Welcome Page'
);

export const signOut = createAction('[Auth] Sign Out');
export const signOutSuccess = createAction('[Auth] Sign Out Success');

export const redirectToHome = createAction('[Auth] Redirect To Home');
export const redirectToSignIn = createAction('[Auth] Redirect to Sign In');
