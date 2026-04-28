import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
interface ColorOption {
  id: number;
  name: string;
  hex: string;
}

interface ColorCategory {
  name: string;
  label: string;
  colors: ColorOption[];
}
@Component({
  selector: 'app-colors-panel',
  imports: [CommonModule, FormsModule],
  templateUrl: './colors-panel.html',
  styleUrl: './colors-panel.scss',
})
export class ColorsPanel {
  @Output() colorChange = new EventEmitter<string>();

  @Input() onColorSelect!: (color: string) => void;
  // Aktywna kategoria
  activeCategory = 'klasyczne';

  // Wybrany kolor
  selectedColor: ColorOption | null = null;

  // Poprawiona struktura kategorii z Twoimi kolorami

  categories: ColorCategory[] = [
    {
      name: 'klasyczne',
      label: 'Klasyczne',
      colors: [
        { id: 1, name: 'Beż', hex: '#c49a6c' },
        { id: 2, name: 'Krem', hex: '#f5e6cc' },
        { id: 3, name: 'Piaskowy', hex: '#e6d3a3' },
        { id: 4, name: 'Jasny brąz', hex: '#a47149' },
        { id: 5, name: 'Brąz', hex: '#5a3e2b' },
        { id: 6, name: 'Ciemny brąz', hex: '#3e2c1c' },
        { id: 7, name: 'Kawa', hex: '#6f4e37' },
        { id: 8, name: 'Sepia', hex: '#704214' },
        { id: 9, name: 'Granat', hex: '#1e2a44' },
        { id: 10, name: 'Atrament', hex: '#0f172a' },
        { id: 11, name: 'Czerń', hex: '#111827' },
        { id: 12, name: 'Grafit', hex: '#374151' },
        { id: 13, name: 'Szarość', hex: '#6b7280' },
        { id: 14, name: 'Popiel', hex: '#9ca3af' },
        { id: 15, name: 'Stalowy', hex: '#4b5563' },
        { id: 16, name: 'Ciemny granat', hex: '#1e293b' },
        { id: 17, name: 'Nocny', hex: '#020617' },
        { id: 18, name: 'Ciepły beż', hex: '#d6b88c' },
        { id: 19, name: 'Wanilia', hex: '#fff3cd' },
        { id: 20, name: 'Kość słoniowa', hex: '#f8f4e3' },

        { id: 21, name: 'Pergamin', hex: '#ede0c8' },
        { id: 22, name: 'Stary papier', hex: '#f1e3c6' },
        { id: 23, name: 'Taupe', hex: '#8d7b68' },
        { id: 24, name: 'Ciepła szarość', hex: '#8b7d7b' },
        { id: 25, name: 'Mglisty szary', hex: '#b0b0b0' },
        { id: 26, name: 'Antracyt', hex: '#2b2b2b' },
        { id: 27, name: 'Czekoladowy', hex: '#4a2c2a' },
        { id: 28, name: 'Orzechowy', hex: '#7a5230' },
        { id: 29, name: 'Zgaszony beż', hex: '#c3a995' },
        { id: 30, name: 'Karmel', hex: '#b08968' },
        { id: 31, name: 'Piasek złoty', hex: '#d4af37' },
        { id: 32, name: 'Zgaszony grafit', hex: '#444' },
        { id: 33, name: 'Ciemny taupe', hex: '#6e5c4d' },
        { id: 34, name: 'Szary kamień', hex: '#7c7c7c' },
        { id: 35, name: 'Popielaty beż', hex: '#d8c3a5' },
        { id: 36, name: 'Brudna biel', hex: '#f2f0eb' },
        { id: 37, name: 'Miękka czerń', hex: '#111111' },
        { id: 38, name: 'Ciepła czerń', hex: '#1a1a1a' },
        { id: 39, name: 'Zgaszony brąz', hex: '#6a4e42' },
        { id: 40, name: 'Kremowy szary', hex: '#e5e5e5' },
      ],
    },

    {
      name: 'romantyczne',
      label: 'Romantyczne',
      colors: [
        { id: 1, name: 'Róż', hex: '#e5a9a9' },
        { id: 2, name: 'Pudrowy róż', hex: '#fbcfe8' },
        { id: 3, name: 'Blady róż', hex: '#fce7f3' },
        { id: 4, name: 'Brzoskwinia', hex: '#fda4af' },
        { id: 5, name: 'Morela', hex: '#fb7185' },
        { id: 6, name: 'Karmazyn', hex: '#b91c1c' },
        { id: 7, name: 'Burgund', hex: '#7f1d1d' },
        { id: 8, name: 'Malina', hex: '#be185d' },
        { id: 9, name: 'Fuksja', hex: '#d946ef' },
        { id: 10, name: 'Lawenda', hex: '#c4b5fd' },
        { id: 11, name: 'Fiolet pastel', hex: '#ddd6fe' },
        { id: 12, name: 'Liliowy', hex: '#e9d5ff' },
        { id: 13, name: 'Śliwka', hex: '#7e22ce' },
        { id: 14, name: 'Wiśnia', hex: '#991b1b' },
        { id: 15, name: 'Rubin', hex: '#9f1239' },
        { id: 16, name: 'Korale', hex: '#fb7185' },
        { id: 17, name: 'Ciepły róż', hex: '#fda4af' },
        { id: 18, name: 'Róż vintage', hex: '#f9a8d4' },
        { id: 19, name: 'Delikatny fiolet', hex: '#ede9fe' },
        { id: 20, name: 'Róż pudrowy jasny', hex: '#ffe4e6' },

        { id: 21, name: 'Róż pastelowy', hex: '#ffd6e0' },
        { id: 22, name: 'Brudny róż', hex: '#d8a7b1' },
        { id: 23, name: 'Róż pudrowy ciemny', hex: '#d48fa3' },
        { id: 24, name: 'Róż perłowy', hex: '#f8d7da' },
        { id: 25, name: 'Fiolet mglisty', hex: '#bfa2db' },
        { id: 26, name: 'Lawenda ciemna', hex: '#8e7cc3' },
        { id: 27, name: 'Róż cukierkowy', hex: '#ff77a9' },
        { id: 28, name: 'Fuksja głęboka', hex: '#c2185b' },
        { id: 29, name: 'Róż malinowy', hex: '#d81b60' },
        { id: 30, name: 'Płatki róży', hex: '#f4c2c2' },
        { id: 31, name: 'Koralowy jasny', hex: '#ff9aa2' },
        { id: 32, name: 'Koralowy ciemny', hex: '#ff6f61' },
        { id: 33, name: 'Liliowy pastel', hex: '#e6ccff' },
        { id: 34, name: 'Śliwkowy jasny', hex: '#a569bd' },
        { id: 35, name: 'Róż ciepły', hex: '#ffb6c1' },
        { id: 36, name: 'Róż romantyczny', hex: '#f7a1c4' },
        { id: 37, name: 'Fiolet romantyczny', hex: '#c39bd3' },
        { id: 38, name: 'Róż brudny pastel', hex: '#e8b4bc' },
        { id: 39, name: 'Róż kremowy', hex: '#ffe4e1' },
        { id: 40, name: 'Fiolet mgła', hex: '#d7bde2' },
      ],
    },

    {
      name: 'naturalne',
      label: 'Naturalne',
      colors: [
        { id: 1, name: 'Zieleń', hex: '#1f4d3a' },
        { id: 2, name: 'Las', hex: '#14532d' },
        { id: 3, name: 'Butelkowa zieleń', hex: '#064e3b' },
        { id: 4, name: 'Oliwka', hex: '#556b2f' },
        { id: 5, name: 'Mech', hex: '#4d7c0f' },
        { id: 6, name: 'Szałwia', hex: '#84cc16' },
        { id: 7, name: 'Jasna zieleń', hex: '#bbf7d0' },
        { id: 8, name: 'Mięta', hex: '#6ee7b7' },
        { id: 9, name: 'Turkus ziemi', hex: '#0d9488' },
        { id: 10, name: 'Piasek', hex: '#e6d3a3' },
        { id: 11, name: 'Glina', hex: '#a16207' },
        { id: 12, name: 'Ziemia', hex: '#78350f' },
        { id: 13, name: 'Kamień', hex: '#a8a29e' },
        { id: 14, name: 'Mgła', hex: '#d6d3d1' },
        { id: 15, name: 'Bursztyn', hex: '#f59e0b' },
        { id: 16, name: 'Miód', hex: '#fbbf24' },
        { id: 17, name: 'Słoma', hex: '#fde68a' },
        { id: 18, name: 'Jasna ziemia', hex: '#d97706' },
        { id: 19, name: 'Ciemna gleba', hex: '#451a03' },
        { id: 20, name: 'Leśna noc', hex: '#022c22' },

        { id: 21, name: 'Leśna zieleń', hex: '#1b4332' },
        { id: 22, name: 'Szmaragd', hex: '#2ecc71' },
        { id: 23, name: 'Zielony liść', hex: '#4caf50' },
        { id: 24, name: 'Zieleń trawy', hex: '#7cb342' },
        { id: 25, name: 'Ciemny mech', hex: '#556b2f' },
        { id: 26, name: 'Zielony oliwkowy', hex: '#808000' },
        { id: 27, name: 'Zgaszona zieleń', hex: '#6b8e23' },
        { id: 28, name: 'Zielony kamień', hex: '#5f8575' },
        { id: 29, name: 'Turkusowy las', hex: '#2a9d8f' },
        { id: 30, name: 'Woda morska', hex: '#00a896' },
        { id: 31, name: 'Piasek pustyni', hex: '#d2b48c' },
        { id: 32, name: 'Glina jasna', hex: '#cd853f' },
        { id: 33, name: 'Brąz ziemi', hex: '#8b4513' },
        { id: 34, name: 'Kamień jasny', hex: '#c2b280' },
        { id: 35, name: 'Mgła chłodna', hex: '#cfd8dc' },
        { id: 36, name: 'Bursztyn ciemny', hex: '#c68642' },
        { id: 37, name: 'Złoto natury', hex: '#daa520' },
        { id: 38, name: 'Leśna mgła', hex: '#9caf88' },
        { id: 39, name: 'Zielony głęboki', hex: '#013220' },
        { id: 40, name: 'Ziemia wilgotna', hex: '#3b2f2f' },
      ],
    },

    {
      name: 'nowoczesne',
      label: 'Nowoczesne',
      colors: [
        { id: 1, name: 'Szary', hex: '#6b7280' },
        { id: 2, name: 'Jasny szary', hex: '#d1d5db' },
        { id: 3, name: 'Ciemny szary', hex: '#374151' },
        { id: 4, name: 'Fiolet', hex: '#5b4b8a' },
        { id: 5, name: 'Indygo', hex: '#4338ca' },
        { id: 6, name: 'Neon fiolet', hex: '#a855f7' },
        { id: 7, name: 'Cyan', hex: '#0891b2' },
        { id: 8, name: 'Turkus', hex: '#14b8a6' },
        { id: 9, name: 'Błękit', hex: '#38bdf8' },
        { id: 10, name: 'Neon niebieski', hex: '#0ea5e9' },
        { id: 11, name: 'Neon zielony', hex: '#22c55e' },
        { id: 12, name: 'Limonka', hex: '#84cc16' },
        { id: 13, name: 'Neon żółty', hex: '#fde047' },
        { id: 14, name: 'Pomarańcz neon', hex: '#fb923c' },
        { id: 15, name: 'Czerwony neon', hex: '#ef4444' },
        { id: 16, name: 'Neon róż', hex: '#ec4899' },
        { id: 17, name: 'Magenta', hex: '#db2777' },
        { id: 18, name: 'Cyber pink', hex: '#f472b6' },
        { id: 19, name: 'Deep purple', hex: '#6d28d9' },
        { id: 20, name: 'Dark cyan', hex: '#155e75' },

        { id: 21, name: 'Electric blue', hex: '#2979ff' },
        { id: 22, name: 'Neon cyan', hex: '#00e5ff' },
        { id: 23, name: 'Cyber green', hex: '#00ff9f' },
        { id: 24, name: 'Acid green', hex: '#b0ff00' },
        { id: 25, name: 'Neon orange', hex: '#ff6d00' },
        { id: 26, name: 'Hot red', hex: '#ff1744' },
        { id: 27, name: 'Laser pink', hex: '#ff4081' },
        { id: 28, name: 'Ultra violet', hex: '#7c4dff' },
        { id: 29, name: 'Deep neon purple', hex: '#651fff' },
        { id: 30, name: 'Matrix green', hex: '#00ff41' },
        { id: 31, name: 'Digital blue', hex: '#00bcd4' },
        { id: 32, name: 'Tech cyan', hex: '#0097a7' },
        { id: 33, name: 'Neon lime', hex: '#aeea00' },
        { id: 34, name: 'Bright yellow', hex: '#ffeb3b' },
        { id: 35, name: 'Glow orange', hex: '#ff9100' },
        { id: 36, name: 'Vivid red', hex: '#ff3d00' },
        { id: 37, name: 'Pink neon glow', hex: '#ff4081' },
        { id: 38, name: 'Future purple', hex: '#6200ea' },
        { id: 39, name: 'Deep tech blue', hex: '#0d47a1' },
        { id: 40, name: 'Dark neon teal', hex: '#006064' },
      ],
    },
  ];

  // Pobierz aktywną kategorię
  get currentCategory(): ColorCategory {
    return this.categories.find((cat) => cat.name === this.activeCategory)!;
  }

  // Wybór koloru
  // selectColor(color: ColorOption): void {
  //   this.selectedColor = color;
  // }

selectColor(color: ColorOption): void {
  this.selectedColor = color;
  this.onColorSelect?.(color.hex);
}


  // Zastosowanie wybranego koloru
  applyColor(): void {
  if (this.selectedColor && this.onColorSelect) {
    this.onColorSelect(this.selectedColor.hex);
  }
}



  // Zamknięcie okna
  close(): void {
    console.log('Zamknięto okno wyboru koloru');
  }
}
