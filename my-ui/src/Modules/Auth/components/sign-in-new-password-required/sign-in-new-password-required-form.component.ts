import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-password-required-form',
  templateUrl: './sign-in-new-password-required-form.component.html',
  styleUrls: ['./sign-in-new-password-required-form.component.scss'],
})
export class SignInNewPasswordRequiredFormComponent {
  @Output()
  newPasswordSubmitted = new EventEmitter<string>();

  showPassword = false;

  newPasswordForm: FormGroup = new FormGroup({
    password: new FormControl(null, [
      Validators.required,
      Validators.minLength(8),
    ]),
  });

  submit() {
    this.newPasswordSubmitted.emit(this.newPasswordForm.value.password);
  }
}
