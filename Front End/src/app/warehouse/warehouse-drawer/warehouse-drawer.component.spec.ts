import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { WarehouseDrawerComponent } from './warehouse-drawer.component';

describe('WarehouseDrawerComponent', () => {
  let component: WarehouseDrawerComponent;
  let fixture: ComponentFixture<WarehouseDrawerComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ WarehouseDrawerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WarehouseDrawerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
