import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderCComponent } from './order-c.component';

describe('OrderCComponent', () => {
  let component: OrderCComponent;
  let fixture: ComponentFixture<OrderCComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderCComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
