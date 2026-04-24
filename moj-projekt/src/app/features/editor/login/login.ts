import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EditorApiService } from './../../../services/editor-api';
import  { AuthService } from '../../../services/auth-service';
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
    private auth: AuthService,
    private router: Router,
    private api: EditorApiService,
  ) {}



// login() {
//   const data = {
//     email: this.email,
//     password: this.password,
//   };

//   this.auth.login(data).subscribe((user: any) => {

//     console.log('✅ LOGIN:', user);

//     // 🔥 KLUCZOWE — ZAPISZ USER ID
//     localStorage.setItem('user_id', user.id);

//     const lastBookId = localStorage.getItem('bookId');

//     if (lastBookId) {
//       console.log('📌 Last book exists:', lastBookId);
//     }

//     this.router.navigate(['/dashboard']);
//   });
// }




login() {
  const data = {
    email: this.email,
    password: this.password,
  };

  this.auth.login(data).subscribe((res: any) => {

    console.log('✅ LOGIN:', res);

    // 🔥 jeśli chcesz ręcznie (ale nie musisz)
    localStorage.setItem('user_id', res.user.id);

    const lastBookId = localStorage.getItem('bookId');

    if (lastBookId) {
      console.log('📌 Last book exists:', lastBookId);
    }

    this.router.navigate(['/editor']);
  });
}









  goRegister() {
    this.router.navigate(['/register']);
  }
}
