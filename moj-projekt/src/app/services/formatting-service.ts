import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FormattingService {


formatPoemAdvanced(text: string): string {
    if (!text) return text;

    text = text
      .replace(/\n+/g, '\n')
      .replace(/\s+/g, ' ')
      .trim();

    const sentences = text.split(/(?<=[.!?])/);
    const lines: string[] = [];

    sentences.forEach((sentence) => {
      const words = sentence.trim().split(' ');
      let current = '';

      words.forEach((word) => {
        if ((current + ' ' + word).length > 35) {
          lines.push(current.trim());
          current = word;
        } else {
          current += ' ' + word;
        }
      });

      if (current) lines.push(current.trim());

      lines.push('');
    });

    return lines.join('\n').replace(/\n{3,}/g, '\n\n');
  }

  formatPoemAI(text: string): string {
    if (!text) return text;

    text = text
      .replace(/\s+/g, ' ')
      .replace(/\s([.,!?])/g, '$1')
      .trim();

    const sentences = text.split(/(?<=[.!?])/);
    const lines: string[] = [];

    sentences.forEach((sentence) => {
      const words = sentence.trim().split(' ');
      let currentLine = '';

      words.forEach((word) => {
        if ((currentLine + ' ' + word).length > 35) {
          lines.push(currentLine.trim());
          currentLine = word;
        } else {
          currentLine += ' ' + word;
        }
      });

      if (currentLine) {
        lines.push(currentLine.trim());
      }

      lines.push('');
    });

    const final: string[] = [];

    lines.forEach((line, i) => {
      final.push(line);

      if ((i + 1) % 4 === 0) {
        final.push('');
      }
    });

    return final.join('\n').replace(/\n{3,}/g, '\n\n');
  }

  formatText(text: string, mode: string): string {
    if (!text) return text;

    if (mode === 'poetry') {
      const lines = text.split('\n').map((l) => l.trim());
      const result: string[] = [];

      for (const line of lines) {
        if (!line) continue;

        result.push(line);

        if (line.length < 60) {
          result.push('');
        }
      }

      return result.join('\n');
    }

    if (mode === 'compact') {
      return text
        .split('\n')
        .map((l) => l.trim())
        .filter((l) => l)
        .join('\n');
    }

    return text;
  }



}
