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
import { FontPanel } from './panels/font-panel/font-panel';
import { StylePanel } from './panels/style-panel/style-panel';

import { EditorApiService } from '../../services/editor-api';
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-poem-editor',
  standalone: true,
  imports: [
    CommonModule,
    ColorsPanel,
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

  rawText = '';

  backgroundColor = '#f7efe6';
  backgroundImage = '';

  contentBox = {
    width: 72,
    height: 70,
    offsetY: 0,
    offsetTop: 0,
  };

  autoTextStyle = {
    fontSize: 42,
    lineHeight: 1.7,
    gap: 14,
  };

  poemColor = '#3b2a20';
  poemFont = '"Playfair Display", serif';
  poemFontWeight: string | number = 'normal';
  poemFontStyle = 'normal';

  editorTabs = [
    { id: 'fonts', label: 'Czcionka', icon: 'Aa' },
    { id: 'colors', label: 'Kolory', icon: '🎨' },
    { id: 'background', label: 'Tło', icon: '🖼' },
    { id: 'style', label: 'Styl', icon: '≡' },
  ];

  panelMap: Record<string, Type<any>> = {
    colors: ColorsPanel,
    background: BackgroundPanel,
    fonts: FontPanel,
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

        this.rawText = page.text || '';

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

  //   let fontSize = 42;
  //   let lineHeight = 1.7;

  //   content.style.fontSize = `${fontSize}px`;
  //   content.style.lineHeight = `${lineHeight}`;

  //   while (
  //     (content.scrollHeight > box.clientHeight ||
  //       content.scrollWidth > box.clientWidth) &&
  //     fontSize > 12
  //   ) {
  //     fontSize -= 1;

  //     if (lineHeight > 1.2) {
  //       lineHeight -= 0.01;
  //     }

  //     content.style.fontSize = `${fontSize}px`;
  //     content.style.lineHeight = `${lineHeight}`;
  //   }

  //   this.autoTextStyle = {
  //     fontSize,
  //     lineHeight,
  //     gap: 0,
  //   };
  // }

fitTextToContainer() {
  const box = this.poemBox?.nativeElement;
  const content = this.poemContent?.nativeElement;

  if (!box || !content) return;

  let fontSize = 46;
  let lineHeight = 1.7;
  let letterSpacing = 0;
  let padding = 0;

  // reset
  content.style.fontSize = `${fontSize}px`;
  content.style.lineHeight = `${lineHeight}`;
  content.style.letterSpacing = `${letterSpacing}px`;
  content.style.padding = `${padding}px`;

  const fits = () => {
    return (
      content.scrollHeight <= box.clientHeight &&
      content.scrollWidth <= box.clientWidth
    );
  };

  // zmniejszaj aż wejdzie
  while (!fits() && fontSize > 12) {
    fontSize -= 1;

    if (lineHeight > 1.15) {
      lineHeight -= 0.015;
    }

    content.style.fontSize = `${fontSize}px`;
    content.style.lineHeight = `${lineHeight}`;
  }

  // lekko powiększ jeśli jest za małe
  while (fits() && fontSize < 80) {
    fontSize += 1;

    content.style.fontSize = `${fontSize}px`;

    if (!fits()) {
      fontSize -= 1;
      content.style.fontSize = `${fontSize}px`;
      break;
    }
  }

  this.autoTextStyle = {
    fontSize,
    lineHeight,
    gap: 0,
  };
}










  onColorChange(c: string) {
    this.poemColor = c;
  }

  onFontChange(f: any) {
    this.poemFont = f.fontFamily;
    this.poemFontWeight = f.fontWeight || 'normal';
    this.poemFontStyle = f.fontStyle || 'normal';

    setTimeout(() => this.fitTextToContainer());
  }

  onStyleApply(style: any | null) {
    if (!style) return;

    if (style.align) {
      this.poemContent.nativeElement.style.textAlign = style.align;
    }

    if (style.spacing) {
      this.poemContent.nativeElement.style.letterSpacing = style.spacing;
    }

    if (style.transform) {
      this.poemContent.nativeElement.style.textTransform = style.transform;
    }

    if (style.opacity !== undefined) {
      this.poemContent.nativeElement.style.opacity = style.opacity;
    }

    if (style.shadow) {
      this.poemContent.nativeElement.style.textShadow = style.shadow;
    }
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

    setTimeout(() => this.fitTextToContainer());
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

    if (this.activePanel === 'style') {
      return { onStyleSelect: (style: any) => this.onStyleApply(style) };
    }

    return {};
  }

  goBack() {
    this.router.navigate(['/editor']);
  }
}