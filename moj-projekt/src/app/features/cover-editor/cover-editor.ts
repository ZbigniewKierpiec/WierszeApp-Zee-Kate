import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cover-editor',
  imports: [CommonModule, FormsModule],
  templateUrl: './cover-editor.html',
  styleUrl: './cover-editor.scss',
})
export class CoverEditor {
  @Input() cover: any;

  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<any>();

  emitSave() {
    this.save.emit({ ...this.cover }); // 🔥 KLUCZ
  }

  onImageUpload(event: any) {
    const file = event.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Wybierz obraz!');
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      this.cover.image = reader.result as string;
      this.emitSave();
    };

    reader.readAsDataURL(file);
  }

  closeEditor() {
    this.emitSave();
    this.close.emit();
  }
}
