import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

interface BackgroundOption {
  id: number;
  name: string;
  category: string;
  base: string;
  overlay: string | null;
}

interface BackgroundCategory {
  name: string;
  label: string;
  backgrounds: BackgroundOption[];
}
@Component({
  selector: 'app-background-panel',
  imports: [CommonModule],
  templateUrl: './background-panel.html',
  styleUrl: './background-panel.scss',
})
export class BackgroundPanel {
  activeTab = 'all';

  backgrounds = [
    {
      id: 1,
      name: 'Romantic Floral',
      base: 'assets/bg/paper-background.jpg',
      overlay: '/assets/bg/floral-right.png.png',
      category: 'romantic',
    },
    {
      id: 2,
      name: 'Soft Pink',
     base: 'assets/bg/paper-background.jpg',
      overlay: '/assets/bg/watercolor-pink.png',
      category: 'romantic',
    },
    {
      id: 3,
      name: 'Branches',
      base: '/assets/bg/zee.png',
      overlay: '/assets/bg/pngwing.com',
      category: 'paper',
    },
    {
      id: 4,
      name: 'Vintage',
      base: 'assets/bg/paper-vintage.jpg',
      overlay: null,
      category: 'paper',
    },
  ];

  selectedBg = this.backgrounds[0];

  tabs = [
    { id: 'all', label: '✨ Wszystkie' },
    { id: 'romantic', label: '💖 Romantyczne' },
    { id: 'paper', label: '📄 Papier' },
    { id: 'dark', label: '🌑 Dark' },
  ];

  get filteredBackgrounds() {
    if (this.activeTab === 'all') return this.backgrounds;
    return this.backgrounds.filter((b) => b.category === this.activeTab);
  }

  // 🔥 NAJWAŻNIEJSZE
  getBgStyle(bg: any) {
    if (!bg) return '';

    return bg.overlay ? `url(${bg.overlay}), url(${bg.base})` : `url(${bg.base})`;
  }

  applyBackground() {
    console.log('APPLY:', this.selectedBg);
  }

  close() {}
}
