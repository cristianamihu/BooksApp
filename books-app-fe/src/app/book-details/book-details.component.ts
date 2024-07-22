import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit{
  book: any;

  constructor(private route: ActivatedRoute, private router: Router) {}

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
}
