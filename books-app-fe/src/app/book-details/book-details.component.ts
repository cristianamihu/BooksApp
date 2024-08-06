import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ReusableSomethingComponent } from '../reusable-something/reusable-something.component';
import { Book } from '../core/models/book.model';
import { BookService } from '../core/service/book.service';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit{
  book: Book | null = null;
  //book: any;

  constructor(private route: ActivatedRoute, private router: Router, private _dialogRef: MatDialog, private bookService: BookService) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const bookId = +params['id'];
      // Simulate fetching book by ID
      //this.book = { id: bookId, name: 'Book ' + bookId, author: 'Author ' + bookId, description: 'Description ' + bookId };
      this.bookService.getBook(bookId).subscribe(
        (book: Book) => {
          this.book = book;
        },
        (err) => {
          console.log('Error fetching book:', err);
        }
      );
    });
  }

  goBack() {
    this.router.navigate(['/overview']);
  }

  confirmDelete() {
    const dialogRef = this._dialogRef.open(ReusableSomethingComponent, {
      data: { name: this.book?.name, author: this.book?.author },
      //data: this.book,
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
        this.router.navigate(['/overview']); // Navigate back to overview after deletion  
        });
      },
      (err) => {
        console.log('Error deleting book:', err);
      }
    );
  }
}
