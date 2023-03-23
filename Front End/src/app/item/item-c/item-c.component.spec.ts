import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemCComponent } from './item-c.component';

describe('ItemCComponent', () => {
  let component: ItemCComponent;
  let fixture: ComponentFixture<ItemCComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemCComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
