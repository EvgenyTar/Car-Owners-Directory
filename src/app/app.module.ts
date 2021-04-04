import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CarsOwnerDirectoryComponent } from './view/cars-owner-directory/cars-owner-directory.component';
import { CarsOwnerDetailComponent } from './view/cars-owner-detail/cars-owner-detail.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [AppComponent, CarsOwnerDirectoryComponent, CarsOwnerDetailComponent],
  imports: [BrowserModule, AppRoutingModule, BrowserAnimationsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
