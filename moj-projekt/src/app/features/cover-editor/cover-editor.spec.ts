import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoverEditor } from './cover-editor';

describe('CoverEditor', () => {
  let component: CoverEditor;
  let fixture: ComponentFixture<CoverEditor>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoverEditor],
    }).compileComponents();

    fixture = TestBed.createComponent(CoverEditor);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
