import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProtectedButton } from './protected-button';

describe('ProtectedButton', () => {
  let component: ProtectedButton;
  let fixture: ComponentFixture<ProtectedButton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProtectedButton],
    }).compileComponents();

    fixture = TestBed.createComponent(ProtectedButton);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
