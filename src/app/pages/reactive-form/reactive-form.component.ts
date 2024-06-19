import { DOCUMENT } from '@angular/common';
import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, HostBinding, Inject, OnInit, ViewChild } from '@angular/core';
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
  @ViewChild('contractForm') contractForm!: NgForm;
  form = this.fb.group({
    title : ['',[Validators.required]],
    basePeriods: this.fb.array([]),
  });
  
  constructor(
    private fb:FormBuilder,
    private cdr: ChangeDetectorRef,
    @Inject(DOCUMENT) private document: Document,
  ) {}

  ngOnInit(): void {
    this.basePeriods.push(this.rbasePeriods.basePeriodData());  
  }

  ngAfterViewInit(): void {
    this.cdr.detectChanges();
  }

  async onSubmit() {
    this.contractForm.form.markAllAsTouched();
    // const hasError = await this.openInvalidTab();
    console.log(this.form.valid);
    console.log(this.form.value);
  }

  // async openInvalidTab() {
  //   return new Promise((resolve, reject) => {
  //     setTimeout(() => {
  //       let hasError = false;

  //       const allBasePeriods =
  //         this.document.querySelectorAll('.app-basePeriod');
  //       if (allBasePeriods.length > 0) {
  //         for (let i = 0; i < allBasePeriods.length; i++) {
  //           let invalidInputs = allBasePeriods[i].querySelectorAll('.invalid');
  //           if (invalidInputs.length > 0) {
  //             hasError = true;
  //             this.rbasePeriods.baseActive = i;
  //             const allModifications =
  //               allBasePeriods[i].querySelectorAll('.app-modification');
  //             if (allModifications.length > 0) {
  //               for (let j = 0; j < allModifications.length; j++) {
  //                 const invalidModification =
  //                   allModifications[j].querySelectorAll('.invalid');
  //                 if (invalidModification.length > 0) {
  //                     this.rbasePeriods.basePeriods.at(i).modifications.modificationActive = j;
  //                     break;
  //                 }
  //               }
  //             }
  //             break;
  //           }
  //         }
  //       }

  //       resolve(hasError);
  //     }, 0);
  //   });
  // }


  get title(): FormControl {
    return this.form.get('title') as FormControl;
  }

  get basePeriods(): FormArray {
    return this.form.get('basePeriods') as FormArray;
  }

  
}