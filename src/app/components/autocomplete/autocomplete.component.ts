import { Component, ElementRef, forwardRef, Input, OnInit, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormControl } from '@angular/forms';
import { debounceTime, filter, Observable, of } from 'rxjs';

import { MatAutocomplete, MatAutocompleteSelectedEvent, MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { MatFormFieldAppearance } from '@angular/material/form-field';

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
export class AutocompleteComponent<T,K extends keyof T> implements OnInit, ControlValueAccessor {
  @Input() maxAllowedTags = 0; // max tags allowed
  @Input() getDataCB: (value: string) => Observable<T[]> = (value: string) => of([]); // callback to get data
  @Input() displayKey!:  K; // key that will display in the text box
  @Input() matchIdKey!:  K; // key that will use to match unique records: eg. id
  @Input() placeholder:  string = ''; // placeholder for the text box
  @Input() label:  string = ''; // label for the text box
  @Input() appearance:  MatFormFieldAppearance = 'outline'; // appearance for the text box
  @ViewChild(MatAutocompleteTrigger) customTrigger!: MatAutocompleteTrigger;
  @ViewChild(MatAutocomplete) autoCompleteRef!: MatAutocomplete;
  @ViewChild('userInput') userInput!: ElementRef<HTMLInputElement>;

  user = new FormControl('');
  records$!: Observable<T[]>; 
  selectedRecords: T[] = [];

  constructor() { 
    this.records$ = new Observable();
  }

  displayRecordName(record: T) {
    return record && record[this.displayKey] ? record[this.displayKey] as unknown as string : '';
  }

  private _keepPanelOpen() {
    requestAnimationFrame(() => {
      this.customTrigger.openPanel();
    });
  }

  private _filterRecords(value: string) {
    this.records$ = this.getDataCB(value);
  }

  onOptionSelected(event: MatAutocompleteSelectedEvent) {
    if(this.maxAllowedTags > 0 && this.selectedRecords.length >= this.maxAllowedTags ) {
      return;
    }
    this._keepPanelOpen();
    const record = event.option.value as T;
    if(this.selectedRecords.findIndex(c => c[this.matchIdKey] === record[this.matchIdKey]) < 0) {
      this.selectedRecords.push(record);
    } else {
      this.removeRecord(record);
    }

    this.user.setValue(null);
    this.userInput.nativeElement.value = '';
    this.onChange(this.selectedRecords);
    this.onTouched();
  }

  removeRecord(record: T) {
    this.selectedRecords = this.selectedRecords.filter(c => c[this.matchIdKey] !== record[this.matchIdKey]);
    this._closePanel();
    this.onChange(this.selectedRecords);
    this.onTouched();
  }

  _closePanel() {
    requestAnimationFrame(() => {
      this.customTrigger.closePanel();
    });
  }

  checkedSelectedRecord(record: T) {
    return this.selectedRecords.findIndex(c => c[this.matchIdKey] === record[this.matchIdKey]) > -1;
  }
  
  reorderOptions() {
    let newList: T[] = [...this.selectedRecords];
    this.autoCompleteRef.options.map(c => c.value).forEach(c => {
      if(this.selectedRecords.findIndex(x => x[this.matchIdKey] === c[this.matchIdKey]) < 0) {
        newList.push(c);
      }
    });
    this.records$ = of(newList);
  }

  ngOnInit(): void {
    this.user.valueChanges
      .pipe(
        filter(value => typeof value === 'string'),
        debounceTime(1000)
      )
      .subscribe((value) => {
        this._filterRecords(value);
      });
  }

  // ControlValueAccessor methods
  writeValue(value: T[]): void {
    if (value) {
      this.selectedRecords = value;
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


