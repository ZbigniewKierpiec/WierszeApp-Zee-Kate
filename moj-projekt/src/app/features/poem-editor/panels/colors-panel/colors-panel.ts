import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-colors-panel',
  imports: [CommonModule, FormsModule],
  templateUrl: './colors-panel.html',
  styleUrl: './colors-panel.scss',
})
export class ColorsPanel {

 @Output() change = new EventEmitter<string>();
itemsPerPage = 4;
currentPage = 0;
  tabs = ['Klasyczne', 'Romantyczne', 'Naturalne', 'Nowoczesne'];
  activeTab = 'Klasyczne';

  selected = '#3b2a20';
items = [
  { id: 1, name: 'Red', color: '#ff0000' },
  { id: 2, name: 'Blue', color: '#0000ff' },
  { id: 3, name: 'Green', color: '#00ff00' },
  { id: 4, name: 'Yellow', color: '#ffff00' },
  { id: 5, name: 'Purple', color: '#800080' },
];
colors = [
  // ===== KLASYCZNE =====
  { name: 'Beż', value: '#c49a6c', type: 'Klasyczne' },
  { name: 'Krem', value: '#f5e6cc', type: 'Klasyczne' },
  { name: 'Piaskowy', value: '#e6d3a3', type: 'Klasyczne' },
  { name: 'Jasny brąz', value: '#a47149', type: 'Klasyczne' },
  { name: 'Brąz', value: '#5a3e2b', type: 'Klasyczne' },
  { name: 'Ciemny brąz', value: '#3e2c1c', type: 'Klasyczne' },
  { name: 'Kawa', value: '#6f4e37', type: 'Klasyczne' },
  { name: 'Sepia', value: '#704214', type: 'Klasyczne' },
  { name: 'Granat', value: '#1e2a44', type: 'Klasyczne' },
  { name: 'Atrament', value: '#0f172a', type: 'Klasyczne' },
  { name: 'Czerń', value: '#111827', type: 'Klasyczne' },
  { name: 'Grafit', value: '#374151', type: 'Klasyczne' },
  { name: 'Szarość', value: '#6b7280', type: 'Klasyczne' },
  { name: 'Popiel', value: '#9ca3af', type: 'Klasyczne' },
  { name: 'Stalowy', value: '#4b5563', type: 'Klasyczne' },
  { name: 'Ciemny granat', value: '#1e293b', type: 'Klasyczne' },
  { name: 'Nocny', value: '#020617', type: 'Klasyczne' },
  { name: 'Ciepły beż', value: '#d6b88c', type: 'Klasyczne' },
  { name: 'Wanilia', value: '#fff3cd', type: 'Klasyczne' },
  { name: 'Kość słoniowa', value: '#f8f4e3', type: 'Klasyczne' },

  // ===== ROMANTYCZNE =====
  { name: 'Róż', value: '#e5a9a9', type: 'Romantyczne' },
  { name: 'Pudrowy róż', value: '#fbcfe8', type: 'Romantyczne' },
  { name: 'Blady róż', value: '#fce7f3', type: 'Romantyczne' },
  { name: 'Brzoskwinia', value: '#fda4af', type: 'Romantyczne' },
  { name: 'Morela', value: '#fb7185', type: 'Romantyczne' },
  { name: 'Karmazyn', value: '#b91c1c', type: 'Romantyczne' },
  { name: 'Burgund', value: '#7f1d1d', type: 'Romantyczne' },
  { name: 'Malina', value: '#be185d', type: 'Romantyczne' },
  { name: 'Fuksja', value: '#d946ef', type: 'Romantyczne' },
  { name: 'Lawenda', value: '#c4b5fd', type: 'Romantyczne' },
  { name: 'Fiolet pastel', value: '#ddd6fe', type: 'Romantyczne' },
  { name: 'Liliowy', value: '#e9d5ff', type: 'Romantyczne' },
  { name: 'Śliwka', value: '#7e22ce', type: 'Romantyczne' },
  { name: 'Wiśnia', value: '#991b1b', type: 'Romantyczne' },
  { name: 'Rubin', value: '#9f1239', type: 'Romantyczne' },
  { name: 'Korale', value: '#fb7185', type: 'Romantyczne' },
  { name: 'Ciepły róż', value: '#fda4af', type: 'Romantyczne' },
  { name: 'Róż vintage', value: '#f9a8d4', type: 'Romantyczne' },
  { name: 'Delikatny fiolet', value: '#ede9fe', type: 'Romantyczne' },
  { name: 'Róż pudrowy jasny', value: '#ffe4e6', type: 'Romantyczne' },

  // ===== NATURALNE =====
  { name: 'Zieleń', value: '#1f4d3a', type: 'Naturalne' },
  { name: 'Las', value: '#14532d', type: 'Naturalne' },
  { name: 'Butelkowa zieleń', value: '#064e3b', type: 'Naturalne' },
  { name: 'Oliwka', value: '#556b2f', type: 'Naturalne' },
  { name: 'Mech', value: '#4d7c0f', type: 'Naturalne' },
  { name: 'Szałwia', value: '#84cc16', type: 'Naturalne' },
  { name: 'Jasna zieleń', value: '#bbf7d0', type: 'Naturalne' },
  { name: 'Mięta', value: '#6ee7b7', type: 'Naturalne' },
  { name: 'Turkus ziemi', value: '#0d9488', type: 'Naturalne' },
  { name: 'Piasek', value: '#e6d3a3', type: 'Naturalne' },
  { name: 'Glina', value: '#a16207', type: 'Naturalne' },
  { name: 'Ziemia', value: '#78350f', type: 'Naturalne' },
  { name: 'Kamień', value: '#a8a29e', type: 'Naturalne' },
  { name: 'Mgła', value: '#d6d3d1', type: 'Naturalne' },
  { name: 'Bursztyn', value: '#f59e0b', type: 'Naturalne' },
  { name: 'Miód', value: '#fbbf24', type: 'Naturalne' },
  { name: 'Słoma', value: '#fde68a', type: 'Naturalne' },
  { name: 'Jasna ziemia', value: '#d97706', type: 'Naturalne' },
  { name: 'Ciemna gleba', value: '#451a03', type: 'Naturalne' },
  { name: 'Leśna noc', value: '#022c22', type: 'Naturalne' },

  // ===== NOWOCZESNE =====
  { name: 'Szary', value: '#6b7280', type: 'Nowoczesne' },
  { name: 'Jasny szary', value: '#d1d5db', type: 'Nowoczesne' },
  { name: 'Ciemny szary', value: '#374151', type: 'Nowoczesne' },
  { name: 'Fiolet', value: '#5b4b8a', type: 'Nowoczesne' },
  { name: 'Indygo', value: '#4338ca', type: 'Nowoczesne' },
  { name: 'Neon fiolet', value: '#a855f7', type: 'Nowoczesne' },
  { name: 'Cyan', value: '#0891b2', type: 'Nowoczesne' },
  { name: 'Turkus', value: '#14b8a6', type: 'Nowoczesne' },
  { name: 'Błękit', value: '#38bdf8', type: 'Nowoczesne' },
  { name: 'Neon niebieski', value: '#0ea5e9', type: 'Nowoczesne' },
  { name: 'Neon zielony', value: '#22c55e', type: 'Nowoczesne' },
  { name: 'Limonka', value: '#84cc16', type: 'Nowoczesne' },
  { name: 'Neon żółty', value: '#fde047', type: 'Nowoczesne' },
  { name: 'Pomarańcz neon', value: '#fb923c', type: 'Nowoczesne' },
  { name: 'Czerwony neon', value: '#ef4444', type: 'Nowoczesne' },
  { name: 'Neon róż', value: '#ec4899', type: 'Nowoczesne' },
  { name: 'Magenta', value: '#db2777', type: 'Nowoczesne' },
  { name: 'Cyber pink', value: '#f472b6', type: 'Nowoczesne' },
  { name: 'Deep purple', value: '#6d28d9', type: 'Nowoczesne' },
  { name: 'Dark cyan', value: '#155e75', type: 'Nowoczesne' }
];




  get filteredColors() {
    return this.colors.filter(c => c.type === this.activeTab);
  }

  select(color: any) {
    this.selected = color.value;
  }

  apply() {
    this.change.emit(this.selected);
  }

setTab(tab: string) {
  this.activeTab = tab;
  const first = this.filteredColors[0];
  if (first) this.selected = first.value;
}

  selectedColor = this.colors[0];

  selectColor(color: any) {
    this.selectedColor = color;
  }
















}
