import { Component, EventEmitter, Output, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from './../../../services/auth';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { BooksService } from './../../../services/books-service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { LanguageSwitcher } from "./language-switcher/language-switcher";

@Component({
  selector: 'app-topbar',
  imports: [CommonModule, FormsModule, MatBadgeModule, MatButtonModule, TranslateModule, LanguageSwitcher],
  templateUrl: './topbar.html',
  styleUrl: './topbar.scss',
})
export class Topbar implements OnInit {
  @Output() save = new EventEmitter<void>();
  @Output() clear = new EventEmitter<void>();
  @Output() coverEdit = new EventEmitter<void>();
  @Output() export = new EventEmitter<void>();
  @Output() goDashboard = new EventEmitter<void>();
  @Output() newBook = new EventEmitter<void>();

  user: any = null;
  currentLang = 'pl';
  isLangOpen = false;

  constructor(
    private auth: Auth,
    private router: Router,
    private booksService: BooksService,
    private translate: TranslateService,
  ) {}

  ngOnInit(): void {
    this.user = this.auth.getUser();
    const savedLang = localStorage.getItem('lang') || 'pl';
    this.currentLang = savedLang;
    this.translate.use(savedLang);

    if (this.user?.id) {
      this.booksService.load(this.user.id);
    }
  }

  get booksCount$() {
    return this.booksService.booksCount$;
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/']);
  }

  goLogin() {
    this.router.navigate(['/login']);
  }

  goRegister() {
    this.router.navigate(['/register']);
  }


toggleLangMenu() {
  this.isLangOpen = !this.isLangOpen;
}

setLang(lang: string) {
  this.currentLang = lang;
  this.translate.use(lang);
  localStorage.setItem('lang', lang);
  this.isLangOpen = false;
}





}
