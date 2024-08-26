import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewComponentComponent } from './new-component/new-component.component';
import { ReusableSomethingComponent } from './reusable-something/reusable-something.component';
//import { BookOverviewComponent } from './book-overview/book-overview.component';
import { BookDetailsComponent } from './book-details/book-details.component';
import { CrudBookComponent } from './crud-book/crud-book.component';
import { BookGridComponent } from './book-grid/book-grid.component';
import { BookTableComponent } from './book-table/book-table.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: 'book-crud',
    component: NewComponentComponent,
  },
  { path: '',
    redirectTo: '/home', 
    pathMatch: 'full' 
  },
  { path: 'home',
    component: HomeComponent,
  },
  /*{
    path: 'overview',
    component: BookOverviewComponent,
  },*/
  {
    path: 'book-details/:id',
    component: BookDetailsComponent,
  },
  { 
    path: 'grid-view', 
    component: BookGridComponent 
  },
  { 
    path: 'table-view', 
    component: BookTableComponent 
  },
  {
    path: 'add-book',
    component: CrudBookComponent,
  },
  {
    path: 'edit-book/:id',
    component: CrudBookComponent,
  },
  {
    path: 'delete',
    component: ReusableSomethingComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
