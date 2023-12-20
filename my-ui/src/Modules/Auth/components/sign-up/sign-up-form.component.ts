import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { onlyLettersAndNumbers } from '../../../Shared/regex/regex';
import { PasswordsErrorStateMatcher } from '../../utils/passwords-error-state-matcher';
import { confirmPasswordsValidator } from './confirm-passwords.validator';

@Component({
  selector: 'clap-app-sign-up-form',
  templateUrl: './sign-up-form.component.html',
  styleUrls: ['./sign-up-form.component.scss'],
})
export class SignUpFormComponent implements OnChanges {
  @Input()
  isLoading = false;

  @Input()
  usernameAlreadyExists = false;

  @Output()
  showTermsOfService = new EventEmitter();

  @Output()
  showPrivacyPolicy = new EventEmitter();

  @Output()
  signUp: EventEmitter<any> = new EventEmitter();

  showPassword = false;
  showPasswordConfirm = false;
  matcher = new PasswordsErrorStateMatcher();

  emailAddressFormControl = new FormControl(null, [
    Validators.email,
    Validators.required,
  ]);

  passwordsForm = new FormGroup(
    {
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(8),
      ]),
      passwordConfirm: new FormControl(null, [Validators.required]),
    },
    [confirmPasswordsValidator]
  );

  signUpUserDataForm = new FormGroup({
    email: this.emailAddressFormControl,
    passwords: this.passwordsForm,
  });

  ngOnChanges() {
    if (this.isLoading) {
      this.signUpUserDataForm.disable();
    } else {
      this.signUpUserDataForm.enable();
    }
  }

  submit() {
    const { email, passwords } = this.signUpUserDataForm.value;

    if (!passwords) return;

    this.signUp.emit({
      username: email,
      email,
      password: passwords.password,
    });
  }
}
