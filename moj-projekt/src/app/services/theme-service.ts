import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  getHeartPattern(): string {
    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80">
        <path d="M40 20 
                 C40 5, 70 5, 70 30 
                 C70 55, 40 75, 40 75 
                 C40 75, 10 55, 10 30 
                 C10 5, 40 5, 40 20 Z"
          fill="#fb7185"/>
      </svg>
    `;

    return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
  }

  // getVariantStylesBase(t: string, v?: string) {
  //   if (t === 'Default') {
  //     if (!v || v === 'Clean') {
  //       return { background: '#ffffff', borderRadius: '8px' };
  //     }

  //     if (v === 'Paper') {
  //       return {
  //         background: '#fdf6e3',
  //         border: '1px solid #e5e7eb',
  //         borderRadius: '8px',
  //       };
  //     }

  //     if (v === 'Soft') {
  //       return {
  //         background: '#f8fafc',
  //         borderRadius: '12px',
  //         boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
  //       };
  //     }

  //     if (v === 'Classic') {
  //       return {
  //         background: '#ffffff',
  //         border: '2px solid #111',
  //         borderRadius: '6px',
  //       };
  //     }
  //   }

  //   if (t === 'Floral') {
  //     if (!v || v === 'Soft') {
  //       return { border: '3px solid pink', borderRadius: '16px' };
  //     }

  //     if (v === 'Elegant') {
  //       return { border: '2px dashed hotpink', borderRadius: '20px' };
  //     }

  //     if (v === 'Frame') {
  //       return { border: '6px double pink', borderRadius: '16px' };
  //     }

  //     if (v === 'Garden') {
  //       return { border: '4px solid green', borderRadius: '12px' };
  //     }
  //   }

  //   if (t === 'Vintage') {
  //     if (!v || v === 'Old Paper') {
  //       return {
  //         background: '#fdf6e3',
  //         border: '2px solid #d4af37',
  //         borderRadius: '10px',
  //       };
  //     }

  //     if (v === 'Gold Frame') {
  //       return { border: '4px solid gold', borderRadius: '12px' };
  //     }

  //     if (v === 'Classic Ink') {
  //       return { background: '#fffaf0', borderRadius: '8px' };
  //     }

  //     if (v === 'Retro') {
  //       return { border: '2px dashed brown', borderRadius: '10px' };
  //     }
  //   }

  //   if (t === 'Romantic') {
  //     if (!v || v === 'Soft Love') {
  //       return { background: '#ffe4e6', borderRadius: '16px' };
  //     }

  //     if (v === 'Hearts') {
  //       return {
  //         border: '2px solid #f9a8d4',
  //         borderRadius: '20px',
  //         backgroundColor: '#fff1f2',
  //         position: 'relative',
  //       };
  //     }

  //     if (v === 'Poetry') {
  //       return { borderBottom: '2px solid pink' };
  //     }

  //     if (v === 'Rose') {
  //       return { border: '3px solid crimson', borderRadius: '12px' };
  //     }
  //   }

  //   if (t === 'Dark') {
  //     if (!v || v === 'Deep Night') {
  //       return {
  //         background: '#111827',
  //         color: 'white',
  //         borderRadius: '10px',
  //       };
  //     }

  //     if (v === 'Soft Dark') {
  //       return {
  //         background: '#1f2937',
  //         color: '#ddd',
  //         borderRadius: '10px',
  //       };
  //     }

  //     if (v === 'Neon') {
  //       return {
  //         background: '#000',
  //         color: '#0ff',
  //         borderRadius: '10px',
  //       };
  //     }

  //     if (v === 'Midnight') {
  //       return {
  //         background: '#0f172a',
  //         color: '#ccc',
  //         borderRadius: '10px',
  //       };
  //     }
  //   }

  //   if (t === 'Minimal') {
  //     if (!v || v === 'Line') {
  //       return { borderLeft: '3px solid black' };
  //     }

  //     if (v === 'Soft Line') {
  //       return { borderLeft: '2px solid gray' };
  //     }

  //     if (v === 'Clean Space') {
  //       return { padding: '20px' };
  //     }

  //     if (v === 'Mono') {
  //       return { color: '#333' };
  //     }
  //   }

  //   return {};
  // }




getVariantStylesBase(t: string, v?: string) {

  // 🔥 GLOBAL BACKGROUND (zawsze ten sam)
  const base = {
    background: '#ffffff', // ← JEDEN KOLOR
    color: '#111'
  };

  if (t === 'Default') {
    if (!v || v === 'Clean') {
      return { ...base, borderRadius: '8px' };
    }

    if (v === 'Paper') {
      return {
        ...base,
        border: '1px solid #e5e7eb',
        borderRadius: '8px',
      };
    }

    if (v === 'Soft') {
      return {
        ...base,
        borderRadius: '12px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
      };
    }

    if (v === 'Classic') {
      return {
        ...base,
        border: '2px solid #111',
        borderRadius: '6px',
      };
    }
  }

  if (t === 'Floral') {
    if (!v || v === 'Soft') {
      return { ...base, border: '3px solid pink', borderRadius: '16px' };
    }

    if (v === 'Elegant') {
      return { ...base, border: '2px dashed hotpink', borderRadius: '20px' };
    }

    if (v === 'Frame') {
      return { ...base, border: '6px double pink', borderRadius: '16px' };
    }

    if (v === 'Garden') {
      return { ...base, border: '4px solid green', borderRadius: '12px' };
    }
  }

  if (t === 'Vintage') {
    if (!v || v === 'Old Paper') {
      return {
        ...base,
        border: '2px solid #d4af37',
        borderRadius: '10px',
      };
    }

    if (v === 'Gold Frame') {
      return { ...base, border: '4px solid gold', borderRadius: '12px' };
    }

    if (v === 'Classic Ink') {
      return { ...base, borderRadius: '8px' };
    }

    if (v === 'Retro') {
      return { ...base, border: '2px dashed brown', borderRadius: '10px' };
    }
  }

  if (t === 'Romantic') {
    if (!v || v === 'Soft Love') {
      return { ...base, borderRadius: '16px' };
    }

    if (v === 'Hearts') {
      return {
        ...base,
        border: '2px solid #f9a8d4',
        borderRadius: '20px',
        position: 'relative',
      };
    }

    if (v === 'Poetry') {
      return { ...base, borderBottom: '2px solid pink' };
    }

    if (v === 'Rose') {
      return { ...base, border: '3px solid crimson', borderRadius: '12px' };
    }
  }

  if (t === 'Dark') {
    // 🔥 nadal biały background — tylko zmieniasz styl
    if (!v || v === 'Deep Night') {
      return { ...base, border: '2px solid #111827', borderRadius: '10px' };
    }

    if (v === 'Soft Dark') {
      return { ...base, border: '2px solid #1f2937', borderRadius: '10px' };
    }

    if (v === 'Neon') {
      return { ...base, border: '2px solid #0ff', borderRadius: '10px' };
    }

    if (v === 'Midnight') {
      return { ...base, border: '2px solid #0f172a', borderRadius: '10px' };
    }
  }

  if (t === 'Minimal') {
    if (!v || v === 'Line') {
      return { ...base, borderLeft: '3px solid black' };
    }

    if (v === 'Soft Line') {
      return { ...base, borderLeft: '2px solid gray' };
    }

    if (v === 'Clean Space') {
      return { ...base, padding: '20px' };
    }

    if (v === 'Mono') {
      return { ...base, color: '#333' };
    }
  }

  return base;
}





  getVariantStyles(template: string, variant?: string) {
    return this.getVariantStylesBase(template, variant);
  }
}
