
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

//import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { NewComponentComponent } from './new-component/new-component.component';
import { FormsModule } from '@angular/forms';
import { ReusableSomethingComponent } from './reusable-something/reusable-something.component';
import { BookOverviewComponent } from './book-overview/book-overview.component';
import { BookDetailsComponent } from './book-details/book-details.component';
import { CrudBookComponent } from './crud-book/crud-book.component';

@NgModule({
  declarations: [
    AppComponent,
    NewComponentComponent,
    ReusableSomethingComponent,
    BookOverviewComponent,
    BookDetailsComponent,
    CrudBookComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
