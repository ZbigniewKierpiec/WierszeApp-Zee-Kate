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




}
