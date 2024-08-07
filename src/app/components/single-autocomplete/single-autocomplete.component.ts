import { Component, ElementRef, forwardRef, Input, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, ControlValueAccessor, FormControl, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validator } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatSelectChange } from '@angular/material/select';
import { debounceTime, filter, lastValueFrom, map, Observable, startWith, tap } from 'rxjs';
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
    const value = this.user.value;
    let matchValue = value?.name || undefined;
    if (this._customers.length && this._customers.findIndex(c => c.name === matchValue) < 0) return { invalidCustomer: true };
    return null;
  }

  registerOnValidatorChange?(fn: () => void): void {

  }

  @Input('type') type: string = 'SELECT';
  user = new FormControl('');
  customers$: Observable<User[]> = new Observable();
  filterCustomers$: Observable<User[]> = new Observable();
  private _customers: User[] = [];
  public _onChange = (value: any | null) => undefined;
  public _onTouched = () => { };

  writeValue(obj: any): void {
    if (obj) {
      this.user.setValue(obj, { emitEvent: false });
    }
  }

  registerOnChange(fn: any): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this._onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    if (isDisabled) {
      this.user.disable();
    } else {
      this.user.enable();
    }
  }

  async ngOnInit(): Promise<void> {
    this._filterCustomer();
    await this._getCustomers();
    if(this.type === 'AUTO_COMPLETE') {
      this.setUpSearch();
    }
  }

  setUpSearch() {
    this.filterCustomers$ = this.user.valueChanges
      .pipe(
        startWith(''),
        filter((value): value is string  => typeof value === 'string'),
        map(value => value ? this._filter(value) : this._customers.slice())
      );
  }

  changeInput() {
    const value = this.user.value;
    this._onChange(value);
  }

  onOptionSelected(event: MatAutocompleteSelectedEvent) {
    const record = event.option.value;
    // this.user.setValue(record.name);
    this._onChange(record);
  }

  displayRecordName(record: any) {
    return record && record.name ? record.name as unknown as string : '';
  }

  private _filter(value: string): User[] {
    const filterValue = value.toLowerCase();
    return this._customers.filter(option => option.name.toLowerCase().includes(filterValue));
  }

  private async _getCustomers() {
    const customers = await lastValueFrom(this.customers$);
    this._customers = customers;
  }

  private _filterCustomer() {
    this.customers$ = this._customerContext.getAllUsers();
  }

  onValueChanged(event: MatSelectChange) {
    this._onChange(event.value);
  }
}
