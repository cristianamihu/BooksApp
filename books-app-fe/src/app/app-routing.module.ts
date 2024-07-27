import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//import { NewComponentComponent } from './new-component/new-component.component';
import { ReusableSomethingComponent } from './reusable-something/reusable-something.component';
import { BookOverviewComponent } from './book-overview/book-overview.component';
import { BookDetailsComponent } from './book-details/book-details.component';
import { CrudBookComponent } from './crud-book/crud-book.component';

const routes: Routes = [
  /*{
    path: '',
    component: NewComponentComponent,
  },*/
  { path: '',
    redirectTo: '/overview', 
    pathMatch: 'full' 
  },
  {
    path: 'overview',
    component: BookOverviewComponent,
  },
  {
    path: 'book/:id',
    component: BookDetailsComponent,
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
