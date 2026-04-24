import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth-service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-register',
  imports: [CommonModule, FormsModule,TranslateModule],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {
  email = '';
  password = '';

  constructor(
    private auth: AuthService,
    private router: Router,
    private snack: MatSnackBar,
     private translate: TranslateService
  ) {}

  // register() {
  //   this.auth.register({
  //     email: this.email,
  //     password: this.password,
  //   }).subscribe({
  //     next: (user: any) => {
  //       // this.auth.setUser(user); // 🔥 auto login
  //       this.router.navigate(['/editor']);
  //     },
  //     error: () => alert('Błąd rejestracji'),
  //   });
  // }

  // 🔥 żeby nie było błędu jak w login

  // register() {
  //   this.auth
  //     .register({
  //       email: this.email,
  //       password: this.password,
  //     })
  //     .subscribe({
  //       next: () => {
  //         this.snack.open('Konto utworzone 🎉', '', {
  //           duration: 2500,
  //           panelClass: ['snack-success'],
  //           horizontalPosition: 'center',
  //           verticalPosition: 'top',
  //         });

  //         // 🔥 lepszy flow → najpierw login
  //         this.router.navigate(['/login']);
  //       },

  //       error: (err) => {
  //         console.error('❌ REGISTER ERROR:', err);

  //         let message = 'Błąd rejestracji ❌';

  //         if (err?.error?.message === 'Email już istnieje') {
  //           message = 'Ten email już istnieje';
  //         }

  //         this.snack.open(message, '', {
  //           duration: 2500,
  //           panelClass: ['snack-error'],
  //           horizontalPosition: 'center',
  //           verticalPosition: 'top',
  //         });
  //       },
  //     });
  // }




register() {
  const data = {
    email: this.email,
    password: this.password,
  };

  this.auth.register(data).subscribe({
    next: () => {

      this.snack.open(
        this.translate.instant('AUTH.REGISTER_SUCCESS'),
        '',
        {
          duration: 2500,
          panelClass: ['snack-success'],
          horizontalPosition: 'center',
          verticalPosition: 'top',
        }
      );

      // 🔥 bezpieczny flow
      this.router.navigate(['/login']);
    },

    error: (err) => {
      let key = 'AUTH.REGISTER_ERROR';

      if (err?.error?.message === 'Email już istnieje') {
        key = 'AUTH.EMAIL_EXISTS';
      }

      this.snack.open(
        this.translate.instant(key),
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













  goLogin() {
    this.router.navigate(['/login']);
  }
}
