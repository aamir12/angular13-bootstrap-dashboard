import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { EventTestingComponent } from './event-testing.component';
import { EventChildComponent } from './event-child/event-child.component';
import { hasContent, queryDebugElement } from 'src/app/utility/testing-helper';

describe('EventTestingComponent', () => {
  let fixture: ComponentFixture<EventTestingComponent>;
  let de: DebugElement;

  beforeEach(async () => {
   await TestBed.configureTestingModule({
      imports: [ ReactiveFormsModule ],
      declarations: [
        EventTestingComponent,
        EventChildComponent,
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventTestingComponent);
    de = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should click once', () => {
    queryDebugElement(de, 'button').nativeElement.click();
    fixture.detectChanges();
    hasContent(queryDebugElement(de, '.mst-click-count'), '1');
  });

  it('should focus once', () => {
    queryDebugElement(de, 'input').triggerEventHandler('focus', null);
    fixture.detectChanges();
    hasContent(queryDebugElement(de, '.mst-focus-count'), '1');
  });

  it('should has input value', () => {
    const inputEl = queryDebugElement(de, 'input');
    const value = 'trigger input event';
    inputEl.nativeElement.value = value
    inputEl.triggerEventHandler('input', { target: inputEl.nativeElement });
    fixture.detectChanges();
    hasContent(queryDebugElement(de, '.mst-input-value'), value);
  });

  it('should handle child event', () => {
    const childEl: EventChildComponent = de.query(By.directive(EventChildComponent)).componentInstance;
    childEl.newNumber.emit(3)
    fixture.detectChanges();
    hasContent(queryDebugElement(de, '.mst-child-count'), '3');
  });
});