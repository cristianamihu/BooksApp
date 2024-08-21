import { Component, Inject} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-reusable-something',
  templateUrl: './reusable-something.component.html',
  styleUrls: ['./reusable-something.component.css'],
})
export class ReusableSomethingComponent {
  constructor(
    private dialogRef: MatDialogRef<ReusableSomethingComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { name: string; author: string }
  ) {}

  confirm(answer: string) {
    this.dialogRef.close(answer);
  }
}
