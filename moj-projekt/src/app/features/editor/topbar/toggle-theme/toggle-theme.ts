import { Component } from '@angular/core';
import { ThemeModeService } from '../../../../services/theme-mode-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-toggle-theme',
  imports: [CommonModule],
  templateUrl: './toggle-theme.html',
  styleUrl: './toggle-theme.scss',
})
export class ToggleTheme {

constructor(public theme: ThemeModeService) {}

toggleTheme() {
  this.theme.toggle();
}


}
