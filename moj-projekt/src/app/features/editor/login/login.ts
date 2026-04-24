import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EditorApiService } from './../../../services/editor-api';
import { AuthService } from '../../../services/auth-service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateModule,  TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule,TranslateModule],
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
    private snack: MatSnackBar,
      private translate: TranslateService
  ) {}

  // login() {
  //   const data = {
  //     email: this.email,
  //     password: this.password,
  //   };

  //   this.auth.login(data).subscribe((res: any) => {

  //     console.log('✅ LOGIN:', res);

  //     // 🔥 jeśli chcesz ręcznie (ale nie musisz)
  //     localStorage.setItem('user_id', res.user.id);

  //     const lastBookId = localStorage.getItem('bookId');

  //     if (lastBookId) {
  //       console.log('📌 Last book exists:', lastBookId);
  //     }

  //     this.router.navigate(['/editor']);
  //   });
  // }

  // login() {
  //   const data = {
  //     email: this.email,
  //     password: this.password,
  //   };

  //   this.auth.login(data).subscribe({
  //     next: (res: any) => {
  //       console.log('✅ LOGIN:', res);

  //       // (opcjonalne — jeśli gdzieś używasz)
  //       localStorage.setItem('user_id', res.user.id);

  //       // 🔥 SUCCESS MESSAGE
  //       // this.snack.open('Zalogowano pomyślnie 🎉', '', {
  //       //   duration: 2500,
  //       //   panelClass: ['snack-success'],
  //       // });
  //       this.snack.open('Zalogowano 🎉', '', {
  //         duration: 2500,
  //         panelClass: ['snack-success'],
  //         horizontalPosition: 'center',
  //         verticalPosition: 'top', // albo 'bottom'
  //       });
  //       // 🔥 redirect logic
  //       const lastBookId = localStorage.getItem('bookId');

  //       if (lastBookId) {
  //         console.log('📌 Last book exists:', lastBookId);
  //         this.router.navigate(['/editor']);
  //       } else {
  //         this.router.navigate(['/dashboard']);
  //       }
  //     },

  //     error: (err) => {
  //       console.error('❌ LOGIN ERROR:', err);

  //       this.snack.open('Błędny email lub hasło ❌', '', {
  //         duration: 2500,
  //         panelClass: ['snack-error'],
  //       });
  //     },
  //   });
  // }



login() {
  const data = {
    email: this.email,
    password: this.password,
  };

  this.auth.login(data).subscribe({
    next: (res: any) => {

      this.snack.open(
        this.translate.instant('AUTH.LOGIN_SUCCESS'),
        '',
        {
          duration: 2500,
          panelClass: ['snack-success'],
          horizontalPosition: 'center',
          verticalPosition: 'top',
        }
      );

      const lastBookId = localStorage.getItem('bookId');

      this.router.navigate([
        lastBookId ? '/editor' : '/dashboard'
      ]);
    },

    error: () => {
      this.snack.open(
        this.translate.instant('AUTH.LOGIN_ERROR'),
        '',
        {
          duration: 2500,
          panelClass: ['snack-error'],
          horizontalPosition: 'center',
          verticalPosition: 'top',
        }
      );
    }
  });
}






  goRegister() {
    this.router.navigate(['/register']);
  }
}
