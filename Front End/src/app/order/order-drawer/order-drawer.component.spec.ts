import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { OrderDrawerComponent } from './order-drawer.component';

describe('OrderDrawerComponent', () => {
  let component: OrderDrawerComponent;
  let fixture: ComponentFixture<OrderDrawerComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderDrawerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderDrawerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
