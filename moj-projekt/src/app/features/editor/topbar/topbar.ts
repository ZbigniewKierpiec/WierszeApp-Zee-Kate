import { Component, EventEmitter, Output, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { BooksService } from './../../../services/books-service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { LanguageSwitcher } from './language-switcher/language-switcher';
import { EditorEventsService } from '../../../shared/editor-events-service';
import { ToggleTheme } from './toggle-theme/toggle-theme';
import { ProtectedButton } from './protected-button/protected-button';
import { AuthService } from '../../../services/auth-service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-topbar',
  imports: [
    CommonModule,
    FormsModule,
    MatBadgeModule,
    MatButtonModule,
    TranslateModule,
    LanguageSwitcher,
    ToggleTheme,
    ProtectedButton,
  ],
  templateUrl: './topbar.html',
  styleUrl: './topbar.scss',
})
export class Topbar implements OnInit {
  // user: any = null;
  // currentLang = 'pl';
  // isLangOpen = false;

  // constructor(

  //   private router: Router,
  //   private booksService: BooksService,
  //   private translate: TranslateService,
  //   private events: EditorEventsService,
  //   private auth: AuthService
  // ) {}

  // ngOnInit(): void {
  //   // this.user = this.auth.getUser();

  //   const savedLang = localStorage.getItem('lang') || 'pl';
  //   this.currentLang = savedLang;
  //   this.translate.use(savedLang);

  //   if (this.user?.id) {
  //     this.booksService.load(this.user.id);
  //   }
  // }

  // get booksCount$() {
  //   return this.booksService.booksCount$;
  // }

  // // 🔐 AUTH / NAV
  // logout() {
  //   this.auth.logout();
  //   this.router.navigate(['/']);
  // }

  // goLogin() {
  //   this.router.navigate(['/login']);
  // }

  // goRegister() {
  //   this.router.navigate(['/register']);
  // }

  // goDashboard() {
  //   this.router.navigate(['/dashboard']);
  // }

  // // ✨ ACTIONS (zamiast emit)

  // save() {
  //   this.events.save$.next();
  // }

  // clear() {
  //   this.events.clear$.next();
  // }

  // export() {
  //   this.events.export$.next();
  // }

  // coverEdit() {
  //   this.events.coverEdit$.next();
  // }

  // // 🌍 LANG
  // toggleLangMenu() {
  //   this.isLangOpen = !this.isLangOpen;
  // }

  // setLang(lang: string) {
  //   this.currentLang = lang;
  //   this.translate.use(lang);
  //   localStorage.setItem('lang', lang);
  //   this.isLangOpen = false;
  // }

  currentLang = 'pl';
  isLangOpen = false;

  constructor(
    private router: Router,
    private booksService: BooksService,
    private translate: TranslateService,
    private events: EditorEventsService,
    private auth: AuthService,
    private snack: MatSnackBar,
  ) {}

  // 🔥 USER ZAWSZE AKTUALNY
  get user() {
    return this.auth.getUser();
  }

  ngOnInit(): void {
    const savedLang = localStorage.getItem('lang') || 'pl';
    this.currentLang = savedLang;
    this.translate.use(savedLang);

    // 🔥 jeśli user istnieje → ładuj książki
    const user = this.auth.getUser();
    if (user?.id) {
      this.booksService.load(user.id);
    }
  }

  // 📚 badge
  get booksCount$() {
    return this.booksService.booksCount$;
  }

  // 🔐 AUTH
logout() {
  this.auth.logout();

  this.snack.open(
    this.translate.instant('AUTH.LOGOUT'),
    '',
    {
      duration: 2000,
      panelClass: ['snack-info'],
      horizontalPosition: 'center',
      verticalPosition: 'top',
    }
  );

  this.router.navigate(['/']);
}

  goLogin() {
    this.router.navigate(['/login']);
  }

  goRegister() {
    this.router.navigate(['/register']);
  }

  goDashboard() {
    this.router.navigate(['/dashboard']);
  }

  // ✨ ACTIONS
  save() {
    this.events.save$.next();
  }

  clear() {
    this.events.clear$.next();
  }

  export() {
    this.events.export$.next();
  }

  coverEdit() {
    this.events.coverEdit$.next();
  }

  // 🌍 LANG
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
