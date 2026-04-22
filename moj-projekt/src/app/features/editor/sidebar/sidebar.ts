import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, type OnChanges, type SimpleChanges } from '@angular/core';
import { EditorConfigService } from '../sidebar/editor-config-service';
import { TranslateModule } from '@ngx-translate/core';
import { EditorStateService } from './editor-state-service';
import { ViewChild, ElementRef, AfterViewInit } from '@angular/core';
@Component({
  selector: 'app-sidebar',
  imports: [CommonModule, TranslateModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar implements  OnChanges {




  @ViewChild('indicator') indicator!: ElementRef;
  @ViewChild('sidebar') sidebar!: ElementRef;

  /* ============================= */
  /* 🔥 INPUTS (z backendu) */
  /* ============================= */
  // @Input() selectedTemplate = '';
  @Input() selectedTheme = '';
  @Input() selectedVariant: any = null;

  /* ============================= */
  /* 🔥 OUTPUTS */
  /* ============================= */
  @Output() themeChange = new EventEmitter<string>();
  @Output() templateChange = new EventEmitter<string>();
  @Output() variantChange = new EventEmitter<any>();
  @Output() save = new EventEmitter<void>();
  @Output() clear = new EventEmitter<void>();
  @Output() presetChange = new EventEmitter<any>();
private indicatorTarget: 'template' | 'variant' = 'template';
  /* ============================= */
  /* 🔥 LOCAL STATE */
  /* ============================= */
  openTemplate: string | null = null;
  selectedPreset: string = '';
  private lastClickedTemplate: string | null = null;


  constructor(
    private config: EditorConfigService,
    private state: EditorStateService,
  ) {}

// selectedTemplate: string = '';
// selectedVariant: any = null;

selectedTemplate: string | null = null;
// selectedVariant: any = null;

ngOnInit() {
  this.state.template$.subscribe(t => {
    this.selectedTemplate = t;

    if (t) {
      this.openTemplate = t;
      this.lastClickedTemplate = t;
    }

    this.updateIndicatorFromState();
  });

  this.state.variant$.subscribe(v => {
    this.selectedVariant = v;
    this.updateIndicatorFromState();
  });
}


















  /* ============================= */
  /* 🔥 GETTERS */
  /* ============================= */
  get themes() {
    return this.config.themes;
  }

  get templates() {
    return this.config.templates;
  }

  get presets() {
    return this.config.presets;
  }

  /* ============================= */
  /* 🔥 ACTIONS */
  /* ============================= */
  onThemeClick(name: string) {
    this.themeChange.emit(name);
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

  /* ============================= */
  /* 🔥 INDICATOR */
  /* ============================= */
  

moveIndicator(el: HTMLElement) {
  if (!this.indicator || !this.sidebar) return;

  const indicator = this.indicator.nativeElement as HTMLElement;
  const sidebar = this.sidebar.nativeElement as HTMLElement;

  const elRect = el.getBoundingClientRect();
  const sidebarRect = sidebar.getBoundingClientRect();

  const top = elRect.top - sidebarRect.top + sidebar.scrollTop;

  indicator.style.top = `${top}px`;
  indicator.style.height = `${el.offsetHeight}px`;
}







updateIndicatorFromState() {
  const el =
    this.sidebar.nativeElement.querySelector('.card.active') || // 🔥 najpierw template
    this.sidebar.nativeElement.querySelector('.variant.active');

  if (el) this.moveIndicator(el);
}


  /* ============================= */
  /* 🔥 PRESET */
  /* ============================= */
  onPresetClick(p: any) {
    this.selectedPreset = p.name;

    this.presetChange.emit(p);
    this.state.preset$.next(p);
  }



onTemplateClick(template: any, el: HTMLElement) {
  const isSame = this.lastClickedTemplate === template.name;

  this.lastClickedTemplate = template.name;

  // 🔥 KLUCZ — ustaw open lokalnie
  if (isSame) {
    this.openTemplate =
      this.openTemplate === template.name ? null : template.name;
  } else {
    this.openTemplate = template.name; // 🔥 było null — to był bug
  }

  this.state.template$.next(template.name);

  requestAnimationFrame(() => {
    this.moveIndicator(el);
  });
}




  /* ============================= */
  /* 🔥 VARIANT */
  /* ============================= */
  

onVariantClick(variant: any, el: HTMLElement) {
  this.variantChange.emit(variant);
  this.state.variant$.next(variant);

  this.moveIndicator(el);
}




  /* ============================= */
  /* 🔥 SYNC Z BACKENDEM */
  /* ============================= */
 

ngOnChanges(changes: SimpleChanges) {
  if (changes['selectedTemplate'] && this.selectedTemplate) {
    this.openTemplate = this.selectedTemplate;
    this.lastClickedTemplate = this.selectedTemplate;
  }

  requestAnimationFrame(() => {
    const el =
      this.sidebar?.nativeElement.querySelector('.variant.active') ||
      this.sidebar?.nativeElement.querySelector('.card.active');

    if (el) this.moveIndicator(el as HTMLElement);
  });
}







}
