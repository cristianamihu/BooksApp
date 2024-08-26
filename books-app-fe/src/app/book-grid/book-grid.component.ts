import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookService } from '../core/service/book.service';
import { Book } from '../core/models/book.model';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-book-grid',
  templateUrl: './book-grid.component.html',
  styleUrls: ['./book-grid.component.css']
})
export class BookGridComponent implements OnInit {
  books: Book[] = [];
  filteredBooks: Book[] = [];
  searchTerm: string = '';
  imagePaths: string[] = [
    'assets/images/image1.jpg',
    'assets/images/image2.jpg',
    'assets/images/image3.jpg',
    'assets/images/image4.jpg',
    'assets/images/image5.jpg',
    'assets/images/image6.jpg',
    'assets/images/image7.jpg',
  ];

  constructor(
    private bookService: BookService, 
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.bookService.getBooks().subscribe(
      (books: Book[]) => {
        this.books = books.map(book => ({
          ...book,
          image: this.getRandomImage(),
        }));
        this.filteredBooks = this.books;
      },
      (err) => {
        console.log('Error fetching books:', err);
      }
    );
  }

  getRandomImage(): string {
    const randomIndex = Math.floor(Math.random() * this.imagePaths.length);
    return this.imagePaths[randomIndex];
  }

  searchBooks() {
    const searchTermLower = this.searchTerm.toLowerCase();
    const foundBook = this.books.find(book => 
      book.name.toLowerCase() === searchTermLower
    );
    if (foundBook) {
      this.router.navigate(['/book-details', foundBook.id]);
    } else {
      this.snackBar.open('No book found with the given title', 'Close', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'center',
      });
    }
  }

  switchToTableView() {
    this.router.navigate(['/table-view']);
  }

  navigateToAddBook() {
    this.router.navigate(['/add-book']);
  }

  navigateToHome() {
    this.router.navigate(['/home']);
  }

  getShortDescription(description: string): string {
    const maxLength = 70;
    return description.length > maxLength ? description.substring(0, maxLength) + '...' : description;
  }

  editBook(bookId: number) {
    this.router.navigate([`/edit-book/${bookId}`]);
  }

  goToBookDetails(bookId: number) {
    this.router.navigate([`/book-details/${bookId}`]);
  }

  /*private getBookImage(bookId: number): string {
    return this.books.find(book => book.id === bookId)?.image || 'assets/images/default.jpg';
  }*/
}