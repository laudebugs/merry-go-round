import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Bid, Product } from 'src/app/services/types';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  tickets!: number;
  bids!: Bid[];
  products!: Product[];
  constructor(private router: Router) {}

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (!token) {
      this.router.navigateByUrl('');
    }
  }

  update(event) {
    console.log(event);
  }
}
