import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeparatorPanel } from './separator-panel';

describe('SeparatorPanel', () => {
  let component: SeparatorPanel;
  let fixture: ComponentFixture<SeparatorPanel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeparatorPanel],
    }).compileComponents();

    fixture = TestBed.createComponent(SeparatorPanel);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
