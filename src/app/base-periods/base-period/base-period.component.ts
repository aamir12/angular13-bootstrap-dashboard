import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ControlContainer, NgForm, NgModelGroup } from '@angular/forms';

import { ModificationsComponent } from '../../modifications/modifications.component';
import { ContractService } from '../../contract.service';
import { BasePeriod } from '../../model';
import { formViewProvider } from 'src/app/providers/controlContainer.provider';

@Component({
  selector: 'app-base-period',
  templateUrl: './base-period.component.html',
  styleUrls: ['./base-period.component.css'],
  viewProviders: [formViewProvider],
})
// viewProviders: [{ provide: ControlContainer, useExisting: NgModelGroup }],
export class BasePeriodComponent {
  @Input() basePeriod!: BasePeriod;
  @Input() baseIndex: number = 0; 
  @ViewChild(ModificationsComponent) modifications!: ModificationsComponent;

  dateChange(event: Event) {
    console.log('dateChange', event);
  }

  onStartDateChange(date:string) {
    console.log(date);
    console.log("Start Date Change",this.basePeriod.startDate)
  }

  onStartDateBlur(date:string) {
    console.log(date);
    console.log("Start Date Blur",this.basePeriod.startDate)
  }

  
}
