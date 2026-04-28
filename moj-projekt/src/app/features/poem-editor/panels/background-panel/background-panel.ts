import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
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
  @Input() onBackgroundSelect!: (bg: any) => void;

  activeTab = 'all';

  backgrounds = [
    {
      id: 1,
      name: 'Romantic Floral',
      base: '',
      overlay: '/assets/bg/floral-right.png.png',
      category: 'romantic',
    },
    {
      id: 2,
      name: 'Soft Pink',
<<<<<<< HEAD
      base: '',
      overlay: '/assets/bg/test',
=======
      base: 'assets/bg/paper-background.jpg',
      overlay: '/assets/bg/watercolor-pink.png',
>>>>>>> 8715cf3 (live background preview on selection)
      category: 'romantic',
    },
    {
      id: 3,
      name: 'Branches',
      base: '/assets/bg/zee007.png',
      overlay: '',
      category: 'paper',
    },
    {
      id: 4,
      name: 'Vintage',
      base: '/assets/bg/love.png',
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

  getBgStyle(bg: any) {
    if (!bg) return '';

    return bg.overlay ? `url(${bg.overlay}), url(${bg.base})` : `url(${bg.base})`;
  }
  applyBackground() {
    if (!this.selectedBg) return;

    this.onBackgroundSelect?.(this.selectedBg);
  }
<<<<<<< HEAD
  selectBg(bg: any) {
    this.selectedBg = bg;

    // 🔥 LIVE PREVIEW (TO JEST KLUCZ)
    this.onBackgroundSelect?.(bg);
  }
=======
selectBg(bg: any) {
  this.selectedBg = bg;

  // 🔥 LIVE PREVIEW (TO JEST KLUCZ)
  this.onBackgroundSelect?.(bg);
}
>>>>>>> 8715cf3 (live background preview on selection)
  close() {}
}
