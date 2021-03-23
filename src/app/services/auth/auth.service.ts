import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Credentials, User } from '../types';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private apollo: Apollo, private router: Router) {}
  /**
   *
   * @param user - a user object
   * @returns an observable
   */
  signUp(user: User) {
    return this.apollo.mutate({
      mutation: gql`
        mutation SignUp($user: UserInput!) {
          signup(user: $user)
        }
      `,
      variables: { user },
    });
  }

  signOut() {
    TODO: 'Delete token from local storage';
    console.log('here');

    localStorage.clear();
    localStorage.setItem('palette', 'merry');
    this.router.navigateByUrl('/signin');
  }

  signIn(credentials: Credentials) {
    return this.apollo.mutate({
      mutation: gql`
        mutation SignIn($credentials: Credentials!) {
          signin(credentials: $credentials)
        }
      `,
      variables: { credentials },
    });
  }
  getUser(email: String) {
    return this.apollo.watchQuery({
      query: gql`
        query GetUser($email: String!) {
          getUser(email: $email) {
            username
            email
            avatar
            tickets
          }
        }
      `,
      variables: { email },
    });
  }

  getAllUsers() {
    return this.apollo.watchQuery({
      query: gql`
        query GetAllUsers {
          getAllUsers {
            username
            email
            avatar
            tickets
            bids
          }
        }
      `,
    });
  }
  resetPassword(email: string) {
    return this.apollo.mutate({
      mutation: gql`
        mutation ResetPassword($email: String!) {
          resetPassword(email: $email)
        }
      `,
      variables: { email },
    });
  }
}
