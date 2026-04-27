import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorsPanel } from './colors-panel';

describe('ColorsPanel', () => {
  let component: ColorsPanel;
  let fixture: ComponentFixture<ColorsPanel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ColorsPanel],
    }).compileComponents();

    fixture = TestBed.createComponent(ColorsPanel);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
