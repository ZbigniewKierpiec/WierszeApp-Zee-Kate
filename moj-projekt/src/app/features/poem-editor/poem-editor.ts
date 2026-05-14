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

  bookId = '';
  pageIndex = 0;

  backgroundColor = '';
  backgroundImage = '';

  contentBox = {
    width: 72,
    height: 70,
    offsetY: 0,
    offsetTop: 0,
  };

  textStyle = {
    lineHeight: '1.4',
    fontSize: 'clamp(20px, 1.4vw, 32px)',
    maxWidth: '22ch',
  };

  autoTextStyle = {
    fontSize: 42,
    lineHeight: 1.4,
    gap: 14,
  };

  poemColor = '#3b2a20';
  poemFont = '"Playfair Display", serif';
  poemFontWeight: string | number = 'normal';
  poemFontStyle = 'normal';

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
  ) {}

  ngOnInit(): void {
    this.bookId = this.route.snapshot.paramMap.get('id') || '';
    this.pageIndex = Number(this.route.snapshot.queryParamMap.get('page') || 0);

    this.loadBook();
  }

  ngAfterViewInit(): void {
    setTimeout(() => this.fitTextToContainer());
  }

  loadBook() {
    const user = this.auth.getUser();

    if (!user?.id || !this.bookId) return;

    this.api.getBook(this.bookId, user.id).subscribe({
      next: (book: any) => {
        const page = book.pages?.[this.pageIndex];

        if (!page) return;

        this.buildPoemBlocks(page.text || '');

        this.cdr.detectChanges();

        setTimeout(() => {
          this.fitTextToContainer();
        });
      },

      error: (err) => {
        console.error('❌ LOAD POEM ERROR', err);
      },
    });
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

    let fontSize = 42;
    let lineHeight = 1.45;
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
    if (this.activeTextIndex !== null) {
      this.textColors = this.textColors.map((col, i) => (i === this.activeTextIndex ? c : col));
      return;
    }

    if (this.activeSeparatorIndex !== null) {
      this.separatorColors = this.separatorColors.map((col, i) =>
        i === this.activeSeparatorIndex ? c : col,
      );
      return;
    }

    this.poemColor = c;
    this.textColors = this.textColors.map(() => null);
    this.separatorColors = this.separatorColors.map(() => null);
  }

  onFontChange(f: any) {
    if (this.activeTextIndex !== null) {
      this.fontOverrides = this.fontOverrides.map((font, i) =>
        i === this.activeTextIndex ? f : font,
      );
      return;
    }

    this.poemFont = f.fontFamily;
    this.poemFontWeight = f.fontWeight || 'normal';
    this.poemFontStyle = f.fontStyle || 'normal';

    this.fontOverrides = this.fontOverrides.map(() => null);

    setTimeout(() => this.fitTextToContainer());
  }

  onStyleApply(style: any | null) {
    if (this.activeTextIndex === null) return;

    this.styleOverrides = this.styleOverrides.map((s, i) =>
      i === this.activeTextIndex ? style : s,
    );

    this.cdr.detectChanges();
    setTimeout(() => this.fitTextToContainer());
  }

  onBackgroundChange(bg: any) {
    if (bg.color) {
      this.backgroundColor = bg.color;
    }

    if (bg.image) {
      this.backgroundImage = `url("${bg.image}")`;
    }

    if (bg.contentBox) {
      this.contentBox = bg.contentBox;
    }

    if (bg.textStyle) {
      this.textStyle = bg.textStyle;
    }

    setTimeout(() => this.fitTextToContainer());
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
  }

  get currentPanelInputs() {
    if (this.activePanel === 'colors') {
      return { onColorSelect: (c: string) => this.onColorChange(c) };
    }

    if (this.activePanel === 'background') {
      return { onBackgroundSelect: (bg: any) => this.onBackgroundChange(bg) };
    }

    if (this.activePanel === 'fonts') {
      return { onFontSelect: (f: any) => this.onFontChange(f) };
    }

    if (this.activePanel === 'decorations') {
      return { onSeparatorSelect: (s: string) => this.onSeparatorChange(s) };
    }

    if (this.activePanel === 'style') {
      return { onStyleSelect: (style: any) => this.onStyleApply(style) };
    }

    return {};
  }

  goBack() {
    this.router.navigate(['/editor']);
  }
}