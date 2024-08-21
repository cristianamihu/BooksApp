import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Book } from '../core/models/book.model';
import { BookService } from '../core/service/book.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-crud-book',
  templateUrl: './crud-book.component.html',
  styleUrls: ['./crud-book.component.css']
})
export class CrudBookComponent implements OnInit{
  /*book: { id: number | null; name: string; author: string; description: string } = { 
    id: null, 
    name: '', 
    author: '', 
    description: '' 
  };*/
  //book = { id: null, name: '', author: '', description: '' };
  private bookId: number | null = null;
  books: Book[] = [];
  bookForm: FormGroup;
  isEditMode = false; // is in add mode ("true" - edit mode)

  constructor(
    private route: ActivatedRoute, 
    private router: Router, 
    private bookService: BookService, 
    private snackBar: MatSnackBar
  ) {
    this.bookForm = new FormGroup({
      name: new FormControl('', Validators.required),
      author: new FormControl('', Validators.required),
      description: new FormControl(''),
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const bookId = +params['id'];
      if (bookId) {
        this.isEditMode = true;
        this.bookId = bookId;
        //const book = { id: bookId, name: 'Edited Book', author: 'Edited Author', description: 'Edited Description' };
        //} else {
        //  this.isEditMode = false;
        //}
      this.bookService.getBook(bookId).subscribe(
        (book: Book) => {
          this.bookForm.setValue({
            name: book.name,
            author:book.author,
            description: book.description,
          })
        },
        (err) => {
          console.log('Error fetching book for edit:', err);
        }
      );
    }
  });
 }

 submitForm() {
  const bookData = this.bookForm.getRawValue();
  //console.log('Book Data:', bookData);
  /*if (this.isEditMode) {
    console.log('Book ID:', bookData.id);
  }*/
  bookData.id = this.bookId;
  if (this.isEditMode) {
    this.bookService.updateBook(bookData).subscribe(
      (updatedBook: Book) => {
        this.books = this.books.map((book) => {
          if (book.id === updatedBook.id) return updatedBook;
          return book;
        });
        this.snackBar.open('Book updated successfully!', 'Close', {
          duration: 3000,
        });
        this.router.navigate(['/grid-view']);
      },
      (error) => {
        console.error('Error updating book:', error);
      }
    );
  } else {
      this.bookService.addBook(bookData).subscribe(
        (newBook: Book) => {
          this.books.push(newBook);
          this.snackBar.open('Book added successfully!', 'Close', {
            duration: 3000,
          });
          this.router.navigate(['/grid-view']);
        },
        (error) => {
          console.error('Error adding book:', error);
        }
      );
    }
  }

  goBack() {
    this.router.navigate(['/grid-view']);
  }
}
