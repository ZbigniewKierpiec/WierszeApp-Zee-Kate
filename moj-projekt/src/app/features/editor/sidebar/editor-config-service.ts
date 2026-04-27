import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EditorConfigService {

  themes = [
    { name: 'Romantic' },
    { name: 'Minimal' },
    { name: 'Dark Poetry' },
  ];

  templates = [
    {
      name: 'Default',
      icon: '📄',
      variants: [
        { name: 'Clean' },
        { name: 'Paper' },
        { name: 'Soft' },
        { name: 'Classic' },
      ],
    },
    {
      name: 'Floral',
      icon: '🌸',
      variants: [
        { name: 'Soft' },
        { name: 'Elegant' },
        { name: 'Frame' },
        { name: 'Garden' },
      ],
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
      variants: [
        { name: 'Hearts' },
        { name: 'Soft Love' },
        { name: 'Poetry' },
        { name: 'Rose' },
      ],
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



presets = [

  // ❤️ ROMANTIC
  {
    name: 'Romantic',
    icon: '💖',
    template: 'Romantic',
    variant: { name: 'Soft Love' },

    titleFont: "'Playfair Display', serif",
    textFont: "'Cormorant Garamond', serif",

    textColor: '#5b1e2f',
    titleColor: '#4a1626',

    autoFormat: 'poetry',

    layout: {
      padding: '120px 100px',
      maxWidth: '460px',
      textAlign: 'center',
    },

    typography: {
      fontSize: '22px',
      lineHeight: '2',
      letterSpacing: '0.025em',
    },

    decoration: {
      divider: {
        enabled: true,
        style: 'romantic',
        symbol: '❀ ❀ ❀',
      },
      pattern: {
        type: 'hearts',
        size: 120,
      },
      stanzaSpacing: '28px',
      dropCap: true,
    },
  },

  // 🌑 DARK POETRY
  {
    name: 'Dark Poetry',
    icon: '🌑',
    template: 'Dark',
    variant: { name: 'Deep Night' },

    titleFont: "'Cinzel', serif",
    textFont: "'Merriweather', serif",

    textColor: '#e5e7eb',
    titleColor: '#ffffff',

    autoFormat: 'poetry',

    layout: {
      padding: '100px 80px',
      maxWidth: '520px',
      textAlign: 'left',
    },

    typography: {
      fontSize: '18px',
      lineHeight: '1.85',
      letterSpacing: '0.01em',
    },

    decoration: {
      divider: {
        enabled: true,
        style: 'dark',
        symbol: '✦ ✦ ✦',
      },
      pattern: {
        type: 'dots',
        size: 100,
      },
      stanzaSpacing: '24px',
    },
  },

  // ▫️ MINIMAL
  {
    name: 'Minimal Clean',
    icon: '▫️',
    template: 'Minimal',
    variant: { name: 'Line' },

    titleFont: "'Work Sans', sans-serif",
    textFont: "'Work Sans', sans-serif",

    textColor: '#222222',
    titleColor: '#111111',

    autoFormat: 'compact',

    layout: {
      padding: '90px 70px',
      maxWidth: '400px',
    },

    typography: {
      fontSize: '17px',
      lineHeight: '1.7',
    },

    decoration: {
      divider: {
        enabled: false,
        style: 'minimal',
        symbol: '',
      },
      pattern: null,
    },
  },

  // 📜 VINTAGE
  {
    name: 'Vintage Book',
    icon: '📜',
    template: 'Vintage',
    variant: { name: 'Old Paper' },

    titleFont: "'EB Garamond', serif",
    textFont: "'EB Garamond', serif",

    textColor: '#3b2f2f',
    titleColor: '#3b2f2f',

    autoFormat: 'poetry',

    layout: {
      padding: '100px 90px',
      maxWidth: '440px',
      textAlign: 'left',
    },

    typography: {
      fontSize: '19px',
      lineHeight: '2',
    },

    decoration: {
      divider: {
        enabled: true,
        style: 'vintage',
        symbol: '✧ ✧ ✧',
      },
      pattern: {
        type: 'paper',
        size: 140,
      },
      stanzaSpacing: '26px',
      dropCap: true,
    },
  },

  // 🌸 FLORAL
  {
    name: 'Floral Soft',
    icon: '🌸',
    template: 'Floral',
    variant: { name: 'Soft' },

    titleFont: "'Playfair Display', serif",
    textFont: "'Libre Baskerville', serif",

    textColor: '#be185d',
    titleColor: '#be185d',

    autoFormat: 'poetry',

    layout: {
      padding: '110px 90px',
      maxWidth: '480px',
      textAlign: 'center',
    },

    typography: {
      fontSize: '20px',
      lineHeight: '1.9',
    },

    decoration: {
      divider: {
        enabled: true,
        style: 'floral',
        symbol: '🌸 🌸 🌸',
      },
      pattern: {
        type: 'hearts',
        size: 120,
      },
      stanzaSpacing: '28px',
    },
  },

  // ✒️ CLASSIC
  {
    name: 'Classic Poetry',
    icon: '✒️',
    template: 'Default',
    variant: { name: 'Paper' },

    titleFont: "'Cormorant Garamond', serif",
    textFont: "'Libre Baskerville', serif",

    textColor: '#1f2937',
    titleColor: '#1f2937',

    autoFormat: 'poetry',

    layout: {
      padding: '100px 80px',
      maxWidth: '480px',
    },

    typography: {
      fontSize: '18px',
      lineHeight: '1.9',
    },

    decoration: {
      divider: {
        enabled: true,
        style: 'classic',
        symbol: '— — —',
      },
      pattern: null,
    },
  },

  // 📖 ELEGANT
  {
    name: 'Elegant Book',
    icon: '📖',
    template: 'Default',
    variant: { name: 'Classic' },

    titleFont: "'Playfair Display', serif",
    textFont: "'Lora', serif",

    textColor: '#111111',
    titleColor: '#111111',

    autoFormat: 'poetry',

    layout: {
      padding: '110px 90px',
      maxWidth: '460px',
    },

    typography: {
      fontSize: '19px',
      lineHeight: '1.95',
    },

    decoration: {
      divider: {
        enabled: true,
        style: 'elegant',
        symbol: '✦ ✧ ✦',
      },
      pattern: null,
      dropCap: true,
    },
  },

  // 🕊️ JOURNAL
  {
    name: 'Soft Journal',
    icon: '🕊️',
    template: 'Minimal',
    variant: { name: 'Clean Space' },

    titleFont: "'Cormorant Garamond', serif",
    textFont: "'Crimson Text', serif",

    textColor: '#374151',
    titleColor: '#374151',

    autoFormat: 'compact',

    layout: {
      padding: '120px 100px',
      maxWidth: '420px',
    },

    typography: {
      fontSize: '18px',
      lineHeight: '1.8',
    },

    decoration: {
      divider: {
        enabled: false,
        style: 'journal',
        symbol: '',
      },
      pattern: null,
    },
  },

];















  // 🔥 KLUCZOWE: fallback (żeby panel nie znikał)
  getDefaultDecoration() {
    return {
      divider: { enabled: false, style: 'default', symbol: '' },
      pattern: null,
      dropCap: false,
      stanzaSpacing: '0px',
    };
  }









}
