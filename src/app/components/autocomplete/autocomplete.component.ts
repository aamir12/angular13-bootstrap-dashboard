import { Component, ElementRef, forwardRef, Input, OnInit, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS, Validator, AbstractControl, ValidationErrors, FormControl } from '@angular/forms';
import { debounceTime, filter, Observable, of } from 'rxjs';

import { MatAutocomplete, MatAutocompleteSelectedEvent, MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { User } from 'src/app/pages/ak-auto-complete/user.interface';
import { UserService } from 'src/app/pages/ak-auto-complete/user.service';

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AutocompleteComponent),
      multi: true
    }
  ]
})
export class AutocompleteComponent implements OnInit, ControlValueAccessor {
  user = new FormControl('');
  customers$!: Observable<User[]>; 
  selectedCustomers: User[] = [];
  @Input() maxAllowedTags = 0;
  // @Input() dataCallback: (value: string) => Observable<T[]> = (value: string) => of([]);
  // @Input() key!: keyof T;
  // @Input() displayKey!: keyof T;

  @ViewChild(MatAutocompleteTrigger) customTrigger!: MatAutocompleteTrigger;
  @ViewChild(MatAutocomplete) autoCompleteRef!: MatAutocomplete;
  @ViewChild('userInput') userInput!: ElementRef<HTMLInputElement>;

  constructor(private userService: UserService) { 
    this.customers$ = new Observable();
  }

  displayCustomerName(customer: User) {
    return customer && customer.name ? customer.name : '';
  }

  private _keepPanelOpen() {
    requestAnimationFrame(() => {
      this.customTrigger.openPanel();
    });
  }

  private _filterCustomer(value: string) {
    this.customers$ = this.userService.getUsers(value);
  }

  onOptionSelected(event: MatAutocompleteSelectedEvent) {
    if(this.maxAllowedTags > 0 && this.selectedCustomers.length >= this.maxAllowedTags ) {
      return;
    }
    this._keepPanelOpen();
    const customer = event.option.value as User;
    if(this.selectedCustomers.findIndex(c => c.id === customer.id) < 0) {
      this.selectedCustomers.push(customer);
    } else {
      this.removeCustomer(customer);
    }

    this.user.setValue(null);
    this.userInput.nativeElement.value = '';
    this.onChange(this.selectedCustomers);
    this.onTouched();
  }

  removeCustomer(customer: User) {
    this.selectedCustomers = this.selectedCustomers.filter(c => c.id !== customer.id);
    this._closePanel();
    this.onChange(this.selectedCustomers);
    this.onTouched();
  }

  _closePanel() {
    requestAnimationFrame(() => {
      this.customTrigger.closePanel();
    });
  }

  checkedSelectedCustomer(customer: User) {
    return this.selectedCustomers.findIndex(c => c.id === customer.id) > -1;
  }
  
  reorderOptions() {
    let newList: User[] = [...this.selectedCustomers];
    this.autoCompleteRef.options.map(c => c.value).forEach(c => {
      if(this.selectedCustomers.findIndex(x => x.id === c.id) < 0) {
        newList.push(c);
      }
    });
    this.customers$ = of(newList);
  }

  ngOnInit(): void {
    this.user.valueChanges
      .pipe(
        filter(value => typeof value === 'string'),
        debounceTime(1000)
      )
      .subscribe((value) => {
        this._filterCustomer(value);
      });
  }

  // ControlValueAccessor methods
  writeValue(value: User[]): void {
    if (value) {
      this.selectedCustomers = value;
    }
  }

  onChange: any = () => {};
  onTouched: any = () => {};

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    if (isDisabled) {
      this.user.disable();
    } else {
      this.user.enable();
    }
  }

 
}


