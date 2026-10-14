import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EMPTY, of, Subject, throwError } from 'rxjs';
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

  beforeEach(async () => {
    api = {
      getBook: vi.fn().mockReturnValue(EMPTY),
      saveBook: vi.fn().mockReturnValue(of({})),
    };
    snackBar = { open: vi.fn() };
    vi.stubGlobal('requestAnimationFrame', vi.fn());

    await TestBed.configureTestingModule({
      imports: [PoemEditor],
      providers: [
        { provide: EditorApiService, useValue: api },
        { provide: AuthService, useValue: { getUser: () => ({ id: 'user-1' }) } },
        { provide: ExportService, useValue: { exportElement: vi.fn() } },
        { provide: MatSnackBar, useValue: snackBar },
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of(convertToParamMap({ id: 'book-1' })),
            queryParamMap: of(convertToParamMap({ page: '0' })),
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
});
