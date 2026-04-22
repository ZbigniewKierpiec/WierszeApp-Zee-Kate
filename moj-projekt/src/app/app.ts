import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ThemeModeService } from './services/theme-mode-service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('moj-projekt');


  constructor(private theme: ThemeModeService) {}

  ngOnInit() {
    this.theme.init();
  }





}
