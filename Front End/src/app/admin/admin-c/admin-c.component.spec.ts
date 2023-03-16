import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCComponent } from './admin-c.component';

describe('AdminCComponent', () => {
  let component: AdminCComponent;
  let fixture: ComponentFixture<AdminCComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminCComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
