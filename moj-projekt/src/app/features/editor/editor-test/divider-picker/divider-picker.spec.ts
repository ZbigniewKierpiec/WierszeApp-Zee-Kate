import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DividerPicker } from './divider-picker';

describe('DividerPicker', () => {
  let component: DividerPicker;
  let fixture: ComponentFixture<DividerPicker>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DividerPicker],
    }).compileComponents();

    fixture = TestBed.createComponent(DividerPicker);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
