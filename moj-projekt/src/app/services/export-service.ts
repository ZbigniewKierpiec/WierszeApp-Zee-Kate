import { Injectable } from '@angular/core';

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

  // async exportPDF(hostId: string, fileName: string) {
  //   const host = document.getElementById(hostId);
  //   if (!host) return;

  //   const pages = host.querySelectorAll('.pagedjs_page');

  //   pages.forEach((p: any) => {
  //     p.style.display = 'block';
  //   });

  //   const pdf = new jsPDF({
  //     unit: 'mm',
  //     format: 'a4',
  //     compress: true,
  //   });

  //   for (let i = 0; i < pages.length; i++) {
  //     const page = pages[i] as HTMLElement;

  //     const canvas = await html2canvas(page, {
  //       scale: 2,
  //       useCORS: true,
  //       backgroundColor: '#ffffff',
  //     });

  //     const imgData = canvas.toDataURL('image/jpeg', 0.85);

  //     if (i > 0) pdf.addPage();

  //     pdf.addImage(imgData, 'JPEG', 0, 0, 210, 297);
  //   }

  //   pdf.save(fileName);
  // }

  async exportPDF(hostId: string, fileName: string) {
    const host = document.getElementById(hostId);
    if (!host) return;

    const [{ default: html2canvas }, { default: jsPDF }] = await Promise.all([
      import('html2canvas'),
      import('jspdf'),
    ]);

    // const pages = host.querySelectorAll('.pagedjs_page');
    const pages = host.querySelectorAll('section.poem');
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

      // 🔥 FORCE STYLES
      page.querySelectorAll('*').forEach((el: any) => {
        const computed = window.getComputedStyle(el);

        el.style.background = computed.background;

        el.style.backgroundImage = computed.backgroundImage;

        el.style.backgroundColor = computed.backgroundColor;

        el.style.color = computed.color;

        el.style.textShadow = computed.textShadow;

        el.style.boxShadow = computed.boxShadow;

        el.style.filter = computed.filter;

        el.style.fontFamily = computed.fontFamily;

        el.style.fontWeight = computed.fontWeight;

        el.style.fontStyle = computed.fontStyle;

        el.style.letterSpacing = computed.letterSpacing;

        el.style.textTransform = computed.textTransform;

        el.style.opacity = computed.opacity;
      });
      const canvas = await html2canvas(page, {
        scale: 3,

        useCORS: true,

        allowTaint: true,

        backgroundColor: '#ffffff',

        logging: false,

        removeContainer: false,

        imageTimeout: 0,
      });

      const imgData = canvas.toDataURL('image/jpeg', 1.0);

      if (i > 0) {
        pdf.addPage();
      }

      pdf.addImage(imgData, 'JPEG', 0, 0, 210, 297);
    }

    pdf.save(fileName);
  }

  async exportElement(element: HTMLElement, fileName: string) {
    const [{ default: html2canvas }, { default: jsPDF }] = await Promise.all([
      import('html2canvas'),
      import('jspdf'),
    ]);
    const clone = element.cloneNode(true) as HTMLElement;

    clone.style.position = 'fixed';
    clone.style.left = '0';
    clone.style.top = '0';
    clone.style.zIndex = '999999';
    clone.style.visibility = 'visible';

    document.body.appendChild(clone);

    try {
      clone.querySelectorAll('.poem').forEach((el: any) => {
        el.style.position = 'relative';
        el.style.top = '0';
        el.style.left = '0';
        el.style.transform = 'none';
        el.style.width = '100%';
        el.style.height = '100%';
      });

      clone.querySelectorAll('.poem-content').forEach((el: any) => {
        el.style.display = 'flex';
        el.style.visibility = 'visible';
        el.style.opacity = '1';
      });

      clone.querySelectorAll('.poem-title,.poem-block').forEach((el: any) => {
        el.style.visibility = 'visible';
        el.style.opacity = '1';
        el.style.color = '#000';
      });

      await new Promise((resolve) => setTimeout(resolve, 500));

      const canvas = await html2canvas(clone, {
        scale: 3,
        useCORS: true,
        allowTaint: true,
        backgroundColor: null,
        logging: false,
      });

      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      const imgData = canvas.toDataURL('image/jpeg', 1);

      pdf.addImage(imgData, 'JPEG', 0, 0, 210, 297);

      pdf.save(fileName);
    } finally {
      clone.remove();
    }
  }
}
