import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FontPanel } from './font-panel';

describe('FontPanel', () => {
  let component: FontPanel;
  let fixture: ComponentFixture<FontPanel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FontPanel],
    }).compileComponents();

    fixture = TestBed.createComponent(FontPanel);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
