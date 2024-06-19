import { Component, Input, QueryList, ViewChildren} from '@angular/core';
import {  FormArray, FormBuilder, Validators } from '@angular/forms';
import { reactiveViewProvider } from 'src/app/providers/reactiveControlContainer.provider';
import { RmodificationsComponent } from './rmodifications/rmodifications.component';

@Component({
  selector: 'app-rbase-periods',
  templateUrl: './rbase-periods.component.html',
  styleUrls: ['./rbase-periods.component.scss'],
  viewProviders: [reactiveViewProvider],
})
export class RbasePeriodsComponent  {

  constructor(private fb: FormBuilder){}
  @ViewChildren(RmodificationsComponent) rmodifications!: QueryList<RmodificationsComponent>;
  @Input() basePeriods: FormArray = this.fb.array([]);
  baseActive: number = 0;

  
  addOptionPeriod(event:Event) {
    event.preventDefault();
    this.basePeriods.push(this.basePeriodData());
    this.baseActive = this.basePeriods.length - 1;
  }

  basePeriodData() {
    return this.fb.group({
      startDate: ['',[Validators.required]],
      endDate: ['',[Validators.required]],
      totalObligation: ['',[Validators.required]],
      periodValue: ['',[Validators.required]],
      modifications: this.fb.array([]),
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
