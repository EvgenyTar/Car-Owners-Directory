import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CarsOwnerDirectoryComponent } from './view/cars-owner-directory/cars-owner-directory.component';
import { CarsOwnerDetailComponent } from './view/cars-owner-detail/cars-owner-detail.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryOwnersDataService } from 'src/app/service/in-memory-owners-data.service';

@NgModule({
  declarations: [
    AppComponent,
    CarsOwnerDirectoryComponent,
    CarsOwnerDetailComponent,
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
