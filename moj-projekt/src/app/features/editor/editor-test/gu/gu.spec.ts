import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Gu } from './gu';

describe('Gu', () => {
  let component: Gu;
  let fixture: ComponentFixture<Gu>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Gu],
    }).compileComponents();

    fixture = TestBed.createComponent(Gu);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
