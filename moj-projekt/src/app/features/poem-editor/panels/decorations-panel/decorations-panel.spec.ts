import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DecorationsPanel } from './decorations-panel';

describe('DecorationsPanel', () => {
  let component: DecorationsPanel;
  let fixture: ComponentFixture<DecorationsPanel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DecorationsPanel],
    }).compileComponents();

    fixture = TestBed.createComponent(DecorationsPanel);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
