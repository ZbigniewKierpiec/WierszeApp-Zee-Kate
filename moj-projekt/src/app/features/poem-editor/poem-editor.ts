import { CommonModule } from '@angular/common';
import { Component, type Type, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import interact from 'interactjs';

import { ColorsPanel } from './panels/colors-panel/colors-panel';
import { BackgroundPanel } from './panels/background-panel/background-panel';
import { TextPanel } from './panels/text-panel/text-panel';
import { SeparatorPanel } from './panels/separator-panel/separator-panel';
import { FontPanel } from './panels/font-panel/font-panel';

@Component({
  selector: 'app-poem-editor',
  standalone: true,
  imports: [CommonModule, ColorsPanel, TextPanel, SeparatorPanel, FontPanel, BackgroundPanel],
  templateUrl: './poem-editor.html',
  styleUrl: './poem-editor.scss',
})
export class PoemEditor {
  activePanel = 'colors';
  backgroundStyle = '';

  poemColor = '#3b2a20';
  poemFont = '"Playfair Display", serif';
  poemFontWeight: string | number = 'normal';
  poemFontStyle = 'normal';

  constructor(private cdr: ChangeDetectorRef) {}
  readonly TOLERANCE = 1.5;

  editorTabs = [
    { id: 'text', label: 'Tekst', icon: 'T' },
    { id: 'fonts', label: 'Czcionka', icon: 'Aa' },
    { id: 'colors', label: 'Kolory', icon: '🎨' },
    { id: 'background', label: 'Tło', icon: '🖼' },
    { id: 'decorations', label: 'Dekoracje', icon: '❀' },
  ];

  panelMap: Record<string, Type<any>> = {
    colors: ColorsPanel,
    background: BackgroundPanel,
    fonts: FontPanel,
    decorations: SeparatorPanel,
  };

  // 🎨 PANEL LOGIC
  onColorChange(c: string) {
    this.poemColor = c;
  }
  onFontChange(f: any) {
    this.poemFont = f.fontFamily;
    this.poemFontWeight = f.fontWeight || 'normal';
    this.poemFontStyle = f.fontStyle || 'normal';
  }
  // onBackgroundChange(bg: any) {
  //   this.backgroundStyle = bg.overlay ? `url(${bg.overlay}), url(${bg.base})` : `url(${bg.base})`;
  // }
onBackgroundChange(bg: string) {
  this.backgroundStyle = bg;
  console.log(bg)
}
  get currentPanelInputs() {
    if (this.activePanel === 'colors') {
      return { onColorSelect: (c: string) => this.onColorChange(c) };
    }
    if (this.activePanel === 'background') {
      return { onBackgroundSelect: (bg: any) => this.onBackgroundChange(bg) };
    }
    if (this.activePanel === 'fonts') {
      return { onFontSelect: (f: any) => this.onFontChange(f) };
    }
    return {};
  }
}
