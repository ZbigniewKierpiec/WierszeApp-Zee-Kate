import { TestBed } from '@angular/core/testing';
import { vi } from 'vitest';

import { ExportService } from './export-service';

const html2canvasMock = vi.hoisted(() => vi.fn());

vi.mock('html2canvas', () => ({ default: html2canvasMock }));
vi.mock('jspdf', () => ({ default: vi.fn() }));

describe('ExportService', () => {
  let service: ExportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExportService);
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
});
