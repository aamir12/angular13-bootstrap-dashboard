import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RbasePeriodsComponent } from './rbase-periods.component';

describe('RbasePeriodsComponent', () => {
  let component: RbasePeriodsComponent;
  let fixture: ComponentFixture<RbasePeriodsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RbasePeriodsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RbasePeriodsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
