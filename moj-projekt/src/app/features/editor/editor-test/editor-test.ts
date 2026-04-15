import { ChangeDetectorRef, Component } from '@angular/core';
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
  // 🔥 UI fields (edytor)
  title = '';
  text = '';
  selectedTheme = '';
  selectedTemplate = 'Default';
  selectedVariant: any = null;

  textFont = 'Playfair Display';
  textFontSize = 18;
  textAlign = 'left';
  textColor = '#000000';

  titleFont = 'Playfair Display';
  titleSize = 28;
  titleColor = '#000000';
  titleAlign = 'center';
  activeField: 'title' | 'text' = 'text';
  templateIcons: Record<string, string> = {
    Default: '📄',
    Floral: '🌸',
    Vintage: '📜',
    Romantic: '❀',
    Dark: '🌙',
    Minimal: '▫️',
  };
  savedMessage = false;
  clearMessage = false;

  // 🔥 MULTI PAGE
  pages: any[] = [];
  currentPageIndex = 0;

  constructor(private cd: ChangeDetectorRef) {}

  // 🔥 ID
  generateId(): string {
    return crypto.randomUUID();
  }

  // 🔥 INIT
  ngOnInit() {
    const saved = localStorage.getItem('pages');

    if (saved) {
      this.pages = JSON.parse(saved);
    }

    if (this.pages.length === 0) {
      this.newPage();
    } else {
      this.loadPage();
    }
  }

  // 🔥 PAGE SYSTEM

  newPage() {
    const page = {
      id: this.generateId(),
      title: '',
      text: '',
      template: 'Default',
      variant: null,
    };

    this.pages.push(page);
    this.currentPageIndex = this.pages.length - 1;
    this.loadPage();
  }

  loadPage() {
    const p = this.pages[this.currentPageIndex];

    this.title = p.title;
    this.text = p.text;
    this.selectedTemplate = p.template;
    this.selectedVariant = p.variant;
  }

  savePage() {
    const p = this.pages[this.currentPageIndex];

    p.title = this.title;
    p.text = this.text;
    p.template = this.selectedTemplate;
    p.variant = this.selectedVariant;
  }

  nextPage() {
    if (this.currentPageIndex < this.pages.length - 1) {
      this.savePage();
      this.currentPageIndex++;
      this.loadPage();
    }
  }

  prevPage() {
    if (this.currentPageIndex > 0) {
      this.savePage();
      this.currentPageIndex--;
      this.loadPage();
    }
  }

  // 🔥 ACTIONS

  applyTheme(theme: string) {
    this.selectedTheme = theme;
    this.savePage();
  }

  applyTemplate(template: string) {
    this.selectedTemplate = template;
    this.selectedVariant = null;
    this.savePage();
  }

  applyVariant(variant: any) {
    this.selectedVariant = variant;
    this.savePage();
  }

  // 🔥 SAVE ALL
  save() {
    this.savePage();

    localStorage.setItem('pages', JSON.stringify(this.pages));

    this.savedMessage = true;

    setTimeout(() => {
      this.savedMessage = false;
      this.cd.detectChanges();
    }, 2000);
  }

  // 🔥 CLEAR CURRENT PAGE
  clear() {
    const confirmClear = confirm('Na pewno wyczyścić?');
    if (!confirmClear) return;

    this.title = '';
    this.text = '';
    this.selectedTemplate = 'Default';
    this.selectedVariant = null;

    this.savePage();

    this.clearMessage = true;

    setTimeout(() => {
      this.clearMessage = false;
      this.cd.detectChanges();
    }, 2000);
  }

  // 🔥 STYLES

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

          padding: '30px',
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

  preview() {
    console.log('preview');
  }

  goBack() {
    window.history.back();
  }

  deletePage() {
    const confirmDelete = confirm('Usunąć tę stronę?');
    if (!confirmDelete) return;

    this.pages.splice(this.currentPageIndex, 1);

    // jeśli nie ma żadnej → stwórz nową
    if (this.pages.length === 0) {
      this.newPage();
      return;
    }

    if (this.currentPageIndex >= this.pages.length) {
      this.currentPageIndex = this.pages.length - 1;
    }

    this.loadPage();

    localStorage.setItem('pages', JSON.stringify(this.pages));
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
