import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-sign-up-confirmation-errors',
  templateUrl: 'sign-up-confirmation-errors.component.html',
  styleUrls: ['sign-up-confirmation-errors.component.scss'],
})
export class SignUpConfirmationErrorsComponent {
  @Input()
  emailConfirmationCodeMismatch = false;

  @Input()
  newConfirmationCodeLimitExceeded = false;
}
