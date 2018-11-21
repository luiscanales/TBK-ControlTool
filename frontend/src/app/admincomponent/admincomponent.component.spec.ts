import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmincomponentComponent } from './admincomponent.component';

describe('AdmincomponentComponent', () => {
  let component: AdmincomponentComponent;
  let fixture: ComponentFixture<AdmincomponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdmincomponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmincomponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
