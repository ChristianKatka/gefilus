import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'clap-app-sign-up-confirmation-form',
  templateUrl: 'sign-up-confirmation-form.component.html',
  styleUrls: ['sign-up-confirmation-form.component.scss'],
})
export class SignUpConfirmationFormComponent implements OnChanges {
  @Input()
  emailConfirmationCodeMismatch = false;

  @Input()
  newConfirmationCodeSent = false;

  @Input()
  newConfirmationCodeLimitExceeded = false;

  @Input()
  isLoading = false;

  @Input()
  email = '';

  @Output()
  confirmationCodeSubmitted: EventEmitter<string> = new EventEmitter();

  @Output()
  sendNewEmailConfirmationCode = new EventEmitter();

  confirmationCodeForm = new FormGroup({
    confirmationCode: new FormControl('', [
      Validators.minLength(6),
      Validators.required,
    ]),
  });

  ngOnChanges() {
    if (this.isLoading) {
      this.confirmationCodeForm.disable();
    } else {
      this.confirmationCodeForm.enable();
    }
  }

  submit() {
    const confirmationCode = this.confirmationCodeForm.value.confirmationCode;
    console.log('confirmation code:');
    console.log(confirmationCode);

    if (!confirmationCode) return;

    this.confirmationCodeSubmitted.emit(confirmationCode);
  }

  newEmailConfirmationCodeOrdered() {
    this.sendNewEmailConfirmationCode.emit();
  }
}
