import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiDialog } from './ui-dialog';

describe('UiDialog', () => {
  let component: UiDialog;
  let fixture: ComponentFixture<UiDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiDialog],
    }).compileComponents();

    fixture = TestBed.createComponent(UiDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
