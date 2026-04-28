import { CommonModule } from '@angular/common';
import { Component, type Type, AfterViewInit,  ChangeDetectorRef } from '@angular/core';
import interact from 'interactjs';

import { ColorsPanel } from './panels/colors-panel/colors-panel';
import { BackgroundPanel } from './panels/background-panel/background-panel';
import { TextPanel } from './panels/text-panel/text-panel';
import { SeparatorPanel } from './panels/separator-panel/separator-panel';
import { FontPanel } from './panels/font-panel/font-panel';

@Component({
  selector: 'app-poem-editor',
  standalone: true,
  imports: [
    CommonModule,
    ColorsPanel,
    TextPanel,
    SeparatorPanel,
    FontPanel,
    BackgroundPanel,
  ],
  templateUrl: './poem-editor.html',
  styleUrl: './poem-editor.scss',
})
export class PoemEditor implements AfterViewInit {
guideLeftX = 0;
guideRightX = 0;
guideTopY = 0;
guideHeight = 0;
spacingValue = 0;
showSpacingGuide = false;
  activePanel = 'colors';
  backgroundStyle = '';

  poemColor = '#3b2a20';
  poemFont = '"Playfair Display", serif';
  poemFontWeight: string | number = 'normal';
  poemFontStyle = 'normal';

constructor(private cdr: ChangeDetectorRef) {}
  readonly TOLERANCE = 1.5;

  editorTabs = [
    { id: 'text', label: 'Tekst', icon: 'T' },
    { id: 'fonts', label: 'Czcionka', icon: 'Aa' },
    { id: 'colors', label: 'Kolory', icon: '🎨' },
    { id: 'background', label: 'Tło', icon: '🖼' },
    { id: 'decorations', label: 'Dekoracje', icon: '❀' },
  ];

