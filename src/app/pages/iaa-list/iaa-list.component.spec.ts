import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IaaListComponent } from './iaa-list.component';

describe('IaaListComponent', () => {
  let component: IaaListComponent;
  let fixture: ComponentFixture<IaaListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IaaListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IaaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
