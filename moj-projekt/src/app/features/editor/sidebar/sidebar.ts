import {
  Component,
  EventEmitter,
  Output,
  ViewChild,
  ElementRef,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { Subject, takeUntil } from 'rxjs';
import { EditorConfigService } from '../sidebar/editor-config-service';
import { EditorStateService } from './editor-state-service';
import { AuthService } from '../../../services/auth-service';
import { MatDialog } from '@angular/material/dialog';
import { UiDialog } from '../../../shared/ui-dialog/ui-dialog';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar implements OnInit, OnDestroy {
  @ViewChild('indicator') indicator!: ElementRef;
  @ViewChild('sidebar') sidebar!: ElementRef;

  /* ============================= */
  /* 🔥 OUTPUTS */
  /* ============================= */
  @Output() themeChange = new EventEmitter<string>();
  @Output() templateChange = new EventEmitter<string>();
  @Output() variantChange = new EventEmitter<any>();
  @Output() save = new EventEmitter<void>();
  @Output() clear = new EventEmitter<void>();
  @Output() presetChange = new EventEmitter<any>();

  /* ============================= */
  /* 🔥 LOCAL STATE */
  /* ============================= */
  selectedTemplate: string = '';
  selectedVariant: any = null;
  isCustomizeMode = false;
  isCustomizeOpen = false;
  openTemplate: string | null = null;
  selectedPreset: string = '';
  private lastClickedTemplate: string | null = null;

  private destroy$ = new Subject<void>();

  constructor(
    private config: EditorConfigService,
    private state: EditorStateService,
    private auth: AuthService,
    private dialog: MatDialog  
  ) {}

  ngOnInit() {
    this.state.template$.pipe(takeUntil(this.destroy$)).subscribe((t) => {
      if (!t) return;

      this.selectedTemplate = t;
      this.openTemplate = t;
      this.lastClickedTemplate = t;

      this.updateIndicatorFromState();
    });

    this.state.variant$.pipe(takeUntil(this.destroy$)).subscribe((v) => {
      this.selectedVariant = v;
      this.updateIndicatorFromState();
    });

    // 🔥 DODAJ TUTAJ
    this.state.preset$.pipe(takeUntil(this.destroy$)).subscribe((p) => {
      this.selectedPreset = p?.name || '';

      // 🔥 opcjonalnie: otwórz template z preset
      if (p?.template) {
        this.openTemplate = p.template;
        this.lastClickedTemplate = p.template;
      }
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  // openCustomize() {
  //   this.isCustomizeOpen = !this.isCustomizeOpen;
  // }

  // openCustomize() {
  //   this.isCustomizeOpen = !this.isCustomizeOpen;

  //   this.state.isCustomizeOpen$.next(this.isCustomizeOpen);
  // }

  // openCustomize() {
  //   if (!this.isLoggedIn) {
  //     return;
  //   }

  //   this.isCustomizeOpen = !this.isCustomizeOpen;
  //   this.state.isCustomizeOpen$.next(this.isCustomizeOpen);
  // }


openCustomize() {
  if (!this.isLoggedIn) {

    this.dialog.open(UiDialog, {
      data: {
        icon: '🔒',
        title: 'Personalizacja niedostępna',
        message: 'Zaloguj się, aby dostosować styl swojego wiersza.',
        confirmText: 'Zaloguj się',
        cancelText: 'Anuluj'
      }
    })
    .afterClosed()
    .subscribe(res => {
      if (res) {
        window.location.href = '/login'; // lub router.navigate
      }
    });

    return;
  }

  this.isCustomizeOpen = !this.isCustomizeOpen;
  this.state.isCustomizeOpen$.next(this.isCustomizeOpen);
}









  get isLoggedIn(): boolean {
    return this.auth.isLoggedIn();
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
    requestAnimationFrame(() => {
      let el: HTMLElement | null = null;

      // 🔥 PRIORYTET → variant
      if (this.selectedVariant) {
        el = this.sidebar.nativeElement.querySelector('.variant.active');
      }

      // 🔥 fallback → template
      if (!el) {
        el = this.sidebar.nativeElement.querySelector('.card.active');
      }

      if (el) this.moveIndicator(el);
    });
  }

  // updateIndicatorFromState() {
  //   requestAnimationFrame(() => {
  //     let el: HTMLElement | null = null;

  //     if (this.selectedVariant) {
  //       el = this.sidebar.nativeElement.querySelector('.variant.active');
  //     }

  //     if (!el) {
  //       el = this.sidebar.nativeElement.querySelector('.card.active');
  //     }

  //     const indicator = this.indicator?.nativeElement as HTMLElement;

  //     // 🔥 JEŚLI NIC NIE MA → UKRYJ
  //     if (!el) {
  //       indicator.style.opacity = '0';
  //       indicator.style.height = '0px';
  //       return;
  //     }

  //     // 🔥 POKAŻ + PRZESUŃ
  //     indicator.style.opacity = '1';
  //     this.moveIndicator(el);
  //   });
  // }

  /* ============================= */
  /* 🔥 PRESET */
  /* ============================= */
  onPresetClick(p: any) {
    this.selectedPreset = p.name;

    this.presetChange.emit(p);
    this.state.preset$.next(p);
  }

  /* ============================= */
  /* 🔥 TEMPLATE */
  /* ============================= */
  onTemplateClick(template: any, el: HTMLElement) {
    const isSame = this.lastClickedTemplate === template.name;

    this.lastClickedTemplate = template.name;

    if (isSame) {
      this.openTemplate = this.openTemplate === template.name ? null : template.name;
    } else {
      this.openTemplate = template.name;
    }

    // 🔥 reset variant przy zmianie template
    this.state.variant$.next(null);

    this.state.template$.next(template.name);

    requestAnimationFrame(() => {
      this.moveIndicator(el);
    });
  }

  /* ============================= */
  /* 🔥 VARIANT */
  /* ============================= */
  onVariantClick(variant: any, el: HTMLElement) {
    this.state.variant$.next(variant);

    requestAnimationFrame(() => {
      this.moveIndicator(el);
    });
  }
}
