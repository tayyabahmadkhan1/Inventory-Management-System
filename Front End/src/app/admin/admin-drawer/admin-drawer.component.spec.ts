import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminDrawerComponent } from './admin-drawer.component';

describe('AdminDrawerComponent', () => {
  let component: AdminDrawerComponent;
  let fixture: ComponentFixture<AdminDrawerComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminDrawerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminDrawerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
