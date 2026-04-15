import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [RouterLink, CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements AfterViewInit {
  @ViewChild('introAudio') audio!: ElementRef<HTMLAudioElement>;
  text = 'Stwórz swoją książkę z wierszami';

  ngAfterViewInit() {
    const el = this.audio.nativeElement;

    el.muted = true;

    el.play().catch(() => {});

    const unlock = () => {
      el.muted = false;
      el.volume = 0.4;
      window.removeEventListener('mousemove', unlock);
    };

    window.addEventListener('mousemove', unlock);
  }
}
