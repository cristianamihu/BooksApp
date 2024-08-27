import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Book } from '../core/models/book.model';
import { BookService } from '../core/service/book.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-new-component',
  templateUrl: './new-component.component.html',
  styleUrls: ['./new-component.component.css'],
})
export class NewComponentComponent implements OnInit{
  /*showText: boolean = true;
    public text="hello world";
    students = [
      { id: 1, name: 'Pop Mihai', age: 22 },
      { id: 2, name: 'Popa Ana', age: 21 },
    ];

    constructor(private router: Router){

    }
    onClickButton (){
      // this.text = "I clicked the button";
      this.showText = !this.showText
      this.router.navigateByUrl("/page")
    }

    submit(){
      alert("heeei")
    }
  */
  bookForm: FormGroup;
  isEditMode: boolean;

  constructor(
    private dialogRef: MatDialogRef<NewComponentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { mode: string; book?: Book },
    private bookService: BookService,
    private snackBar: MatSnackBar
  ) {
    this.isEditMode = data.mode === 'edit';
    this.bookForm = new FormGroup({
      name: new FormControl(data.book ? data.book.name : '', Validators.required),
      author: new FormControl(data.book ? data.book.author : '', Validators.required),
      description: new FormControl(data.book ? data.book.description : ''),
    });
  }

  ngOnInit(): void {}

  submitForm() {
    const bookData = this.bookForm.value;
    if (this.isEditMode && this.data.book) {
      this.bookService.updateBook({ ...bookData, id: this.data.book.id }).subscribe(
        () => {
          this.snackBar.open('Book updated successfully!', 'Close', {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'center',
          });
          this.dialogRef.close('updated');
        },
        (error) => {
          console.error('Error updating book:', error);
        }
      );
    } else {
      this.bookService.addBook(bookData).subscribe(
        () => {
          this.snackBar.open('Book added successfully!', 'Close', {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'center',
          });
          this.dialogRef.close('added');
        },
        (error) => {
          console.error('Error adding book:', error);
        }
      );
    }
  }

  cancel() {
    this.dialogRef.close();
  }
}
