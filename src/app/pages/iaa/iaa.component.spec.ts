import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IaaComponent } from './iaa.component';

describe('IaaComponent', () => {
  let component: IaaComponent;
  let fixture: ComponentFixture<IaaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IaaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IaaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
