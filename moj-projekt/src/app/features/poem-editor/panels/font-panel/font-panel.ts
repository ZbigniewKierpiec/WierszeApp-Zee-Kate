import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
// Interfejs dla pojedynczego stylu czcionki
interface FontOption {
  id: number;
  name: string;
  label: string;
  fontFamily: string;
  fontWeight?: number | string;
  fontStyle?: 'normal' | 'italic';
}

// Interfejs dla kategorii czcionek
interface FontCategory {
  name: string;
  label: string;
  fonts: FontOption[];
}

@Component({
  selector: 'app-font-panel',
  imports: [CommonModule],
  templateUrl: './font-panel.html',
  styleUrl: './font-panel.scss',
})
export class FontPanel {
 
 // Aktywna kategoria czcionek
 activeCategory = 'wszystkie';

  // Wybrana czcionka
  selectedFont: FontOption | null = null;

  // Lista kategorii i dostępnych czcionek – używa Twoich zainstalowanych fontów
  categories: FontCategory[] = [
    {
      name: 'wszystkie',
      label: 'Wszystkie',
      fonts: [
        // ===== KLASYCZNE =====
        { id: 1, name: 'playfair-display', label: 'Playfair Display', fontFamily: '"Playfair Display", serif', fontWeight: 400 },
        { id: 2, name: 'playfair-display-bold', label: 'Playfair Display Gruby', fontFamily: '"Playfair Display", serif', fontWeight: 700 },
        { id: 3, name: 'cormorant-garamond', label: 'Cormorant Garamond', fontFamily: '"Cormorant Garamond", serif', fontWeight: 400 },
        { id: 4, name: 'libre-baskerville', label: 'Libre Baskerville', fontFamily: '"Libre Baskerville", serif', fontWeight: 400 },
        { id: 5, name: 'lora', label: 'Lora', fontFamily: '"Lora", serif', fontWeight: 400 },
        { id: 6, name: 'crimson-text', label: 'Crimson Text', fontFamily: '"Crimson Text", serif', fontWeight: 400 },
        { id: 7, name: 'eb-garamond', label: 'EB Garamond', fontFamily: '"EB Garamond", serif', fontWeight: 400 },
        { id: 8, name: 'merriweather', label: 'Merriweather', fontFamily: '"Merriweather", serif', fontWeight: 400 },

        // ===== ELEGANCKIE I OZDOBNE =====
        { id: 9, name: 'cinzel', label: 'Cinzel', fontFamily: '"Cinzel", serif', fontWeight: 400 },
        { id: 10, name: 'dm-serif-display', label: 'DM Serif Display', fontFamily: '"DM Serif Display", serif', fontWeight: 400 },
        { id: 11, name: 'spectral', label: 'Spectral', fontFamily: '"Spectral", serif', fontWeight: 400 },
        { id: 12, name: 'alegreya', label: 'Alegreya', fontFamily: '"Alegreya", serif', fontWeight: 400 },
        { id: 13, name: 'source-serif-4', label: 'Source Serif 4', fontFamily: '"Source Serif 4", serif', fontWeight: 400 },

        // ===== NOWOCZESNE I BEZSZERYFOWE =====
        { id: 14, name: 'montserrat', label: 'Montserrat', fontFamily: '"Montserrat", sans-serif', fontWeight: 400 },
        { id: 15, name: 'work-sans', label: 'Work Sans', fontFamily: '"Work Sans", sans-serif', fontWeight: 400 },
        { id: 16, name: 'raleway', label: 'Raleway', fontFamily: '"Raleway", sans-serif', fontWeight: 400 },
      ],
    },
    {
      name: 'romantyczne',
      label: 'Romantyczne',
      fonts: [
        { id: 1, name: 'playfair-display', label: 'Playfair Display', fontFamily: '"Playfair Display", serif', fontWeight: 400 },
        { id: 2, name: 'cormorant-garamond', label: 'Cormorant Garamond', fontFamily: '"Cormorant Garamond", serif', fontWeight: 400 },
        { id: 3, name: 'lora', label: 'Lora', fontFamily: '"Lora", serif', fontWeight: 400 },
        { id: 4, name: 'dm-serif-display', label: 'DM Serif Display', fontFamily: '"DM Serif Display", serif', fontWeight: 400 },
        { id: 5, name: 'spectral', label: 'Spectral', fontFamily: '"Spectral", serif', fontWeight: 400 },
        { id: 6, name: 'alegreya', label: 'Alegreya', fontFamily: '"Alegreya", serif', fontWeight: 400 },
      ],
    },
    {
      name: 'nowoczesne',
      label: 'Nowoczesne',
      fonts: [
        { id: 1, name: 'montserrat', label: 'Montserrat', fontFamily: '"Montserrat", sans-serif', fontWeight: 400 },
        { id: 2, name: 'work-sans', label: 'Work Sans', fontFamily: '"Work Sans", sans-serif', fontWeight: 400 },
        { id: 3, name: 'raleway', label: 'Raleway', fontFamily: '"Raleway", sans-serif', fontWeight: 400 },
        { id: 4, name: 'source-serif-4', label: 'Source Serif 4', fontFamily: '"Source Serif 4", serif', fontWeight: 400 },
        { id: 5, name: 'merriweather', label: 'Merriweather', fontFamily: '"Merriweather", serif', fontWeight: 400 },
      ],
    },
    {
      name: 'minimalistyczne',
      label: 'Minimalistyczne',
      fonts: [
        { id: 1, name: 'libre-baskerville', label: 'Libre Baskerville', fontFamily: '"Libre Baskerville", serif', fontWeight: 400 },
        { id: 2, name: 'crimson-text', label: 'Crimson Text', fontFamily: '"Crimson Text", serif', fontWeight: 400 },
        { id: 3, name: 'eb-garamond', label: 'EB Garamond', fontFamily: '"EB Garamond", serif', fontWeight: 400 },
        { id: 4, name: 'cinzel', label: 'Cinzel', fontFamily: '"Cinzel", serif', fontWeight: 400 },
        { id: 5, name: 'montserrat', label: 'Montserrat', fontFamily: '"Montserrat", sans-serif', fontWeight: 400 },
      ],
    },
  ];

  // Pobierz aktywną kategorię czcionek
  get currentCategory(): FontCategory {
    return this.categories.find((cat) => cat.name === this.activeCategory)!;
  }

  // Wybór czcionki
  selectFont(font: FontOption): void {
    this.selectedFont = font;
  }

  // Zastosowanie wybranej czcionki
  applyFont(): void {
    if (this.selectedFont) {
      console.log('Zastosowano czcionkę:', this.selectedFont);
      // Tutaj dodaj własną logikę – np. przekaż wybraną czcionkę do komponentu edytora tekstu
    }
  }

  // Zamknięcie panelu
  close(): void {
    console.log('Zamknięto panel wyboru czcionki');
  }




}
