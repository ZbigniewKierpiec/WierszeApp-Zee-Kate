import { Component, EventEmitter, Output, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { Auth } from './../../../services/auth';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-topbar',
  imports: [CommonModule, FormsModule],
  templateUrl: './topbar.html',
  styleUrl: './topbar.scss',
})
export class Topbar implements OnInit {
  @Output() save = new EventEmitter<void>();
  @Output() clear = new EventEmitter<void>();
  @Output() coverEdit = new EventEmitter<void>();
  @Output() export = new EventEmitter<void>();
  @Output() goDashboard = new EventEmitter<void>();
  user: any = null;
  constructor(
    private auth: Auth,
    private router: Router,
  ) {}
  ngOnInit(): void {
    this.user = this.auth.getUser();
  }

@Output() newBook = new EventEmitter<void>();



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
