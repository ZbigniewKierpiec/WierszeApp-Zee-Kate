import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { BACKGROUND_CATEGORIES } from './background-data';

export interface ColorOption {
  id: number;
  name: string;
  hex: string;
  image?: string | null;
}

export interface ColorCategory {
  name: string;
  label: string;
  colors: ColorOption[];
}

@Component({
  selector: 'app-background-panel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './background-panel.html',
  styleUrl: './background-panel.scss',
})
export class BackgroundPanel {
  @Input() onBackgroundSelect!: (bg: string) => void;

  activeMainCategory = 'background-image';
  activeCategory = 'klasyczne';

  selectedColor: ColorOption | null = null;

  // categories = [
  //   {
  //     name: 'background-image',
  //     label: '🖼️ Background Image',

  //     categories: [
  //       {
  //         name: 'klasyczne',
  //         label: 'Klasyczne',

  //         colors: [
  //           {
  //             id: 101,
  //             name: 'Beż',
  //             hex: '#c49a6c',
  //             image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400',
  //           },

  //           {
  //             id: 102,
  //             name: 'Krem',
  //             hex: '#f5e6cc',
  //             image: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=400',
  //           },
  //         ],
  //       },

  //       {
  //         name: 'romantyczne',
  //         label: 'Romantyczne',

  //         colors: [
  //           {
  //             id: 201,
  //             name: 'Róż',
  //             hex: '#e5a9a9',
  //             image: 'https://images.unsplash.com/photo-1511988617509-a57c8a288659?w=400',
  //           },

  //           {
  //             id: 202,
  //             name: 'Pudrowy róż',
  //             hex: '#fbcfe8',
  //             image: 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=400',
  //           },
  //         ],
  //       },

  //       {
  //         name: 'seasonal',
  //         label: '🎄 Sezonowe',

  //         colors: [
  //           {
  //             id: 301,
  //             name: 'Christmas Lights',
  //             hex: '#b91c1c',
  //             image: 'https://images.unsplash.com/photo-1543589077-47d81606c1bf?w=400',
  //           },

  //           {
  //             id: 302,
  //             name: 'Christmas Tree',
  //             hex: '#14532d',
  //             image: 'https://images.unsplash.com/photo-1512389142860-9c449e58a543?w=400',
  //           },
  //         ],
  //       },
  //     ],
  //   },

  //   {
  //     name: 'background-colors',
  //     label: '🎨 Background Colors',

  //     categories: [
  //       {
  //         name: 'klasyczne',
  //         label: 'Klasyczne',

  //         colors: [
  //           { id: 1, name: 'Beż', hex: '#c49a6c' },
  //           { id: 2, name: 'Krem', hex: '#f5e6cc' },
  //           { id: 3, name: 'Piaskowy', hex: '#e6d3a3' },
  //           { id: 4, name: 'Jasny brąz', hex: '#a47149' },
  //         ],
  //       },

  //       {
  //         name: 'romantyczne',
  //         label: 'Romantyczne',

  //         colors: [
  //           { id: 101, name: 'Róż', hex: '#e5a9a9' },
  //           { id: 102, name: 'Pudrowy róż', hex: '#fbcfe8' },
  //           { id: 103, name: 'Lawenda', hex: '#c4b5fd' },
  //           { id: 104, name: 'Fuksja', hex: '#d946ef' },
  //         ],
  //       },

  //       {
  //         name: 'naturalne',
  //         label: 'Naturalne',

  //         colors: [
  //           { id: 201, name: 'Las', hex: '#14532d' },
  //           { id: 202, name: 'Mech', hex: '#4d7c0f' },
  //           { id: 203, name: 'Mięta', hex: '#6ee7b7' },
  //           { id: 204, name: 'Turkus ziemi', hex: '#0d9488' },
  //         ],
  //       },

  //       {
  //         name: 'nowoczesne',
  //         label: 'Nowoczesne',

  //         colors: [
  //           { id: 301, name: 'Neon fiolet', hex: '#a855f7' },
  //           { id: 302, name: 'Electric blue', hex: '#2979ff' },
  //           { id: 303, name: 'Neon cyan', hex: '#00e5ff' },
  //           { id: 304, name: 'Cyber green', hex: '#00ff9f' },
  //         ],
  //       },
  //     ],
  //   },
  // ];

categories = BACKGROUND_CATEGORIES;











  get currentMainCategories(): any[] {
    return this.categories.find((c) => c.name === this.activeMainCategory)?.categories || [];
  }

  get currentCategory(): ColorCategory {
    return this.currentMainCategories.find((c) => c.name === this.activeCategory);
  }

  changeMainCategory(name: string) {
    this.activeMainCategory = name;

    const firstCategory = this.categories.find((c) => c.name === name)?.categories?.[0];

    if (firstCategory) {
      this.activeCategory = firstCategory.name;
    }
  }

  // selectColor(color: ColorOption) {
  //   this.selectedColor = color;
  // }

  selectColor(color: ColorOption) {
    this.selectedColor = color;

    const style = color.image
      ? `linear-gradient(rgba(0,0,0,.3), rgba(0,0,0,.3)), url(${color.image})`
      : color.hex;

    this.onBackgroundSelect?.(style);
  }

  applyColor() {
    if (!this.selectedColor) return;

    const style = this.selectedColor.image
      ? `linear-gradient(rgba(0,0,0,.3), rgba(0,0,0,.3)), url(${this.selectedColor.image})`
      : this.selectedColor.hex;

    this.onBackgroundSelect?.(style);
  }

  close() {}
}
