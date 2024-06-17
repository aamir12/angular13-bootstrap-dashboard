import { DOCUMENT } from '@angular/common';
import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ContractService } from 'src/app/contract.service';
import { FormUtilityService } from 'src/app/form-utility.service';
import { RbasePeriodsComponent } from './rbase-periods/rbase-periods.component';


@Component({
  selector: 'app-reactive-form',
  templateUrl: './reactive-form.component.html',
  styleUrls: ['./reactive-form.component.scss'],
  providers: [ContractService],
})
export class ReactiveFormComponent implements OnInit, AfterViewInit  {

  @ViewChild(RbasePeriodsComponent, {static:true}) rbasePeriods!:RbasePeriodsComponent;

  form = this.fb.group({
    title : ['',[Validators.required]],
    basePeriods: this.fb.array([]),
  });
  
  constructor(
    private fb:FormBuilder,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.basePeriods.push(this.rbasePeriods.basePeriodData());  
  }

  ngAfterViewInit(): void {
    this.cdr.detectChanges();
  }

  async onSubmit() {
    console.log(this.form.valid);
    console.log(this.form.value);
  }


  get title(): FormControl {
    return this.form.get('title') as FormControl;
  }

  get basePeriods(): FormArray {
    return this.form.get('basePeriods') as FormArray;
  }

  
}