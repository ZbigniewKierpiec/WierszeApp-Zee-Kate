import { ChangeDetectorRef, Component, EventEmitter, Output } from '@angular/core';
import { Topbar } from '../topbar/topbar';
import { CommonModule } from '@angular/common';
import { Sidebar } from '../sidebar/sidebar';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-editor-test',
  imports: [Topbar, CommonModule, Sidebar, FormsModule],
  templateUrl: './editor-test.html',
  styleUrl: './editor-test.scss',
})
export class EditorTest {
  title = '';
  text = '';
  selectedTheme = '';
  selectedTemplate = 'Default';
  savedMessage = false;
  clearMessage = false;
  textFont = 'Playfair Display';
  textFontSize = 18;
  textColor = '#000000';
  textAlign = 'left';
  background = '#ffffff';

  selectedVariant: any = null;
  templateIcons: Record<string, string> = {
    Floral: '🌸',
    Vintage: '📜',
    Romantic: '❀',
    Dark: '🌙',
    Minimal: '─',
    Default: '📄',
  };

  goBack() {
    window.history.back();
  }

  preview() {
    console.log('preview');
  }

  // newPoem() {
  //   this.title = '';
  //   this.text = '';
  // }

  newPoem() {
    this.title = '';
    this.text = '';
    this.selectedTemplate = 'Default';
    this.selectedTheme = '';
    this.selectedVariant = null;

    localStorage.removeItem('poem');
  }
  constructor(private cd: ChangeDetectorRef) {}

  ngOnInit() {
    const saved = localStorage.getItem('poem');

    if (saved) {
      const p = JSON.parse(saved);

      this.title = p.title || '';
      this.text = p.text || '';
      this.selectedTheme = p.theme || '';
      this.selectedTemplate = p.template || 'Default';
      this.selectedVariant = p.variant || null;
    }
  }

  applyTheme(theme: string) {
    this.selectedTheme = theme;
  }
  applyTemplate(template: string) {
    this.selectedTemplate = template;
    this.selectedVariant = null;
  }

  // 🔥 SAVE

  save() {
    const title = this.title.trim();
    const text = this.text.trim();

    // 🔥 walidacja
    if (!title || !text) {
      alert('⚠️ Uzupełnij tytuł i treść!');
      return;
    }

    const poem = {
      title,
      text,
      theme: this.selectedTheme,
      template: this.selectedTemplate,
      variant: this.selectedVariant,
    };

    localStorage.setItem('poem', JSON.stringify(poem));

    // 🔥 toast
    this.savedMessage = true;

    setTimeout(() => {
      this.savedMessage = false;
      this.cd.detectChanges();
    }, 2000);
  }
  applyVariant(variant: any) {
    this.selectedVariant = variant;
  }

  // getVariantStyles() {
  //   if (!this.selectedTemplate || !this.selectedVariant) return {};

  //   const t = this.selectedTemplate;
  //   const v = this.selectedVariant.name;

  //   if (t === 'Floral') {
  //     if (v === 'Soft') return { border: '3px solid pink', borderRadius: '16px' };
  //     if (v === 'Elegant') return { border: '2px dashed hotpink', borderRadius: '20px' };
  //     if (v === 'Frame') return { border: '6px double pink' };
  //     if (v === 'Garden') return { border: '4px solid green', borderRadius: '12px' };
  //   }

  //   if (t === 'Vintage') {
  //     if (v === 'Old Paper') return { background: '#fdf6e3', border: '2px solid #d4af37' };
  //     if (v === 'Gold Frame') return { border: '4px solid gold' };
  //     if (v === 'Classic Ink') return { background: '#fffaf0' };
  //     if (v === 'Retro') return { border: '2px dashed brown' };
  //   }

  //   if (t === 'Romantic') {
  //     if (v === 'Hearts') return { border: '2px solid pink' };
  //     if (v === 'Soft Love') return { background: '#ffe4e6' };
  //     if (v === 'Poetry') return { borderBottom: '2px solid pink' };
  //     if (v === 'Rose') return { border: '3px solid crimson' };
  //   }

  //   if (t === 'Dark') {
  //     if (v === 'Deep Night') return { background: '#111827', color: 'white' };
  //     if (v === 'Soft Dark') return { background: '#1f2937', color: '#ddd' };
  //     if (v === 'Neon') return { background: '#000', color: '#0ff' };
  //     if (v === 'Midnight') return { background: '#0f172a', color: '#ccc' };
  //   }

