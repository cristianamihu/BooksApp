import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Book } from '../core/models/book.model';
import { BookService } from '../core/service/book.service';

@Component({
  selector: 'app-book-overview',
  templateUrl: './book-overview.component.html',
  styleUrls: ['./book-overview.component.css']
})
export class BookOverviewComponent implements OnInit {
  books: Book[] = [];
  /*books = [
    { id: 1, name: 'Book One', author: 'Author One', description: 'Description One' },
    { id: 2, name: 'Book Two', author: 'Author Two', description: 'Description Two' },
  ];*/

  constructor(private router: Router, private bookService: BookService) { }

  ngOnInit() {
    this.bookService.getBooks().subscribe(
      (books: Book[]) => {
        console.log(books);
        this.books = books;
      },
      (err) => {
        console.log('Error fetching books:', err);
      }
    );
  }

  /*getBooks() {
    return this.books;
  }

  getBook(id: number) {
    return this.books.find(book => book.id === id);
  }

  addBook(book: { name: string; author: string; description: string }) {
    const newBook = { id: this.books.length + 1, ...book };
    this.books.push(newBook);
  }*/

  viewBook(bookId: number) {
    //console.log('View book:', this.getBook(bookId));
    this.router.navigate(['/book', bookId]);
  }

  editBook(bookId: number) {
    this.router.navigate(['/edit-book', bookId]);
  }

  navigateToAddBook() {
    this.router.navigate(['/add-book']);
  }
}
