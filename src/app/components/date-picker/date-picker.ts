import {
  Component,
  OnInit,
  forwardRef,
  Input,
  ViewChild,
  Output,
  EventEmitter,
  ElementRef,
  AfterViewInit,
  OnChanges,
  SimpleChanges,
  ChangeDetectorRef,
  HostListener,
} from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  NG_VALIDATORS,
  Validator,
  AbstractControl,
  ValidationErrors,
  FormControl,
  NgModel,
} from '@angular/forms';
import { NgbDate, NgbDatepicker } from '@ng-bootstrap/ng-bootstrap';

const noop = () => {};

@Component({
  selector: 'app-datepicker',
  templateUrl: './date-picker.html',
  styleUrls: ['./date-picker.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DatePickerComponent),
      multi: true,
    },
    // {
    //   provide: NG_VALIDATORS,
    //   useExisting: forwardRef(() => DatePickerComponent),
    //   multi: true,
    // },
  ],
})
export class DatePickerComponent
  implements ControlValueAccessor, AfterViewInit
{
  //Validator

  //The internal data model
  private innerValue: any = '';
  public disable = false;
  inputDate = '';
  @Input() name!: string;
  @Input() required: boolean = false;
  @Input() readOnly: boolean = false;
  @Input() isInvalid: boolean  = false;
  @Output() changeEvent = new EventEmitter<string>();
  @Output() blurEvent = new EventEmitter<string>();
  @ViewChild('htmlInput') htmlInput!: ElementRef;
  //Placeholders for the callbacks which are later provided
  //by the Control Value Accessor
  public onTouchedCallback: () => void = noop;
  public onChangeCallback: (_: any) => void = noop;
  public onValidatorChange = () => {};
  inputElement!: HTMLInputElement;
  isFocused = false;
  constructor(private _elementRef: ElementRef) {}

  ngAfterViewInit(): void {
    this.inputElement = this.htmlInput.nativeElement;
  }
  //get accessor
  get value(): any {
    return this.innerValue;
  }

  //set accessor including call the onchange callback
  set value(v: any) {
    if (v !== this.innerValue) {
      this.innerValue = v;
      this.onChangeCallback(v);
      this.onTouchedCallback();
    }
  }

  //Set touched on blur
  onBlur() {
    if (this.disable || this.readOnly) {
      return;
    }

    if (!this.isValidDate(this.inputDate)) {
      this.value = '';
      this.inputDate = '';
    }

    this.onTouchedCallback();
    this.blurEvent.emit(this.value);
  }

  //From ControlValueAccessor interface
  writeValue(value: any) {
    if (value !== this.innerValue) {
      this.innerValue = value;
    }
  }

  //From ControlValueAccessor interface
  registerOnChange(fn: any) {
    this.onChangeCallback = fn;
  }

  //From ControlValueAccessor interface
  registerOnTouched(fn: any) {
    this.onTouchedCallback = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    if (isDisabled) {
      this.disable = true;
    } else {
      this.disable = false;
    }
  }

  registerOnValidatorChange(onValidatorChange: () => void) {
    this.onValidatorChange = onValidatorChange;
  }
  isValidDate(dateStr: string): boolean {
    if (!dateStr) {
      return false;
    }

    // Split the date string by '-'
    const dateFormatCheck = dateStr.split('-');

    // Check if the date string has three parts (month, day, year)
    if (dateFormatCheck.length !== 3) {
      return false;
    }

    // Extract month, day, and year
    const [month, day, year] = dateFormatCheck.map(Number);

    // Check if year is a valid 4-digit number
    if (isNaN(year) || year.toString().length !== 4) {
      return false;
    }

    // Check if month is between 1 and 12
    if (month < 1 || month > 12) {
      return false;
    }

    // Check if day is valid for the given month
    if (day < 1 || day > 31) {
      return false;
    }

    // Check for February in non-leap years
    if (month === 2 && day > 28) {
      // Check if it's a leap year
      if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
        // Leap year
        if (day > 29) {
          return false;
        }
      } else {
        // Non-leap year
        return false;
      }
    }

    // Check for months with 30 days
    if (
      (month === 4 || month === 6 || month === 9 || month === 11) &&
      day > 30
    ) {
      return false;
    }

    // Create a timestamp and check if it's valid
    const timestamp = new Date(dateStr).getTime();
    return !isNaN(timestamp);
  }

  // validate(c: AbstractControl): ValidationErrors | null {
  //   if (this.required && !this.value) {
  //     return {
  //       invalid: true,
  //     };
  //   }

  //   return null;
  // }

  dateChange(event: NgbDate) {
    this.inputDate = `${event.month < 10 ? '0' + event.month : event.month}-${
      event.day < 10 ? '0' + event.day : event.day
    }-${event.year}`;
    this.onChangeCallback(this.value);
    this.onTouchedCallback();
    this.onValidatorChange();
    this.changeEvent.emit(this.value);
  }

  onKeyUp(event: KeyboardEvent) {
    const [month, day, year] = this.inputDate.split('-');
    const hasDashChar = this.inputDate.includes('-');

    if (
      (hasDashChar &&
        month &&
        !month.startsWith('0') &&
        parseInt(month) >= 1 &&
        parseInt(month) <= 9) ||
      (!hasDashChar &&
        month &&
        !month.startsWith('0') &&
        parseInt(month) > 1 &&
        parseInt(month) <= 9)
    ) {
      this.inputDate = `0${this.inputDate}`;
      this.inputElement.setSelectionRange(3, 3);
    }

    if (
      hasDashChar &&
      day &&
      !day.startsWith('0') &&
      ((parseInt(day) >= 1 &&
        parseInt(day) <= 9 &&
        this.inputDate.length > 4) ||
        (parseInt(day) > 3 && this.inputDate.length === 4))
    ) {
      this.inputDate = `${this.inputDate.slice(0, 3)}0${this.inputDate.slice(
        3
      )}`;
      this.inputElement.setSelectionRange(5, 5);
    }

    if (!this.isValidDate(this.inputDate)) {
      this.value = '';
      return;
    }

    this.value = this.inputDate;
    this.onChangeCallback(this.value);
    this.onTouchedCallback();
    this.onValidatorChange();
    this.changeEvent.emit(this.value);
  }

 

  @HostListener('document:click', ['$event', '$event.target'])
  public onClick(event: MouseEvent, targetElement: HTMLElement): void {
    if (!targetElement) {
      return;
    }

    const clickedInside =
      this._elementRef.nativeElement.contains(targetElement);
    if (!clickedInside && this.isFocused) {
      this.onBlur();
    }
  }
}
