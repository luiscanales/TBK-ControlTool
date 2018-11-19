import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessfullyComponent } from './successfully.component';

describe('SuccessfullyComponent', () => {
  let component: SuccessfullyComponent;
  let fixture: ComponentFixture<SuccessfullyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuccessfullyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuccessfullyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
