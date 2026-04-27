import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoemEditor } from './poem-editor';

describe('PoemEditor', () => {
  let component: PoemEditor;
  let fixture: ComponentFixture<PoemEditor>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PoemEditor],
    }).compileComponents();

    fixture = TestBed.createComponent(PoemEditor);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
