import { DOCUMENT } from '@angular/common';
import { ElementRef, Inject, Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import * as $ from 'jquery';
//declare var $: any; //without using npm i --save-dev @types/jquery
@Injectable({
  providedIn: 'root',
})
export class FormUtilityService {
  constructor(@Inject(DOCUMENT) private document: Document) {}
  addError(formgroup: FormGroup, field: string, error: string) {
    if (!formgroup || !formgroup.controls[field]) {
      return;
    }
    formgroup.controls[field].setErrors({ [error]: true });
  }

  removeError(formgroup: FormGroup, field: string, error: string) {
    if (!formgroup || !formgroup.controls[field]) {
      return;
    }

    const currentErrors = formgroup.controls[field].errors;
    if (currentErrors) {
      delete currentErrors[error]; // Replace 'specificError' with your specific error key
      formgroup.controls[field].setErrors(
        Object.keys(currentErrors).length !== 0 ? currentErrors : null
      );
    }
  }

  setFocus(name: string) {
    if (this.document.getElementById(name)) {
      this.document.getElementById(name)?.focus();
    }
  }

  scrollToFirstInvalidControl(
    el: ElementRef,
    className = '.invalid',
    isModel = false
  ) {
    let firstInvalidControl = $(el.nativeElement).find(`form ${className}`);
    if (firstInvalidControl && firstInvalidControl.length === 0) {
      return;
    }
    setTimeout(() => {
      if (isModel) {
        firstInvalidControl[0].scrollIntoView();
        firstInvalidControl[0].focus(); //without smooth behavior
      } else {
        window.scroll({
          top:
            firstInvalidControl[0].getBoundingClientRect().top +
            window.scrollY -
            100,
          left: 0,
          behavior: 'smooth',
        });
        firstInvalidControl[0].focus();
      }
    }, 300);
  }
}
