import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { AbstractControl, ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validator } from '@angular/forms';
import { debounceTime, lastValueFrom, map, Observable } from 'rxjs';
import { User } from 'src/app/pages/ak-auto-complete/user.interface';
import { UserService } from 'src/app/pages/ak-auto-complete/user.service';

@Component({
  selector: 'app-single-autocomplete',
  templateUrl: './single-autocomplete.component.html',
  styleUrls: ['./single-autocomplete.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: SingleAutocompleteComponent,
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: SingleAutocompleteComponent,
      multi: true
    }
  ]
})
export class SingleAutocompleteComponent implements OnInit, ControlValueAccessor, Validator {

  constructor(private _customerContext: UserService) { }

  validate(control: AbstractControl): ValidationErrors | null {
    if (this._customers.length && this._customers.findIndex(c => c.name === this._custName) < 0) return { invalidCustomer: true };
    return null;
  }
  registerOnValidatorChange?(fn: () => void): void {

  }

  @Input('type') type: string = 'SELECT';
  customers$: Observable<User[]> = new Observable();
  disabled: boolean = false;
  private _customers: User[] = [];
  private _custName: any = '';
  private _onChange = (value: any | null) => undefined;
  private _onTouched = () => { };

  get custName() {
    return this._custName;
  }
  set custName(value: any) {
    this._custName = value;
    this._onChange(this._custName);
    this._onTouched();
  }

  writeValue(obj: any): void {
    if (obj) {
      this._custName = obj;
    }
  }
  registerOnChange(fn: any): void {
    this._onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this._onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  ngOnInit(): void {
    this._filterCustomer();
    this._getCustomers();
  }

  private async _getCustomers() {
    const customers = await lastValueFrom(this.customers$);
    this._customers = customers;
  }

  private _filterCustomer() {
    this.customers$ = this._customerContext.getAllUsers();
  }
}
