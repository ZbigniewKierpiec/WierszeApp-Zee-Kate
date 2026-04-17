import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar {
  @Input() selectedTemplate = '';
  @Input() selectedTheme = '';
  @Input() selectedVariant: any = null;
  @Output() themeChange = new EventEmitter<string>();
  @Output() templateChange = new EventEmitter<string>();
  @Output() variantChange = new EventEmitter<any>();
  @Output() save = new EventEmitter<void>();
  @Output() clear = new EventEmitter<void>();
  @Output() presetChange = new EventEmitter<any>();
  openTemplate: string | null = null;
  selectedPreset: string = '';
  themes = [{ name: 'Romantic' }, { name: 'Minimal' }, { name: 'Dark Poetry' }];

  // presets = [
  //   {
  //     name: 'Romantic',
  //     icon: '💖',
  //     template: 'Romantic',
  //     variant: { name: 'Soft Love' },
  //     titleFont: "'Playfair Display', serif",
  //     textFont: "'Crimson Text', serif",
  //     textColor: '#7f1d1d',
  //   },
  //   {
  //     name: 'Dark Poetry',
  //     icon: '🌑',
  //     template: 'Dark',
  //     variant: { name: 'Deep Night' },
  //     titleFont: "'Cinzel', serif",
  //     textFont: "'Merriweather', serif",
  //     textColor: '#ffffff',
  //     titleColor: '#ffffff',
  //   },
  //   {
  //     name: 'Minimal Clean',
  //     icon: '▫️',
  //     template: 'Minimal',
  //     variant: { name: 'Line' },
  //     titleFont: "'Work Sans', sans-serif",
  //     textFont: "'Work Sans', sans-serif",
  //     textColor: '#222222',
  //   },
  //   {
  //     name: 'Vintage Book',
  //     icon: '📜',
  //     template: 'Vintage',
  //     variant: { name: 'Old Paper' },
  //     titleFont: "'EB Garamond', serif",
  //     textFont: "'EB Garamond', serif",
  //     textColor: '#3b2f2f',
  //   },
  //   {
  //     name: 'Floral Soft',
  //     icon: '🌸',
  //     template: 'Floral',
  //     variant: { name: 'Soft' },
  //     titleFont: "'Playfair Display', serif",
  //     textFont: "'Libre Baskerville', serif",
  //     textColor: '#be185d',
  //   },

  //   // 🔥 BONUSY (lepszy UX)
  //   {
  //     name: 'Classic Poetry',
  //     icon: '✒️',
  //     template: 'Default',
  //     variant: { name: 'Paper' },
  //     titleFont: "'Cormorant Garamond', serif",
  //     textFont: "'Libre Baskerville', serif",
  //     textColor: '#1f2937',
  //   },
  //   {
  //     name: 'Elegant Book',
  //     icon: '📖',
  //     template: 'Default',
  //     variant: { name: 'Classic' },
  //     titleFont: "'Playfair Display', serif",
  //     textFont: "'Lora', serif",
  //     textColor: '#111111',
  //   },
  //   {
  //     name: 'Soft Journal',
  //     icon: '🕊️',
  //     template: 'Minimal',
  //     variant: { name: 'Clean Space' },
  //     titleFont: "'Cormorant Garamond', serif",
  //     textFont: "'Crimson Text', serif",
  //     textColor: '#374151',
  //   },
  // ];

  presets = [
    {
      name: 'Romantic',
      icon: '💖',
      template: 'Romantic',
      variant: { name: 'Soft Love' },
      titleFont: "'Playfair Display', serif",
      textFont: "'Crimson Text', serif",
      textColor: '#7f1d1d',
      titleColor: '#7f1d1d', // 🔥 DODAJ
      autoFormat: 'poetry',
    },
    {
      name: 'Dark Poetry',
      icon: '🌑',
      template: 'Dark',
      variant: { name: 'Deep Night' },
      titleFont: "'Cinzel', serif",
      textFont: "'Merriweather', serif",
      textColor: '#ffffff',
      titleColor: '#ffffff',
      autoFormat: 'poetry',
    },
    {
      name: 'Minimal Clean',
      icon: '▫️',
      template: 'Minimal',
      variant: { name: 'Line' },
      titleFont: "'Work Sans', sans-serif",
      textFont: "'Work Sans', sans-serif",
      textColor: '#222222',
      titleColor: '#111111', // 🔥 DODAJ
      autoFormat: 'compact',
    },
    {
      name: 'Vintage Book',
      icon: '📜',
      template: 'Vintage',
      variant: { name: 'Old Paper' },
      titleFont: "'EB Garamond', serif",
      textFont: "'EB Garamond', serif",
      textColor: '#3b2f2f',
      titleColor: '#3b2f2f', // 🔥 DODAJ
      autoFormat: 'poetry',
    },
    {
      name: 'Floral Soft',
      icon: '🌸',
      template: 'Floral',
      variant: { name: 'Soft' },
      titleFont: "'Playfair Display', serif",
      textFont: "'Libre Baskerville', serif",
      textColor: '#be185d',
      titleColor: '#be185d', // 🔥 DODAJ
      autoFormat: 'poetry',
    },

    {
      name: 'Classic Poetry',
      icon: '✒️',
      template: 'Default',
      variant: { name: 'Paper' },
      titleFont: "'Cormorant Garamond', serif",
      textFont: "'Libre Baskerville', serif",
      textColor: '#1f2937',
      titleColor: '#1f2937', // 🔥 DODAJ
      autoFormat: 'poetry',
    },
    {
      name: 'Elegant Book',
      icon: '📖',
      template: 'Default',
      variant: { name: 'Classic' },
      titleFont: "'Playfair Display', serif",
      textFont: "'Lora', serif",
      textColor: '#111111',
      titleColor: '#111111', // 🔥 DODAJ
      autoFormat: 'poetry',
    },
    {
      name: 'Soft Journal',
      icon: '🕊️',
      template: 'Minimal',
      variant: { name: 'Clean Space' },
      titleFont: "'Cormorant Garamond', serif",
      textFont: "'Crimson Text', serif",
      textColor: '#374151',
      titleColor: '#374151', // 🔥 DODAJ
      autoFormat: 'compact',
    },
  ];

  onPresetClick(p: any) {
    this.selectedPreset = p.name;

    this.presetChange.emit(p);
  }

  templates = [
    {
      name: 'Default',
      icon: '📄',
      variants: [{ name: 'Clean' }, { name: 'Paper' }, { name: 'Soft' }, { name: 'Classic' }],
    },
    {
      name: 'Floral',
      icon: '🌸',
      variants: [{ name: 'Soft' }, { name: 'Elegant' }, { name: 'Frame' }, { name: 'Garden' }],
    },
    {
      name: 'Vintage',
      icon: '📜',
      variants: [
        { name: 'Old Paper' },
        { name: 'Gold Frame' },
        { name: 'Classic Ink' },
        { name: 'Retro' },
      ],
    },
    {
      name: 'Romantic',
      icon: '❀',
      variants: [{ name: 'Hearts' }, { name: 'Soft Love' }, { name: 'Poetry' }, { name: 'Rose' }],
    },
    {
      name: 'Dark',
      icon: '🌙',
      variants: [
        { name: 'Deep Night' },
        { name: 'Soft Dark' },
        { name: 'Neon' },
        { name: 'Midnight' },
      ],
    },
    {
      name: 'Minimal',
      icon: '▫️',
      variants: [
        { name: 'Line' },
        { name: 'Soft Line' },
        { name: 'Clean Space' },
        { name: 'Mono' },
      ],
    },
  ];

  onThemeClick(name: string) {
    this.themeChange.emit(name);
  }
  onTemplateClick(template: any) {
    const isAlreadySelected = this.selectedTemplate === template.name;

    this.templateChange.emit(template.name);

    if (isAlreadySelected) {
      this.openTemplate = this.openTemplate === template.name ? null : template.name;
    } else {
      this.openTemplate = null;
    }
  }

  onVariantClick(variant: any) {
    this.variantChange.emit(variant);
  }

  onSave() {
    this.save.emit();
  }

  onClear() {
    this.clear.emit();
  }

  onPreview() {
    console.log('📖 preview');
  }

  onExport() {
    console.log('📥 export');
  }
}
