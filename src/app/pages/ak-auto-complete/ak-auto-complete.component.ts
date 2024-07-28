import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, filter, Observable, of, startWith } from 'rxjs';
import { User } from './user.interface';
import { MatAutocomplete, MatAutocompleteSelectedEvent, MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { UserService } from './user.service';

@Component({
  selector: 'app-ak-auto-complete',
  templateUrl: './ak-auto-complete.component.html',
  styleUrls: ['./ak-auto-complete.component.scss']
})
export class AkAutoCompleteComponent implements OnInit {

  user = new FormControl('');
  customers$!: Observable<User[]>; 
  selectedCustomers: User[] = [];
  @Input() maxAllowedTags = 0;
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
    })
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
    }else {
      this.removeCustomer(customer);
    }

    this.user.setValue(null);
    this.userInput.nativeElement.value = '';
  }

  removeCustomer(customer: User) {
    this.selectedCustomers = this.selectedCustomers.filter(c => c.id !== customer.id);
    this._keepPanelOpen();
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
    })
    this.customers$ = of(newList);
  }

  ngOnInit(): void {
    this.user.valueChanges
    .pipe(
      filter(value => typeof value === 'string'),
      // startWith(''),
      debounceTime(1000)
    )
    .subscribe((value) => {
      this._filterCustomer(value);
    })
  }

}
