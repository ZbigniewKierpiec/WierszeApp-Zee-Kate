import { Component, EventEmitter, Output, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from './../../../services/auth';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { BooksService } from './../../../services/books-service';

@Component({
  selector: 'app-topbar',
  imports: [CommonModule, FormsModule, MatBadgeModule, MatButtonModule],
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

  constructor(
    private auth: Auth,
    private router: Router,
    private booksService: BooksService
  ) {}
  // ngOnInit(): void {
  //   this.user = this.auth.getUser();


  // }


ngOnInit(): void {
  this.user = this.auth.getUser();

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
}
