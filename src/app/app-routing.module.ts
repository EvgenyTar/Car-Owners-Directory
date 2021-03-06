import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarsOwnerDetailComponent } from './view/cars-owner-detail/cars-owner-detail.component';
import { CarsOwnerDirectoryComponent } from './view/cars-owner-directory/cars-owner-directory.component';

const routes: Routes = [
  { path: ':act', component: CarsOwnerDetailComponent },
  { path: ':act/:id', component: CarsOwnerDetailComponent },
  { path: '', component: CarsOwnerDirectoryComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
