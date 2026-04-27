import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackgroundPanel } from './background-panel';

describe('BackgroundPanel', () => {
  let component: BackgroundPanel;
  let fixture: ComponentFixture<BackgroundPanel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BackgroundPanel],
    }).compileComponents();

    fixture = TestBed.createComponent(BackgroundPanel);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
