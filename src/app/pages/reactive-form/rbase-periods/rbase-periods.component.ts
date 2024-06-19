import { Component, Input, ViewChild} from '@angular/core';
import {  FormArray, FormControl, FormGroup } from '@angular/forms';
import { reactiveViewProvider } from 'src/app/providers/reactiveControlContainer.provider';
import { RmodificationsComponent } from './rmodifications/rmodifications.component';

@Component({
  selector: 'app-rbase-periods',
  templateUrl: './rbase-periods.component.html',
  styleUrls: ['./rbase-periods.component.scss'],
  viewProviders: [reactiveViewProvider],
})
export class RbasePeriodsComponent  {

  @ViewChild(RmodificationsComponent) rmodifications!: RmodificationsComponent;
  @Input() basePeriods: FormArray = new FormArray([]);
  baseActive: number = 0;
  
  addOptionPeriod(event:Event) {
    event.preventDefault();
    this.basePeriods.push(this.basePeriodData());
    this.baseActive = this.basePeriods.length - 1;
  }

  basePeriodData() {
    return new FormGroup({
      startDate: new FormControl(''),
      endDate: new FormControl(''),
      totalObligation: new FormControl(''),
      periodValue: new FormControl(''),
      modifications: new FormArray([]),
    })
  }

  removeBasePeriod(index: number, event: Event) {
    event.preventDefault();
    this.basePeriods.removeAt(index);
    if (index > 0) {
      this.baseActive = index - 1;
    } else {
      this.baseActive = 0;
    }
    
  }


  modifications(index:number): FormArray {
    return this.basePeriods.at(index)?.get('modifications') as FormArray
  }

}
