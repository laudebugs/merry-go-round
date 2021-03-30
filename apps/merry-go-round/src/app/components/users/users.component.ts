import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Apollo, gql, QueryRef, Subscription } from 'apollo-angular';
import { AuthService } from '../../services/auth/auth.service';
import { Bid, User } from '../../services/types';

const getAllUsers = gql`
  query GetAllUsers {
    getAllUsers {
      username
      email
      avatar
      tickets
      totalTickets
    }
  }
`;

const USERS_SUBSCRIPTION = gql`
  subscription newUser {
    newUser {
      username
      email
      avatar
      tickets
      totalTickets
    }
  }
`;

const ADD_TICKETS_MUTATION = gql`
  mutation AddTickets($username: String!, $tickets: Float!) {
    addTickets(username: $username, tickets: $tickets) {
      username
      email
      avatar
      tickets
      totalTickets
    }
  }
`;
@Component({
  selector: 'users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  getAllUsersQuery: QueryRef<any>;
  users: User[] = [];

  @Input()
  allUsersBids: Bid[] = [];

  displayedColumns: string[] = [
    'position',
    'username',
    'totalTickets',
    'ticketsLeft',
    'bids',
    'addTicks',
  ];
  constructor(private auth: AuthService, private apollo: Apollo) {
    this.getAllUsersQuery = apollo.watchQuery({
      query: getAllUsers,
    });
  }

  ngOnInit(): void {
    // this.subscribeToNewUsers();
    this.apollo
      .watchQuery({
        query: getAllUsers,
        pollInterval: 500,
      })
      .valueChanges.subscribe(({ data, loading }: any) => {
        if (!!data) {
          let users = data.getAllUsers;
          this.users = users.map((user) => {
            return new User(
              user.username,
              user.email,
              user.avatar,
              user.tickets,
              user.totalTickets
            );
          });
        }
      });
  }

  getUserBids(username: string) {
    if (!!this.allUsersBids) {
      return this.allUsersBids.filter((bid) => bid.user == username).length;
    }
    return 0;
  }

  getUserTickets(user: User) {
    if (!this.allUsersBids) return 0;
    let userBids = this.allUsersBids.filter((bid) => bid.user == user.username);
    let tckts = 0;
    userBids.map((bid) => {
      tckts += bid.tickets;
    });
    return user.totalTickets - tckts;
  }

  addTickets(user: User, option) {
    if (!option) {
      if (user.addTickets !== 0) user.addTickets -= 1;
    } else {
      user.addTickets += 1;
    }
  }
  sendTickets(user: User) {
    this.apollo
      .mutate({
        mutation: ADD_TICKETS_MUTATION,
        variables: { username: user.username, tickets: user.addTickets },
      })
      .subscribe((data) => {
        if (!!data) user.addTickets = 0;
      });
  }
  subscribeToNewUsers() {
    this.getAllUsersQuery.subscribeToMore({
      document: USERS_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) {
          return prev;
        }
        const newUser = subscriptionData.data.newUser;
        this.users.push(newUser);
        return prev;
      },
    });
  }
}
