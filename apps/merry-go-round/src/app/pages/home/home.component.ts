import { Apollo } from 'apollo-angular';
import { Component, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Bid, Product, State } from '@merry-go-round/types';
import { AuthService } from '../../services/auth/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Message } from '@merry-go-round/types';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  tickets!: number;
  bids!: Bid[];
  allBids!: Bid[];
  products!: Product[];
  @Output()
  roles: string[] = [];
  selected: string = 'users';
  messages!: Message[];

  @Input()
  biddingState: State;

  constructor(private router: Router, private auth: AuthService) {
    const token = localStorage.getItem('token');

    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(token);
    this.roles = decodedToken.roles;
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
