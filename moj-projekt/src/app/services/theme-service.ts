import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {


getVariantStylesBase(t: string, v?: string, overrides: any = {}) {
  const base = {
    background: 'var(--poem-bg)',
    color: 'var(--poem-text)',
    transition: 'all 0.25s ease',

    padding: '90px 80px',
    maxWidth: '600px',
    margin: '0 auto',
    lineHeight: '1.8',
    fontSize: '18px',
  };

  let style: any = { ...base };

  // ================= TEMPLATE =================

  if (t === 'Default') {
    if (!v || v === 'Clean') style.borderRadius = '8px';
    if (v === 'Paper') style.border = '1px solid #e5e7eb';
    if (v === 'Soft') style.boxShadow = '0 4px 12px rgba(0,0,0,0.05)';
    if (v === 'Classic') style.border = '2px solid #111';
  }

  if (t === 'Romantic') style.background = '#fff0f5';
  if (t === 'Dark') {
    style.background = '#0f172a';
    style.color = '#e5e7eb';
  }
  if (t === 'Vintage') style.background = '#fdf6e3';
  if (t === 'Floral') style.background = '#fffafc';

  if (t === 'Minimal') {
    if (!v || v === 'Line') style.borderLeft = '3px solid black';
  }

  // ================= PRESET =================

  if (overrides?.layout) {
    style.padding = overrides.layout.padding ?? style.padding;
    style.maxWidth = overrides.layout.maxWidth ?? style.maxWidth;
    style.textAlign = overrides.layout.textAlign ?? style.textAlign;
  }

  if (overrides?.typography) {
    style.fontSize = overrides.typography.fontSize ?? style.fontSize;
    style.lineHeight = overrides.typography.lineHeight ?? style.lineHeight;
    style.letterSpacing = overrides.typography.letterSpacing ?? style.letterSpacing;
  }

  const deco = overrides?.decoration;

  if (deco) {
    if (deco.stanzaSpacing) {
      style['--stanza-spacing'] = deco.stanzaSpacing;
    }

    if (deco.dropCap) {
      style['--drop-cap'] = 'enabled';
    }
  }

  return style;
}













getVariantStyles(template: string, variant?: string, overrides: any = {}) {
  return this.getVariantStylesBase(template, variant, overrides);
}





}
