import { CommonModule } from '@angular/common';
import { Component, type Type } from '@angular/core';
import { ColorsPanel } from './panels/colors-panel/colors-panel';
import { BackgroundPanel } from './panels/background-panel/background-panel';
import { FontsPanel } from './panels/fonts-panel/fonts-panel';
import { DecorationsPanel } from './panels/decorations-panel/decorations-panel';
import { TextPanel } from './panels/text-panel/text-panel';
import { SeparatorPanel } from './panels/separator-panel/separator-panel';
import { FontPanel } from './panels/font-panel/font-panel';
import { DragDropModule } from '@angular/cdk/drag-drop';
@Component({
  selector: 'app-poem-editor',
  imports: [CommonModule, ColorsPanel, TextPanel, SeparatorPanel, FontPanel, BackgroundPanel, DragDropModule],
  templateUrl: './poem-editor.html',
  styleUrl: './poem-editor.scss',
})
export class PoemEditor {
    // 🔥 PANEL
  activePanel: string = 'colors';

  // 🎨 STYLE
  poemColor = '#3b2a20';
  poemFont = '"Playfair Display", serif';
  poemFontWeight: string | number = 'normal';
  poemFontStyle: string = 'normal';

  // 🧠 CONTENT (LEVEL 3 READY)
  blocks: any[] = [
    {
      id: 1,
      type: 'text',
      value: 'Gdy zamknę oczy, widzę tylko Ciebie...',
      x: 50,
      y: 50
    }
  ];

  // 🟡 TABS
  editorTabs = [
    { id: 'text', label: 'Tekst', icon: 'T' },
    { id: 'fonts', label: 'Czcionka', icon: 'Aa' },
    { id: 'colors', label: 'Kolory', icon: '🎨' },
    { id: 'background', label: 'Tło', icon: '🖼' },
    { id: 'decorations', label: 'Dekoracje', icon: '❀' },
  ];

  // 🧩 MAPA PANELI
  panelMap: Record<string, Type<any>> = {
    colors: ColorsPanel,
    background: BackgroundPanel,
    fonts: FontPanel,
    decorations: SeparatorPanel,
  };

  // 🎨 COLOR
  onColorChange(color: string) {
    this.poemColor = color;
  }

  // 🔤 FONT
  onFontChange(font: any) {
    this.poemFont = font.fontFamily;
    this.poemFontWeight = font.fontWeight || 'normal';
    this.poemFontStyle = font.fontStyle || 'normal';
  }

  // ✨ SEPARATOR (LEVEL 3)
  onSeparatorChange(symbol: string) {
    this.blocks.push({
      id: Date.now(),
      type: 'separator',
      value: symbol,
      x: 100,
      y: 100
    });
  }

  // 🔗 INPUTY DO PANELI
  get currentPanelInputs() {
    if (this.activePanel === 'colors') {
      return {
        onColorSelect: (color: string) => this.onColorChange(color)
      };
    }

    if (this.activePanel === 'fonts') {
      return {
        onFontSelect: (font: any) => this.onFontChange(font)
      };
    }

    if (this.activePanel === 'decorations') {
      return {
        onSeparatorSelect: (sep: string) => this.onSeparatorChange(sep)
      };
    }

    return {};
  }

  // 📦 AKTYWNY PANEL
  get currentPanel() {
    return this.panelMap[this.activePanel];
  }
  
}
