import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, EMPTY, of, Subject, throwError } from 'rxjs';
import { AuthService } from '../../services/auth-service';
import { EditorApiService } from '../../services/editor-api';
import { ExportService } from '../../services/export-service';
import { PoemEditor } from './poem-editor';

describe('PoemEditor', () => {
  let component: PoemEditor;
  let fixture: ComponentFixture<PoemEditor>;
  let api: {
    getBook: ReturnType<typeof vi.fn>;
    saveBook: ReturnType<typeof vi.fn>;
  };
  let snackBar: { open: ReturnType<typeof vi.fn> };
  let exportService: { exportElement: ReturnType<typeof vi.fn> };
  let queryParams: BehaviorSubject<ReturnType<typeof convertToParamMap>>;

  beforeEach(async () => {
    queryParams = new BehaviorSubject(convertToParamMap({ page: '0' }));
    api = {
      getBook: vi.fn().mockReturnValue(EMPTY),
      saveBook: vi.fn().mockReturnValue(of({})),
    };
    snackBar = { open: vi.fn() };
    exportService = { exportElement: vi.fn().mockResolvedValue(undefined) };
    vi.stubGlobal('requestAnimationFrame', vi.fn());

    await TestBed.configureTestingModule({
      imports: [PoemEditor],
      providers: [
        { provide: EditorApiService, useValue: api },
        { provide: AuthService, useValue: { getUser: () => ({ id: 'user-1' }) } },
        { provide: ExportService, useValue: exportService },
        { provide: MatSnackBar, useValue: snackBar },
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of(convertToParamMap({ id: 'book-1' })),
            queryParamMap: queryParams.asObservable(),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PoemEditor);
    component = fixture.componentInstance;
    component.bookId = 'book-1';
    component.currentBook = {
      id: 'book-1',
      title: 'Test book',
      pages: [{ title: 'Initial title', text: '', poemEditor: {} }],
    };
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('coalesces rapid consecutive edits into the latest queued save', () => {
    const firstResponse = new Subject<void>();
    const secondResponse = new Subject<void>();
    api.saveBook.mockReturnValueOnce(firstResponse).mockReturnValueOnce(secondResponse);

    component.poemTitle = 'First edit';
    component.savePoem();
    component.poemTitle = 'Second edit';
    component.savePoem();
    component.poemTitle = 'Latest edit';
    component.savePoem();

    expect(api.saveBook).toHaveBeenCalledTimes(1);
    expect(api.saveBook.mock.calls[0][0].pages[0].title).toBe('First edit');

    firstResponse.next();
    firstResponse.complete();

    expect(api.saveBook).toHaveBeenCalledTimes(2);
    expect(api.saveBook.mock.calls[1][0].pages[0].title).toBe('Latest edit');

    secondResponse.next();
    secondResponse.complete();
  });

  it('prevents same-book save responses from completing out of order', () => {
    const firstResponse = new Subject<void>();
    const secondResponse = new Subject<void>();
    let requestIndex = 0;

    api.saveBook.mockImplementation(() => {
      return requestIndex++ === 0 ? firstResponse : secondResponse;
    });

    component.poemTitle = 'Earlier';
    component.savePoem();
    component.poemTitle = 'Later';
    component.savePoem();

    expect(api.saveBook).toHaveBeenCalledTimes(1);

    firstResponse.next();
    firstResponse.complete();

    expect(api.saveBook).toHaveBeenCalledTimes(2);
    expect(api.saveBook.mock.calls[1][0].pages[0].title).toBe('Later');

    secondResponse.next();
    secondResponse.complete();
  });

  it('retains a failed save and retries it on the next save trigger', () => {
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => undefined);
    api.saveBook
      .mockReturnValueOnce(throwError(() => new Error('network error')))
      .mockReturnValueOnce(of({}));
    component.poemTitle = 'Unsaved edit';

    component.savePoem();

    expect(snackBar.open).toHaveBeenCalledWith(
      'Changes could not be saved. Please try again.',
      'OK',
      expect.objectContaining({ verticalPosition: 'top' }),
    );
    expect(api.saveBook).toHaveBeenCalledTimes(1);

    component.savePoem();

    expect(api.saveBook).toHaveBeenCalledTimes(2);
    expect(api.saveBook.mock.calls[1][0].pages[0].title).toBe('Unsaved edit');
    expect(errorSpy).toHaveBeenCalledOnce();
  });

  it('does not send an identical book snapshot after it was saved', () => {
    component.poemTitle = 'Saved title';
    component.savePoem();
    component.savePoem();

    expect(api.saveBook).toHaveBeenCalledTimes(1);
  });

  it('resolves local assets and preserves saved absolute image URLs', () => {
    const book = {
      id: 'book-1',
      pages: [
        {
          title: 'Saved poem',
          text: '',
          poemEditor: {
            backgroundImage: 'assets/bg/paper-background.jpg',
            frameImage: 'https://images.example.com/frame.png?size=large',
          },
        },
      ],
    };
    api.getBook.mockReturnValue(of(book));

    component.loadBook();

    expect(component.backgroundImage).toBe('url("/assets/bg/paper-background.jpg")');
    expect(component.frameImage).toBe('url("https://images.example.com/frame.png?size=large")');

    component.updateCurrentPage();

    expect(book.pages[0].poemEditor.backgroundImage).toBe('/assets/bg/paper-background.jpg');
    expect(book.pages[0].poemEditor.frameImage).toBe(
      'https://images.example.com/frame.png?size=large',
    );
  });

  it('exports every book page in order and includes unsaved edits on the active page', async () => {
    queryParams.next(convertToParamMap({ page: '2' }));
    fixture.detectChanges();
    component.currentBook = {
      id: 'book-1',
      pages: Array.from({ length: 5 }, (_, index) => ({
        title: `Page ${index + 1}`,
        text: `Text ${index + 1}`,
        poemEditor: {
          backgroundColor: ['#f0e0d0', '#e0f0d0', '#d0e0f0', '#f0d0e0', '#e0d0f0'][index],
          backgroundImage: [0, 2, 4].includes(index)
            ? `/assets/bg/background-${index + 1}.jpg`
            : '',
          frameImage: [2, 3].includes(index) ? '/assets/bg/floral-right.png.png' : '',
          poemColor: index === 0 ? '#112233' : '#334455',
          textColors: index === 0 ? ['#abcdef'] : [],
        },
      })),
    };
    component.poemTitle = 'Unsaved active title';
    component.poemBlocks = [{ type: 'line', text: 'Unsaved active text', textIndex: 0 }];
    component.backgroundImage = 'url("/assets/bg/paper-background.jpg")';
    component.frameImage = 'url("/assets/bg/floral-right.png.png")';
    component.textColors = ['#cc0011'];
    fixture.detectChanges(false);

    await component.exportPDF();

    const exportSource = exportService.exportElement.mock.calls[0][0] as HTMLElement;
    const pages = Array.from(exportSource.querySelectorAll<HTMLElement>('.export-page'));

    expect(exportService.exportElement).toHaveBeenCalledWith(
      exportSource,
      'poem-editor.pdf',
    );
    expect(pages).toHaveLength(5);
    expect(pages.map((page) => page.querySelector('.poem-title')?.textContent?.trim())).toEqual([
      'Page 1',
      'Page 2',
      'Unsaved active title',
      'Page 4',
      'Page 5',
    ]);
    expect(pages[2].querySelector('.poem-block')?.textContent?.trim()).toBe(
      'Unsaved active text',
    );
    expect(pages[0].querySelector<HTMLElement>('.poem-block')?.style.color).toBe(
      'rgb(171, 205, 239)',
    );
    expect(pages[2].querySelector<HTMLElement>('.poem-block')?.style.color).toBe(
      'rgb(204, 0, 17)',
    );
    expect(pages[1].style.backgroundColor).toBe('rgb(224, 240, 208)');
    expect(pages[1].querySelector('.export-background')).toBeNull();
    expect(pages[1].querySelector('.export-frame')).toBeNull();
    expect(pages[2].querySelector<HTMLElement>('.export-background')?.style.zIndex).toBe('0');
    expect(pages[2].querySelector<HTMLElement>('.export-frame')?.style.zIndex).toBe('1');
    expect(pages[2].querySelector<HTMLElement>('.export-poem')?.style.zIndex).toBe('2');
    expect(pages[2].querySelector<HTMLElement>('.export-poem')?.style.transform).toBe('none');
    expect(pages[2].querySelector<HTMLElement>('.export-poem')?.style.top).toBe('15%');
    expect(pages[2].querySelector<HTMLElement>('.export-poem')?.style.left).toBe('14%');
    expect(pages[1].querySelector<HTMLElement>('.export-poem')?.style.top).toBe('-80px');
    expect(pages[1].querySelector<HTMLElement>('.export-poem')?.style.left).toBe('-80px');
    expect(pages[3].querySelector<HTMLElement>('.export-poem')?.style.top).toBe('0%');
    expect(pages[3].querySelector<HTMLElement>('.export-poem')?.style.left).toBe('0%');
    expect(
      Array.from(pages[2].children).map((layer) =>
        layer.classList.contains('export-background')
          ? 'background'
          : layer.classList.contains('export-frame')
            ? 'frame'
            : 'content',
      ),
    ).toEqual(['background', 'frame', 'content']);
    expect(pages[4].querySelector('.export-background')?.getAttribute('style')).toContain(
      'background-5.jpg',
    );
    expect(api.saveBook).not.toHaveBeenCalled();
  });
});
