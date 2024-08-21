import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ReusableSomethingComponent } from '../reusable-something/reusable-something.component';
import { Book } from '../core/models/book.model';
import { BookService } from '../core/service/book.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit{
  book: Book | null = null;
  randomImage: string | null = null;
  imagePaths: string[] = [
    'assets/images/image1.jpg',
    'assets/images/image2.jpg',
    'assets/images/image3.jpg',
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _dialogRef: MatDialog, 
    private bookService: BookService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const bookId = +params['id'];
      this.bookService.getBook(bookId).subscribe(
        (book: Book) => {
          this.book = book;
        },
        (err) => {
          console.log('Error fetching book:', err);
        }
      );
      this.randomImage = this.getRandomImage();
    });
  }

  getRandomImage(): string {
    const randomIndex = Math.floor(Math.random() * this.imagePaths.length);
    return this.imagePaths[randomIndex];
  }
  
  goBack() {
    this.router.navigate(['/grid-view']);
  }

  confirmDelete() {
    const dialogRef = this._dialogRef.open(ReusableSomethingComponent, {
      data: { name: this.book?.name, author: this.book?.author },
      width: '400px',
      height: '200px', 
      autoFocus: false, 
      disableClose: true
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'yes' && this.book) {
        this.deleteBook(this.book.id);
      }
    });
  }

  deleteBook(bookId: number) {
    this.bookService.deleteBook(bookId).subscribe(
      () => {
        this.bookService.getBooks().subscribe((books: Book[]) => {
          const index = books.findIndex(book => book.id === bookId);
          if (index > -1) {
            books.splice(index, 1);
          }
          this.snackBar.open('Book deleted successfully!', 'Close', {
            duration: 3000,
          });
          this.router.navigate(['/grid-view']); 
        });
      },
      (err) => {
        console.log('Error deleting book:', err);
      }
    );
  }
}
