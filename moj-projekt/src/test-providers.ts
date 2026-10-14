import { importProvidersFrom } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { provideRouter } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { Component } from '@angular/core';
import { of } from 'rxjs';

@Component({ standalone: true, template: '' })
class EmptyTestRoute {}

export default [
  provideHttpClient(),
  provideRouter([{ path: '**', component: EmptyTestRoute }]),
  importProvidersFrom(
    MatDialogModule,
    MatSnackBarModule,
    TranslateModule.forRoot(),
  ),
  { provide: MAT_DIALOG_DATA, useValue: {} },
  {
    provide: MatDialogRef,
    useValue: {
      close: () => undefined,
      afterClosed: () => of(undefined),
    },
  },
];
