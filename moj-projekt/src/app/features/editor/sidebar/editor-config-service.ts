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
    {
      name: 'Romantic',
      icon: '💖',
      template: 'Romantic',
      variant: { name: 'Soft Love' },
      titleFont: "'Playfair Display', serif",
      textFont: "'Crimson Text', serif",
      textColor: '#7f1d1d',
      titleColor: '#7f1d1d',
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
      titleColor: '#111111',
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
      titleColor: '#3b2f2f',
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
      titleColor: '#be185d',
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
      titleColor: '#1f2937',
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
      titleColor: '#111111',
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
      titleColor: '#374151',
      autoFormat: 'compact',
    },
  ];


//  themes = [
//     { name: 'THEME.ROMANTIC' },
//     { name: 'THEME.MINIMAL' },
//     { name: 'THEME.DARK_POETRY' },
//   ];

//   templates = [
//     {
//       name: 'TEMPLATE.DEFAULT',
//       icon: '📄',
//       variants: [
//         { name: 'VARIANT.CLEAN' },
//         { name: 'VARIANT.PAPER' },
//         { name: 'VARIANT.SOFT' },
//         { name: 'VARIANT.CLASSIC' },
//       ],
//     },
//     {
//       name: 'TEMPLATE.FLORAL',
//       icon: '🌸',
//       variants: [
//         { name: 'VARIANT.SOFT' },
//         { name: 'VARIANT.ELEGANT' },
//         { name: 'VARIANT.FRAME' },
//         { name: 'VARIANT.GARDEN' },
//       ],
//     },
//     {
//       name: 'TEMPLATE.VINTAGE',
//       icon: '📜',
//       variants: [
//         { name: 'VARIANT.OLD_PAPER' },
//         { name: 'VARIANT.GOLD_FRAME' },
//         { name: 'VARIANT.CLASSIC_INK' },
//         { name: 'VARIANT.RETRO' },
//       ],
//     },
//     {
//       name: 'TEMPLATE.ROMANTIC',
//       icon: '❀',
//       variants: [
//         { name: 'VARIANT.HEARTS' },
//         { name: 'VARIANT.SOFT_LOVE' },
//         { name: 'VARIANT.POETRY' },
//         { name: 'VARIANT.ROSE' },
//       ],
//     },
//     {
//       name: 'TEMPLATE.DARK',
//       icon: '🌙',
//       variants: [
//         { name: 'VARIANT.DEEP_NIGHT' },
//         { name: 'VARIANT.SOFT_DARK' },
//         { name: 'VARIANT.NEON' },
//         { name: 'VARIANT.MIDNIGHT' },
//       ],
//     },
//     {
//       name: 'TEMPLATE.MINIMAL',
//       icon: '▫️',
//       variants: [
//         { name: 'VARIANT.LINE' },
//         { name: 'VARIANT.SOFT_LINE' },
//         { name: 'VARIANT.CLEAN_SPACE' },
//         { name: 'VARIANT.MONO' },
//       ],
//     },
//   ];

//   presets = [
//     {
//       name: 'PRESET.ROMANTIC',
//       icon: '💖',
//       template: 'TEMPLATE.ROMANTIC',
//       variant: { name: 'VARIANT.SOFT_LOVE' },
//       titleFont: "'Playfair Display', serif",
//       textFont: "'Crimson Text', serif",
//       textColor: '#7f1d1d',
//       titleColor: '#7f1d1d',
//       autoFormat: 'poetry',
//     },
//     {
//       name: 'PRESET.DARK_POETRY',
//       icon: '🌑',
//       template: 'TEMPLATE.DARK',
//       variant: { name: 'VARIANT.DEEP_NIGHT' },
//       titleFont: "'Cinzel', serif",
//       textFont: "'Merriweather', serif",
//       textColor: '#ffffff',
//       titleColor: '#ffffff',
//       autoFormat: 'poetry',
//     },
//     {
//       name: 'PRESET.MINIMAL_CLEAN',
//       icon: '▫️',
//       template: 'TEMPLATE.MINIMAL',
//       variant: { name: 'VARIANT.LINE' },
//       titleFont: "'Work Sans', sans-serif",
//       textFont: "'Work Sans', sans-serif",
//       textColor: '#222222',
//       titleColor: '#111111',
//       autoFormat: 'compact',
//     },
//     {
//       name: 'PRESET.VINTAGE_BOOK',
//       icon: '📜',
//       template: 'TEMPLATE.VINTAGE',
//       variant: { name: 'VARIANT.OLD_PAPER' },
//       titleFont: "'EB Garamond', serif",
//       textFont: "'EB Garamond', serif",
//       textColor: '#3b2f2f',
//       titleColor: '#3b2f2f',
//       autoFormat: 'poetry',
//     },
//     {
//       name: 'PRESET.FLORAL_SOFT',
//       icon: '🌸',
//       template: 'TEMPLATE.FLORAL',
//       variant: { name: 'VARIANT.SOFT' },
//       titleFont: "'Playfair Display', serif",
//       textFont: "'Libre Baskerville', serif",
//       textColor: '#be185d',
//       titleColor: '#be185d',
//       autoFormat: 'poetry',
//     },
//     {
//       name: 'PRESET.CLASSIC_POETRY',
//       icon: '✒️',
//       template: 'TEMPLATE.DEFAULT',
//       variant: { name: 'VARIANT.PAPER' },
//       titleFont: "'Cormorant Garamond', serif",
//       textFont: "'Libre Baskerville', serif",
//       textColor: '#1f2937',
//       titleColor: '#1f2937',
//       autoFormat: 'poetry',
//     },
//     {
//       name: 'PRESET.ELEGANT_BOOK',
//       icon: '📖',
//       template: 'TEMPLATE.DEFAULT',
//       variant: { name: 'VARIANT.CLASSIC' },
//       titleFont: "'Playfair Display', serif",
//       textFont: "'Lora', serif",
//       textColor: '#111111',
//       titleColor: '#111111',
//       autoFormat: 'poetry',
//     },
//     {
//       name: 'PRESET.SOFT_JOURNAL',
//       icon: '🕊️',
//       template: 'TEMPLATE.MINIMAL',
//       variant: { name: 'VARIANT.CLEAN_SPACE' },
//       titleFont: "'Cormorant Garamond', serif",
//       textFont: "'Crimson Text', serif",
//       textColor: '#374151',
//       titleColor: '#374151',
//       autoFormat: 'compact',
//     },
//   ];



}
