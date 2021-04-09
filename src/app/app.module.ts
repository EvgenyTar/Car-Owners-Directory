import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CarsOwnerDirectoryComponent } from './view/cars-owner-directory/cars-owner-directory.component';
import { CarsOwnerDetailComponent } from './view/cars-owner-detail/cars-owner-detail.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CarsOwnerAddComponent } from './view/cars-owner-add/cars-owner-add.component';
import { CarsOwnerEditComponent } from './view/cars-owner-edit/cars-owner-edit.component';
import { CarsOwnerViewComponent } from './view/cars-owner-view/cars-owner-view.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryOwnersDataService } from 'src/app/service/in-memory-owners-data.service';

@NgModule({
  declarations: [
    AppComponent,
    CarsOwnerDirectoryComponent,
    CarsOwnerDetailComponent,
    CarsOwnerAddComponent,
    CarsOwnerEditComponent,
    CarsOwnerViewComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(InMemoryOwnersDataService, {
      dataEncapsulation: false,
    }),
  ],

  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
