import { EditorApiService } from './../../../services/editor-api';
import { ChangeDetectorRef, Component } from '@angular/core';
import { Topbar } from '../topbar/topbar';
import { CommonModule } from '@angular/common';
import { Sidebar } from '../sidebar/sidebar';
import { FormsModule } from '@angular/forms';
import { animate, style, transition } from '@angular/animations';
import { CoverEditor } from '../../cover-editor/cover-editor';
import html2pdf from 'html2pdf.js';
import html2canvas from 'html2canvas';

import jsPDF from 'jspdf';

@Component({
  selector: 'app-editor-test',
  imports: [Topbar, CommonModule, Sidebar, FormsModule, CoverEditor],
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
  bookId = '';
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
  isCoverEditorOpen = false;
  isPreviewOpen = false;

  //////////////////////////////////////

  cover = {
    title: 'Mój tomik',
    author: '',
    image: '',
    bgColor: '#000000',
    textColor: '#ffffff',
  };

  constructor(
    private cd: ChangeDetectorRef,
    private api: EditorApiService,
  ) {}

  onCoverImageUpload(event: any) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = () => {
      this.cover.image = reader.result as string;
    };

    reader.readAsDataURL(file);
  }

  saveCover(updatedCover: any) {
    Object.assign(this.cover, updatedCover); // 🔥 zamiast =
    localStorage.setItem('cover', JSON.stringify(this.cover));
  }

  /////////////////////////////////////

  formatAdvanced() {
    this.text = this.formatPoemAdvanced(this.text);
    this.savePage();
    localStorage.setItem('pages', JSON.stringify(this.pages));
  }

  applyPreset(p: any) {
    const current = this.pages[this.currentPageIndex];

    current.template = p.template;
    current.variant = p.variant;

    this.selectedTemplate = p.template;
    this.selectedVariant = p.variant;

    if (p.titleFont) this.titleFont = p.titleFont;
    if (p.textFont) this.textFont = p.textFont;
    if (p.textColor) this.textColor = p.textColor;
    if (p.titleColor) this.titleColor = p.titleColor;

    if (p.autoFormat) {
      this.text = this.formatText(this.text, p.autoFormat);
    }

    if (p.autoFormat === 'advanced') {
      this.text = this.formatPoemAdvanced(this.text);
    }

    this.savePage();
    localStorage.setItem('pages', JSON.stringify(this.pages));
  }

  formatPoemAdvanced(text: string): string {
    if (!text) return text;

    // 🔥 1. RESET (kluczowe)
    text = text
      .replace(/\n+/g, '\n') // max 1 enter
      .replace(/\s+/g, ' ') // usuń dziwne spacje
      .trim();

    // 🔥 2. podziel na zdania
    const sentences = text.split(/(?<=[.!?])/);

    const lines: string[] = [];

    sentences.forEach((sentence) => {
      const words = sentence.trim().split(' ');
      let current = '';

      words.forEach((word) => {
        if ((current + ' ' + word).length > 35) {
          lines.push(current.trim());
          current = word;
        } else {
          current += ' ' + word;
        }
      });

      if (current) lines.push(current.trim());

      // 🔥 pauza między zdaniami
      lines.push('');
    });

    return lines.join('\n').replace(/\n{3,}/g, '\n\n');
  }

  formatPoemAI(text: string): string {
    if (!text) return text;

    // 🔥 normalize
    text = text
      .replace(/\s+/g, ' ')
      .replace(/\s([.,!?])/g, '$1')
      .trim();

    // 🔥 podziel na zdania (pauzy)
    const sentences = text.split(/(?<=[.!?])/);

    const lines: string[] = [];

    sentences.forEach((sentence) => {
      const words = sentence.trim().split(' ');

      let currentLine = '';

      words.forEach((word) => {
        // 🔥 krótsze wersy = bardziej poetycko
        if ((currentLine + ' ' + word).length > 35) {
          lines.push(currentLine.trim());
          currentLine = word;
        } else {
          currentLine += ' ' + word;
        }
      });

      if (currentLine) {
        lines.push(currentLine.trim());
      }

      // 🔥 pauza po zdaniu = przerwa strofy
      lines.push('');
    });

    // 🔥 dodatkowy rytm (co 3 wersy)
    const final: string[] = [];

    lines.forEach((line, i) => {
      final.push(line);

      if ((i + 1) % 4 === 0) {
        final.push('');
      }
    });

    return final.join('\n').replace(/\n{3,}/g, '\n\n');
  }

  formatAI() {
    this.text = this.formatPoemAI(this.text);

    this.savePage();
    localStorage.setItem('pages', JSON.stringify(this.pages));
  }

  formatText(text: string, mode: string): string {
    if (!text) return text;

    // 📝 POETRY (ładne wersy + odstępy)
    if (mode === 'poetry') {
      const lines = text.split('\n').map((l) => l.trim());

      const result: string[] = [];

      for (let line of lines) {
        if (!line) continue;

        result.push(line);

        // 🔥 odstęp między wersami
        if (line.length < 60) {
          result.push('');
        }
      }

      return result.join('\n');
    }

    // 📄 COMPACT (usuwa puste linie)
    if (mode === 'compact') {
      return text
        .split('\n')
        .map((l) => l.trim())
        .filter((l) => l)
        .join('\n');
    }

    return text;
  }

  fillLorem() {
    this.text = `Lorem ipsum dolor sit amet,
consectetur adipiscing elit,
sed do eiusmod tempor incididunt.

Ut enim ad minim veniam,
quis nostrud exercitation ullamco.`;

    this.title = 'Testowy wiersz';

    this.savePage();
  }

  ///////////////////////////////////////////

  // 🔥 ID
  generateId(): string {
    return crypto.randomUUID();
  }

  // ngOnInit() {
  //   const savedPages = localStorage.getItem('pages');

  //   if (savedPages) {
  //     this.pages = JSON.parse(savedPages);
  //   }

  //   if (this.pages.length === 0) {
  //     this.newPage();
  //   } else {
  //     this.loadPage();
  //   }

  //   // 🔥 COVER FIX
  //   const savedCover = localStorage.getItem('cover');

  //   if (savedCover) {
  //     Object.assign(this.cover, JSON.parse(savedCover));
  //   }
  // }

  // ngOnInit() {
  //   const savedId = localStorage.getItem('bookId');

  //   if (savedId) {
  //     this.loadBook(savedId);
  //     return;
  //   }

  //   // fallback (to co masz)
  //   const savedPages = localStorage.getItem('pages');

  //   if (savedPages) {
  //     this.pages = JSON.parse(savedPages);
  //   }

  //   if (this.pages.length === 0) {
  //     this.newPage();
  //   } else {
  //     this.loadPage();
  //   }
  // }












  newPage() {
    const page = {
      id: this.generateId(),
      title: '',
      text: '',
      template: 'Default',
      variant: null,

      // 🔥 DODAJ TO
      titleFont: this.titleFont,
      textFont: this.textFont,
      titleColor: this.titleColor,
      textColor: this.textColor,
    };

    this.pages.push(page);
    this.currentPageIndex = this.pages.length - 1;
    this.loadPage();

    // localStorage.setItem('pages', JSON.stringify(this.pages));
  }

  onFontChange(value: string) {
    if (this.activeField === 'title') {
      this.titleFont = value;
    } else {
      this.textFont = value;
    }

    this.savePage();
    localStorage.setItem('pages', JSON.stringify(this.pages));
  }

  loadPage() {
    const p = this.pages[this.currentPageIndex];

    this.title = p.title;
    this.text = p.text;
    this.selectedTemplate = p.template;
    this.selectedVariant = p.variant;

    // 🔥 KLUCZOWE
    this.titleFont = p.titleFont || "'Playfair Display', serif";
    this.textFont = p.textFont || 'Georgia, serif';
    this.titleColor = p.titleColor || '#000';
    this.textColor = p.textColor || '#000';
  }

  loadBook(id: string) {
    this.api.getBook(id).subscribe({
      next: (book: any) => {
        console.log('📥 BOOK FROM API:', book);

        // 🔥 ID
        this.bookId = book.id;

        // 🔥 COVER
        this.cover = book.cover || {
          title: 'Mój tomik',
          author: '',
          image: '',
          bgColor: '#000000',
          textColor: '#ffffff',
        };

        // 🔥 PAGES
        this.pages = book.pages?.length ? book.pages : [this.createEmptyPage()];

        // 🔥 THEME (snake_case → camelCase)
        this.selectedTheme = book.selected_theme || '';

        // 🔥 ZAŁADUJ PIERWSZĄ STRONĘ
        this.currentPageIndex = 0;
        this.loadPage();
        this.cd.detectChanges();
      },
      error: (err) => {
        console.error('❌ LOAD ERROR:', err);
      },
    });
  }

  createEmptyPage() {
    return {
      id: this.generateId(),
      title: '',
      text: '',
      template: 'Default',
      variant: null,
      titleFont: this.titleFont,
      textFont: this.textFont,
      titleColor: '#000000',
      textColor: '#000000',
    };
  }

  // savePage() {
  //   const p = this.pages[this.currentPageIndex];

  //   p.title = this.title;
  //   p.text = this.text;
  //   p.template = this.selectedTemplate;
  //   p.variant = this.selectedVariant;

  //   // 🔥 KLUCZOWE
  //   p.titleFont = this.titleFont;
  //   p.textFont = this.textFont;
  //   p.titleColor = this.titleColor;
  //   p.textColor = this.textColor;
  // }


savePage() {
  const p = this.pages[this.currentPageIndex];

  if (!p) {
    console.warn("⚠️ Brak strony, tworzę nową");
    this.newPage();
    return;
  }

  p.title = this.title;
  p.text = this.text;
  p.template = this.selectedTemplate;
  p.variant = this.selectedVariant;

  p.titleFont = this.titleFont;
  p.textFont = this.textFont;
  p.titleColor = this.titleColor;
  p.textColor = this.textColor;
}





  nextPage() {
    if (this.currentPageIndex < this.pages.length - 1) {
      this.savePage();

      localStorage.setItem('pages', JSON.stringify(this.pages));

      this.currentPageIndex++;
      this.loadPage();
    }
  }

  prevPage() {
    if (this.currentPageIndex > 0) {
      this.savePage();

      localStorage.setItem('pages', JSON.stringify(this.pages));

      this.currentPageIndex--;
      this.loadPage();
    }
  }

  // 🔥 ACTIONS

  applyTheme(theme: string) {
    this.selectedTheme = theme;
    this.savePage();
  }

  // applyTemplate(template: string) {
  //   this.selectedTemplate = template;
  //   this.selectedVariant = null;
  //   this.savePage();
  // }

  applyTemplate(template: string) {
    this.selectedTemplate = template;
    this.selectedVariant = null;

    const p = this.pages[this.currentPageIndex];
    p.template = template;
    p.variant = null;

    this.savePage();
  }

  applyVariant(variant: any) {
    this.selectedVariant = variant;
    this.savePage();
  }

  // 🔥 SAVE ALL
  // save() {
  //   this.savePage();

  //   localStorage.setItem('pages', JSON.stringify(this.pages));

  //   this.savedMessage = true;

  //   setTimeout(() => {
  //     this.savedMessage = false;
  //     this.cd.detectChanges();
  //   }, 2000);
  // }

  save() {
    console.log('🔥 SAVE CLICKED');

    // 🔥 FIX ID (tylko raz)
    if (!this.bookId) {
      this.bookId = crypto.randomUUID();
      localStorage.setItem('bookId', this.bookId);
      console.log('🔥 FIXED ID:', this.bookId);
    }

    this.savePage();

    // 🔥 FIX COLORS (GLOBALNY)
    const fixedPages = this.pages.map((p) => ({
      ...p,
      titleColor: p.titleColor && p.titleColor.startsWith('#') ? p.titleColor : '#000000',
      textColor: p.textColor && p.textColor.startsWith('#') ? p.textColor : '#000000',
    }));

    const payload = {
      id: this.bookId,
      title: this.cover?.title || 'Mój tomik',
      cover: {
        ...this.cover,
        bgColor: this.cover.bgColor || '#000000',
        textColor: this.cover.textColor || '#ffffff',
      },
      pages: fixedPages, // 🔥 używamy poprawionych
      selectedTheme: this.selectedTheme || '',
    };

    console.log('🔥 PAYLOAD:', payload);

    this.api.saveBook(payload).subscribe({
      next: () => {
        console.log('Zapisano do backendu 🚀');
      },
      error: (err) => {
        console.error('Błąd zapisu:', err);
      },
    });
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

  // getVariantStyles() {
  //   if (!this.selectedTemplate) return {};

  //   const t = this.selectedTemplate;

  //   // 🔥 jeśli brak variantu → użyj default
  //   const v = this.selectedVariant?.name;
  //   // 📄 DEFAULT
  //   if (t === 'Default') {
  //     if (!v || v === 'Clean') {
  //       return {
  //         background: '#ffffff',
  //         borderRadius: '8px',
  //       };
  //     }

  //     if (v === 'Paper') {
  //       return {
  //         background: '#fdf6e3',
  //         border: '1px solid #e5e7eb',
  //         borderRadius: '8px',
  //       };
  //     }

  //     if (v === 'Soft') {
  //       return {
  //         background: '#f8fafc',
  //         borderRadius: '12px',
  //         boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
  //       };
  //     }

  //     if (v === 'Classic') {
  //       return {
  //         background: '#ffffff',
  //         border: '2px solid #111',
  //         borderRadius: '6px',
  //       };
  //     }
  //   }
  //   // 🌸 FLORAL
  //   if (t === 'Floral') {
  //     if (!v || v === 'Soft') return { border: '3px solid pink', borderRadius: '16px' };
  //     if (v === 'Elegant') return { border: '2px dashed hotpink', borderRadius: '20px' };
  //     if (v === 'Frame') return { border: '6px double pink' };
  //     if (v === 'Garden') return { border: '4px solid green', borderRadius: '12px' };
  //   }

  //   // 📜 VINTAGE
  //   if (t === 'Vintage') {
  //     if (!v || v === 'Old Paper') return { background: '#fdf6e3', border: '2px solid #d4af37' };
  //     if (v === 'Gold Frame') return { border: '4px solid gold' };
  //     if (v === 'Classic Ink') return { background: '#fffaf0' };
  //     if (v === 'Retro') return { border: '2px dashed brown' };
  //   }

  //   // ❀ ROMANTIC
  //   if (t === 'Romantic') {
  //     if (!v || v === 'Soft Love') return { background: '#ffe4e6' };
  //     if (v === 'Hearts') {
  //       const heart = this.getHeartPattern();

  //       return {
  //         border: '2px solid #f9a8d4',
  //         borderRadius: '20px',
  //         backgroundColor: '#fff1f2',

  //         // 🔥 dwa serca
  //         backgroundImage: `${heart}, ${heart}`,
  //         backgroundRepeat: 'no-repeat, no-repeat',

  //         // 🔥 pozycje
  //         backgroundPosition: 'top left, bottom right',

  //         // 🔥 rozmiar
  //         backgroundSize: '60px, 60px',

  //         padding: '30px',
  //       };
  //     }
  //     if (v === 'Poetry') return { borderBottom: '2px solid pink' };
  //     if (v === 'Rose') return { border: '3px solid crimson' };
  //   }

  //   // 🌙 DARK
  //   if (t === 'Dark') {
  //     if (!v || v === 'Deep Night') return { background: '#111827', color: 'white' };
  //     if (v === 'Soft Dark') return { background: '#1f2937', color: '#ddd' };
  //     if (v === 'Neon') return { background: '#000', color: '#0ff' };
  //     if (v === 'Midnight') return { background: '#0f172a', color: '#ccc' };
  //   }

  //   // ▫️ MINIMAL
  //   if (t === 'Minimal') {
  //     if (!v || v === 'Line') return { borderLeft: '3px solid black' };
  //     if (v === 'Soft Line') return { borderLeft: '2px solid gray' };
  //     if (v === 'Clean Space') return { padding: '20px' };
  //     if (v === 'Mono') return { color: '#333' };
  //   }

  //   // 📄 DEFAULT TEMPLATE
  //   if (t === 'Default') {
  //     return {
  //       background: '#ffffff',
  //       borderRadius: '8px',
  //     };
  //   }

  //   return {};
  // }

  currentPreviewPage = 0;
  private pagedPreviewer: any;

  preview() {
    this.savePage();

    localStorage.setItem('pages', JSON.stringify(this.pages));
    this.cd.detectChanges();
    this.isPreviewOpen = true;
    this.currentPreviewPage = 0;

    setTimeout(async () => {
      const source = document.querySelector('#paged-source .book') as HTMLElement | null;
      const host = document.getElementById('paged-preview-host');

      if (!source || !host) return;

      host.innerHTML = '';

      const clonedSource = source.cloneNode(true) as HTMLElement;

      // @ts-ignore
      this.pagedPreviewer = new window.Paged.Previewer();

      await this.pagedPreviewer.preview(clonedSource, [], host);

      this.fixLayout();
    }, 100);
  }

  fixLayout() {
    const host = document.getElementById('paged-preview-host');
    if (!host) return;

    const pages = host.querySelectorAll('.pagedjs_page');
    if (!pages.length) return;

    pages.forEach((p: any, index: number) => {
      p.style.display = index === this.currentPreviewPage ? 'block' : 'none';
      p.style.margin = '0 auto';
    });
  }

  nextPreviewPage() {
    const host = document.getElementById('paged-preview-host');
    if (!host) return;

    const pages = host.querySelectorAll('.pagedjs_page');

    if (this.currentPreviewPage < pages.length - 1) {
      this.currentPreviewPage++;
      this.fixLayout();
    }
  }

  prevPreviewPage() {
    if (this.currentPreviewPage > 0) {
      this.currentPreviewPage--;
      this.fixLayout();
    }
  }

  closePreview(event?: Event) {
    event?.stopPropagation();

    this.isPreviewOpen = false;
    this.currentPreviewPage = 0;

    const host = document.getElementById('paged-preview-host');
    if (host) {
      host.innerHTML = '';
    }
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

  // getVariantStylesForPage(p: any) {
  //   const t = p.template;
  //   const v = p.variant?.name;

  //   // 🌸 FLORAL
  //   if (t === 'Floral') {
  //     if (!v || v === 'Soft') return { border: '3px solid pink', borderRadius: '16px' };
  //     if (v === 'Elegant') return { border: '2px dashed hotpink', borderRadius: '20px' };
  //     if (v === 'Frame') return { border: '6px double pink' };
  //     if (v === 'Garden') return { border: '4px solid green', borderRadius: '12px' };
  //   }

  //   // ❀ ROMANTIC
  //   if (t === 'Romantic') {
  //     if (!v || v === 'Soft Love') return { background: '#ffe4e6' };
  //     if (v === 'Hearts') {
  //       return {
  //         border: '2px solid #f9a8d4',
  //         borderRadius: '20px',
  //         backgroundColor: '#fff1f2',
  //         position: 'relative',
  //       };
  //     }
  //   }

  //   return {};
  // }
  getVariantStyles() {
    return this.getVariantStylesBase(this.selectedTemplate, this.selectedVariant?.name);
  }

  getVariantStylesForPage(p: any) {
    return this.getVariantStylesBase(p.template, p.variant?.name);
  }

  getVariantStylesBase(t: string, v?: string) {
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
      if (!v || v === 'Soft') {
        return { border: '3px solid pink', borderRadius: '16px' };
      }

      if (v === 'Elegant') {
        return { border: '2px dashed hotpink', borderRadius: '20px' };
      }

      if (v === 'Frame') {
        return { border: '6px double pink', borderRadius: '16px' };
      }

      if (v === 'Garden') {
        return { border: '4px solid green', borderRadius: '12px' };
      }
    }

    // 📜 VINTAGE
    if (t === 'Vintage') {
      if (!v || v === 'Old Paper') {
        return {
          background: '#fdf6e3',
          border: '2px solid #d4af37',
          borderRadius: '10px',
        };
      }

      if (v === 'Gold Frame') {
        return {
          border: '4px solid gold',
          borderRadius: '12px',
        };
      }

      if (v === 'Classic Ink') {
        return {
          background: '#fffaf0',
          borderRadius: '8px',
        };
      }

      if (v === 'Retro') {
        return {
          border: '2px dashed brown',
          borderRadius: '10px',
        };
      }
    }

    // ❀ ROMANTIC
    if (t === 'Romantic') {
      if (!v || v === 'Soft Love') {
        return {
          background: '#ffe4e6',
          borderRadius: '16px',
        };
      }

      if (v === 'Hearts') {
        return {
          border: '2px solid #f9a8d4',
          borderRadius: '20px',
          backgroundColor: '#fff1f2',
          position: 'relative', // 🔥 ważne dla pseudo-elementów
        };
      }

      if (v === 'Poetry') {
        return {
          borderBottom: '2px solid pink',
        };
      }

      if (v === 'Rose') {
        return {
          border: '3px solid crimson',
          borderRadius: '12px',
        };
      }
    }

    // 🌙 DARK
    if (t === 'Dark') {
      if (!v || v === 'Deep Night') {
        return {
          background: '#111827',
          color: 'white',
          borderRadius: '10px',
        };
      }

      if (v === 'Soft Dark') {
        return {
          background: '#1f2937',
          color: '#ddd',
          borderRadius: '10px',
        };
      }

      if (v === 'Neon') {
        return {
          background: '#000',
          color: '#0ff',
          borderRadius: '10px',
        };
      }

      if (v === 'Midnight') {
        return {
          background: '#0f172a',
          color: '#ccc',
          borderRadius: '10px',
        };
      }
    }

    // ▫️ MINIMAL
    if (t === 'Minimal') {
      if (!v || v === 'Line') {
        return { borderLeft: '3px solid black' };
      }

      if (v === 'Soft Line') {
        return { borderLeft: '2px solid gray' };
      }

      if (v === 'Clean Space') {
        return { padding: '20px' };
      }

      if (v === 'Mono') {
        return { color: '#333' };
      }
    }

    return {};
  }

  // async exportPDF() {
  //   this.preview();

  //   setTimeout(async () => {
  //     const host = document.getElementById('paged-preview-host');
  //     if (!host) return;

  //     const pages = host.querySelectorAll('.pagedjs_page');

  //     // 🔥 KLUCZ: pokaż wszystkie strony
  //     pages.forEach((p: any) => {
  //       p.style.display = 'block';
  //     });

  //     const pdf = new jsPDF({
  //       unit: 'px',
  //       format: [794, 1123],
  //     });

  //     for (let i = 0; i < pages.length; i++) {
  //       const page = pages[i] as HTMLElement;

  //       const canvas = await html2canvas(page, {
  //         scale: 2,
  //         useCORS: true, // 🔥 ważne dla obrazów (cover!)
  //       });

  //       const imgData = canvas.toDataURL('image/jpeg', 1);

  //       if (i > 0) pdf.addPage();

  //       pdf.addImage(imgData, 'JPEG', 0, 0, 794, 1123);
  //     }

  //     pdf.save('moj-tomik.pdf');

  //     // 🔥 przywróć preview (1 strona)
  //     this.fixLayout();

  //   }, 700);
  // }

  // async exportPDF() {
  //   this.preview();

  //   setTimeout(async () => {
  //     const host = document.getElementById('paged-preview-host');
  //     if (!host) return;

  //     const pages = host.querySelectorAll('.pagedjs_page');

  //     pages.forEach((p: any) => {
  //       p.style.display = 'block';
  //     });

  //     const pdf = new jsPDF({
  //       unit: 'mm',
  //       format: 'a4',
  //       compress: true,
  //     });

  //     for (let i = 0; i < pages.length; i++) {
  //       const page = pages[i] as HTMLElement;

  //       const canvas = await html2canvas(page, {
  //         scale: 2,
  //         useCORS: true,
  //         backgroundColor: '#ffffff',
  //       });

  //       const imgData = canvas.toDataURL('image/jpeg', 0.85);

  //       if (i > 0) pdf.addPage();

  //       pdf.addImage(imgData, 'JPEG', 0, 0, 210, 297);
  //     }

  //     pdf.save('moj-tomik.pdf');

  //     this.fixLayout();
  //   }, 500);
  // }

  async exportPDF() {
    this.preview();

    setTimeout(async () => {
      const host = document.getElementById('paged-preview-host');
      if (!host) return;

      const pages = host.querySelectorAll('.pagedjs_page');

      pages.forEach((p: any) => {
        p.style.display = 'block';
      });

      const pdf = new jsPDF({
        unit: 'mm',
        format: 'a4',
        compress: true,
      });

      for (let i = 0; i < pages.length; i++) {
        const page = pages[i] as HTMLElement;

        const canvas = await html2canvas(page, {
          scale: 2,
          useCORS: true,
          backgroundColor: '#ffffff',
        });

        const imgData = canvas.toDataURL('image/jpeg', 0.85);

        if (i > 0) pdf.addPage();

        pdf.addImage(imgData, 'JPEG', 0, 0, 210, 297);
      }

      const rawTitle = this.cover?.title?.trim() || 'moj-tomik';
      const safeTitle = rawTitle
        .replace(/[\\/:*?"<>|]/g, '')
        .replace(/\s+/g, '-')
        .toLowerCase();

      pdf.save(`${safeTitle}.pdf`);

      this.fixLayout();
    }, 500);
  }
}

function trigger(arg0: string, arg1: any[]): any {
  throw new Error('Function not implemented.');
}
