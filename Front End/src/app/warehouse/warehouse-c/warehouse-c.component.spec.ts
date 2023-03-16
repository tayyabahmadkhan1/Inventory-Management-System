import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WarehouseCComponent } from './warehouse-c.component';

describe('WarehouseCComponent', () => {
  let component: WarehouseCComponent;
  let fixture: ComponentFixture<WarehouseCComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WarehouseCComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WarehouseCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
