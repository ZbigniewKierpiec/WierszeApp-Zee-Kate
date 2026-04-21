import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-language-switcher',
  imports: [CommonModule,FormsModule],
  templateUrl: './language-switcher.html',
  styleUrl: './language-switcher.scss',
})
export class LanguageSwitcher {
@Input() currentLang = 'pl';
  @Output() langChange = new EventEmitter<string>();


  isOpen = false;

  languages = [
    { code: 'pl', label: 'Polski', flag: 'https://flagcdn.com/w40/pl.png' },
    { code: 'en', label: 'English', flag: 'https://flagcdn.com/w40/gb.png' }
  ];

  toggleMenu() {
    this.isOpen = !this.isOpen;
  }

  changeLang(lang: any) {
    this.currentLang = lang.code;
    this.langChange.emit(lang.code); // 🔥 KLUCZOWE
    this.isOpen = false;
  }

  get current() {
    return this.languages.find(l => l.code === this.currentLang) ?? this.languages[0];
  }




}
