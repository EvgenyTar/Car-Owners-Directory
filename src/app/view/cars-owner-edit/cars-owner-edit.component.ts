import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cars-owner-edit',
  templateUrl: './cars-owner-edit.component.html',
  styleUrls: ['./cars-owner-edit.component.css'],
})
export class CarsOwnerEditComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  saveOwner() {
    this.router.navigateByUrl('');
  }
}
