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
activeTextIndex: number | null = null;

textColors: (string | null)[] = [
  null,
  null,
  null,
  null
];



separators = [
  '— ♥ —',
  '✧',
  '— ♥ —'
];

// tryb panelu (globalny)
activeSeparatorValue: string | null = null;

// tryb edycji pojedynczego
activeSeparatorIndex: number | null = null;


setActivePanel(panel: string) {
  this.activePanel = panel;

  if (panel === 'decorations') {
    this.activeSeparatorIndex = null; 
  }
}


selectText(index: number) {
  this.activeTextIndex = index;
  this.activeSeparatorIndex = null;
}




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
  // onColorChange(c: string) {
  //   this.poemColor = c;
  // }


onColorChange(c: string) {

  // ✏️ pojedynczy tekst
  if (this.activeTextIndex !== null) {
    this.textColors = this.textColors.map((col, i) =>
      i === this.activeTextIndex ? c : col
    );
    return;
  }

  // 🌍 GLOBAL
  this.poemColor = c;
  this.textColors = this.textColors.map(() => null); // reset override
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
    console.log(bg);
  }

selectSeparator(index: number) {
  this.activeSeparatorIndex = index;
}
clearSeparatorSelection() {
  this.activeSeparatorIndex = null;
}

  // get currentPanelInputs() {
  //   if (this.activePanel === 'colors') {
  //     return { onColorSelect: (c: string) => this.onColorChange(c) };
  //   }
  //   if (this.activePanel === 'background') {
  //     return { onBackgroundSelect: (bg: any) => this.onBackgroundChange(bg) };
  //   }
  //   if (this.activePanel === 'fonts') {
  //     return { onFontSelect: (f: any) => this.onFontChange(f) };
  //   }
  //   return {};
  // }

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

  if (this.activePanel === 'decorations') {
    return { onSeparatorSelect: (s: string) => this.onSeparatorChange(s) };
  }

  return {};
}


onSeparatorChange(symbol: string) {

  // ✏️ jeśli kliknięty konkretny → zmień tylko jeden
  if (this.activeSeparatorIndex !== null) {
    this.separators[this.activeSeparatorIndex] = symbol;
    return;
  }

  // 🎛️ jeśli nic nie kliknięte → zmień WSZYSTKIE
  this.separators = this.separators.map(() => symbol);
}





}
