import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RmodificationsComponent } from './rmodifications.component';

describe('RmodificationsComponent', () => {
  let component: RmodificationsComponent;
  let fixture: ComponentFixture<RmodificationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RmodificationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RmodificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
