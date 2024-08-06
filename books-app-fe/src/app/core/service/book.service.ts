import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Book } from '../models/book.model';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private url = 'http://localhost:8080/api/books';
  private _http = inject(HttpClient);
  
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  constructor() {}

  public getBooks(): Observable<Book[]> {
    return this._http.get<Book[]>(this.url, { headers: this.headers });
  }

  public getBook(id: number): Observable<Book> {
    return this._http.get<Book>(`${this.url}/${id}`, { headers: this.headers });
  }

  public addBook(book: Book): Observable<Book> {
    return this._http.post<Book>(this.url, book, { headers: this.headers });
  }

  public updateBook(book: Book): Observable<Book> {
    return this._http.put<Book>(`${this.url}/${book.id}`, book, { headers: this.headers });
  }

  public deleteBook(id: number): Observable<void> {
    return this._http.delete<void>(`${this.url}/${id}`, { headers: this.headers });
  }
}
