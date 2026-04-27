import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FontsPanel } from './fonts-panel';

describe('FontsPanel', () => {
  let component: FontsPanel;
  let fixture: ComponentFixture<FontsPanel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FontsPanel],
    }).compileComponents();

    fixture = TestBed.createComponent(FontsPanel);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
