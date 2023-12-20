import { AuthenticatedEffects } from './authenticated.effects';
import { SignInEffects } from './sign-in.effects';
import { SignUpEffects } from './sign-up.effects';

export const effects: any[] = [
  SignInEffects,
  SignUpEffects,
  AuthenticatedEffects
];
