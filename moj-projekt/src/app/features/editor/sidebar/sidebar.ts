import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { EditorConfigService } from '../sidebar/editor-config-service';

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

  constructor(private config: EditorConfigService) {}

  onPresetClick(p: any) {
    this.selectedPreset = p.name;

    this.presetChange.emit(p);
  }

  get themes() {
    return this.config.themes;
  }

  get templates() {
    return this.config.templates;
  }

  get presets() {
    return this.config.presets;
  }

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
