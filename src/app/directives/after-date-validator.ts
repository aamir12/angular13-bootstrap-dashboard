import { Directive, Input, SimpleChanges } from '@angular/core';
import { Validator, AbstractControl, NG_VALIDATORS, ValidatorFn, ValidationErrors } from '@angular/forms';
import { ValidatorBaseDirective } from './validator-base';

function validAfterDate(afterDate: string):ValidatorFn {
  return (c: AbstractControl): ValidationErrors | null => {
    if (
      c.value &&
      afterDate &&
      new Date(c.value) < new Date(afterDate)
    ) {
      return {
        afterDate: true,
      };
    }
    return null;
  };
}

@Directive({
  selector: '[afterDate]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: AfterDateDirective, multi: true },
  ],
})
export class AfterDateDirective
  extends ValidatorBaseDirective
  implements Validator
{
  @Input()
  afterDate!: string;

  constructor() {
    super('afterDate');
  }

  validate(c: AbstractControl): { [key: string]: any } | null {
    return validAfterDate(this.afterDate)(c);
  }
}
