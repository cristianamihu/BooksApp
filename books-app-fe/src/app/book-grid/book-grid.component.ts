import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookService } from '../core/service/book.service';
import { Book } from '../core/models/book.model';

@Component({
  selector: 'app-book-grid',
  templateUrl: './book-grid.component.html',
  styleUrls: ['./book-grid.component.css']
})
export class BookGridComponent implements OnInit {
  books: Book[] = [];
  imagePaths: string[] = [
    'assets/images/image1.jpg',
    'assets/images/image2.jpg',
    'assets/images/image3.jpg',
  ];

  constructor(
    private bookService: BookService, 
    private router: Router
  ) {}

  ngOnInit() {
    this.bookService.getBooks().subscribe(
      (books: Book[]) => {
        this.books = books.map(book => ({
          ...book,
          image: this.getRandomImage(),
        }));
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

  switchToTableView() {
    this.router.navigate(['/table-view']);
  }

  navigateToAddBook() {
    this.router.navigate(['/add-book']);
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