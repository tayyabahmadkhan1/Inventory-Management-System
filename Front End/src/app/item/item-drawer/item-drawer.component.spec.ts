import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { ItemDrawerComponent } from './item-drawer.component';

describe('ItemDrawerComponent', () => {
  let component: ItemDrawerComponent;
  let fixture: ComponentFixture<ItemDrawerComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemDrawerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemDrawerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
