import { Apollo } from 'apollo-angular';
import { Component, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Bid, Product } from 'src/app/services/types';
import { AuthService } from 'src/app/services/auth/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  tickets!: number;
  bids!: Bid[];
  products!: Product[];
  @Output()
  roles: string[] = [];
  selected: string = 'users';

  constructor(private router: Router, private auth: AuthService) {
    const token = localStorage.getItem('token');

    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(token);
    console.log(decodedToken);
    this.roles = decodedToken.roles;
    console.log(token);
  }

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (!token) {
      this.router.navigateByUrl('');
    }
  }

  update(event) {
    console.log(event);
  }

  signOut() {
    this.auth.signOut();
  }
}
