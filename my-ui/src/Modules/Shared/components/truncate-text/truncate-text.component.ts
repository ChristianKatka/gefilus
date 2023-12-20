import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-truncate-text',
  templateUrl: './truncate-text.component.html',
  styleUrls: ['./truncate-text.component.scss'],
})
export class TruncateTextComponent {
  @Input() text = '';
  @Input() truncateMaxLength = 150;

  truncate = true;
  truncateText() {
    if (this.text.length >= this.truncateMaxLength && this.truncate) {
      return this.text.substring(0, this.truncateMaxLength);
    }
    return this.text;
  }
  truncateToggle() {
    this.truncate = !this.truncate;
  }
}
