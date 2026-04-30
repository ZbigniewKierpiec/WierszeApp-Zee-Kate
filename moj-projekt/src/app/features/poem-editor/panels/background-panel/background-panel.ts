import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

interface ColorOption {
  id: number;
  name: string;
  hex: string;
  image?: string;
}

interface ColorCategory {
  name: string;
  label: string;
  colors: ColorOption[];
}

@Component({
  selector: 'app-background-panel',
  imports: [CommonModule],
  templateUrl: './background-panel.html',
  styleUrl: './background-panel.scss',
})
export class BackgroundPanel {
  @Input() onBackgroundSelect!: (bg: string) => void;

  activeCategory = 'klasyczne';
  selectedColor: ColorOption | null = null;

  categories: ColorCategory[] = [
    {
      name: 'all',
      label: '✨ Wszystkie',
      colors: [],
    },

    {
      name: 'klasyczne',
      label: 'Klasyczne',
      colors: [
        {
          id: 101,
          name: 'Beż',
          hex: '#c49a6c',
          image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400',
        },
        {
          id: 102,
          name: 'Krem',
          hex: '#f5e6cc',
          image: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=400',
        },
        {
          id: 103,
          name: 'Piaskowy',
          hex: '#e6d3a3',
          image: 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=400',
        },
        {
          id: 104,
          name: 'Pergamin',
          hex: '#ede0c8',
          image: 'https://images.unsplash.com/photo-1529070538774-1843cb3265df?w=400',
        },
        {
          id: 105,
          name: 'Stary papier',
          hex: '#f1e3c6',
          image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=400',
        },
        {
          id: 106,
          name: 'Kawa',
          hex: '#6f4e37',
          image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400',
        },
      ],
    },

    {
      name: 'romantyczne',
      label: 'Romantyczne',
      colors: [
        {
          id: 201,
          name: 'Róż',
          hex: '#e5a9a9',
          image: 'https://images.unsplash.com/photo-1511988617509-a57c8a288659?w=400',
        },
        {
          id: 202,
          name: 'Pudrowy róż',
          hex: '#fbcfe8',
          image: 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=400',
        },
        {
          id: 203,
          name: 'Kwiaty',
          hex: '#fda4af',
          image: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=400',
        },
        {
          id: 204,
          name: 'Róże',
          hex: '#f472b6',
          image: 'https://images.unsplash.com/photo-1503602642458-232111445657?w=400',
        },
        {
          id: 205,
          name: 'Lawenda',
          hex: '#c4b5fd',
          image: 'https://images.unsplash.com/photo-1504196606672-aef5c9cefc92?w=400',
        },
        {
          id: 206,
          name: 'Miłość',
          hex: '#ec4899',
          image: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=400',
        },
      ],
    },

    {
      name: 'seasonal',
      label: '🎄 Sezonowe',
      colors: [
        // 🎄 Christmas
        {
          id: 301,
          name: 'Christmas Lights',
          hex: '#b91c1c',
          image: 'https://images.unsplash.com/photo-1543589077-47d81606c1bf?w=400',
        },
        {
          id: 302,
          name: 'Christmas Tree',
          hex: '#14532d',
          image: 'https://images.unsplash.com/photo-1512389142860-9c449e58a543?w=400',
        },
        {
          id: 303,
          name: 'Snow Winter',
          hex: '#e5e7eb',
          image: 'https://images.unsplash.com/photo-1483921020237-2ff51e8e4b22?w=400',
        },
        {
          id: 304,
          name: 'Warm Christmas',
          hex: '#f59e0b',
          image: 'https://images.unsplash.com/photo-1511268559489-34b624fbfcf5?w=400',
        },

        // 🎃 Halloween
        {
          id: 305,
          name: 'Pumpkin',
          hex: '#ea580c',
          image: 'https://images.unsplash.com/photo-1509551388413-e18d0ac5d495?w=400',
        },
        {
          id: 306,
          name: 'Dark Night',
          hex: '#020617',
          image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=400',
        },
        {
          id: 307,
          name: 'Spooky Forest',
          hex: '#1e293b',
          image: 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=400',
        },
        {
          id: 308,
          name: 'Ghost Mood',
          hex: '#6b7280',
          image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=400',
        },

        // 🐣 Easter
        {
          id: 309,
          name: 'Easter Eggs',
          hex: '#fbcfe8',
          image: 'https://images.unsplash.com/photo-1529336953121-ad5a0d43d0d2?w=400',
        },
        {
          id: 310,
          name: 'Spring Flowers',
          hex: '#86efac',
          image: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=400',
        },
        {
          id: 311,
          name: 'Pastel Spring',
          hex: '#ddd6fe',
          image: 'https://images.unsplash.com/photo-1526045478516-99145907023c?w=400',
        },
        {
          id: 312,
          name: 'Bunny Mood',
          hex: '#fde68a',
          image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400',
        },
      ],
    }
  ];

  get currentCategory(): ColorCategory {
    if (this.activeCategory === 'all') {
      return {
        name: 'all',
        label: 'Wszystkie',
        colors: this.categories.filter((c) => c.name !== 'all').flatMap((c) => c.colors),
      };
    }

    return this.categories.find((c) => c.name === this.activeCategory)!;
  }

  getColorBg(color: ColorOption): string {
    return color.image ? `url(${color.image})` : color.hex;
  }

  selectColor(color: ColorOption) {
    this.selectedColor = color;

    const style = color.image
      ? `
      linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)),
      url(${color.image})
    `
      : color.hex;

    this.onBackgroundSelect?.(style);
  }

  applyColor() {
    if (!this.selectedColor) return;

    const style = this.selectedColor.image
      ? `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url(${this.selectedColor.image})`
      : this.selectedColor.hex;

    this.onBackgroundSelect?.(style);
  }

  close() {}
}
