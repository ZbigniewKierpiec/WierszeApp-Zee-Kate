import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

interface SeparatorOption {
  id: number;
  name: string;
  symbol: string;
}

interface SeparatorSubCategory {
  name: string;
  label: string;
  separators: SeparatorOption[];
}

interface SeparatorCategory {
  name: string;
  label: string;
  subcategories: SeparatorSubCategory[];
}

@Component({
  selector: 'app-separator-panel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './separator-panel.html',
  styleUrl: './separator-panel.scss',
})
export class SeparatorPanel {
  @Input() onSeparatorSelect!: (sep: string) => void;

  activeCategory = 'separators';
  activeSubCategory = 'romantyczne';

  selectedSeparator: SeparatorOption | null = null;

  // categories: SeparatorCategory[] = [
  //   {
  //     name: 'separators',
  //     label: '✨ Separatory',
  //     subcategories: [
  //       {
  //         name: 'romantyczne',
  //         label: '❤️ Romantyczne',
  //         separators: [
  //           { id: 1, name: 'Serce', symbol: '♥' },
  //           { id: 2, name: 'Trzy serca', symbol: '♥ ♥ ♥' },
  //           { id: 3, name: 'Serce i gwiazda', symbol: '♥ ✦ ♥' },
  //           { id: 4, name: 'Miłość', symbol: '♥ ♥ ✦ ♥ ♥' },
  //         ],
  //       },
  //       {
  //         name: 'minimal',
  //         label: '⚪ Minimal',
  //         separators: [
  //           { id: 41, name: 'Kropki', symbol: '· · ·' },
  //           { id: 42, name: 'Linie', symbol: '— — —' },
  //           { id: 43, name: 'Pipe', symbol: '| | |' },
  //         ],
  //       },
  //       {
  //         name: 'classic',
  //         label: '🌸 Klasyczne',
  //         separators: [
  //           { id: 81, name: 'Kwiaty', symbol: '✿ ✿ ✿' },
  //           { id: 82, name: 'Gwiazdy', symbol: '✦ ✦ ✦' },
  //         ],
  //       },
  //     ],
  //   },

