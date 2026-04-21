import { EditorApiService } from './../../../services/editor-api';
import { ChangeDetectorRef, Component, HostListener } from '@angular/core';
import { Topbar } from '../topbar/topbar';
import { CommonModule } from '@angular/common';
import { Sidebar } from '../sidebar/sidebar';
import { FormsModule } from '@angular/forms';
import { CoverEditor } from '../../cover-editor/cover-editor';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Auth } from './../../../services/auth';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { FormattingService } from './../../../services/formatting-service';
import { StorageService } from './../../../services/storage-service';
import { ExportService } from './../../../services/export-service';
import { ThemeService } from './../../../services/theme-service';
import { BooksService } from '../../../services/books-service';
import { Gu } from './gu/gu';
@Component({
  selector: 'app-editor-test',
  imports: [Topbar, CommonModule, Sidebar, FormsModule, CoverEditor, Gu],
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
  booksCount = 0;
  //////////////////////////////////////

  showGooey = false;

  savedMessageText = '';
  cover = {
    title: 'Mój tomik',
    author: '',
    image: '',
    bgColor: '#000000',
    textColor: '#ffffff',
  };

  onTextFocus() {
    this.activeField = 'text';
    this.showGooey = true;
  }

  hideGooey() {
    this.showGooey = false;
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    const target = event.target as HTMLElement;

    if (!target.closest('.gooey-menu') && !target.closest('textarea')) {
      this.hideGooey();
    }
  }

  constructor(
    private cd: ChangeDetectorRef,
    private api: EditorApiService,
    private route: ActivatedRoute,
    private router: Router,
    private auth: Auth,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private formatting: FormattingService,
    private storage: StorageService,
    private exportService: ExportService,
    private theme: ThemeService,
    private booksService: BooksService,
  ) {}

  ngOnInit() {
    const user = this.auth.getUser();

    if (!user?.id) {
      this.router.navigate(['/login']);
      return;
    }
    this.api.getUserBooksFull(user.id).subscribe((books) => {
      this.booksCount = books.length;
    });
    const idFromStorage = this.storage.getBookId();

    if (idFromStorage) {
      this.bookId = idFromStorage;
      this.loadBook(this.bookId);
    } else {
      this.pages = [this.createEmptyPage()];
      this.loadPage();
    }
  }

  onCoverImageUpload(event: any) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = () => {
      this.cover.image = reader.result as string;
    };

    reader.readAsDataURL(file);
  }

  showMessage(message: string) {
    this.snackBar.open(message, 'OK', {
      duration: 3000,
      verticalPosition: 'top',
    });
  }

  saveCover(updatedCover: any) {
    Object.assign(this.cover, updatedCover);
    this.storage.saveCover(this.cover);
    this.save();
  }

  formatAdvanced() {
    this.text = this.formatting.formatPoemAdvanced(this.text);
    this.savePage();
    this.storage.savePages(this.pages);
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

    // 🔥 FORMATOWANIE → SERWIS
    if (p.autoFormat) {
      this.text = this.formatting.formatText(this.text, p.autoFormat);
    }

    if (p.autoFormat === 'advanced') {
      this.text = this.formatting.formatPoemAdvanced(this.text);
    }

    this.savePage();

    // 🔥 STORAGE → SERWIS
    this.storage.savePages(this.pages);
  }

  formatAI() {
    this.text = this.formatting.formatPoemAI(this.text); // 🔥 serwis

    this.savePage();
    this.storage.savePages(this.pages); // 🔥 storage
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

  // 🔥 ID
  generateId(): string {
    return crypto.randomUUID();
  }

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
  }

  onFontChange(value: string) {
    if (this.activeField === 'title') {
      this.titleFont = value;
    } else {
      this.textFont = value;
    }

    this.savePage();
    this.storage.savePages(this.pages);
  }

  loadPage() {
    const p = this.pages[this.currentPageIndex];

    this.title = p.title;
    this.text = p.text;

    this.selectedTemplate = p.template || 'Default'; // 🔥 FIX
    this.selectedVariant = p.variant || null; // 🔥 FIX

    this.titleFont = p.titleFont || 'Playfair Display';
    this.textFont = p.textFont || 'Georgia';

    this.titleColor = p.titleColor && p.titleColor.startsWith('#') ? p.titleColor : '#000000';
    this.textColor = p.textColor && p.textColor.startsWith('#') ? p.textColor : '#000000';
  }

  loadBook(id: string) {
    const user = this.auth.getUser();

    if (!user?.id) {
      console.warn('❌ Brak usera — nie ładuję książki');
      return;
    }

    this.api.getBook(id, user.id).subscribe({
      next: (book: any) => {
        console.log('✅ LOADED:', book);
        this.applyBook(book);
      },

      error: (err) => {
        if (err.status === 404) {
          console.warn('❌ Book nie istnieje → czyszczę state');

          this.storage.removeBookId();
          this.bookId = ''; // 🔥 KLUCZ

          this.pages = [this.createEmptyPage()];

          this.cover = {
            title: 'Mój tomik',
            author: '',
            image: '',
            bgColor: '#000000',
            textColor: '#ffffff',
          };

          this.loadPage();
        } else if (err.status === 403) {
          console.warn('🚫 Brak dostępu do książki');
        } else {
          console.error('❌ LOAD ERROR:', err);
        }
      },
    });
  }

  // applyBook(book: any) {
  //   this.bookId = book.id;

  //   this.cover = {
  //     title: book.title || 'Mój tomik',
  //     author: book.cover?.author || '',
  //     image: book.cover?.image || '',
  //     bgColor: this.fixColor(book.cover?.bgColor),
  //     textColor: this.fixColor(book.cover?.textColor),
  //   };

  //   this.pages = (book.pages || []).map((p: any) => ({
  //     ...p,
  //     titleColor: this.fixColor(p.titleColor),
  //     textColor: this.fixColor(p.textColor),
  //   }));

  //   this.selectedTheme = book.selected_theme || '';

  //   this.currentPageIndex = 0;

  //   if (this.pages.length === 0) {
  //     this.pages = [this.createEmptyPage()];
  //   }

  //   this.loadPage();

  //   // 🔥 KLUCZ
  //   this.cd.detectChanges();
  // }

  applyBook(book: any) {
    this.bookId = book.id;

    this.cover = {
      title: book.cover?.title || book.title || 'Mój tomik', // 🔥 FIX
      author: book.cover?.author || '',
      image: book.cover?.image || '',
      bgColor: this.fixColor(book.cover?.bgColor),
      textColor: this.fixColor(book.cover?.textColor),
    };

    this.pages = (book.pages || []).map((p: any) => ({
      ...p,
      titleColor: this.fixColor(p.titleColor),
      textColor: this.fixColor(p.textColor),
    }));

    this.selectedTheme = book.selected_theme || '';
    this.currentPageIndex = 0;

    if (this.pages.length === 0) {
      this.pages = [this.createEmptyPage()];
    }

    this.loadPage();
    this.cd.detectChanges();
  }

  fixColor(color: string | null | undefined): string {
    if (!color || color === '') {
      return '#000000';
    }
    return color;
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

  savePage() {
    const p = this.pages[this.currentPageIndex];

    if (!p) {
      console.warn('⚠️ Brak strony, tworzę nową');
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

      this.storage.savePages(this.pages);

      this.currentPageIndex++;
      this.loadPage();
    }
  }

  prevPage() {
    if (this.currentPageIndex > 0) {
      this.savePage();

      this.storage.savePages(this.pages);

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

    const p = this.pages[this.currentPageIndex];
    p.template = template;
    p.variant = null;

    this.savePage(); // 🔥 już masz
  }

  ////////////////

  createNewBook() {
    const confirmNew = confirm('Utworzyć nową książkę? Niezapisane zmiany przepadną.');

    if (!confirmNew) return;

    const user = this.auth.getUser();
    if (!user?.id) return;

    this.api.createEmptyBook(user.id).subscribe((res: any) => {
      this.storage.saveBookId(res.id);

      this.bookId = res.id;
      this.pages = [this.createEmptyPage()];
      this.currentPageIndex = 0;
      this.loadPage();
    });
  }

  applyVariant(variant: any) {
    this.selectedVariant = variant;
    this.savePage();
  }

  save() {
    console.log('🔥 SAVE CLICKED');

    this.savePage();

    const user = this.auth.getUser();

    if (!user?.id) {
      console.error('❌ Brak usera — nie zapisuję');
      return;
    }

    const isNew = !this.bookId;

    const fixedPages = this.pages.map((p) => ({
      ...p,
      titleColor: p.titleColor?.startsWith('#') ? p.titleColor : '#000000',
      textColor: p.textColor?.startsWith('#') ? p.textColor : '#000000',
    }));

    const payload = {
      id: this.bookId || null,
      user_id: user.id,
      title: this.cover?.title || 'Mój tomik',

      cover: {
        ...this.cover,
        bgColor: this.cover.bgColor || '#000000',
        textColor: this.cover.textColor || '#ffffff',
      },

      pages: fixedPages,
      selectedTheme: this.selectedTheme || '',
    };

    this.api.saveBook(payload).subscribe({
      next: (res: any) => {
        if (isNew && res?.id) {
          this.bookId = res.id;

          this.storage.saveBookId(res.id); // 🔥 zamiast localStorage

          console.log('🆕 Book created:', res.id);

          this.booksCount++;
          this.refreshBooksCount();

          this.showMessage('📚 Book created!');
        } else {
          this.showMessage('💾 Changes saved');
        }

        console.log('💾 Saved');
      },
      error: (err) => {
        console.error('❌ SAVE ERROR:', err);
      },
    });
  }

  refreshBooksCount() {
    const user = this.auth.getUser();
    if (!user?.id) return;

    this.api.getUserBooksFull(user.id).subscribe((books) => {
      this.booksCount = books.length;
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

  currentPreviewPage = 0;

  preview() {
    this.savePage();
    this.storage.savePages(this.pages);

    this.cd.detectChanges();
    this.isPreviewOpen = true;
    this.currentPreviewPage = 0;

    setTimeout(async () => {
      await this.exportService.preview('#paged-source .book', 'paged-preview-host');

      this.exportService.fixLayout('paged-preview-host', this.currentPreviewPage);
    }, 100);
  }

  nextPreviewPage() {
    const host = document.getElementById('paged-preview-host');
    if (!host) return;

    const pages = host.querySelectorAll('.pagedjs_page');

    if (this.currentPreviewPage < pages.length - 1) {
      this.currentPreviewPage++;
      this.exportService.fixLayout('paged-preview-host', this.currentPreviewPage);
    }
  }

  prevPreviewPage() {
    if (this.currentPreviewPage > 0) {
      this.currentPreviewPage--;
      this.exportService.fixLayout('paged-preview-host', this.currentPreviewPage);
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

    this.storage.savePages(this.pages);
  }

  getVariantStyles() {
    return this.theme.getVariantStyles(this.selectedTemplate, this.selectedVariant?.name);
  }

  getVariantStylesForPage(p: any) {
    return this.theme.getVariantStyles(p.template, p.variant?.name);
  }

  getHeartPattern() {
    return this.theme.getHeartPattern();
  }

  goDashboard() {
    this.router.navigate(['/dashboard']);
  }

  async exportPDF() {
    this.preview();

    setTimeout(async () => {
      const rawTitle = this.cover?.title?.trim() || 'moj-tomik';

      const safeTitle = rawTitle
        .replace(/[\\/:*?"<>|]/g, '')
        .replace(/\s+/g, '-')
        .toLowerCase();

      await this.exportService.exportPDF('paged-preview-host', `${safeTitle}.pdf`);

      this.exportService.fixLayout('paged-preview-host', this.currentPreviewPage);
    }, 500);
  }
}

function trigger(arg0: string, arg1: any[]): any {
  throw new Error('Function not implemented.');
}
