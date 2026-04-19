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



login() {
  const data = {
    email: this.email,
    password: this.password,
  };

  this.auth.login(data).subscribe((user: any) => {

    console.log('✅ LOGIN:', user);

    // 🔥 KLUCZOWE — ZAPISZ USER ID
    localStorage.setItem('user_id', user.id);

    const lastBookId = localStorage.getItem('bookId');

    if (lastBookId) {
      console.log('📌 Last book exists:', lastBookId);
    }

    this.router.navigate(['/dashboard']);
  });
}



// login() {
//   const data = {
//     email: this.email,
//     password: this.password,
//   };

//   this.auth.login(data).subscribe((user: any) => {

//     console.log('✅ LOGIN:', user);

//     if (!user?.id) {
//       console.error('❌ NO ID FROM BACKEND');
//       return;
//     }

//     // 🔥 zapis
//     localStorage.setItem('user_id', user.id);

//     console.log('💾 SAVED:', localStorage.getItem('user_id'));

//     this.router.navigate(['/dashboard']);
//   });
// }






  goRegister() {
    this.router.navigate(['/register']);
  }
}
