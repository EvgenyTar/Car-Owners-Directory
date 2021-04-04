import { OwnerEntity } from './../../model/owner';
import { Router } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-cars-owner-detail',
  templateUrl: './cars-owner-detail.component.html',
  styleUrls: ['./cars-owner-detail.component.css'],
})
export class CarsOwnerDetailComponent implements OnInit {
  @Input() owner!: OwnerEntity;

  constructor() {}

  ngOnInit(): void {}
}
