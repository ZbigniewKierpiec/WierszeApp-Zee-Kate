import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorTest } from './editor-test';

describe('EditorTest', () => {
  let component: EditorTest;
  let fixture: ComponentFixture<EditorTest>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditorTest],
    }).compileComponents();

    fixture = TestBed.createComponent(EditorTest);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
