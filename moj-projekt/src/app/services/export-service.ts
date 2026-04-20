import { Injectable } from '@angular/core';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

@Injectable({
  providedIn: 'root',
})
export class ExportService {
  private pagedPreviewer: any;

  async preview(sourceSelector: string, hostId: string): Promise<void> {
    const source = document.querySelector(sourceSelector) as HTMLElement | null;
    const host = document.getElementById(hostId);

    if (!source || !host) return;

    host.innerHTML = '';

    const clonedSource = source.cloneNode(true) as HTMLElement;

    // @ts-ignore
    this.pagedPreviewer = new window.Paged.Previewer();

    await this.pagedPreviewer.preview(clonedSource, [], host);
  }

  fixLayout(hostId: string, currentPage: number) {
    const host = document.getElementById(hostId);
    if (!host) return;

    const pages = host.querySelectorAll('.pagedjs_page');
    if (!pages.length) return;

    pages.forEach((p: any, index: number) => {
      p.style.display = index === currentPage ? 'block' : 'none';
      p.style.margin = '0 auto';
    });
  }

  async exportPDF(hostId: string, fileName: string) {
    const host = document.getElementById(hostId);
    if (!host) return;

    const pages = host.querySelectorAll('.pagedjs_page');

    pages.forEach((p: any) => {
      p.style.display = 'block';
    });

    const pdf = new jsPDF({
      unit: 'mm',
      format: 'a4',
      compress: true,
    });

    for (let i = 0; i < pages.length; i++) {
      const page = pages[i] as HTMLElement;

      const canvas = await html2canvas(page, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#ffffff',
      });

      const imgData = canvas.toDataURL('image/jpeg', 0.85);

      if (i > 0) pdf.addPage();

      pdf.addImage(imgData, 'JPEG', 0, 0, 210, 297);
    }

    pdf.save(fileName);
  }
}
