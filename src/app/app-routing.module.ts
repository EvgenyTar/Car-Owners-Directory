import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarsOwnerAddComponent } from './view/cars-owner-add/cars-owner-add.component';
import { CarsOwnerDetailComponent } from './view/cars-owner-detail/cars-owner-detail.component';
import { CarsOwnerDirectoryComponent } from './view/cars-owner-directory/cars-owner-directory.component';
import { CarsOwnerEditComponent } from './view/cars-owner-edit/cars-owner-edit.component';
import { CarsOwnerViewComponent } from './view/cars-owner-view/cars-owner-view.component';

const routes: Routes = [
  { path: 'add', component: CarsOwnerAddComponent },
  { path: 'edit/:id', component: CarsOwnerEditComponent },
  { path: 'view/:id', component: CarsOwnerViewComponent },
  { path: '', component: CarsOwnerDirectoryComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
