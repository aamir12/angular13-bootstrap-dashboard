import {  Component, Input } from '@angular/core';
import {  FormArray, FormBuilder, Validators } from '@angular/forms';
import { reactiveViewProvider } from 'src/app/providers/reactiveControlContainer.provider';

@Component({
  selector: 'app-rmodifications',
  templateUrl: './rmodifications.component.html',
  styleUrls: ['./rmodifications.component.scss'],
  viewProviders: [reactiveViewProvider],
})
export class RmodificationsComponent {

  constructor(private fb:FormBuilder) {}
  @Input() baseIndex: number = 0;
  @Input() modifications : FormArray = this.fb.array([]);
  modificationActive: number = 0;
  

  addModification(event: Event) {
    event.preventDefault();
    this.modifications.push(this.modificationData());
    this.modificationActive = this.modifications.length - 1;
  }

  modificationData() {
    return this.fb.group({
      mod: ['',[Validators.required]],
      dateSigned: ['',[Validators.required]],
      obligationAmount: ['',[Validators.required]],
      totalValue: ['',[Validators.required]],
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
