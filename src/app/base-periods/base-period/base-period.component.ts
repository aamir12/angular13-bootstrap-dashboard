import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ControlContainer, NgForm, NgModelGroup } from '@angular/forms';

import { ModificationsComponent } from '../../modifications/modifications.component';
import { ContractService } from '../../contract.service';
import { BasePeriod } from '../../model';

@Component({
  selector: 'app-base-period',
  templateUrl: './base-period.component.html',
  styleUrls: ['./base-period.component.css'],
  viewProviders: [{ provide: ControlContainer, useExisting: NgModelGroup }],
})
export class BasePeriodComponent implements OnInit {
  @Input() basePeriod!: BasePeriod;
  @Input() baseIndex: number = 0; 
  @ViewChild(ModificationsComponent) modifications!: ModificationsComponent;

  isSubmitted: boolean = false;
  constructor(private contractService: ContractService) {}

  ngOnInit() {
    this.mointerFormSubmit();
  }

  mointerFormSubmit() {
    this.contractService.isSubmitted$.subscribe((isSubmit) => {
      this.isSubmitted = isSubmit;
    });
  }

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
