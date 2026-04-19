import { Component } from '@angular/core';
import { MatDialogRef, MatDialogContent, MatDialogActions } from '@angular/material/dialog';
@Component({
  selector: 'app-confirm-dialog',
  imports: [MatDialogContent, MatDialogActions],
  templateUrl: './confirm-dialog.html',
  styleUrl: './confirm-dialog.scss',
})
export class ConfirmDialog {
 constructor(private dialogRef: MatDialogRef<ConfirmDialog>) {}

  onConfirm() {
    this.dialogRef.close(true);
  }

  onCancel() {
    this.dialogRef.close(false);
  }



}
