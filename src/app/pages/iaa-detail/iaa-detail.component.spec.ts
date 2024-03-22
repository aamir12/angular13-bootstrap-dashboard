import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IaaDetailComponent } from './iaa-detail.component';

describe('IaaDetailComponent', () => {
  let component: IaaDetailComponent;
  let fixture: ComponentFixture<IaaDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IaaDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IaaDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
