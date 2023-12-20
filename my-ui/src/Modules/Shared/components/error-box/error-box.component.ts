import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-error-box',
  templateUrl: 'error-box.component.html',
  styleUrls: ['error-box.component.scss'],
})
export class ErrorBoxComponent {
  @Input()
  text = '';
}
