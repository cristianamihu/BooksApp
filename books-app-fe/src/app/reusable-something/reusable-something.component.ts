import { Component, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-reusable-something',
  templateUrl: './reusable-something.component.html',
  styleUrls: ['./reusable-something.component.css'],
})
export class ReusableSomethingComponent {
  /*@Input() text: string;
  secondText: string = '';

  constructor() {
    this.text = '';
    console.log('constructor');
  }

  ngOnInit() {
    this.secondText = 'my angular app';
    console.log('ngOnInit');
  }*/

  constructor(
    private dialogRef: MatDialogRef<ReusableSomethingComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { name: string; author: string }
  ) {}

  confirm(answer: string) {
    this.dialogRef.close(answer);
  }
}
