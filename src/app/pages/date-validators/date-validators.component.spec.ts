import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DateValidatorsComponent } from './date-validators.component';

describe('DateValidatorsComponent', () => {
  let component: DateValidatorsComponent;
  let fixture: ComponentFixture<DateValidatorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DateValidatorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DateValidatorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
