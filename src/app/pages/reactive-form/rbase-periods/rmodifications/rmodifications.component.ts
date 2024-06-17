import {  Component, Input, OnInit } from '@angular/core';
import {  FormArray, FormControl, FormGroup } from '@angular/forms';
import { reactiveViewProvider } from 'src/app/providers/reactiveControlContainer.provider';

@Component({
  selector: 'app-rmodifications',
  templateUrl: './rmodifications.component.html',
  styleUrls: ['./rmodifications.component.scss'],
  viewProviders: [reactiveViewProvider],
})
export class RmodificationsComponent {

  @Input() baseIndex: number = 0;
  @Input() modifications : FormArray = new FormArray([]);
  modificationActive: number = 0;
  

  addModification(event: Event) {
    event.preventDefault();
    this.modifications.push(this.modificationData());
    this.modificationActive = this.modifications.length - 1;
  }

  modificationData() {
    return new FormGroup({
      mod: new FormControl(''),
      dateSigned: new FormControl(''),
      obligationAmount: new FormControl(''),
      totalValue: new FormControl(''),
    })
  }

  removeModificationIndex(index: number, event: Event) {
    event.preventDefault();
    this.modifications.removeAt(index);
    if (index > 0) {
      this.modificationActive = index - 1;
    } else {
      this.modificationActive = 0;
    }
  }

}
