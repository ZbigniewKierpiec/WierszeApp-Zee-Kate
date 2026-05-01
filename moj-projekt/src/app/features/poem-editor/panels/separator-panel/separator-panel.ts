import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
// Interfejs dla pojedynczego wzoru separatora

interface SeparatorOption {
  id: number;
  name: string;
  symbol: string;
}

interface SeparatorCategory {
  name: string;
  label: string;
  separators: SeparatorOption[];
}

@Component({
  selector: 'app-separator-panel',
  imports: [CommonModule],
  templateUrl: './separator-panel.html',
  styleUrl: './separator-panel.scss',
})
export class SeparatorPanel {
  @Input() onSeparatorSelect!: (sep: string) => void;

  activeCategory = 'wszystkie';

  selectedSeparator: SeparatorOption | null = null;

  categories: SeparatorCategory[] = [
    {
      name: 'wszystkie',
      label: 'Wszystkie',
      separators: [
        // ===== ROMANTYCZNE (1–40) =====
        { id: 1, name: 'Serce', symbol: '♥' },
        { id: 2, name: 'Trzy serca', symbol: '♥ ♥ ♥' },
        { id: 3, name: 'Serce i gwiazda', symbol: '♥ ✦ ♥' },
        { id: 4, name: 'Serca pełne', symbol: '❤ ❤ ❤' },
        { id: 5, name: 'Serce i kropki', symbol: '♥ · ♥ · ♥' },
        { id: 6, name: 'Serce i linie', symbol: '— ♥ —' },
        { id: 7, name: 'Serce i kwiat', symbol: '♥ ✿ ♥' },
        { id: 8, name: 'Serce i ornament', symbol: '♥ ❦ ♥' },
        { id: 9, name: 'Serce i gwiazdki', symbol: '♥ ✧ ✦ ♥' },
        { id: 10, name: 'Serce i fale', symbol: '~ ♥ ~' },
        { id: 11, name: 'Róża', symbol: '✿ ✿ ✿' },
        { id: 12, name: 'Kwiaty', symbol: '❀ ❀ ❀' },
        { id: 13, name: 'Kwiat i kropki', symbol: '✿ · ✿ · ✿' },
        { id: 14, name: 'Kwiat i linie', symbol: '— ❀ —' },
        { id: 15, name: 'Kwiaty i serce', symbol: '✿ ♥ ✿' },
        { id: 16, name: 'Gwiazdy miękkie', symbol: '✦ ✦ ✦' },
        { id: 17, name: 'Gwiazdy romantyczne', symbol: '✧ ✦ ✧' },
        { id: 18, name: 'Gwiazdy i serce', symbol: '✦ ♥ ✦' },
        { id: 19, name: 'Ornament 1', symbol: '❦ ❦ ❦' },
        { id: 20, name: 'Ornament 2', symbol: '❧ ❧ ❧' },
        { id: 21, name: 'Ornament 3', symbol: '✽ ✽ ✽' },
        { id: 22, name: 'Ornament 4', symbol: '✺ ✺ ✺' },
        { id: 23, name: 'Serce delikatne', symbol: '♡ ♡ ♡' },
        { id: 24, name: 'Serce i linia', symbol: '— ♥ — ♥ —' },
        { id: 25, name: 'Serce i kwiat mix', symbol: '♥ ✿ ❀ ♥' },
        { id: 26, name: 'Miłość', symbol: '♥ ♥ ✦ ♥ ♥' },
        { id: 27, name: 'Serce aura', symbol: '✧ ♥ ✧' },
        { id: 28, name: 'Serce glow', symbol: '✦ ♥ ✦ ♥ ✦' },
        { id: 29, name: 'Miękkie linie', symbol: '~~ ♥ ~~' },
        { id: 30, name: 'Serce + gwiazda', symbol: '♥ ✶ ♥' },
        { id: 31, name: 'Kwiat linia', symbol: '— ✿ — ✿ —' },
        { id: 32, name: 'Róże', symbol: '✿ ✿ ❀ ✿' },
        { id: 33, name: 'Miłość 2', symbol: '❤ ✧ ❤' },
        { id: 34, name: 'Serce minimal', symbol: '· ♥ ·' },
        { id: 35, name: 'Serce aura 2', symbol: '✧ ♥ ✧ ♥ ✧' },
        { id: 36, name: 'Romantic wave', symbol: '~ ♥ ~ ♥ ~' },
        { id: 37, name: 'Love stars', symbol: '✦ ♥ ✧ ♥ ✦' },
        { id: 38, name: 'Rose chain', symbol: '❀ ✿ ❀ ✿ ❀' },
        { id: 39, name: 'Soft hearts', symbol: '♡ ♥ ♡ ♥ ♡' },
        { id: 40, name: 'Heart sparkle', symbol: '♥ ✦ ✧ ♥ ✦' },

        // ===== MINIMALISTYCZNE (41–80) =====
        { id: 41, name: 'Kropki', symbol: '· · ·' },
        { id: 42, name: 'Kropki pełne', symbol: '• • •' },
        { id: 43, name: 'Linie', symbol: '— — —' },
        { id: 44, name: 'Linia pojedyncza', symbol: '—' },
        { id: 45, name: 'Kropka linia', symbol: '· — ·' },
        { id: 46, name: 'Prosty separator', symbol: '|' },
        { id: 47, name: 'Podwójna linia', symbol: '═ ═ ═' },
        { id: 48, name: 'Minimal gwiazda', symbol: '· ✦ ·' },
        { id: 49, name: 'Minimal dots', symbol: '. . .' },
        { id: 50, name: 'Thin line', symbol: '– – –' },
        { id: 51, name: 'Simple dash', symbol: '- - -' },
        { id: 52, name: 'Pipe line', symbol: '| | |' },
        { id: 53, name: 'Colon', symbol: ': : :' },
        { id: 54, name: 'Minimal slash', symbol: '/ / /' },
        { id: 55, name: 'Backslash', symbol: '\\ \\ \\' },
        { id: 56, name: 'Dots thin', symbol: '· ·' },
        { id: 57, name: 'Line thin', symbol: '— —' },
        { id: 58, name: 'Minimal space', symbol: '• •' },
        { id: 59, name: 'Soft dash', symbol: '– –' },
        { id: 60, name: 'Small dots', symbol: '. .' },
        { id: 61, name: 'Minimal star', symbol: '✧' },
        { id: 62, name: 'Single dot', symbol: '·' },
        { id: 63, name: 'Divider', symbol: '|' },
        { id: 64, name: 'Minimal mix', symbol: '· | ·' },
        { id: 65, name: 'Thin combo', symbol: '- | -' },
        { id: 66, name: 'Soft divider', symbol: '• | •' },
        { id: 67, name: 'Tiny star', symbol: '· ✧ ·' },
        { id: 68, name: 'Dash dot', symbol: '- · -' },
        { id: 69, name: 'Pipe dot', symbol: '| · |' },
        { id: 70, name: 'Minimal equal', symbol: '= = =' },
        { id: 71, name: 'Soft equal', symbol: '≈ ≈ ≈' },
        { id: 72, name: 'Thin divider', symbol: '— · —' },
        { id: 73, name: 'Light dash', symbol: '– · –' },
        { id: 74, name: 'Simple colon', symbol: ':' },
        { id: 75, name: 'Double colon', symbol: '::' },
        { id: 76, name: 'Triple colon', symbol: ':::' },
        { id: 77, name: 'Minimal bracket', symbol: '( )' },
        { id: 78, name: 'Simple star', symbol: '*' },
        { id: 79, name: 'Minimal wave', symbol: '~ ~ ~' },
        { id: 80, name: 'Wave thin', symbol: '~ ~' },

        // ===== KLASYCZNE (81–120) =====
        { id: 81, name: 'Kwiaty', symbol: '✿ ✿ ✿' },
        { id: 82, name: 'Kwiaty pełne', symbol: '❀ ❀ ❀' },
        { id: 83, name: 'Gwiazdy', symbol: '✦ ✦ ✦' },
        { id: 84, name: 'Gwiazda podwójna', symbol: '✶ ✶' },
        { id: 85, name: 'Asterisk', symbol: '✱ ✱ ✱' },
        { id: 86, name: 'Ornament 1', symbol: '❧ ❧ ❧' },
        { id: 87, name: 'Ornament 2', symbol: '❦ ❦ ❦' },
        { id: 88, name: 'Kwiat i linia', symbol: '— ✿ —' },
        { id: 89, name: 'Kwiat i kropki', symbol: '✿ · ✿' },
        { id: 90, name: 'Linie klasyczne', symbol: '— — —' },
        { id: 91, name: 'Linia z ornamentem', symbol: '— ❧ —' },
        { id: 92, name: 'Kwiat + gwiazda', symbol: '✿ ✦ ✿' },
        { id: 93, name: 'Kwiat mix', symbol: '❀ ✿ ❀' },
        { id: 94, name: 'Ornament line', symbol: '— ❦ —' },
        { id: 95, name: 'Classic stars', symbol: '✧ ✦ ✧' },
        { id: 96, name: 'Elegant 1', symbol: '✿ ✽ ✿' },
        { id: 97, name: 'Elegant 2', symbol: '✺ ✽ ✺' },
        { id: 98, name: 'Vintage', symbol: '❧ ✿ ❧' },
        { id: 99, name: 'Vintage 2', symbol: '❦ ✦ ❦' },
        { id: 100, name: 'Classic ornament', symbol: '✱ ✽ ✱' },
        { id: 101, name: 'Classic mix', symbol: '✿ ❀ ✿' },
        { id: 102, name: 'Classic floral', symbol: '❀ ✽ ❀' },
        { id: 103, name: 'Decor line', symbol: '— ✦ — ✦ —' },
        { id: 104, name: 'Decor dots', symbol: '✿ · ✿ · ✿' },
        { id: 105, name: 'Classic soft', symbol: '✿ ✿ ✦ ✿ ✿' },
        { id: 106, name: 'Floral chain', symbol: '❀ ❀ ✿ ❀ ❀' },
        { id: 107, name: 'Vintage line', symbol: '— ❧ ❧ —' },
        { id: 108, name: 'Elegant stars', symbol: '✧ ✦ ✧ ✦' },
        { id: 109, name: 'Classic pattern', symbol: '✿ ✽ ✿ ✽' },
        { id: 110, name: 'Ornament chain', symbol: '❦ ❦ ✦ ❦ ❦' },
        { id: 111, name: 'Classic wave', symbol: '~ ✿ ~ ✿ ~' },
        { id: 112, name: 'Floral mix', symbol: '✿ ❀ ✽ ✿ ❀' },
        { id: 113, name: 'Elegant dots', symbol: '✿ · ✦ · ✿' },
        { id: 114, name: 'Classic star line', symbol: '— ✦ ✦ —' },
        { id: 115, name: 'Vintage floral', symbol: '❧ ✿ ❧ ✿' },
        { id: 116, name: 'Decorative', symbol: '✽ ✺ ✽ ✺' },
        { id: 117, name: 'Classic combo', symbol: '✿ ✦ ❀ ✦ ✿' },
        { id: 118, name: 'Elegant chain', symbol: '❀ ✦ ❀ ✦ ❀' },
        { id: 119, name: 'Soft floral', symbol: '✿ ✿ ❀ ✿ ✿' },
        { id: 120, name: 'Vintage stars', symbol: '✧ ✦ ✧ ✦ ✧' },
      ],
    },
    {
      name: 'romantyczne',
      label: 'Romantyczne',
      separators: [
        { id: 1, name: 'Serce', symbol: '♥' },
        { id: 2, name: 'Trzy serca', symbol: '♥ ♥ ♥' },
        { id: 3, name: 'Serce i gwiazda', symbol: '♥ ✦ ♥' },
        { id: 4, name: 'Serca pełne', symbol: '❤ ❤ ❤' },
        { id: 5, name: 'Serce i kropki', symbol: '♥ · ♥ · ♥' },
        { id: 6, name: 'Serce i linie', symbol: '— ♥ —' },
        { id: 7, name: 'Serce i kwiat', symbol: '♥ ✿ ♥' },
        { id: 8, name: 'Serce i ornament', symbol: '♥ ❦ ♥' },
        { id: 9, name: 'Serce i gwiazdki', symbol: '♥ ✧ ✦ ♥' },
        { id: 10, name: 'Serce i fale', symbol: '~ ♥ ~' },

        { id: 11, name: 'Róża', symbol: '✿ ✿ ✿' },
        { id: 12, name: 'Kwiaty', symbol: '❀ ❀ ❀' },
        { id: 13, name: 'Kwiat i kropki', symbol: '✿ · ✿ · ✿' },
        { id: 14, name: 'Kwiat i linie', symbol: '— ❀ —' },
        { id: 15, name: 'Kwiaty i serce', symbol: '✿ ♥ ✿' },

        { id: 16, name: 'Gwiazdy miękkie', symbol: '✦ ✦ ✦' },
        { id: 17, name: 'Gwiazdy romantyczne', symbol: '✧ ✦ ✧' },
        { id: 18, name: 'Gwiazdy i serce', symbol: '✦ ♥ ✦' },

        { id: 19, name: 'Ornament 1', symbol: '❦ ❦ ❦' },
        { id: 20, name: 'Ornament 2', symbol: '❧ ❧ ❧' },
        { id: 21, name: 'Ornament 3', symbol: '✽ ✽ ✽' },
        { id: 22, name: 'Ornament 4', symbol: '✺ ✺ ✺' },

        { id: 23, name: 'Serce delikatne', symbol: '♡ ♡ ♡' },
        { id: 24, name: 'Serce i linia', symbol: '— ♥ — ♥ —' },
        { id: 25, name: 'Serce i kwiat mix', symbol: '♥ ✿ ❀ ♥' },

        { id: 26, name: 'Miłość', symbol: '♥ ♥ ✦ ♥ ♥' },
        { id: 27, name: 'Serce aura', symbol: '✧ ♥ ✧' },
        { id: 28, name: 'Serce glow', symbol: '✦ ♥ ✦ ♥ ✦' },

        { id: 29, name: 'Miękkie linie', symbol: '~~ ♥ ~~' },
        { id: 30, name: 'Serce + gwiazda', symbol: '♥ ✶ ♥' },

        { id: 31, name: 'Kwiat linia', symbol: '— ✿ — ✿ —' },
        { id: 32, name: 'Róże', symbol: '✿ ✿ ❀ ✿' },
        { id: 33, name: 'Miłość 2', symbol: '❤ ✧ ❤' },

        { id: 34, name: 'Serce minimal', symbol: '· ♥ ·' },
        { id: 35, name: 'Serce aura 2', symbol: '✧ ♥ ✧ ♥ ✧' },

        { id: 36, name: 'Romantic wave', symbol: '~ ♥ ~ ♥ ~' },
        { id: 37, name: 'Love stars', symbol: '✦ ♥ ✧ ♥ ✦' },
        { id: 38, name: 'Rose chain', symbol: '❀ ✿ ❀ ✿ ❀' },

        { id: 39, name: 'Soft hearts', symbol: '♡ ♥ ♡ ♥ ♡' },
        { id: 40, name: 'Heart sparkle', symbol: '♥ ✦ ✧ ♥ ✦' },
      ],
    },

    {
      name: 'minimalistyczne',
      label: 'Minimalistyczne',
      separators: [
        { id: 1, name: 'Kropki', symbol: '· · ·' },
        { id: 2, name: 'Kropki pełne', symbol: '• • •' },
        { id: 3, name: 'Linie', symbol: '— — —' },
        { id: 4, name: 'Linia pojedyncza', symbol: '—' },
        { id: 5, name: 'Kropka linia', symbol: '· — ·' },

        { id: 6, name: 'Prosty separator', symbol: '|' },
        { id: 7, name: 'Podwójna linia', symbol: '═ ═ ═' },
        { id: 8, name: 'Minimal gwiazda', symbol: '· ✦ ·' },

        { id: 9, name: 'Minimal dots', symbol: '. . .' },
        { id: 10, name: 'Thin line', symbol: '– – –' },

        { id: 11, name: 'Simple dash', symbol: '- - -' },
        { id: 12, name: 'Pipe line', symbol: '| | |' },
        { id: 13, name: 'Colon', symbol: ': : :' },

        { id: 14, name: 'Minimal slash', symbol: '/ / /' },
        { id: 15, name: 'Backslash', symbol: '\\ \\ \\' },

        { id: 16, name: 'Dots thin', symbol: '· ·' },
        { id: 17, name: 'Line thin', symbol: '— —' },

        { id: 18, name: 'Minimal space', symbol: '• •' },
        { id: 19, name: 'Soft dash', symbol: '– –' },

        { id: 20, name: 'Small dots', symbol: '. .' },

        { id: 21, name: 'Minimal star', symbol: '✧' },
        { id: 22, name: 'Single dot', symbol: '·' },
        { id: 23, name: 'Divider', symbol: '|' },

        { id: 24, name: 'Minimal mix', symbol: '· | ·' },
        { id: 25, name: 'Thin combo', symbol: '- | -' },

        { id: 26, name: 'Soft divider', symbol: '• | •' },
        { id: 27, name: 'Tiny star', symbol: '· ✧ ·' },

        { id: 28, name: 'Dash dot', symbol: '- · -' },
        { id: 29, name: 'Pipe dot', symbol: '| · |' },

        { id: 30, name: 'Minimal equal', symbol: '= = =' },
        { id: 31, name: 'Soft equal', symbol: '≈ ≈ ≈' },

        { id: 32, name: 'Thin divider', symbol: '— · —' },
        { id: 33, name: 'Light dash', symbol: '– · –' },

        { id: 34, name: 'Simple colon', symbol: ':' },
        { id: 35, name: 'Double colon', symbol: '::' },

        { id: 36, name: 'Triple colon', symbol: ':::' },
        { id: 37, name: 'Minimal bracket', symbol: '( )' },

        { id: 38, name: 'Simple star', symbol: '*' },
        { id: 39, name: 'Minimal wave', symbol: '~ ~ ~' },
        { id: 40, name: 'Wave thin', symbol: '~ ~' },
      ],
    },

    {
      name: 'klasyczne',
      label: 'Klasyczne',
      separators: [
        { id: 1, name: 'Kwiaty', symbol: '✿ ✿ ✿' },
        { id: 2, name: 'Kwiaty pełne', symbol: '❀ ❀ ❀' },
        { id: 3, name: 'Gwiazdy', symbol: '✦ ✦ ✦' },
        { id: 4, name: 'Gwiazda podwójna', symbol: '✶ ✶' },
        { id: 5, name: 'Asterisk', symbol: '✱ ✱ ✱' },

        { id: 6, name: 'Ornament 1', symbol: '❧ ❧ ❧' },
        { id: 7, name: 'Ornament 2', symbol: '❦ ❦ ❦' },

        { id: 8, name: 'Kwiat i linia', symbol: '— ✿ —' },
        { id: 9, name: 'Kwiat i kropki', symbol: '✿ · ✿' },

        { id: 10, name: 'Linie klasyczne', symbol: '— — —' },
        { id: 11, name: 'Linia z ornamentem', symbol: '— ❧ —' },

        { id: 12, name: 'Kwiat + gwiazda', symbol: '✿ ✦ ✿' },
        { id: 13, name: 'Kwiat mix', symbol: '❀ ✿ ❀' },

        { id: 14, name: 'Ornament line', symbol: '— ❦ —' },
        { id: 15, name: 'Classic stars', symbol: '✧ ✦ ✧' },

        { id: 16, name: 'Elegant 1', symbol: '✿ ✽ ✿' },
        { id: 17, name: 'Elegant 2', symbol: '✺ ✽ ✺' },

        { id: 18, name: 'Vintage', symbol: '❧ ✿ ❧' },
        { id: 19, name: 'Vintage 2', symbol: '❦ ✦ ❦' },

        { id: 20, name: 'Classic ornament', symbol: '✱ ✽ ✱' },

        { id: 21, name: 'Classic mix', symbol: '✿ ❀ ✿' },
        { id: 22, name: 'Classic floral', symbol: '❀ ✽ ❀' },

        { id: 23, name: 'Decor line', symbol: '— ✦ — ✦ —' },
        { id: 24, name: 'Decor dots', symbol: '✿ · ✿ · ✿' },

        { id: 25, name: 'Classic soft', symbol: '✿ ✿ ✦ ✿ ✿' },
        { id: 26, name: 'Floral chain', symbol: '❀ ❀ ✿ ❀ ❀' },

        { id: 27, name: 'Vintage line', symbol: '— ❧ ❧ —' },
        { id: 28, name: 'Elegant stars', symbol: '✧ ✦ ✧ ✦' },

        { id: 29, name: 'Classic pattern', symbol: '✿ ✽ ✿ ✽' },
        { id: 30, name: 'Ornament chain', symbol: '❦ ❦ ✦ ❦ ❦' },

        { id: 31, name: 'Classic wave', symbol: '~ ✿ ~ ✿ ~' },
        { id: 32, name: 'Floral mix', symbol: '✿ ❀ ✽ ✿ ❀' },

        { id: 33, name: 'Elegant dots', symbol: '✿ · ✦ · ✿' },
        { id: 34, name: 'Classic star line', symbol: '— ✦ ✦ —' },

        { id: 35, name: 'Vintage floral', symbol: '❧ ✿ ❧ ✿' },
        { id: 36, name: 'Decorative', symbol: '✽ ✺ ✽ ✺' },

        { id: 37, name: 'Classic combo', symbol: '✿ ✦ ❀ ✦ ✿' },
        { id: 38, name: 'Elegant chain', symbol: '❀ ✦ ❀ ✦ ❀' },

        { id: 39, name: 'Soft floral', symbol: '✿ ✿ ❀ ✿ ✿' },
        { id: 40, name: 'Vintage stars', symbol: '✧ ✦ ✧ ✦ ✧' },
      ],
    },

    {
      name: 'emoji',
      label: 'Emoji',
      separators: [
        { id: 201, name: 'Serce', symbol: '❤️ ❤️ ❤️' },
        { id: 202, name: 'Smutek', symbol: '😢 😢 😢' },
        { id: 203, name: 'Ogień', symbol: '🔥 🔥 🔥' },
        { id: 204, name: 'Magia', symbol: '✨ ✨ ✨' },
        { id: 205, name: 'Gwiazdy', symbol: '⭐ ⭐ ⭐' },
        { id: 206, name: 'Księżyc', symbol: '🌙 🌙 🌙' },

        { id: 207, name: 'Złamane serce', symbol: '💔 💔 💔' },
        { id: 208, name: 'Deszcz', symbol: '🌧️ 🌧️ 🌧️' },
        { id: 209, name: 'Czas', symbol: '⏳ ⏳ ⏳' },
        { id: 210, name: 'Kosmos', symbol: '🌌 🌌 🌌' },

        { id: 211, name: 'Myśli', symbol: '💭 💭 💭' },
        { id: 212, name: 'Krzyk', symbol: '😱 😱 😱' },
        { id: 213, name: 'Spokój', symbol: '🕊️ 🕊️ 🕊️' },
        { id: 214, name: 'Sen', symbol: '😴 😴 😴' },

        { id: 215, name: 'Kwiaty', symbol: '🌸 🌸 🌸' },
        { id: 216, name: 'Róże', symbol: '🌹 🌹 🌹' },
        { id: 217, name: 'Liście', symbol: '🍃 🍃 🍃' },

        { id: 218, name: 'Błysk', symbol: '⚡ ⚡ ⚡' },
        { id: 219, name: 'Wir', symbol: '🌀 🌀 🌀' },
        { id: 220, name: 'Maska', symbol: '🎭 🎭 🎭' },
      ],
    },
  ];

  // ✅ FIX
  get currentCategory(): SeparatorCategory {
    return this.categories.find((cat) => cat.name === this.activeCategory) ?? this.categories[0];
  }

  // ✅ FIX

  applySeparator() {
    if (!this.selectedSeparator) return;

    this.onSeparatorSelect?.(this.selectedSeparator.symbol);
  }

  selectSeparator(separator: SeparatorOption): void {
    this.selectedSeparator = separator;
    this.onSeparatorSelect?.(separator.symbol); // 🔥 instant update
  }

  close(): void {
    console.log('Zamknięto panel');
  }
}
