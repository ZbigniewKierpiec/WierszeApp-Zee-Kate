import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-gu',
  imports: [CommonModule],
  templateUrl: './gu.html',
  styleUrl: './gu.scss',
})
export class Gu implements AfterViewInit{

 @ViewChild('editor', { static: true })
  editorRef!: ElementRef<HTMLDivElement>;

  isMenuOpen = false;

  ngAfterViewInit(): void {
    const editor = this.editorRef.nativeElement;

    if (!editor.innerHTML.trim()) {
      editor.innerHTML = `
        <p>To jest przykładowy tekst. Zaznacz fragment i użyj menu.</p>
        <p>Możesz ustawić <em>italic</em>, nagłówki albo line-height.</p>
      `;
    }
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  focusEditor(): void {
    this.editorRef.nativeElement.focus();
  }

  toggleItalic(): void {
    this.focusEditor();
    document.execCommand('italic');
  }

  setBlock(tag: 'H1' | 'H2' | 'P'): void {
    this.focusEditor();
    document.execCommand('formatBlock', false, tag);
  }

  setLineHeight(value: string): void {
    this.focusEditor();

    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return;

    let node = selection.anchorNode as Node | null;
    if (!node) return;

    if (node.nodeType === Node.TEXT_NODE) {
      node = node.parentNode;
    }

    const block = this.findBlockElement(node as HTMLElement | null);
    if (block) {
      block.style.lineHeight = value;
    }
  }

  private findBlockElement(element: HTMLElement | null): HTMLElement | null {
    const editor = this.editorRef.nativeElement;

    while (element && element !== editor) {
      const tag = element.tagName;
      if (
        tag === 'P' ||
        tag === 'DIV' ||
        tag === 'H1' ||
        tag === 'H2' ||
        tag === 'H3' ||
        tag === 'LI' ||
        tag === 'BLOCKQUOTE'
      ) {
        return element;
      }
      element = element.parentElement;
    }

    return editor;
  }




}
