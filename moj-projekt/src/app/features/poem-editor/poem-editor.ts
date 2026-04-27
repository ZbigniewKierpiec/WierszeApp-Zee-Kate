import { CommonModule } from '@angular/common';
import { Component, type Type } from '@angular/core';
import { ColorsPanel } from './panels/colors-panel/colors-panel';
import { BackgroundPanel } from './panels/background-panel/background-panel';
import { FontsPanel } from './panels/fonts-panel/fonts-panel';
import { DecorationsPanel } from './panels/decorations-panel/decorations-panel';
import { TextPanel } from "./panels/text-panel/text-panel";
import { SeparatorPanel } from "./panels/separator-panel/separator-panel";
import { FontPanel } from './panels/font-panel/font-panel';

@Component({
  selector: 'app-poem-editor',
  imports: [CommonModule, ColorsPanel, TextPanel, SeparatorPanel,FontPanel],
  templateUrl: './poem-editor.html',
  styleUrl: './poem-editor.scss',
})
export class PoemEditor {
  activePanel: string = 'colors';
  poemColor = '#3b2a20';

  onColorChange(color: string) {
    this.poemColor = color;
  }

  editorTabs = [
    { id: 'text', label: 'Tekst', icon: 'T' },
    { id: 'fonts', label: 'Czcionka', icon: 'Aa' },
    { id: 'colors', label: 'Kolory', icon: '🎨' },
    { id: 'background', label: 'Tło', icon: '🖼' },
    { id: 'decorations', label: 'Dekoracje', icon: '❀' },
    { id: 'settings', label: 'Ustawienia', icon: '⚙' },
  ];
 

 // Poprawione mapowanie identyfikatorów zakładek na odpowiednie komponenty
  panelMap: Record<string, Type<any>> = {
   
    colors: ColorsPanel,
    background: BackgroundPanel,
    fonts: FontPanel,
    decorations: SeparatorPanel,
    separators: SeparatorPanel,
   
  };

  // Pobieramy aktualnie wybrany komponent
  get currentPanel() {
    return this.panelMap[this.activePanel];
  }













}
