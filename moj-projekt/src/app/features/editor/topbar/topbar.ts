import { Component, EventEmitter, Output, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from './../../../services/auth';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';

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

  @Input() booksCount: number = 0;
  constructor(
    private auth: Auth,
    private router: Router,
  ) {}
  ngOnInit(): void {
    this.user = this.auth.getUser();
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