  panelMap: Record<string, Type<any>> = {
    colors: ColorsPanel,
    background: BackgroundPanel,
    fonts: FontPanel,
    decorations: SeparatorPanel,
  };



ngAfterViewInit() {
  interact('.draggable').draggable({
    inertia: true,

    listeners: {

      // 🔥 TU WKLEJASZ move
      move: (event) => {
        requestAnimationFrame(() => {
          const target = event.target as HTMLElement;

          const currentY = parseFloat(target.getAttribute('data-y') || '0');
          const newY = currentY + event.dy;

          target.style.transform = `translateY(${newY}px)`;
          target.setAttribute('data-y', newY.toString());

          this.handleSpacing(target);
        });
      },

      // 🔥 END zostaje normalnie
      end: (event) => {
        this.handleSnap(event.target as HTMLElement);
      }
    }
  });
}














normalize(v: number) {
  return parseFloat(v.toFixed(2));
}


handleSpacing(dragged: HTMLElement) {
  const paper = dragged.closest('.paper') as HTMLElement;
  const paperRect = paper.getBoundingClientRect();

  const elements = Array.from(
    paper.querySelectorAll('.draggable')
  ) as HTMLElement[];

  const items = elements.map(el => {
    const rect = el.getBoundingClientRect();

    return {
      el,
      top: this.normalize(rect.top - paperRect.top),
      bottom: this.normalize(rect.bottom - paperRect.top),
      height: this.normalize(rect.height)
    };
  });

  items.sort((a, b) => a.top - b.top);

  const gaps: number[] = [];

  for (let i = 0; i < items.length - 1; i++) {
    const gap = this.normalize(items[i + 1].top - items[i].bottom);
    if (gap > 0) gaps.push(gap);
  }

  if (!gaps.length) {
    this.showSpacingGuide = false;
    this.lastMatch = null;
    this.cdr.detectChanges();
    return;
  }

  // 🔥 MEDIANA (stabilniejsza niż "najczęstszy")
  const sorted = [...gaps].sort((a, b) => a - b);
  const target = sorted[Math.floor(sorted.length / 2)];

  const draggedItem = items.find(i => i.el === dragged)!;

  const tol = this.getTolerance();
  let matched = false;

  for (const item of items) {
    if (item.el === dragged) continue;

    const gapTop = this.normalize(draggedItem.top - item.bottom);
    const gapBottom = this.normalize(item.top - draggedItem.bottom);

    // 🔼 GÓRA
    if (Math.abs(gapTop - target) < tol) {
      this.lastMatch = {
        value: target,
        top: item.bottom,
        height: gapTop
      };

      this.drawGuide(dragged, item.bottom, gapTop, target);
      matched = true;
      break;
    }

    // 🔽 DÓŁ
    if (Math.abs(gapBottom - target) < tol) {
      this.lastMatch = {
        value: target,
        top: draggedItem.bottom,
        height: gapBottom
      };

      this.drawGuide(dragged, draggedItem.bottom, gapBottom, target);
      matched = true;
      break;
    }
  }

  // 🔥 STABILIZACJA (NO FLICKER)
  if (!matched) {
    if (this.lastMatch) {
      this.drawGuide(
        dragged,
        this.lastMatch.top,
        this.lastMatch.height,
        this.lastMatch.value
      );
    } else {
      this.showSpacingGuide = false;
    }
  }

  this.cdr.detectChanges();
}









readonly BASE_TOLERANCE = 1.5;


private lastMatch: {
  value: number;
  top: number;
  height: number;
} | null = null;
getTolerance() {
  return this.showSpacingGuide ? this.BASE_TOLERANCE + 1.5 : this.BASE_TOLERANCE;
}

drawGuide(dragged: HTMLElement, top: number, height: number, value: number) {
  const paper = dragged.closest('.paper') as HTMLElement;
  const paperRect = paper.getBoundingClientRect();
  const rect = dragged.getBoundingClientRect();

  this.showSpacingGuide = true;

  this.spacingValue = Math.round(value);

  this.guideTopY = top;
  this.guideHeight = height;

  this.guideLeftX = rect.left - paperRect.left;
  this.guideRightX = rect.right - paperRect.left;
}





applyGuide(dragged: HTMLElement, top: number, height: number, value: number) {
  const paper = dragged.closest('.paper') as HTMLElement;

  const paperRect = paper.getBoundingClientRect();
  const rect = dragged.getBoundingClientRect();

  this.showSpacingGuide = true;
  this.spacingValue = value;

  // 🔥 KLUCZ: przelicz Y do paper
  this.guideTopY = rect.top - paperRect.top;
  this.guideHeight = height;

  // 🔥 KLUCZ: X względem paper
  this.guideLeftX = rect.left - paperRect.left;
  this.guideRightX = rect.right - paperRect.left;
}







  // 🔥 SNAP
  handleSnap(el: HTMLElement) {
    const y = parseFloat(el.getAttribute('data-y') || '0');

    const snap = Math.round(y / 8) * 8; // grid 8px

    el.style.transform = `translateY(${snap}px)`;
    el.setAttribute('data-y', snap.toString());
  }

  // 🎨 PANEL LOGIC
  onColorChange(c: string) { this.poemColor = c; }
  onFontChange(f: any) {
    this.poemFont = f.fontFamily;
    this.poemFontWeight = f.fontWeight || 'normal';
    this.poemFontStyle = f.fontStyle || 'normal';
  }
  onBackgroundChange(bg: any) {
    this.backgroundStyle = bg.overlay
      ? `url(${bg.overlay}), url(${bg.base})`
      : `url(${bg.base})`;
  }

  get currentPanelInputs() {
    if (this.activePanel === 'colors') {
      return { onColorSelect: (c: string) => this.onColorChange(c) };
    }
    if (this.activePanel === 'background') {
      return { onBackgroundSelect: (bg: any) => this.onBackgroundChange(bg) };
    }
    if (this.activePanel === 'fonts') {
      return { onFontSelect: (f: any) => this.onFontChange(f) };
    }
    return {};
  }
}