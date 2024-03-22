import { Directive, Input, SimpleChanges } from '@angular/core';
import { Validator, AbstractControl, NG_VALIDATORS } from '@angular/forms';
import { ValidatorBaseDirective } from './validator-base';

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
    if (
      c.value &&
      this.afterDate &&
      new Date(c.value) < new Date(this.afterDate)
    ) {
      return {
        afterDate: true,
      };
    }
    return null;
  }
}
