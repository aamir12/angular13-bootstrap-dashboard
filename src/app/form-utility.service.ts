import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class FormUtilityService {
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
}
