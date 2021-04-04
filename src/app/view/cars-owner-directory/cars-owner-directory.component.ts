import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cars-owner-directory',
  templateUrl: './cars-owner-directory.component.html',
  styleUrls: ['./cars-owner-directory.component.css'],
})
export class CarsOwnerDirectoryComponent implements OnInit {
  title = 'Владельцы автомобилей';
  constructor() {}

  ngOnInit(): void {}
}
