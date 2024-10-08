import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NewComponentComponent } from './new-component/new-component.component';
import { ReusableSomethingComponent } from './reusable-something/reusable-something.component';
import { BookOverviewComponent } from './book-overview/book-overview.component';
import { BookDetailsComponent } from './book-details/book-details.component';
import { CrudBookComponent } from './crud-book/crud-book.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from  '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BookTableComponent } from './book-table/book-table.component';
import { BookGridComponent } from './book-grid/book-grid.component';
import { MatTableModule } from '@angular/material/table';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    NewComponentComponent,
    ReusableSomethingComponent,
    BookOverviewComponent,
    BookDetailsComponent,
    CrudBookComponent,
    BookTableComponent,
    BookGridComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    HttpClientModule,
    MatTableModule,
    MatSnackBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
