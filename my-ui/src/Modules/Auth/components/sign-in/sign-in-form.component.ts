import {
  Component,
  EventEmitter,
  Output,
  Input,
  OnChanges,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SignInData } from '../../models/sign-in-data.model';

@Component({
  selector: 'app-sign-in-form',
  templateUrl: './sign-in-form.component.html',
  styleUrls: ['./sign-in-form.component.scss'],
})
export class SignInFormComponent implements OnChanges {
  @Input()
  isLoading = false;

  @Input()
  isWrongUsernameOrPassword = false;

  @Output()
  signIn = new EventEmitter<SignInData>();

  showPassword = false;

  ngOnChanges() {
    if (this.isLoading) {
      this.signInForm.disable();
    } else {
      this.signInForm.enable();
    }
  }

  signInForm: FormGroup = new FormGroup({
    username: new FormControl(null, [Validators.email, Validators.required]),
    password: new FormControl(null, Validators.required),
  });

  submit() {
    this.signIn.emit(this.signInForm.value);
  }
}
