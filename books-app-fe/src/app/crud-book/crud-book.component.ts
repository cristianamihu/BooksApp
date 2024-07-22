import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-crud-book',
  templateUrl: './crud-book.component.html',
  styleUrls: ['./crud-book.component.css']
})
export class CrudBookComponent implements OnInit{
  // Define a book type that allows id to be either null or number
  book: { id: number | null; name: string; author: string; description: string } = { 
    id: null, 
    name: '', 
    author: '', 
    description: '' 
  };
  //book = { id: null, name: '', author: '', description: '' };
  isEditMode = false;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
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
}
