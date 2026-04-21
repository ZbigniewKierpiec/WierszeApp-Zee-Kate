import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EditorEventsService {
  save$ = new Subject<void>();
  clear$ = new Subject<void>();
  export$ = new Subject<void>();
  newBook$ = new Subject<void>();
  coverEdit$ = new Subject<void>();
}
