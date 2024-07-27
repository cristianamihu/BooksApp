import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ReusableSomethingComponent } from '../reusable-something/reusable-something.component';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit{
  book: any;

  constructor(private route: ActivatedRoute, private router: Router, private _dialogRef: MatDialog) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const bookId = +params['id'];
      // Simulate fetching book by ID
      this.book = { id: bookId, name: 'Book ' + bookId, author: 'Author ' + bookId, description: 'Description ' + bookId };
    });
  }

  goBack() {
    this.router.navigate(['/overview']);
  }

  confirmDelete() {
    const dialogRef = this._dialogRef.open(ReusableSomethingComponent, {
      data: this.book,
      width: '400px',
      height: '200px', 
      autoFocus: false, 
      disableClose: true
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'yes') {
        this.deleteBook(this.book.id);
      }
    });
  }

  deleteBook(bookId: number) {
    console.log(`Book with id ${bookId} deleted`);
    this.router.navigate(['/overview']); // Navigate back to overview after deletion
  }
}