  //   if (t === 'Minimal') {
  //     if (v === 'Line') return { borderLeft: '3px solid black' };
  //     if (v === 'Soft Line') return { borderLeft: '2px solid gray' };
  //     if (v === 'Clean Space') return { padding: '20px' };
  //     if (v === 'Mono') return { color: '#333' };
  //   }

  //   return {};
  // }

  getVariantStyles() {
    if (!this.selectedTemplate) return {};

    const t = this.selectedTemplate;

    // 🔥 jeśli brak variantu → użyj default
    const v = this.selectedVariant?.name;
    // 📄 DEFAULT
    if (t === 'Default') {
      if (!v || v === 'Clean') {
        return {
          background: '#ffffff',
          borderRadius: '8px',
        };
      }

      if (v === 'Paper') {
        return {
          background: '#fdf6e3',
          border: '1px solid #e5e7eb',
          borderRadius: '8px',
        };
      }

      if (v === 'Soft') {
        return {
          background: '#f8fafc',
          borderRadius: '12px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
        };
      }

      if (v === 'Classic') {
        return {
          background: '#ffffff',
          border: '2px solid #111',
          borderRadius: '6px',
        };
      }
    }
    // 🌸 FLORAL
    if (t === 'Floral') {
      if (!v || v === 'Soft') return { border: '3px solid pink', borderRadius: '16px' };
      if (v === 'Elegant') return { border: '2px dashed hotpink', borderRadius: '20px' };
      if (v === 'Frame') return { border: '6px double pink' };
      if (v === 'Garden') return { border: '4px solid green', borderRadius: '12px' };
    }

    // 📜 VINTAGE
    if (t === 'Vintage') {
      if (!v || v === 'Old Paper') return { background: '#fdf6e3', border: '2px solid #d4af37' };
      if (v === 'Gold Frame') return { border: '4px solid gold' };
      if (v === 'Classic Ink') return { background: '#fffaf0' };
      if (v === 'Retro') return { border: '2px dashed brown' };
    }

    // ❀ ROMANTIC
    if (t === 'Romantic') {
      if (!v || v === 'Soft Love') return { background: '#ffe4e6' };
  if (v === 'Hearts') {
  const heart = this.getHeartPattern();

  return {
    border: '2px solid #f9a8d4',
    borderRadius: '20px',
    backgroundColor: '#fff1f2',

    // 🔥 dwa serca
    backgroundImage: `${heart}, ${heart}`,
    backgroundRepeat: 'no-repeat, no-repeat',

    // 🔥 pozycje
    backgroundPosition: 'top left, bottom right',

    // 🔥 rozmiar
    backgroundSize: '60px, 60px',

    padding: '30px'
  };
}
      if (v === 'Poetry') return { borderBottom: '2px solid pink' };
      if (v === 'Rose') return { border: '3px solid crimson' };
    }

    // 🌙 DARK
    if (t === 'Dark') {
      if (!v || v === 'Deep Night') return { background: '#111827', color: 'white' };
      if (v === 'Soft Dark') return { background: '#1f2937', color: '#ddd' };
      if (v === 'Neon') return { background: '#000', color: '#0ff' };
      if (v === 'Midnight') return { background: '#0f172a', color: '#ccc' };
    }

    // ▫️ MINIMAL
    if (t === 'Minimal') {
      if (!v || v === 'Line') return { borderLeft: '3px solid black' };
      if (v === 'Soft Line') return { borderLeft: '2px solid gray' };
      if (v === 'Clean Space') return { padding: '20px' };
      if (v === 'Mono') return { color: '#333' };
    }

    // 📄 DEFAULT TEMPLATE
    if (t === 'Default') {
      return {
        background: '#ffffff',
        borderRadius: '8px',
      };
    }

    return {};
  }

  clear() {
    const confirmClear = confirm('Na pewno wyczyścić?');
    if (!confirmClear) return;

    // 🔥 reset danych
    this.title = '';
    this.text = '';
    this.selectedTemplate = 'Default';
    this.selectedTheme = '';
    this.selectedVariant = null;
    // 🔥 usuń z localStorage
    localStorage.removeItem('poem');

    // 🔥 toast
    this.clearMessage = true;

    setTimeout(() => {
      this.clearMessage = false;
      this.cd.detectChanges();
    }, 2000);
  }



getHeartPattern(): string {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80">
      <path d="M40 20 
               C40 5, 70 5, 70 30 
               C70 55, 40 75, 40 75 
               C40 75, 10 55, 10 30 
               C10 5, 40 5, 40 20 Z"
        fill="#fb7185"/>
    </svg>
  `;

  return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
}








}
