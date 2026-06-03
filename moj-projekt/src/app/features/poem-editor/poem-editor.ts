import { CommonModule } from '@angular/common';
import {
  Component,
  type Type,
  AfterViewInit,
  ChangeDetectorRef,
  ViewChild,
  type ElementRef,
  OnInit,
} from '@angular/core';

import { Router, RouterModule, ActivatedRoute } from '@angular/router';

import { ColorsPanel } from './panels/colors-panel/colors-panel';
import { BackgroundPanel } from './panels/background-panel/background-panel';
import { TextPanel } from './panels/text-panel/text-panel';
import { SeparatorPanel } from './panels/separator-panel/separator-panel';
import { FontPanel } from './panels/font-panel/font-panel';
import { StylePanel } from './panels/style-panel/style-panel';

import { EditorApiService } from '../../services/editor-api';
import { AuthService } from '../../services/auth-service';
import { ExportService } from '../../services/export-service';

type PoemBlock =
  | {
      type: 'line';
      text: string;
      textIndex: number;
    }
  | {
      type: 'space';
      text: '';
    }
  | {
      type: 'separator';
      text: string;
      separatorIndex: number;
    };

@Component({
  selector: 'app-poem-editor',
  standalone: true,
  imports: [
    CommonModule,
    ColorsPanel,
    TextPanel,
    SeparatorPanel,
    FontPanel,
    BackgroundPanel,
    StylePanel,
    RouterModule,
  ],
  templateUrl: './poem-editor.html',
  styleUrl: './poem-editor.scss',
})
export class PoemEditor implements OnInit, AfterViewInit {
  @ViewChild('poemBox') poemBox!: ElementRef<HTMLDivElement>;
  @ViewChild('poemContent') poemContent!: ElementRef<HTMLDivElement>;

  activePanel = 'colors';
  activeTitle = false;
  bookId = '';
  pageIndex = 0;

  ////////////////////////////
  isPreviewOpen = false;
  currentPreviewPage = 0;
  ////////////////////////////
  backgroundColor = '';
  backgroundImage = '';
  frameImage = '';
  contentBox = {
    width: 72,
    height: 70,
    offsetY: 0,
    offsetTop: 0,
  };

  textStyle = {
    lineHeight: '1.4',
    fontSize: 'clamp(20px, 1.4vw, 32px)',
    maxWidth: '38ch',
  };

  autoTextStyle = {
    fontSize: 18,
    lineHeight: 1.4,
    gap: 10,
  };

  baseFontSize = 18;
  baseLineHeight = 1.25;
  poemColor = '#ffffff';
  poemFont = '"Playfair Display", serif';
  poemFontWeight: string | number = 'normal';
  poemFontStyle = 'normal';
  poemAlign = 'left';
  poemTitle = '';

  titleColor = '#ffffff';

  titleFont = '"Playfair Display", serif';

  titleFontWeight: string | number = 600;

  titleFontStyle = 'normal';

  titleAlign = 'center';

  poemBlocks: PoemBlock[] = [];

  showSeparators = false;

  styleOverrides: any[] = [];
  textColors: (string | null)[] = [];
  fontOverrides: any[] = [];
  separatorColors: (string | null)[] = [];

  separators: string[] = [];

  miniMenuVisible = false;
  miniMenuPosition = { x: 0, y: 0 };

  activeTextIndex: number | null = null;
  activeSeparatorIndex: number | null = null;
  currentBook: any = null;
  editorTabs = [
    { id: 'text', label: 'Tekst', icon: 'T' },
    { id: 'fonts', label: 'Czcionka', icon: 'Aa' },
    { id: 'colors', label: 'Kolory', icon: '🎨' },
    { id: 'background', label: 'Tło', icon: '🖼' },
    { id: 'decorations', label: 'Dekoracje', icon: '❀' },
    { id: 'style', label: 'Styl', icon: '≡' },
  ];

