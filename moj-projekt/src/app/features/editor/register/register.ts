import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import  { AuthService } from '../../../services/auth-service';
@Component({
  selector: 'app-register',
  imports: [CommonModule,FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {


email = '';
  password = '';

  constructor(private auth: AuthService, private router: Router) {}

  register() {
    this.auth.register({
      email: this.email,
      password: this.password,
    }).subscribe({
      next: (user: any) => {
        // this.auth.setUser(user); // 🔥 auto login
        this.router.navigate(['/editor']);
      },
      error: () => alert('Błąd rejestracji'),
    });
  }

  // 🔥 żeby nie było błędu jak w login
  goLogin() {
    this.router.navigate(['/login']);
  }



}
