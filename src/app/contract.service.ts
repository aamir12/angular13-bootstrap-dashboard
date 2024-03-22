import { Injectable } from '@angular/core';
import { BehaviorSubject, timer } from 'rxjs';

@Injectable()
export class ContractService {
  private isSubmitted = new BehaviorSubject<boolean>(false);
  isSubmitted$ = this.isSubmitted.asObservable();

  setFormSubmitted(value: boolean) {
    this.isSubmitted.next(value);
  }
}
