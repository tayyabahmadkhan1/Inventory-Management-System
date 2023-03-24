import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryCComponent } from './inventory-c.component';

describe('InventoryCComponent', () => {
  let component: InventoryCComponent;
  let fixture: ComponentFixture<InventoryCComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InventoryCComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InventoryCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
