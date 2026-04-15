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
    }
  }

  applyTheme(theme: string) {
    this.selectedTheme = theme;
  }

  applyTemplate(template: string) {
    this.selectedTemplate = template;
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
clear() {
  const confirmClear = confirm('Na pewno wyczyścić?');
  if (!confirmClear) return;

  // 🔥 reset danych
  this.title = '';
  this.text = '';
  this.selectedTemplate = 'Default';
  this.selectedTheme = '';

  // 🔥 usuń z localStorage
  localStorage.removeItem('poem');

  // 🔥 toast
  this.clearMessage = true;

  setTimeout(() => {
    this.clearMessage = false;
    this.cd.detectChanges();
  }, 2000);
}






}
