import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { AuthService } from '../../../../services/auth-service';
import { MatDialog } from '@angular/material/dialog';
import { UiDialog } from '../../../../shared/ui-dialog/ui-dialog';

@Component({
  selector: 'app-protected-button',
  imports: [CommonModule, FormsModule, TranslateModule],
  templateUrl: './protected-button.html',
  styleUrls: ['./protected-button.scss'],
})
export class ProtectedButton {
  @Input() label!: string;
  @Input() icon: string = '';
  @Input() requiredRole?: string;
  @Input() variant: 'primary' | 'subtle' | 'danger' = 'subtle';
  @Input() message: string = 'Zaloguj się, aby użyć tej funkcji.';
  @Input() title: string = 'Wymagane logowanie';
  @Output() action = new EventEmitter<void>();

  constructor(
    private auth: AuthService,
    private router: Router,
    private dialog: MatDialog,
  ) {}

  get isLoggedIn(): boolean {
    return this.auth.isLoggedIn();
  }

  get hasAccess(): boolean {
    if (!this.isLoggedIn) return false;
    if (!this.requiredRole) return true;

    return this.auth.getUserRole() === this.requiredRole;
  }

 

  // handleClick() {
  //   if (!this.isLoggedIn) {
  //     this.dialog
  //       .open(UiDialog, {
  //         data: {
  //           icon: '🔒',
  //           title: 'Wymagane logowanie',
  //           message: 'Zaloguj się aby zapisać swój wiersz.',
  //           confirmText: 'Zaloguj się',
  //           cancelText: 'Anuluj',
  //         },
  //       })
  //       .afterClosed()
  //       .subscribe((res) => {
  //         if (res) {
  //           this.router.navigate(['/login']);
  //         }
  //       });

  //     return;
  //   }

  //   this.action.emit();
  // }


handleClick() {
  if (!this.isLoggedIn) {

    this.dialog
      .open(UiDialog, {
        data: {
          icon: '🔒',
          title: this.title || 'Wymagane logowanie',
          message: this.message || 'Zaloguj się aby użyć tej funkcji.',
          confirmText: 'Zaloguj się',
          cancelText: 'Anuluj',
        }
      })
      .afterClosed()
      .subscribe((result) => {
        if (result) {
          this.router.navigate(['/login']);
        }
      });

    return;
  }

  if (!this.hasAccess) {
    this.router.navigate(['/upgrade']);
    return;
  }

  this.action.emit();
}





  get iconToShow(): string {
    if (!this.isLoggedIn) return '🔒';
    if (!this.hasAccess) return '⭐';
    return this.icon || '👉';
  }

  get tooltip(): string {
    if (!this.isLoggedIn) return 'Zaloguj się, aby użyć tej funkcji';
    if (!this.hasAccess) return 'Ta funkcja wymaga planu premium';
    return '';
  }
}
