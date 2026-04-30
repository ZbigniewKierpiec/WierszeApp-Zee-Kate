import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface StyleOption {
  id: number;
  name: string;
  preview: string;

  // podstawowe
  align: 'left' | 'center' | 'right' | 'justify';
  spacing: string;
  weight: string;
  lineHeight: number;

  // opcjonalne
  italic?: boolean;

  // 🔥 NOWE
  transform?: 'uppercase' | 'lowercase' | 'capitalize' | 'none';
  opacity?: number;
  shadow?: string;
}




interface StyleCategory {
  name: string;
  label: string;
  colors: StyleOption[]; // 🔥 NIE zmieniamy nazwy
}

@Component({
  selector: 'app-style-panel',
  imports: [CommonModule, FormsModule],
  templateUrl: './style-panel.html',
  styleUrl: './style-panel.scss',
})
export class StylePanel {
  // @Input() onStyleSelect!: (style: StyleOption) => void;
@Input() onStyleSelect!: (style: StyleOption | null) => void;
  activeCategory = 'presets';
  selectedStyle: StyleOption | null = null;


categories: StyleCategory[] = [

  // ✨ PRESETS
  {
    name: 'presets',
    label: '✨ Presety',
    colors: [
      { id: 1, name: 'Romantyczny', preview: 'Miłość', align: 'center', spacing: '1px', weight: '300', lineHeight: 1.8, italic: true, transform: 'none', opacity: 1 },
      { id: 2, name: 'Nowoczesny', preview: 'Modern', align: 'left', spacing: '0px', weight: '600', lineHeight: 1.4, italic: false, transform: 'uppercase', opacity: 1 },
      { id: 3, name: 'Minimal', preview: 'Minimal', align: 'center', spacing: '2px', weight: '400', lineHeight: 1.2, italic: false, transform: 'none', opacity: 1 },

      { id: 4, name: 'Elegancki', preview: 'Elegance', align: 'center', spacing: '1px', weight: '500', lineHeight: 1.6, italic: false, transform: 'capitalize', opacity: 1 },
      { id: 5, name: 'Vintage', preview: 'Vintage', align: 'center', spacing: '2px', weight: '300', lineHeight: 1.7, italic: true, transform: 'none', opacity: 0.9 },
      { id: 6, name: 'Cytat', preview: '"Text"', align: 'right', spacing: '0px', weight: '300', lineHeight: 1.5, italic: true, transform: 'none', opacity: 0.8 },
      { id: 7, name: 'Nagłówek', preview: 'TITLE', align: 'center', spacing: '3px', weight: '700', lineHeight: 1.2, italic: false, transform: 'uppercase', opacity: 1 },
    ],
  },

  // 📑 ALIGN
  {
    name: 'align',
    label: '📑 Wyrównanie',
    colors: [
      { id: 10, name: 'Lewo', preview: 'Text', align: 'left', spacing: '0px', weight: '400', lineHeight: 1.5, italic: false },
      { id: 11, name: 'Środek', preview: 'Text', align: 'center', spacing: '0px', weight: '400', lineHeight: 1.5, italic: false },
      { id: 12, name: 'Prawo', preview: 'Text', align: 'right', spacing: '0px', weight: '400', lineHeight: 1.5, italic: false },

      { id: 13, name: 'Justuj', preview: 'Text Text', align: 'justify', spacing: '0px', weight: '400', lineHeight: 1.5, italic: false },
      { id: 14, name: 'Poetycki', preview: 'Text', align: 'center', spacing: '1px', weight: '300', lineHeight: 1.8, italic: true },
      { id: 15, name: 'Podpis', preview: 'Text', align: 'right', spacing: '0px', weight: '300', lineHeight: 1.4, italic: false },
    ],
  },

  // 🔤 SPACING
  {
    name: 'spacing',
    label: '🔤 Rozstaw',
    colors: [
      { id: 20, name: 'Bardzo ciasny', preview: 'Text', spacing: '-1px', align: 'center', weight: '400', lineHeight: 1.5 },
      { id: 21, name: 'Ciasny', preview: 'Text', spacing: '-0.5px', align: 'center', weight: '400', lineHeight: 1.5 },
      { id: 22, name: 'Normalny', preview: 'Text', spacing: '0px', align: 'center', weight: '400', lineHeight: 1.5 },
      { id: 23, name: 'Luźny', preview: 'Text', spacing: '2px', align: 'center', weight: '400', lineHeight: 1.5 },
      { id: 24, name: 'Szeroki', preview: 'Text', spacing: '4px', align: 'center', weight: '400', lineHeight: 1.5 },
      { id: 25, name: 'Mega szeroki', preview: 'TEXT', spacing: '6px', align: 'center', weight: '500', lineHeight: 1.5 },
    ],
  },

  // 💪 WEIGHT
  {
    name: 'weight',
    label: '💪 Grubość',
    colors: [
      { id: 30, name: 'Ultra Light', preview: 'Text', weight: '200', align: 'center', spacing: '0px', lineHeight: 1.5 },
      { id: 31, name: 'Light', preview: 'Text', weight: '300', align: 'center', spacing: '0px', lineHeight: 1.5 },
      { id: 32, name: 'Normal', preview: 'Text', weight: '400', align: 'center', spacing: '0px', lineHeight: 1.5 },
      { id: 33, name: 'Medium', preview: 'Text', weight: '500', align: 'center', spacing: '0px', lineHeight: 1.5 },
      { id: 34, name: 'Semi Bold', preview: 'Text', weight: '600', align: 'center', spacing: '0px', lineHeight: 1.5 },
      { id: 35, name: 'Bold', preview: 'Text', weight: '700', align: 'center', spacing: '0px', lineHeight: 1.5 },
      { id: 36, name: 'Extra Bold', preview: 'TEXT', weight: '800', align: 'center', spacing: '0px', lineHeight: 1.5 },
    ],
  },

  // 📏 LINE HEIGHT
  {
    name: 'line',
    label: '📏 Interlinia',
    colors: [
      { id: 40, name: 'Bardzo zbita', preview: 'Text\nText', lineHeight: 1.1, align: 'center', spacing: '0px', weight: '400' },
      { id: 41, name: 'Zbita', preview: 'Text\nText', lineHeight: 1.2, align: 'center', spacing: '0px', weight: '400' },
      { id: 42, name: 'Normalna', preview: 'Text\nText', lineHeight: 1.5, align: 'center', spacing: '0px', weight: '400' },
      { id: 43, name: 'Luźna', preview: 'Text\nText', lineHeight: 1.8, align: 'center', spacing: '0px', weight: '400' },
      { id: 44, name: 'Bardzo luźna', preview: 'Text\nText', lineHeight: 2.2, align: 'center', spacing: '0px', weight: '400' },
    ],
  },

  // 🖋️ STYLE
  {
    name: 'style',
    label: '🖋️ Styl',
    colors: [
      { id: 50, name: 'Normal', preview: 'Text', italic: false, align: 'center', spacing: '0px', weight: '400', lineHeight: 1.5 },
      { id: 51, name: 'Kursywa', preview: 'Text', italic: true, align: 'center', spacing: '0px', weight: '400', lineHeight: 1.5 },

      { id: 52, name: 'Light Italic', preview: 'Text', italic: true, align: 'center', spacing: '0px', weight: '300', lineHeight: 1.5 },
      { id: 53, name: 'Bold Italic', preview: 'Text', italic: true, align: 'center', spacing: '0px', weight: '700', lineHeight: 1.5 },
    ],
  },

  // ✨ EFFECTS (NOWE)
  {
    name: 'effects',
    label: '✨ Efekty',
    colors: [
      {
        id: 60,
        name: 'Glow',
        preview: 'Glow',
        shadow: '0 0 8px rgba(255,255,255,0.6)',
        align: 'center',
        spacing: '0px',
        weight: '400',
        lineHeight: 1.5,
        italic: false
      },
      {
        id: 61,
        name: 'Cień',
        preview: 'Shadow',
        shadow: '0 2px 4px rgba(0,0,0,0.4)',
        align: 'center',
        spacing: '0px',
        weight: '400',
        lineHeight: 1.5,
        italic: false
      },
      {
        id: 62,
        name: 'Delikatny',
        preview: 'Soft',
        opacity: 0.7,
        align: 'center',
        spacing: '0px',
        weight: '300',
        lineHeight: 1.5,
        italic: false
      },
      {
        id: 63,
        name: 'Uppercase',
        preview: 'TEXT',
        transform: 'uppercase',
        align: 'center',
        spacing: '1px',
        weight: '600',
        lineHeight: 1.5,
        italic: false
      }
    ]
  }
];








  get currentCategory(): StyleCategory {
    return this.categories.find((c) => c.name === this.activeCategory)!;
  }

// selectStyle(style: StyleOption) {
//   if (this.selectedStyle?.id === style.id) {
//     this.selectedStyle = null;
//     this.onStyleSelect?.(null); // 🔥 reset
//     return;
//   }

//   this.selectedStyle = style;
//   this.onStyleSelect?.(style);
// }

selectStyle(style: StyleOption) {
  const isSame = this.selectedStyle?.id === style.id;

  if (isSame) {
    this.selectedStyle = null;
    this.onStyleSelect?.(null); // reset w poem editor
    return;
  }

  this.selectedStyle = style;
  this.onStyleSelect?.(style); // apply
}


// applyStyle() {
//   if (!this.selectedStyle) return;

//   this.onStyleSelect?.(this.selectedStyle);
// }

pplyStyle() {
  this.onStyleSelect?.(this.selectedStyle);
}


  close() {}
}
