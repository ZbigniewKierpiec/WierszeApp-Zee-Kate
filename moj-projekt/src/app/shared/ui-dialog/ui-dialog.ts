import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-ui-dialog',
  imports: [CommonModule],
  templateUrl: './ui-dialog.html',
  styleUrl: './ui-dialog.scss',
})
export class UiDialog {
  constructor(
    private dialogRef: MatDialogRef<UiDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}




get title() {
  return this.data?.title || 'Wymagane logowanie';
}

get message() {
  return this.data?.message || 'Zaloguj się aby użyć tej funkcji';
}





  close() {
    this.dialogRef.close(false);
  }

  confirm() {
    this.dialogRef.close(true);
  }
}
