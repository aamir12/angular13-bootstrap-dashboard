
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-event-child',
  template: `

<button (click)="clickButton()">child component</button>
  `,
})
export class EventChildComponent {
  @Output() newNumber = new EventEmitter<number>();
  private count = 0;
  clickButton() {
    this.count = this.count + 1;
    this.newNumber.emit(this.count);
  }
}

