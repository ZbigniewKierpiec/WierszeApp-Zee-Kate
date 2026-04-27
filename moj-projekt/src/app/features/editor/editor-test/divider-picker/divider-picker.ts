import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-divider-picker',
  imports: [CommonModule,],
  templateUrl: './divider-picker.html',
  styleUrl: './divider-picker.scss',
})
export class DividerPicker {
  @Output() select = new EventEmitter<any>();

  dividers = [
    { type: 'romantic', symbol: '❀ ❀ ❀' },
    { type: 'dark', symbol: '✦ ✦ ✦' },
    { type: 'floral', symbol: '🌸 🌸 🌸' },
    { type: 'classic', symbol: '— — —' },
    { type: 'minimal', symbol: '• • •' },
  ];

  choose(d: any) {
    this.select.emit(d);
  }
}
