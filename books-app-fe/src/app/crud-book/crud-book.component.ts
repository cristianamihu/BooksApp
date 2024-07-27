import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-crud-book',
  templateUrl: './crud-book.component.html',
  styleUrls: ['./crud-book.component.css']
})
export class CrudBookComponent implements OnInit{
  // Define a book type that allows id to be either null or number
  /*book: { id: number | null; name: string; author: string; description: string } = { 
    id: null, 
    name: '', 
    author: '', 
    description: '' 
  };*/
  //book = { id: null, name: '', author: '', description: '' };
  //bookForm: FormGroup;
  isEditMode = false; // is in add mode ("true" - edit mode)
  bookForm = new FormGroup({
    name: new FormControl('', Validators.required),
    author: new FormControl('', Validators.required),
    description: new FormControl(''),
  });

  constructor(private route: ActivatedRoute, private router: Router) {}

  /*ngOnInit() {
    this.route.params.subscribe(params => {
      const bookId = +params['id'];
      if (bookId) {
        this.isEditMode = true;
        // Simulate fetching book by ID
        this.book = { id: bookId, name: 'Edited Book', author: 'Edited Author', description: 'Edited Description' };
      } else {
        this.isEditMode = false;
      }
    });
  }

  submitForm() {
    if (this.isEditMode) {
      console.log('Book updated:', this.book);
    } else {
      console.log('New book added:', this.book);
    }
    this.router.navigate(['/overview']);
  }
}*/

 ngOnInit() {
    this.route.params.subscribe(params => {
      const bookId = +params['id'];
      if (bookId) {
        this.isEditMode = true;
        // Simulate fetching book by ID
        const book = { id: bookId, name: 'Edited Book', author: 'Edited Author', description: 'Edited Description' };
        this.bookForm.setValue({
          name: book.name,
          author: book.author,
          description: book.description
        });
      } else {
        this.isEditMode = false;
      }
    });
 }

 submitForm() {
    const bookData = this.bookForm.value;
    if (this.isEditMode) {
      console.log('Book updated:', bookData);
    } else {
      console.log('New book added:', bookData);
    }
    this.router.navigate(['/overview']);
  }
}
