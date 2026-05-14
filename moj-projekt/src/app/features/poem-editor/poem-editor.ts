import { CommonModule } from '@angular/common';
import {
  Component,
  type Type,
  AfterViewInit,
  ChangeDetectorRef,
  ViewChild,
  type ElementRef,
  type OnInit,
} from '@angular/core';
import interact from 'interactjs';

import { ColorsPanel } from './panels/colors-panel/colors-panel';
import { BackgroundPanel } from './panels/background-panel/background-panel';
import { TextPanel } from './panels/text-panel/text-panel';
import { SeparatorPanel } from './panels/separator-panel/separator-panel';
import { FontPanel } from './panels/font-panel/font-panel';
import { StylePanel } from './panels/style-panel/style-panel';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { EditorApiService } from '../../services/editor-api';
import { AuthService } from '../../services/auth-service';

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
  // backgroundStyle = '';
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
    gap: 24,
  };
  poemColor = '#3b2a20';
  poemFont = '"Playfair Display", serif';
  poemFontWeight: string | number = 'normal';
  poemFontStyle = 'normal';
  separatorColors: (string | null)[] = [null, null, null];
  ////////////////////////////////////////////////////////////////
  bookId = '';
  pageIndex = 0;
  poemLines: string[] = [];
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

        this.poemLines = page.text?.split('\n').filter((line: string) => line.trim()) || [];

        const count = this.poemLines.length;

        this.styleOverrides = Array(count).fill(null);
        this.textColors = Array(count).fill(null);
        this.fontOverrides = Array(count).fill(null);
        this.separatorColors = Array(count).fill(null);

        this.separators = Array(Math.max(count - 1, 0)).fill('✧');

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

  // fitTextToContainer() {
  //   const box = this.poemBox?.nativeElement;
  //   const content = this.poemContent?.nativeElement;

  //   if (!box || !content) return;

  //   let fontSize = parseFloat(this.textStyle.fontSize) || 42;

  //   let lineHeight = parseFloat(this.textStyle.lineHeight) || 1.4;

  //   content.style.fontSize = `${fontSize}px`;
  //   content.style.lineHeight = `${lineHeight}`;

  //   while (
  //     (content.scrollHeight > box.clientHeight || content.scrollWidth > box.clientWidth) &&
  //     fontSize > 14
  //   ) {
  //     fontSize -= 1;

  //     if (lineHeight > 1.1) {
  //       lineHeight -= 0.01;
  //     }

  //     content.style.fontSize = `${fontSize}px`;
  //     content.style.lineHeight = `${lineHeight}`;
  //   }

  //   this.autoTextStyle = {
  //     fontSize,
  //     lineHeight,
  //   };
  // }

  fitTextToContainer() {
    const box = this.poemBox?.nativeElement;
    const content = this.poemContent?.nativeElement;

    if (!box || !content) return;

    let fontSize = 42;
    let lineHeight = 1.5;
    let gap = 24;

    content.style.fontSize = `${fontSize}px`;
    content.style.lineHeight = `${lineHeight}`;
    content.style.gap = `${gap}px`;

    while (content.scrollHeight > box.clientHeight && fontSize > 14) {
      fontSize -= 1;

      if (lineHeight > 1.1) {
        lineHeight -= 0.01;
      }

      if (gap > 8) {
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

  miniMenuVisible = false;
  miniMenuPosition = { x: 0, y: 0 };
  readonly TOLERANCE = 1.5;
  activeTextIndex: number | null = null;
  styleOverrides: any[] = [null, null, null, null];
  textColors: (string | null)[] = [null, null, null, null];

  separators = ['— ♥ —', '✧', '— ♥ —'];

  // tryb panelu (globalny)
  activeSeparatorValue: string | null = null;

  // tryb edycji pojedynczego
  activeSeparatorIndex: number | null = null;

  setActivePanel(panel: string) {
    this.activePanel = panel;

    if (panel === 'decorations') {
      this.activeSeparatorIndex = null;
    }
  }
  // onStyleApply(style: any) {
  //   if (this.activeTextIndex === null) return;

  //   if (!style) {
  //     this.styleOverrides = this.styleOverrides.map((s, i) =>
  //       i === this.activeTextIndex ? null : s,
  //     );
  //     return;
  //   }

  //   this.styleOverrides = this.styleOverrides.map((s, i) =>
  //     i === this.activeTextIndex ? { ...(s || {}), ...style } : s,
  //   );
  // }

  // onStyleApply(style: any) {
  //   if (this.activeTextIndex === null) return;

  //   // ❌ toggle off
  //   if (!style) {
  //     this.styleOverrides = this.styleOverrides.map((s, i) =>
  //       i === this.activeTextIndex ? null : s
  //     );
  //     return;
  //   }

  //   // 🔥 KLUCZ: ZASTĄP zamiast merge
  //   this.styleOverrides = this.styleOverrides.map((s, i) =>
  //     i === this.activeTextIndex ? style : s
  //   );
  // }
  onStyleApply(style: any | null) {
    if (this.activeTextIndex === null) return;

    this.styleOverrides = this.styleOverrides.map((s, i) =>
      i === this.activeTextIndex ? style : s,
    );

    this.cdr.detectChanges();
  }

  selectText(index: number, event: MouseEvent) {
    event.stopPropagation();

    this.activeTextIndex = index;
    this.activeSeparatorIndex = null;

    // 📍 pozycja kliknięcia
    this.miniMenuPosition = {
      x: event.clientX,
      y: event.clientY,
    };

    this.miniMenuVisible = true;
  }
  openPanel(panel: string) {
    this.activePanel = panel;
    this.miniMenuVisible = false;
  }
  editorTabs = [
    { id: 'text', label: 'Tekst', icon: 'T' },
    { id: 'fonts', label: 'Czcionka', icon: 'Aa' },
    { id: 'colors', label: 'Kolory', icon: '🎨' },
    { id: 'background', label: 'Tło', icon: '🖼' },
    { id: 'decorations', label: 'Dekoracje', icon: '❀' },
    { id: 'style', label: 'Styl', icon: '≡' },
  ];
  fontOverrides: any[] = [null, null, null, null];
  panelMap: Record<string, Type<any>> = {
    colors: ColorsPanel,
    background: BackgroundPanel,
    fonts: FontPanel,
    decorations: SeparatorPanel,
    style: StylePanel,
  };

  // 🎨 PANEL LOGIC
  // onColorChange(c: string) {
  //   this.poemColor = c;
  // }

  // onColorChange(c: string) {
  //   // ✏️ pojedynczy tekst
  //   if (this.activeTextIndex !== null) {
  //     this.textColors = this.textColors.map((col, i) => (i === this.activeTextIndex ? c : col));
  //     return;
  //   }

  //   // 🌍 GLOBAL
  //   this.poemColor = c;
  //   this.textColors = this.textColors.map(() => null); // reset override
  // }

  onColorChange(c: string) {
    // ✏️ TEXT
    if (this.activeTextIndex !== null) {
      this.textColors = this.textColors.map((col, i) => (i === this.activeTextIndex ? c : col));
      return;
    }

    // ✨ SEPARATOR
    if (this.activeSeparatorIndex !== null) {
      this.separatorColors = this.separatorColors.map((col, i) =>
        i === this.activeSeparatorIndex ? c : col,
      );
      return;
    }

    // 🌍 GLOBAL
    this.poemColor = c;
    this.textColors = this.textColors.map(() => null);
    this.separatorColors = this.separatorColors.map(() => null);
  }

  onFontChange(f: any) {
    // ✏️ tylko wybrany tekst
    if (this.activeTextIndex !== null) {
      this.fontOverrides = this.fontOverrides.map((font, i) =>
        i === this.activeTextIndex ? f : font,
      );
      return;
    }

    // 🌍 global (fallback)
    this.poemFont = f.fontFamily;
    this.poemFontWeight = f.fontWeight || 'normal';
    this.poemFontStyle = f.fontStyle || 'normal';

    this.fontOverrides = this.fontOverrides.map(() => null);
  }

  // onBackgroundChange(bg: any) {
  //   this.backgroundStyle = bg.overlay ? `url(${bg.overlay}), url(${bg.base})` : `url(${bg.base})`;
  // }
  // onBackgroundChange(bg: string) {
  //   this.backgroundStyle = bg;
  //   console.log(bg);
  // }
  // onBackgroundChange(bg: any) {
  //   if (bg.color) {
  //     this.backgroundColor = bg.color;
  //   }

  //   if (bg.image) {
  //     this.backgroundImage = `url("${bg.image}")`;
  //   }
  // }

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

    // 🔥 BRAKOWAŁO
    if (bg.textStyle) {
      this.textStyle = bg.textStyle;
    }

    setTimeout(() => this.fitTextToContainer());
  }

  // selectSeparator(index: number, event: MouseEvent) {
  //   event.stopPropagation();

  //   this.activeSeparatorIndex = index;
  //   this.activeTextIndex = null;

  //   this.miniMenuPosition = {
  //     x: event.clientX,
  //     y: event.clientY
  //   };

  //   this.miniMenuVisible = true;
  // }

  selectSeparator(index: number, event: MouseEvent) {
    event.stopPropagation();

    this.activeSeparatorIndex = index;
    this.activeTextIndex = null; // 🔥 to jest KLUCZ

    this.miniMenuVisible = true;
  }

  clearSeparatorSelection() {
    this.activeSeparatorIndex = null;
  }

  // get currentPanelInputs() {
  //   if (this.activePanel === 'colors') {
  //     return { onColorSelect: (c: string) => this.onColorChange(c) };
  //   }
  //   if (this.activePanel === 'background') {
  //     return { onBackgroundSelect: (bg: any) => this.onBackgroundChange(bg) };
  //   }
  //   if (this.activePanel === 'fonts') {
  //     return { onFontSelect: (f: any) => this.onFontChange(f) };
  //   }
  //   return {};
  // }

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
      return {
        onStyleSelect: (style: any) => this.onStyleApply(style),
      };
    }

    return {};
  }
  goBack() {
    this.router.navigate(['editor']);
  }
  onSeparatorChange(symbol: string) {
    // ✏️ jeśli kliknięty konkretny → zmień tylko jeden
    if (this.activeSeparatorIndex !== null) {
      this.separators[this.activeSeparatorIndex] = symbol;
      return;
    }

    // 🎛️ jeśli nic nie kliknięte → zmień WSZYSTKIE
    this.separators = this.separators.map(() => symbol);
  }
}
