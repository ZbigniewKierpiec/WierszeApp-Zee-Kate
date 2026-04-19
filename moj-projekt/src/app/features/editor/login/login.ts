import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from './../../../services/auth';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { EditorApiService } from './../../../services/editor-api';
@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  email = '';
  password = '';

  constructor(
    private auth: Auth,
    private router: Router,
    private api: EditorApiService,
  ) {}

  // login() {
  //   const data = {
  //     email: this.email,
  //     password: this.password,
  //   };

  //   this.auth.login(data).subscribe((user: any) => {
  //     console.log('LOGIN RESPONSE:', user);
  //     this.api.getUserBooks(user.id).subscribe((books: any) => {
  //       console.log('LOGIN RESPONSE:', user);
  //       if (books.length) {
  //         const latest = books[0];

  //         localStorage.setItem('bookId', latest.id);
  //         this.router.navigate(['/editor']);
  //       } else {
  //         this.api.createEmptyBook(user.id).subscribe((res: any) => {
  //           localStorage.setItem('bookId', res.id);
  //           this.router.navigate(['/editor']);
  //         });
  //       }
  //     });
  //   });
  // }



login() {
  const data = {
    email: this.email,
    password: this.password,
  };

  this.auth.login(data).subscribe((user: any) => {

    console.log('✅ LOGIN:', user);

    // 🔥 NIE tworzymy książki
    // 🔥 NIE ustawiamy bookId na siłę

    const lastBookId = localStorage.getItem('bookId');

    if (lastBookId) {
      // opcjonalnie: możesz sprawdzić czy istnieje
      console.log('📌 Last book exists:', lastBookId);
    }

    // 👉 zawsze dashboard
    this.router.navigate(['/dashboard']);
  });
}









  goRegister() {
    this.router.navigate(['/register']);
  }
}
