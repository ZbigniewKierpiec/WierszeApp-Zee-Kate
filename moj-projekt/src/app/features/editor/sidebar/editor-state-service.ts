import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EditorStateService {
  template$ = new BehaviorSubject<string | null>(null);
  variant$ = new BehaviorSubject<any>(null);
  preset$ = new BehaviorSubject<any>(null);
}
