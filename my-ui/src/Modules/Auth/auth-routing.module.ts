import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInNewPasswordRequiredContainerComponent } from './components/sign-in-new-password-required/sign-in-new-password-required.container'; // eslint-disable-line
import { SignInContainerComponent } from './components/sign-in/sign-in.container';
import { SignUpConfirmationContainerComponent } from './components/sign-up-confirmation/sign-up-confirmation.container';
import { SignUpContainerComponent } from './components/sign-up/sign-up.container';
import { SignUpConfirmationGuard } from './guards/sign-up-confirmation.guard';
import { UnauthenticatedGuard } from './guards/unauthenticated.guard';
import { AuthenticatedGuard } from './guards/authenticated.guard';
import { WelcomeContainerComponent } from './components/welcome/welcome.container';

export const authRoutes: Routes = [
  {
    path: 'sign-up',
    canActivate: [UnauthenticatedGuard],
    component: SignUpContainerComponent,
  },
  {
    path: 'sign-up-confirmation',
    canActivate: [SignUpConfirmationGuard],
    component: SignUpConfirmationContainerComponent,
  },

  {
    path: 'sign-in',
    canActivate: [UnauthenticatedGuard],
    component: SignInContainerComponent,
  },

  {
    path: 'new-password-required',
    canActivate: [UnauthenticatedGuard],
    component: SignInNewPasswordRequiredContainerComponent,
  },
  {
    path: 'welcome',
    canActivate: [AuthenticatedGuard],
    component: WelcomeContainerComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(authRoutes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