  //   {
  //     name: 'emoji',
  //     label: '😀 Emoji',
  //     subcategories: [
  //       {
  //         name: 'emocje',
  //         label: '💔 Emocje',
  //         separators: [
  //           { id: 200, name: 'Miłość', symbol: '❤️ ❤️ ❤️' },
  //           { id: 201, name: 'Smutek', symbol: '😢 😢 😢' },
  //           { id: 202, name: 'Złość', symbol: '😡 😡 😡' },
  //         ],
  //       },
  //       {
  //         name: 'natura',
  //         label: '🌙 Natura',
  //         separators: [
  //           { id: 203, name: 'Księżyc', symbol: '🌙 🌙 🌙' },
  //           { id: 204, name: 'Kwiaty', symbol: '🌸 🌸 🌸' },
  //         ],
  //       },
  //       {
  //         name: 'mix',
  //         label: '✨ Mix',
  //         separators: [
  //           { id: 205, name: 'Love glow', symbol: '❤️ ✨ ❤️ ✨ ❤️' },
  //           { id: 206, name: 'Night', symbol: '🌙 ✨ 🌙 ✨ 🌙' },
  //           { id: 207, name: 'Fire', symbol: '🔥 ⚡ 🔥 ⚡ 🔥' },
  //         ],
  //       },
  //     ],
  //   },
  // ];



categories: SeparatorCategory[] = [
  {
    name: 'separators',
    label: '✨ Separatory',
    subcategories: [
      {
        name: 'romantyczne',
        label: '❤️ Romantyczne',
        separators: [
          { id: 1, name: 'Serce', symbol: '♥' },
          { id: 2, name: 'Trzy serca', symbol: '♥ ♥ ♥' },
          { id: 3, name: 'Serce i gwiazda', symbol: '♥ ✦ ♥' },
          { id: 4, name: 'Miłość', symbol: '♥ ♥ ✦ ♥ ♥' },
          { id: 5, name: 'Soft hearts', symbol: '♡ ♡ ♡' },
          { id: 6, name: 'Heart aura', symbol: '✧ ♥ ✧' },
          { id: 7, name: 'Heart glow', symbol: '✦ ♥ ✦ ♥ ✦' },
          { id: 8, name: 'Love dots', symbol: '♥ · ♥ · ♥' },
          { id: 9, name: 'Heart wave', symbol: '~ ♥ ~ ♥ ~' },
          { id: 10, name: 'Love stars', symbol: '♥ ✧ ✦ ♥ ✧' },

          { id: 11, name: 'Heart chain', symbol: '♥ ♥ ♥ ♥ ♥' },
          { id: 12, name: 'Love long', symbol: '♥ ✦ ♥ ✦ ♥ ✦ ♥' },
          { id: 13, name: 'Romantic mix', symbol: '♥ ✿ ♥ ✿ ♥' },
          { id: 14, name: 'Heart sparkle', symbol: '♥ ✧ ✧ ♥ ✧ ✧ ♥' },
          { id: 15, name: 'Soft love', symbol: '♡ ♥ ♡ ♥ ♡' },
          { id: 16, name: 'Love rhythm', symbol: '♥ · ♥ · ♥ · ♥' },
          { id: 17, name: 'Aura chain', symbol: '✧ ♥ ✧ ♥ ✧ ♥ ✧' },
          { id: 18, name: 'Glow hearts', symbol: '✦ ♥ ✦ ♥ ✦ ♥ ✦' },
          { id: 19, name: 'Dream love', symbol: '♥ ✨ ♥ ✨ ♥ ✨ ♥' },
          { id: 20, name: 'Romantic wave 2', symbol: '~ ♥ ~~ ♥ ~~ ♥ ~' },

          { id: 21, name: 'Heart dots 2', symbol: '♥ . ♥ . ♥ . ♥' },
          { id: 22, name: 'Love mix 2', symbol: '♥ ✦ ✧ ♥ ✦ ✧ ♥' },
          { id: 23, name: 'Soft glow', symbol: '♡ ✧ ♡ ✧ ♡' },
          { id: 24, name: 'Heart dust', symbol: '♥ ✧ ♥ ✧ ♥ ✧ ♥' },
          { id: 25, name: 'Love chain soft', symbol: '♡ ♡ ♥ ♡ ♡' },
          { id: 26, name: 'Spark heart', symbol: '✦ ♥ ✧ ♥ ✦ ♥' },
          { id: 27, name: 'Love stars 2', symbol: '♥ ✧ ✦ ✧ ✦ ♥' },
          { id: 28, name: 'Romantic flow', symbol: '~ ♥ ~ ♥ ~ ♥ ~' },
          { id: 29, name: 'Heart loop', symbol: '♥ ♥ ✦ ♥ ♥ ✦ ♥' },
          { id: 30, name: 'Love aura 2', symbol: '✧ ♥ ✧ ✧ ♥ ✧' },

          { id: 31, name: 'Heart minimal', symbol: '· ♥ · ♥ ·' },
          { id: 32, name: 'Glow chain', symbol: '✦ ♥ ✦ ✦ ♥ ✦' },
          { id: 33, name: 'Love echo', symbol: '♥ ♥ ♥ ✧ ♥ ♥ ♥' },
          { id: 34, name: 'Romantic dots', symbol: '♥ · ♥ · ♥ · ♥ · ♥' },
          { id: 35, name: 'Soft chain', symbol: '♡ ♡ ♡ ♥ ♡ ♡ ♡' },
          { id: 36, name: 'Dream hearts', symbol: '♥ ✨ ✧ ♥ ✨ ✧ ♥' },
          { id: 37, name: 'Love sparkle 2', symbol: '♥ ✦ ✧ ♥ ✦ ✧ ♥' },
          { id: 38, name: 'Heart glow 2', symbol: '✦ ♥ ✦ ♥ ✦ ♥ ✦ ♥' },
          { id: 39, name: 'Love waves', symbol: '~ ♥ ~~ ♥ ~~ ♥ ~~ ♥ ~' },
          { id: 40, name: 'Heart star chain', symbol: '♥ ✧ ♥ ✦ ♥ ✧ ♥' },

          { id: 41, name: 'Heart grid', symbol: '♥ ♥ ♥ ♥ ♥ ♥' },
          { id: 42, name: 'Love aura long', symbol: '✧ ♥ ✧ ♥ ✧ ♥ ✧ ♥' },
          { id: 43, name: 'Soft romantic', symbol: '♡ ♥ ♡ ♥ ♡ ♥ ♡' },
          { id: 44, name: 'Sparkle chain', symbol: '✦ ✧ ♥ ✦ ✧ ♥ ✦ ✧' },
          { id: 45, name: 'Love mix long', symbol: '♥ ✦ ✧ ♥ ✦ ✧ ♥ ✦ ✧' },
          { id: 46, name: 'Heart dust 2', symbol: '♥ ✧ ✧ ✧ ♥ ✧ ✧ ✧ ♥' },
          { id: 47, name: 'Romantic aura 3', symbol: '✧ ♥ ✧ ♥ ✧ ♥ ✧ ♥ ✧' },
          { id: 48, name: 'Heart chain big', symbol: '♥ ♥ ♥ ♥ ♥ ♥ ♥' },
          { id: 49, name: 'Love glow big', symbol: '✦ ♥ ✦ ♥ ✦ ♥ ✦ ♥ ✦' },
          { id: 50, name: 'Ultimate love', symbol: '♥ ✧ ✦ ♥ ✧ ✦ ♥ ✧ ✦ ♥' },
        ],
      },

      {
        name: 'minimal',
        label: '⚪ Minimal',
        separators: Array.from({ length: 50 }, (_, i) => ({
          id: 100 + i,
          name: 'Minimal ' + (i + 1),
          symbol: ['·','-','|','~','=','.'][i % 6].repeat(3 + (i % 5)).split('').join(' ')
        })),
      },

      {
        name: 'classic',
        label: '🌸 Klasyczne',
        separators: Array.from({ length: 50 }, (_, i) => ({
          id: 200 + i,
          name: 'Classic ' + (i + 1),
          symbol: ['✿','❀','✦','❧','❦'][i % 5] + ' ' +
                  ['✿','❀','✦','❧','❦'][i % 5] + ' ' +
                  ['✿','❀','✦','❧','❦'][i % 5]
        })),
      },
    ],
  },

{
  name: 'emoji',
  label: '😀 Emoji',
  subcategories: [
    {
      name: 'emocje',
      label: '💔 Emocje',
      separators: Array.from({ length: 50 }, (_, i) => ({
        id: 300 + i,
        name: 'Emotion ' + (i + 1),
        symbol: ['❤️','😢','😡','😂','😍','😭','😴','😱','🥺','😎'][i % 10]
      })),
    },

    {
      name: 'natura',
      label: '🌙 Natura',
      separators: Array.from({ length: 50 }, (_, i) => ({
        id: 400 + i,
        name: 'Nature ' + (i + 1),
        symbol: ['🌙','🌸','🌊','🔥','❄️','🌲','🌼','🌻','🍃','🌺'][i % 10]
      })),
    },

    {
      name: 'mix',
      label: '✨ Mix',
      separators: Array.from({ length: 50 }, (_, i) => ({
        id: 500 + i,
        name: 'Mix ' + (i + 1),
        symbol: ['❤️','🔥','🌙','✨','⚡','💭','🎭','🌌','💔','⭐'][i % 10]
      })),
    },
  ],
}



];










  get currentCategory(): SeparatorCategory {
    return this.categories.find(c => c.name === this.activeCategory)!;
  }

  get currentSubCategory(): SeparatorSubCategory {
    return (
      this.currentCategory.subcategories.find(
        s => s.name === this.activeSubCategory
      ) ?? this.currentCategory.subcategories[0]
    );
  }

  setCategory(cat: SeparatorCategory) {
    this.activeCategory = cat.name;
    this.activeSubCategory = cat.subcategories[0].name;
  }

  selectSeparator(separator: SeparatorOption) {
    this.selectedSeparator = separator;
    this.onSeparatorSelect?.(separator.symbol);
  }

applySeparator() {
  if (!this.selectedSeparator) return;
  this.onSeparatorSelect?.(this.selectedSeparator.symbol);
}


}