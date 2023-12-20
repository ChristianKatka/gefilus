import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const confirmPasswordsValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const passwordControl = control.get('password');
  const confirmPasswordControl = control.get('passwordConfirm');

  if (passwordControl === null || confirmPasswordControl === null) {
    return { notSame: true };
  }

  return passwordControl.value === confirmPasswordControl.value
    ? null
    : { notSame: true };
};
