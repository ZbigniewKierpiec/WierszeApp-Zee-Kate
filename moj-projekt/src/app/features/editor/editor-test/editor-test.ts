import { EditorApiService } from './../../../services/editor-api';
import { ChangeDetectorRef, Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Topbar } from '../topbar/topbar';
import { CommonModule } from '@angular/common';
import { Sidebar } from '../sidebar/sidebar';
import { FormsModule } from '@angular/forms';
import { CoverEditor } from '../../cover-editor/cover-editor';
import { Router, ActivatedRoute } from '@angular/router';
import { Auth } from './../../../services/auth';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { FormattingService } from './../../../services/formatting-service';
import { StorageService } from './../../../services/storage-service';
import { ExportService } from './../../../services/export-service';
import { ThemeService } from './../../../services/theme-service';
import { BooksService } from '../../../services/books-service';
import { Gu } from './gu/gu';
import { EditorEventsService } from '../../../shared/editor-events-service';
import { Subject, takeUntil } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-editor-test',
  imports: [Topbar, CommonModule, Sidebar, FormsModule, CoverEditor, Gu, TranslateModule],
  templateUrl: './editor-test.html',
  styleUrl: './editor-test.scss',
})
export class EditorTest implements OnInit, OnDestroy {
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
  savedMessageText = '';

  pages: any[] = [];
  currentPageIndex = 0;

  isCoverEditorOpen = false;
  isPreviewOpen = false;
  booksCount = 0;
  currentPreviewPage = 0;

  showGooey = false;

