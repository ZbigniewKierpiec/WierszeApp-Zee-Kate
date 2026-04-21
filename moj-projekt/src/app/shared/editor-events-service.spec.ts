import { TestBed } from '@angular/core/testing';

import { EditorEventsService } from './editor-events-service';

describe('EditorEventsService', () => {
  let service: EditorEventsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditorEventsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