  panelMap: Record<string, Type<any>> = {
    colors: ColorsPanel,
    background: BackgroundPanel,
    fonts: FontPanel,
    decorations: SeparatorPanel,
    style: StylePanel,
  };

  constructor(
    private cdr: ChangeDetectorRef,
    private router: Router,
    private route: ActivatedRoute,
    private api: EditorApiService,
    private auth: AuthService,
    private cd: ChangeDetectorRef,
    private exportService: ExportService,
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.bookId = params.get('id') || '';

      this.route.queryParamMap.subscribe((query) => {
        this.pageIndex = Number(query.get('page') || 0);

        this.loadBook();
      });
    });
  }

  ngAfterViewInit(): void {
    requestAnimationFrame(() => this.fitTextToContainer());
  }

  loadBook() {
    const user = this.auth.getUser();

    if (!user?.id || !this.bookId) return;

    this.api.getBook(this.bookId, user.id).subscribe({
      next: (book: any) => {
        const page = book.pages?.[this.pageIndex];

        this.currentBook = book;

        if (!page) return;

        // 🔥 POEM DATA
        const poemData = page.poemEditor || {};

        // BASIC
        this.poemTitle = page.title || '';

        // MAIN
        this.poemFont = this.normalizeFont(poemData.poemFont || '"Playfair Display", serif');

        this.poemFontWeight = poemData.poemFontWeight || 'normal';

        this.poemFontStyle = poemData.poemFontStyle || 'normal';

        this.poemColor = poemData.poemColor || '#ffffff';

        this.poemAlign = poemData.poemAlign || 'left';

        // TITLE
        this.titleFont = poemData.titleFont || '"Playfair Display", serif';

        this.titleFontWeight = poemData.titleFontWeight || 600;

        this.titleFontStyle = poemData.titleFontStyle || 'normal';

        this.titleColor = poemData.titleColor || '#ffffff';

        this.titleAlign = poemData.titleAlign || 'center';

        // AUTO FIT
        this.baseFontSize = Number(poemData.textFontSize || 18);

        this.baseLineHeight = Number(poemData.textLineHeight || 1.4);

        this.autoTextStyle = {
          fontSize: this.baseFontSize,
          lineHeight: this.baseLineHeight,
          gap: 10,
        };

        // BACKGROUND
        this.backgroundColor = poemData.backgroundColor || '';

        if (poemData.backgroundImage) {
          this.backgroundImage = `url("${poemData.backgroundImage}")`;
        } else {
          this.backgroundImage = '';
        }

        // BOX
        if (poemData.contentBox) {
          this.contentBox = poemData.contentBox;
        }

        // STYLE
        if (poemData.textStyle) {
          this.textStyle = poemData.textStyle;
        }

        // OVERRIDES
        this.styleOverrides = poemData.styleOverrides || [];

        this.fontOverrides = poemData.fontOverrides || [];

        this.textColors = poemData.textColors || [];

        this.separatorColors = poemData.separatorColors || [];

        this.separators = poemData.separators || [];

        // BUILD
        this.buildPoemBlocks(page.text || '');

        this.cdr.detectChanges();

        requestAnimationFrame(() => {
          this.fitTextToContainer();
        });
      },

      error: (err) => {
        console.error('❌ LOAD POEM ERROR', err);
      },
    });
  }

  get hasNextPage(): boolean {
    return !!this.currentBook?.pages?.[this.pageIndex + 1];
  }

  nextPage() {
    if (!this.hasNextPage) return;

    this.router.navigate([], {
      queryParams: {
        page: this.pageIndex + 1,
      },
      queryParamsHandling: 'merge',
    });
  }

  prevPage() {
    if (this.pageIndex <= 0) return;

    this.router.navigate([], {
      queryParams: {
        page: this.pageIndex - 1,
      },
      queryParamsHandling: 'merge',
    });
  }

  selectTitle(event: MouseEvent) {
    event.stopPropagation();

    this.activeTitle = true;

    this.activeTextIndex = null;
    this.activeSeparatorIndex = null;

    this.miniMenuPosition = {
      x: event.clientX,
      y: event.clientY,
    };

    this.miniMenuVisible = true;
  }

  normalizeFont(font: string): string {
    if (!font) return '"Playfair Display", serif';

    if (font.includes(',') || font.includes('"') || font.includes("'")) {
      return font;
    }

    return `"${font}", serif`;
  }

  buildPoemBlocks(text: string) {
    const rawLines = text.replace(/\r\n/g, '\n').split('\n');

    const textLines = rawLines.filter((line) => line.trim()).length;
    const emptyLines = rawLines.filter((line) => !line.trim()).length;

    this.styleOverrides = Array(textLines).fill(null);
    this.textColors = Array(textLines).fill(null);
    this.fontOverrides = Array(textLines).fill(null);

    this.separatorColors = Array(emptyLines).fill(null);
    this.separators = Array(emptyLines).fill('✧');

    this.poemBlocks = [];

    let textIndex = 0;
    let separatorIndex = 0;

    rawLines.forEach((line) => {
      if (!line.trim()) {
        if (this.showSeparators) {
          this.poemBlocks.push({
            type: 'separator',
            text: this.separators[separatorIndex] || '✧',
            separatorIndex,
          });
        } else {
          this.poemBlocks.push({
            type: 'space',
            text: '',
          });
        }

        separatorIndex++;
        return;
      }

      this.poemBlocks.push({
        type: 'line',
        text: line,
        textIndex,
      });

      textIndex++;
    });
  }

  fitTextToContainer() {
    const box = this.poemBox?.nativeElement;
    const content = this.poemContent?.nativeElement;

    if (!box || !content) return;

    let fontSize = this.baseFontSize || 18;
    let lineHeight = this.baseLineHeight || 1.4;
    let gap = 10;

    content.style.fontSize = `${fontSize}px`;
    content.style.lineHeight = `${lineHeight}`;
    content.style.gap = `${gap}px`;

    while (
      (content.scrollHeight > box.clientHeight || content.scrollWidth > box.clientWidth) &&
      fontSize > 12
    ) {
      fontSize -= 1;

      if (lineHeight > 1.1) {
        lineHeight -= 0.01;
      }

      if (gap > 2) {
        gap -= 1;
      }

      content.style.fontSize = `${fontSize}px`;
      content.style.lineHeight = `${lineHeight}`;
      content.style.gap = `${gap}px`;
    }

    this.autoTextStyle = {
      fontSize,
      lineHeight,
      gap,
    };
  }

  selectText(index: number, event: MouseEvent) {
    event.stopPropagation();

    this.activeTitle = false;

    this.activeTextIndex = index;
    this.activeSeparatorIndex = null;

    this.miniMenuPosition = {
      x: event.clientX,
      y: event.clientY,
    };

    this.miniMenuVisible = true;
  }

  selectSeparator(index: number, event: MouseEvent) {
    event.stopPropagation();

    this.activeTitle = false;

    this.activeSeparatorIndex = index;
    this.activeTextIndex = null;

    this.miniMenuPosition = {
      x: event.clientX,
      y: event.clientY,
    };

    this.miniMenuVisible = true;
  }

  clearSeparatorSelection() {
    this.activeSeparatorIndex = null;
  }

  openPanel(panel: string) {
    this.activePanel = panel;
    this.miniMenuVisible = false;
  }

  onColorChange(c: string) {
    if (this.activeTitle) {
      this.titleColor = c;

      this.savePoem();

      return;
    }

    if (this.activeTextIndex !== null) {
      this.textColors = this.textColors.map((col, i) => (i === this.activeTextIndex ? c : col));

      this.savePoem();

      return;
    }

    if (this.activeSeparatorIndex !== null) {
      this.separatorColors = this.separatorColors.map((col, i) =>
        i === this.activeSeparatorIndex ? c : col,
      );

      this.savePoem();

      return;
    }

    this.poemColor = c;

    this.textColors = this.textColors.map(() => null);
    this.separatorColors = this.separatorColors.map(() => null);

    this.savePoem();
  }

  onFontChange(f: any) {
    if (this.activeTitle) {
      this.titleFont = f.fontFamily;

      this.titleFontWeight = f.fontWeight || 600;

      this.titleFontStyle = f.fontStyle || 'normal';

      requestAnimationFrame(() => this.fitTextToContainer());

      this.savePoem();

      return;
    }

    if (this.activeTextIndex !== null) {
      this.fontOverrides = this.fontOverrides.map((font, i) =>
        i === this.activeTextIndex ? f : font,
      );

      this.savePoem();

      return;
    }

    this.poemFont = f.fontFamily;
    this.poemFontWeight = f.fontWeight || 'normal';
    this.poemFontStyle = f.fontStyle || 'normal';

    this.fontOverrides = this.fontOverrides.map(() => null);

    requestAnimationFrame(() => this.fitTextToContainer());

    this.savePoem();
  }

  onStyleApply(style: any | null) {
    if (this.activeTitle) {
      if (style?.align) {
        this.titleAlign = style.align;
      }

      this.savePoem();

      return;
    }

    if (this.activeTextIndex === null) return;

    this.styleOverrides = this.styleOverrides.map((s, i) =>
      i === this.activeTextIndex ? style : s,
    );

    this.cdr.detectChanges();

    requestAnimationFrame(() => this.fitTextToContainer());

    this.savePoem();
  }

  // onBackgroundChange(bg: any) {
  //   if (bg.color) {
  //     this.backgroundColor = bg.color;
  //   }

  //   if (bg.image) {
  //     this.backgroundImage = `url("${bg.image}")`;
  //   }

  //   if (bg.contentBox) {
  //     this.contentBox = bg.contentBox;
  //   }

  //   if (bg.textStyle) {
  //     this.textStyle = bg.textStyle;
  //   }

  //   requestAnimationFrame(() => this.fitTextToContainer());

  //   this.savePoem();
  // }

  // onBackgroundChange(bg: any) {
  //   if (bg.color) {
  //     this.backgroundColor = bg.color;
  //   }

  //   this.backgroundImage = bg.image
  //     ? `url("${bg.image}")`
  //     : '';

  //   if (bg.contentBox) {
  //     this.contentBox = bg.contentBox;
  //   }

  //   if (bg.textStyle) {
  //     this.textStyle = bg.textStyle;
  //   }

  //   requestAnimationFrame(() => this.fitTextToContainer());

  //   this.savePoem();
  // }

  // onBackgroundChange(bg: any) {
  //   if (bg.color) {
  //     this.backgroundColor = bg.color;
  //   }

  //   // zmieniaj obrazek TYLKO gdy faktycznie wybrano nowy image
  //   if (bg.image) {
  //     this.backgroundImage = `url("${bg.image}")`;
  //   }

  //   if (bg.contentBox) {
  //     this.contentBox = bg.contentBox;
  //   }

  //   if (bg.textStyle) {
  //     this.textStyle = bg.textStyle;
  //   }

  //   requestAnimationFrame(() => this.fitTextToContainer());

  //   this.savePoem();
  // }

  // onBackgroundChange(bg: any) {
  //   if (bg.color) {
  //     this.backgroundColor = bg.color;
  //   }

  //   // wybrano zwykły background image
  //   if (bg.backgroundType === 'background-image') {
  //     this.backgroundImage = bg.image ? `url("${bg.image}")` : '';
  //   }

  //   // wybrano kolor -> usuń zwykłe tło obrazkowe
  //   if (bg.backgroundType === 'background-colors') {
  //     this.backgroundImage = '';
  //   }

  //   if (bg.contentBox) {
  //     this.contentBox = bg.contentBox;
  //   }

  //   if (bg.textStyle) {
  //     this.textStyle = bg.textStyle;
  //   }

  //   requestAnimationFrame(() => this.fitTextToContainer());

  //   this.savePoem();
  // }

  onBackgroundChange(bg: any) {
    console.log('BG:', bg);

    if (bg.color) {
      this.backgroundColor = bg.color;
    }

    // Ramka sezonowa
    if (bg.imageType === 'frame') {
      this.frameImage = bg.image ? `url("${bg.image}")` : '';
      this.backgroundImage = '';
    }

    // Zwykły background image
    if (bg.backgroundType === 'background-image' && bg.imageType === 'background') {
      this.backgroundImage = bg.image ? `url("${bg.image}")` : '';
      this.frameImage = '';
    }

    // Sam kolor — usuwa zwykłe image, ale zostawia ramkę
    if (bg.backgroundType === 'background-colors') {
      this.backgroundImage = '';
    }

    if (bg.contentBox) {
      this.contentBox = bg.contentBox;
    }

    if (bg.textStyle) {
      this.textStyle = bg.textStyle;
    }

    requestAnimationFrame(() => this.fitTextToContainer());

    this.savePoem();
  }

  onSeparatorChange(symbol: string) {
    if (this.activeSeparatorIndex !== null) {
      this.separators[this.activeSeparatorIndex] = symbol;

      this.poemBlocks = this.poemBlocks.map((block) => {
        if (block.type === 'separator' && block.separatorIndex === this.activeSeparatorIndex) {
          return {
            ...block,
            text: symbol,
          };
        }

        return block;
      });

      this.savePoem();

      return;
    }

    this.separators = this.separators.map(() => symbol);

    this.poemBlocks = this.poemBlocks.map((block) => {
      if (block.type === 'separator') {
        return {
          ...block,
          text: symbol,
        };
      }

      return block;
    });

    this.savePoem();
  }

  get currentPanelInputs() {
    if (this.activePanel === 'colors') {
      return {
        onColorSelect: (c: string) => this.onColorChange(c),
      };
    }

    if (this.activePanel === 'background') {
      return {
        onBackgroundSelect: (bg: any) => this.onBackgroundChange(bg),
      };
    }

    if (this.activePanel === 'fonts') {
      return {
        onFontSelect: (f: any) => this.onFontChange(f),
      };
    }

    if (this.activePanel === 'decorations') {
      return {
        onSeparatorSelect: (s: string) => this.onSeparatorChange(s),
      };
    }

    if (this.activePanel === 'style') {
      return {
        onStyleSelect: (style: any) => this.onStyleApply(style),
      };
    }

    return {};
  }

  updateCurrentPage() {
    if (!this.currentBook?.pages?.[this.pageIndex]) {
      return;
    }

    const page = this.currentBook.pages[this.pageIndex];

    // 🔥 SHARED ONLY
    page.title = this.poemTitle;

    page.text = this.poemBlocks
      .map((block) => {
        if (block.type === 'line') {
          return block.text;
        }

        return '';
      })
      .join('\n');

    // 🔥 POEM EDITOR ONLY
    page.poemEditor = {
      // MAIN
      poemFont: this.poemFont,

      poemFontWeight: this.poemFontWeight,

      poemFontStyle: this.poemFontStyle,

      poemColor: this.poemColor,

      poemAlign: this.poemAlign,

      // TITLE
      titleFont: this.titleFont,

      titleFontWeight: this.titleFontWeight,

      titleFontStyle: this.titleFontStyle,

      titleColor: this.titleColor,

      titleAlign: this.titleAlign,

      // AUTO FIT
      textFontSize: this.autoTextStyle.fontSize,

      textLineHeight: this.autoTextStyle.lineHeight,

      // BACKGROUND
      backgroundColor: this.backgroundColor,

      backgroundImage: this.backgroundImage
        ? this.backgroundImage.replace(/^url\("(.*)"\)$/, '$1')
        : '',

      // BOX
      contentBox: this.contentBox,

      // STYLE
      textStyle: this.textStyle,

      // OVERRIDES
      styleOverrides: this.styleOverrides,

      fontOverrides: this.fontOverrides,

      textColors: this.textColors,

      separatorColors: this.separatorColors,

      separators: this.separators,
    };
  }

  savePoem() {
    if (!this.currentBook) return;

    this.updateCurrentPage();

    this.api.saveBook(this.currentBook).subscribe({
      next: () => {
        console.log('✅ POEM SAVED');
      },

      error: (err) => {
        console.error('❌ SAVE ERROR', err);
      },
    });
  }

  async preview() {
    this.cd.detectChanges();

    this.isPreviewOpen = true;

    await new Promise((resolve) => setTimeout(resolve, 300));

    const source = document.querySelector('#paged-source .book') as HTMLElement | null;

    const host = document.getElementById('paged-preview-host');

    console.log('SOURCE:', source);
    console.log('HOST:', host);

    if (!source || !host) {
      console.warn('❌ SOURCE / HOST NOT FOUND');
      return;
    }

    host.innerHTML = '';

    // 🔥 IMPORTANT
    const wrapper = document.createElement('div');

    wrapper.innerHTML = source.innerHTML;

    try {
      // @ts-ignore
      const previewer = new window.Paged.Previewer();

      await previewer.preview(wrapper, [], host);

      // 🔥 WAIT
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const pages = host.querySelectorAll('.pagedjs_page');

      console.log('PAGED PAGES:', pages.length);

      if (!pages.length) {
        console.warn('❌ NO PAGED PAGES');
        return;
      }

      this.exportService.fixLayout('paged-preview-host', 0);
    } catch (err) {
      console.error('❌ PREVIEW ERROR:', err);
    }
  }

  async exportPDF() {
    console.log('🔥 EXPORT START');

    console.log('POEM BLOCKS:', this.poemBlocks);

    this.cd.detectChanges();
    this.savePoem();
    await this.preview();

    await new Promise((resolve) => setTimeout(resolve, 1500));

    const host = document.getElementById('paged-preview-host');

    const pages = host?.querySelectorAll('.pagedjs_page');

    console.log('PDF PAGES:', pages?.length);

    if (!pages?.length) {
      console.warn('❌ BRAK STRON PDF');
      return;
    }

    try {
      await this.exportService.exportPDF('paged-preview-host', 'poem-editor.pdf');

      console.log('✅ PDF DONE');
    } catch (err) {
      console.error('❌ EXPORT PDF ERROR:', err);
    }
  }

  closePreview() {
    this.isPreviewOpen = false;

    const host = document.getElementById('paged-preview-host');

    if (host) {
      host.innerHTML = '';
    }

    this.currentPreviewPage = 0;
  }

prevPreviewPage() {
  const pages = document.querySelectorAll(
    '#paged-preview-host .pagedjs_page',
  ) as NodeListOf<HTMLElement>;

  if (!pages.length) return;

  this.currentPreviewPage = Math.max(0, this.currentPreviewPage - 1);

  this.exportService.fixLayout(
    'paged-preview-host',
    this.currentPreviewPage
  );
}


nextPreviewPage() {
  const pages = document.querySelectorAll(
    '#paged-preview-host .pagedjs_page',
  ) as NodeListOf<HTMLElement>;

  if (!pages.length) return;

  this.currentPreviewPage = Math.min(
    pages.length - 1,
    this.currentPreviewPage + 1
  );

  this.exportService.fixLayout(
    'paged-preview-host',
    this.currentPreviewPage
  );
}






  goBack() {
    this.router.navigate(['/editor']);
  }
}