  private destroy$ = new Subject<void>();

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
    private events: EditorEventsService,
  ) {}

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('.gooey-menu') && !target.closest('textarea')) {
      this.hideGooey();
    }
  }

  ngOnInit() {
    const user = this.auth.getUser();

    if (!user?.id) {
      this.router.navigate(['/login']);
      return;
    }

    this.api.getUserBooksFull(user.id).subscribe({
      next: (books) => {
        this.booksCount = books.length;
      },
      error: (err) => {
        console.error('❌ BOOKS COUNT ERROR:', err);
      },
    });

    const idFromStorage = this.storage.getBookId();

    if (idFromStorage && typeof idFromStorage === 'string' && idFromStorage.trim()) {
      this.bookId = idFromStorage;
      this.loadBook(this.bookId);
    } else {
      this.initEmptyEditor();
    }

    this.events.save$.pipe(takeUntil(this.destroy$)).subscribe(() => {
      console.log('SAVE kliknięty');
      this.save();
    });

    this.events.clear$.pipe(takeUntil(this.destroy$)).subscribe(() => this.clear());
    this.events.export$.pipe(takeUntil(this.destroy$)).subscribe(() => this.exportPDF());
    this.events.coverEdit$.pipe(takeUntil(this.destroy$)).subscribe(() => this.openCoverEditor());
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  get canSave(): boolean {
    return !!this.title?.trim() && !!this.text?.trim();
  }

  onTextFocus() {
    this.activeField = 'text';
    this.showGooey = true;
  }

  hideGooey() {
    this.showGooey = false;
  }

  showMessage(message: string) {
    this.snackBar.open(message, 'OK', {
      duration: 3000,
      verticalPosition: 'top',
    });
  }

  openCoverEditor() {
    this.isCoverEditorOpen = true;
  }

  saveCover(updatedCover: any) {
    this.cover = {
      ...updatedCover,
      bgColor: this.fixColor(updatedCover?.bgColor, '#000000'),
      textColor: this.fixColor(updatedCover?.textColor, '#ffffff'),
      image: updatedCover?.image || '',
      title: updatedCover?.title || 'Mój tomik',
      author: updatedCover?.author || '',
    };

    this.storage.saveCover(this.cover);
  }

  onCoverImageUpload(event: any) {
    const file = event?.target?.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      this.cover.image = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  formatAdvanced() {
    this.text = this.formatting.formatPoemAdvanced(this.text);
    this.savePage();
    this.storage.savePages(this.pages);
  }

  formatAI() {
    this.text = this.formatting.formatPoemAI(this.text);
    this.savePage();
    this.storage.savePages(this.pages);
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

  applyPreset(p: any) {
    const current = this.pages[this.currentPageIndex];
    if (!current) return;

    current.template = p.template;
    current.variant = p.variant;

    this.selectedTemplate = p.template;
    this.selectedVariant = p.variant;

    if (p.titleFont) this.titleFont = p.titleFont;
    if (p.textFont) this.textFont = p.textFont;
    if (p.textColor) this.textColor = this.fixColor(p.textColor);
    if (p.titleColor) this.titleColor = this.fixColor(p.titleColor);

    if (p.autoFormat) {
      this.text = this.formatting.formatText(this.text, p.autoFormat);
    }

    if (p.autoFormat === 'advanced') {
      this.text = this.formatting.formatPoemAdvanced(this.text);
    }

    this.savePage();
    this.storage.savePages(this.pages);
  }

  generateId(): string {
    return crypto.randomUUID();
  }

  createEmptyPage() {
    return {
      id: this.generateId(),
      title: '',
      text: '',
      template: 'Default',
      variant: null,
      titleFont: this.titleFont || 'Playfair Display',
      textFont: this.textFont || 'Playfair Display',
      titleColor: '#000000',
      textColor: '#000000',
    };
  }

  initEmptyEditor() {
    this.bookId = '';
    this.pages = [this.createEmptyPage()];
    this.currentPageIndex = 0;

    this.cover = {
      title: 'Mój tomik',
      author: '',
      image: '',
      bgColor: '#000000',
      textColor: '#ffffff',
    };

    this.loadPage();
  }

  newPage() {
    const page = {
      id: this.generateId(),
      title: '',
      text: '',
      template: 'Default',
      variant: null,
      titleFont: this.titleFont || 'Playfair Display',
      textFont: this.textFont || 'Playfair Display',
      titleColor: this.fixColor(this.titleColor),
      textColor: this.fixColor(this.textColor),
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
    if (!p) return;

    this.title = p.title || '';
    this.text = p.text || '';
    this.selectedTemplate = p.template || 'Default';
    this.selectedVariant = p.variant || null;

    this.titleFont = p.titleFont || 'Playfair Display';
    this.textFont = p.textFont || 'Playfair Display';

    this.titleColor = this.fixColor(p.titleColor, '#000000');
    this.textColor = this.fixColor(p.textColor, '#000000');
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
          console.warn('⚠️ Book nie istnieje lub jest stary bookId w storage');
          this.storage.removeBookId();
          this.initEmptyEditor();
          return;
        }

        if (err.status === 403) {
          console.warn('🚫 Brak dostępu do książki');
          return;
        }

        console.error('❌ LOAD ERROR:', err);
      },
    });
  }

  applyBook(book: any) {
    this.bookId = book.id;

    this.cover = {
      title: book.cover?.title || book.title || 'Mój tomik',
      author: book.cover?.author || '',
      image: book.cover?.image || '',
      bgColor: this.fixColor(book.cover?.bgColor, '#000000'),
      textColor: this.fixColor(book.cover?.textColor, '#ffffff'),
    };

    this.pages = (book.pages || []).map((p: any) => ({
      ...p,
      title: p.title || '',
      text: p.text || '',
      template: p.template || 'Default',
      variant: p.variant || null,
      titleFont: p.titleFont || 'Playfair Display',
      textFont: p.textFont || 'Playfair Display',
      titleColor: this.fixColor(p.titleColor, '#000000'),
      textColor: this.fixColor(p.textColor, '#000000'),
    }));

    this.selectedTheme = book.selected_theme || '';
    this.currentPageIndex = 0;

    if (!this.pages.length) {
      this.pages = [this.createEmptyPage()];
    }

    this.loadPage();
    this.cd.detectChanges();
  }

  fixColor(color: string | null | undefined, fallback = '#000000'): string {
    if (!color || typeof color !== 'string') return fallback;

    const normalized = color.trim();
    const hexRegex = /^#([0-9a-fA-F]{6})$/;

    return hexRegex.test(normalized) ? normalized : fallback;
  }

  savePage() {
    const p = this.pages[this.currentPageIndex];

    if (!p) {
      console.warn('⚠️ Brak strony, tworzę nową');
      this.newPage();
      return;
    }

    p.title = this.title || '';
    p.text = this.text || '';
    p.template = this.selectedTemplate || 'Default';
    p.variant = this.selectedVariant || null;
    p.titleFont = this.titleFont || 'Playfair Display';
    p.textFont = this.textFont || 'Playfair Display';
    p.titleColor = this.fixColor(this.titleColor, '#000000');
    p.textColor = this.fixColor(this.textColor, '#000000');
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

  applyTheme(theme: string) {
    this.selectedTheme = theme;
    this.savePage();
  }

  applyTemplate(template: string) {
    this.selectedTemplate = template;
    this.selectedVariant = null;

    const p = this.pages[this.currentPageIndex];
    if (p) {
      p.template = template;
      p.variant = null;
    }

    this.savePage();
  }

  applyVariant(variant: any) {
    this.selectedVariant = variant;
    this.savePage();
  }

  createNewBook() {
    const confirmNew = confirm('Utworzyć nową książkę? Niezapisane zmiany przepadną.');
    if (!confirmNew) return;

    const user = this.auth.getUser();
    if (!user?.id) return;

    this.api.createEmptyBook(user.id).subscribe({
      next: (res: any) => {
        this.storage.saveBookId(res.id);
        this.bookId = res.id;
        this.pages = [this.createEmptyPage()];
        this.currentPageIndex = 0;
        this.loadPage();
      },
      error: (err) => {
        console.error('❌ CREATE EMPTY BOOK ERROR:', err);
      },
    });
  }

  save() {
    console.log('🔥 SAVE CLICKED');

    if (!this.canSave) {
      this.showMessage('Uzupełnij tytuł i treść');
      return;
    }

    this.savePage();

    const user = this.auth.getUser();
    if (!user?.id) {
      console.error('❌ Brak usera — nie zapisuję');
      return;
    }

    const isNew = !this.bookId;

    const fixedPages = this.pages.map((p) => ({
      ...p,
      titleColor: this.fixColor(p.titleColor, '#000000'),
      textColor: this.fixColor(p.textColor, '#000000'),
      titleFont: p.titleFont || 'Playfair Display',
      textFont: p.textFont || 'Playfair Display',
    }));

    const payload = {
      id: this.bookId || null,
      user_id: user.id,
      title: this.cover?.title || 'Mój tomik',
      cover: {
        ...this.cover,
        title: this.cover?.title || 'Mój tomik',
        author: this.cover?.author || '',
        image: this.cover?.image || '',
        bgColor: this.fixColor(this.cover?.bgColor, '#000000'),
        textColor: this.fixColor(this.cover?.textColor, '#ffffff'),
      },
      pages: fixedPages,
      selectedTheme: this.selectedTheme || '',
    };

    this.api.saveBook(payload).subscribe({
      next: (res: any) => {
        if (res?.id) {
          this.bookId = res.id;
          this.storage.saveBookId(res.id);
        }

        if (isNew && res?.id) {
          console.log('🆕 Book created:', res.id);
          this.booksService.increment();
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

    this.api.getUserBooksFull(user.id).subscribe({
      next: (books) => {
        this.booksCount = books.length;
      },
      error: (err) => {
        console.error('❌ REFRESH COUNT ERROR:', err);
      },
    });
  }

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

  async preview() {
    this.savePage();
    this.storage.savePages(this.pages);

    this.cd.detectChanges();
    this.isPreviewOpen = true;
    this.currentPreviewPage = 0;

    setTimeout(async () => {
      const source = document.querySelector('#paged-source .book');
      const host = document.getElementById('paged-preview-host');

      if (!source || !host) {
        console.warn('⚠️ Brak źródła lub hosta dla preview');
        return;
      }

      try {
        await this.exportService.preview('#paged-source .book', 'paged-preview-host');
        this.exportService.fixLayout('paged-preview-host', this.currentPreviewPage);
      } catch (err) {
        console.error('❌ PREVIEW ERROR:', err);
      }
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
    const host = document.getElementById('paged-preview-host');
    if (!host) return;

    const pages = host.querySelectorAll('.pagedjs_page');
    if (!pages.length) return;

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

    if (this.pages.length === 0) {
      this.pages = [this.createEmptyPage()];
      this.currentPageIndex = 0;
      this.loadPage();
      this.storage.savePages(this.pages);
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
    await this.preview();

    setTimeout(async () => {
      const rawTitle = this.cover?.title?.trim() || 'moj-tomik';
      const safeTitle = rawTitle
        .replace(/[\\/:*?"<>|]/g, '')
        .replace(/\s+/g, '-')
        .toLowerCase();

      try {
        await this.exportService.exportPDF('paged-preview-host', `${safeTitle}.pdf`);
        this.exportService.fixLayout('paged-preview-host', this.currentPreviewPage);
      } catch (err) {
        console.error('❌ EXPORT PDF ERROR:', err);
      }
    }, 500);
  }
}