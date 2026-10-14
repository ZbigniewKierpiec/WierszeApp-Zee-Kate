import { TestBed } from '@angular/core/testing';
import { vi } from 'vitest';

import { ExportService } from './export-service';

const html2canvasMock = vi.hoisted(() => vi.fn());
const jsPDFMock = vi.hoisted(() => vi.fn());

vi.mock('html2canvas', () => ({ default: html2canvasMock }));
vi.mock('jspdf', () => ({ default: jsPDFMock }));

describe('ExportService', () => {
  let service: ExportService;
  let pdf: {
    addPage: ReturnType<typeof vi.fn>;
    addImage: ReturnType<typeof vi.fn>;
    save: ReturnType<typeof vi.fn>;
  };

  beforeEach(() => {
    html2canvasMock.mockReset();
    jsPDFMock.mockReset();
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExportService);
    pdf = {
      addPage: vi.fn(),
      addImage: vi.fn(),
      save: vi.fn(),
    };
    jsPDFMock.mockImplementation(function JsPDFConstructor() {
      return pdf;
    });
    html2canvasMock.mockImplementation(async (page: HTMLElement) => ({
      toDataURL: () => `data:${page.dataset['exportPage']}`,
    }));
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('removes its temporary clone when canvas rendering fails', async () => {
    const element = document.createElement('div');
    element.id = 'export-source';
    document.body.appendChild(element);
    html2canvasMock.mockRejectedValueOnce(new Error('Canvas rendering failed'));

    await expect(service.exportElement(element, 'poem.pdf')).rejects.toThrow(
      'Canvas rendering failed',
    );

    expect(document.querySelectorAll('#export-source')).toHaveLength(1);
    element.remove();
  });

  it('exports a single book page without adding a blank page', async () => {
    const source = document.createElement('div');
    source.innerHTML = '<section class="export-page" data-export-page="page-1"></section>';
    document.body.appendChild(source);

    await service.exportElement(source, 'single-page.pdf');

    expect(html2canvasMock).toHaveBeenCalledTimes(1);
    expect(html2canvasMock.mock.calls[0][0].dataset['exportPage']).toBe('page-1');
    expect(pdf.addPage).not.toHaveBeenCalled();
    expect(pdf.addImage).toHaveBeenCalledWith('data:page-1', 'JPEG', 0, 0, 210, 297);
    expect(pdf.save).toHaveBeenCalledWith('single-page.pdf');
    source.remove();
  });

  it('exports all book pages as separate PDF pages in source order', async () => {
    const source = document.createElement('div');
    source.innerHTML = [
      '<section class="export-page" data-export-page="page-1"></section>',
      '<section class="export-page" data-export-page="page-2"></section>',
      '<section class="export-page" data-export-page="page-3"></section>',
      '<section class="export-page" data-export-page="page-4"></section>',
      '<section class="export-page" data-export-page="page-5"></section>',
    ].join('');
    document.body.appendChild(source);

    await service.exportElement(source, 'book.pdf');

    expect(html2canvasMock.mock.calls.map((call) => call[0].dataset['exportPage'])).toEqual([
      'page-1',
      'page-2',
      'page-3',
      'page-4',
      'page-5',
    ]);
    expect(pdf.addPage).toHaveBeenCalledTimes(4);
    expect(pdf.addImage.mock.calls.map((call) => call[0])).toEqual([
      'data:page-1',
      'data:page-2',
      'data:page-3',
      'data:page-4',
      'data:page-5',
    ]);
    expect(pdf.save).toHaveBeenCalledWith('book.pdf');
    source.remove();
  });

  it.each([2, 7])('exports books containing %i pages without skipping pages', async (count) => {
    const source = document.createElement('div');
    source.innerHTML = Array.from(
      { length: count },
      (_, index) => `<section class="export-page" data-export-page="page-${index + 1}"></section>`,
    ).join('');
    document.body.appendChild(source);

    await service.exportElement(source, 'book.pdf');

    expect(html2canvasMock).toHaveBeenCalledTimes(count);
    expect(pdf.addPage).toHaveBeenCalledTimes(count - 1);
    expect(pdf.addImage.mock.calls.map((call) => call[0])).toEqual(
      Array.from({ length: count }, (_, index) => `data:page-${index + 1}`),
    );
    source.remove();
  });
});
