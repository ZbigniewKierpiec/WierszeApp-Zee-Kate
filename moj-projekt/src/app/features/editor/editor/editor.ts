import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
@Component({
  selector: 'app-editor',
  imports: [FormsModule,CommonModule,RouterLink],
  templateUrl: './editor.html',
  styleUrl: './editor.scss',
})
export class Editor implements OnInit {
  title = '';
text = '';
 active: 'title' | 'text' | null = null;
titleFont = 'Playfair Display';
textFont = 'Playfair Display';

titleFontSize = 28;
textFontSize = 18;

titleColor = '#000000';
textColor = '#000000';

titleAlign: 'left' | 'center' | 'right' = 'center';
textAlign: 'left' | 'center' | 'right' = 'left';

background = '#ffffff';

savedMessage = false;

constructor(private cd: ChangeDetectorRef) {}






ngOnInit() {
  const saved = localStorage.getItem('poem');

  if (saved) {
    try {
      const t = JSON.parse(saved);

      this.title = t.title || '';
      this.text = t.text || '';

      this.titleFont = t.titleFont || this.titleFont;
      this.textFont = t.textFont || this.textFont;

      this.titleFontSize = t.titleFontSize || this.titleFontSize;
      this.textFontSize = t.textFontSize || this.textFontSize;

      this.titleColor = t.titleColor || this.titleColor;
      this.textColor = t.textColor || this.textColor;

      this.titleAlign = t.titleAlign || this.titleAlign;
      this.textAlign = t.textAlign || this.textAlign;

      this.background = t.background || '#ffffff';
    } catch {
      console.error('Błąd parsowania');
    }
  }
}








getTextStyles() {
  return {
    'font-family': this.textFont,
    'font-size.px': this.textFontSize,
    'color': this.textColor,
    'text-align': this.textAlign,
    'background': this.background
  };
}


getTitleStyles() {
  return {
    'font-family': this.titleFont,
    'font-size.px': this.titleFontSize,
    'color': this.titleColor,
    'text-align': this.titleAlign,
    'font-weight': '600'
  };
}


save() {
  this.savedMessage=true;
  const template = {
    title: this.title,
    text: this.text,

    titleFont: this.titleFont,
    textFont: this.textFont,

    titleFontSize: this.titleFontSize,
    textFontSize: this.textFontSize,

    titleColor: this.titleColor,
    textColor: this.textColor,

    titleAlign: this.titleAlign,
    textAlign: this.textAlign,

    background: this.background
  };

  localStorage.setItem('poem', JSON.stringify(template));

  this.savedMessage = true;

  setTimeout(() => {
    this.savedMessage = false;
    this.cd.detectChanges();
  }, 2000);
}




clear() {
  if (!this.active) {
    alert('Najpierw wybierz co chcesz usunąć');
    return;
  }

  const confirmClear = confirm('Na pewno chcesz usunąć?');
  if (!confirmClear) return;

  if (this.active === 'title') {
    this.title = '';
  } else {
    this.text = '';
  }
}








clearActive() {
  this.active = null;
}



updateFont(value: string) {
  this.active === 'title'
    ? (this.titleFont = value)
    : (this.textFont = value);
}

updateFontSize(value: number) {
  this.active === 'title'
    ? (this.titleFontSize = value)
    : (this.textFontSize = value);
}

updateColor(value: string) {
  this.active === 'title'
    ? (this.titleColor = value)
    : (this.textColor = value);
}

updateAlign(value: 'left' | 'center' | 'right') {
  this.active === 'title'
    ? (this.titleAlign = value)
    : (this.textAlign = value);
}





}
