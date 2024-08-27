import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookService } from '../core/service/book.service';
import { Book } from '../core/models/book.model';
import { MatDialog } from '@angular/material/dialog';
import { ReusableSomethingComponent } from '../reusable-something/reusable-something.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NewComponentComponent } from '../new-component/new-component.component';

@Component({
  selector: 'app-book-table',
  templateUrl: './book-table.component.html',
  styleUrls: ['./book-table.component.css']
})
export class BookTableComponent implements OnInit {
  books: Book[] = [];
  displayedColumns: string[] = ['name', 'author', 'description', 'actions'];

  constructor(
    private bookService: BookService, 
    private router: Router, 
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.loadBooks();
  }

  loadBooks() {
    this.bookService.getBooks().subscribe(
      (books: Book[]) => {
        this.books = books;
      },
      (err) => {
        console.log('Error fetching books:', err);
      }
    );
  }

  switchToGridView() {
    this.router.navigate(['/grid-view']);
  }
  
  openAddDialog() {
    const dialogRef = this.dialog.open(NewComponentComponent, {
      data: { mode: 'add' },
      width: '700px',
      height: '600px',
      autoFocus: false,
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'added') {
        this.loadBooks();
      }
    });
  }

  openEditDialog(bookId: number) {
    const selectedBook = this.books.find(book => book.id === bookId);
    if (!selectedBook) {
      return;
    }
    const dialogRef = this.dialog.open(NewComponentComponent, {
      data: { mode: 'edit', book: selectedBook },
      width: '700px',
      height: '600px',
      autoFocus: false,
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'updated') {
        this.loadBooks();
      }
    });
  }

  openDeleteDialog(book: Book) {
    const dialogRef = this.dialog.open(ReusableSomethingComponent, {
      data: { name: book.name, author: book.author },
      width: '400px',
      height: '200px', 
      autoFocus: false, 
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'yes') {
        this.deleteBook(book.id);
      }
    });
  }

  deleteBook(bookId: number) {
    this.bookService.deleteBook(bookId).subscribe(
      () => {
        this.snackBar.open('Book deleted successfully!', 'Close', {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'center',
        });
        this.loadBooks();
      },
      (err) => {
        console.log('Error deleting book:', err);
      }
    );
  }
}
