import { Component, OnDestroy, OnInit } from '@angular/core';

import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';



@Component({
  selector: 'app-event-testing',
  templateUrl: './event-testing.component.html',
  styleUrls: ['./event-testing.component.scss']
})
export class EventTestingComponent implements OnInit,OnDestroy {
  clickCount = 0;
  focusCount = 0;
  inputValue = '';
  childCount = 0;
  formControl = new FormControl();

  private valueChangeSub!: Subscription;
  ngOnInit() {
    this.valueChangeSub = this.formControl.valueChanges.subscribe((value) => {
      this.inputValue = value;
    });
  }
  ngOnDestroy() {
    this.valueChangeSub.unsubscribe();
  }

  clickButton() {
    this.clickCount = this.clickCount + 1;
  }
  focusInput() {
    this.focusCount = this.focusCount + 1;
  }
  handleNewNumber(num: number) {
    this.childCount = num;
  }
}
