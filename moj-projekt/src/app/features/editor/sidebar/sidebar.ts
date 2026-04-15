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

  openTemplate: string | null = null;

  themes = [{ name: 'Romantic' }, { name: 'Minimal' }, { name: 'Dark Poetry' }];

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
