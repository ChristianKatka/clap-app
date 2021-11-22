import { Component, Input } from '@angular/core';

@Component({
  selector: 'gos-trunctate-text',
  templateUrl: './trunctate-text.component.html',
  styleUrls: ['./trunctate-text.component.scss'],
})
export class TrunctateTextComponent {
  @Input() text = '';
  @Input() trunctateMaxLength = 150;


  trunctate = true;
  trunctateText() {
    if (this.text.length >= this.trunctateMaxLength && this.trunctate) {
      return this.text.substring(0, this.trunctateMaxLength);
    }
    return this.text;
  }
  trunctateToggle() {
    this.trunctate = !this.trunctate;
  }
}
