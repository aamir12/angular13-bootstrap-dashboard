import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm } from '@angular/forms';
import { BasePeriodComponent } from 'src/app/base-periods/base-period/base-period.component';
import { BasePeriodsComponent } from 'src/app/base-periods/base-periods.component';
import { ContractService } from 'src/app/contract.service';
import { FormUtilityService } from 'src/app/form-utility.service';
import { Project } from 'src/app/model';

@Component({
  selector: 'app-template-form',
  templateUrl: './template-form.component.html',
  styleUrls: ['./template-form.component.scss'],
  providers: [ContractService],
})
export class TemplateFormComponent  {

  @ViewChild('contractForm') contractForm!: NgForm;
  project = this.contractService.project;
  baseActive = 0;
  modificationActive = 0;
  @ViewChild(BasePeriodsComponent)
  basePeriods!: BasePeriodsComponent;
  features = ['Sub Forms','Built in Validations','Custom Validation','Control Value Accessor','Scroll Effects','Proper Error Handling'];
  description = 'This page is all about template driven from. It has following features';
  reactiveFrm: FormGroup = this.fb.group({
    'testInput' : ['']
  })
  constructor(
    private contractService: ContractService,
    @Inject(DOCUMENT) private document: Document,
    private formUtility: FormUtilityService,
    private fb:FormBuilder,
    private element:ElementRef
  ) {}

  checkTotalObligation() {
    // if (
    //   !this.project.basePeriods?.length ||
    //   !this.project.basePeriods['modifications']?.length
    // ) {
    //   return;
    // }

    //I used for loop instead of forEach bcoz I want to show one error message at a time. we can easily break from loop
    let hasMessage;
    if (this.project.basePeriods?.length) {
      for (let i = 0; i < this.project.basePeriods.length; i++) {
        let sumOfObligationAmount = 0;
        let basePeriod = this.project.basePeriods[i];

        if (basePeriod.modifications?.length) {
          for (let j = 0; j < basePeriod.modifications.length; j++) {
            let modification = basePeriod.modifications[j];
            if(modification.obligationAmount) {
              sumOfObligationAmount += +modification.obligationAmount;
            }
          }
        }

        this.formUtility.removeError(
          this.basePeriodControl,
          `totalObligation_${i}`,
          'totalObligationError'
        );

        if (basePeriod.totalObligation &&  sumOfObligationAmount > +basePeriod.totalObligation) {
          this.formUtility.addError(
            this.basePeriodControl,
            `totalObligation_${i}`,
            'totalObligationError'
          );
          // if (!hasMessage) {
          //   hasMessage =
          //     'Total obligation can not be less than sum of other obligation amount';
          // }
        }
      }
    }

    // if (hasMessage) {
    //   alert(hasMessage);
    // }
  }

  async onSubmit() {
    this.checkTotalObligation();
    
    // this.formUtility.addError(
    //   this.basePeriodControl,
    //   `endDate_0`,
    //   'endDateError'
    // );
    this.contractForm.form.markAllAsTouched();
    const hasError = await this.openInvalidTab();
    if (this.contractForm.invalid || hasError) {
      
      console.log('invalid', this.contractForm.invalid);
      this.formUtility.scrollToFirstInvalidControl(this.element);
      return;
    }
    console.log(this.contractForm);
    console.log('Valid Form Data', this.project);
  }

  

  async openInvalidTab() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        let hasError = false;

        const allBasePeriods =
          this.document.querySelectorAll('app-base-period');
        if (allBasePeriods.length > 0) {
          for (let i = 0; i < allBasePeriods.length; i++) {
            let invalidInputs = allBasePeriods[i].querySelectorAll('.invalid');
            if (invalidInputs.length > 0) {
              hasError = true;
              this.basePeriods.baseActive = i;
              const allModifications =
                allBasePeriods[i].querySelectorAll('app-modification');
              if (allModifications.length > 0) {
                for (let j = 0; j < allModifications.length; j++) {
                  const invalidModification =
                    allModifications[j].querySelectorAll('.invalid');
                  if (invalidModification.length > 0) {
                      (<BasePeriodComponent>this.basePeriods.basePeriod.get(i)).modifications.modificationActive = j;
                      break;
                  }
                }
              }
              break;
            }
          }
        }

        resolve(hasError);
      }, 0);
    });
  }

  onSubmitReactive() {
    this.reactiveFrm.markAllAsTouched();
  }

  setFocus() {
   this.formUtility.setFocus('startDate_0');
  }

  basePeriodInput(name:string):FormControl {
    return this.basePeriodControl.get(name) as FormControl;
  }

  //Form Controls getter functions
  get mainForm(): FormGroup {
    return this.contractForm.form as FormGroup;
  }

  get basePeriodsControl(): FormGroup {
    return this.mainForm.controls['basePeriods'] as FormGroup;
  }

  get basePeriodControl(): FormGroup {
    return this.basePeriodsControl.controls['basePeriod'] as FormGroup;
  }

  get modificationsControl(): FormGroup {
    return this.basePeriodControl.controls['modifications'] as FormGroup;
  }

  get modificationControl(): FormGroup {
    return this.modificationsControl.controls['modification'] as FormGroup;
  }

  get testInput():FormControl {
    return this.reactiveFrm.get('testInput') as FormControl;
  }
}