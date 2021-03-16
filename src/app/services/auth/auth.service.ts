import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Credentials, User } from '../types';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private apollo: Apollo) {}
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
  }

  signIn(credentials: Credentials) {
    console.log(credentials);
    return this.apollo.mutate({
      mutation: gql`
        mutation SignIn($credentials: Credentials!) {
          signin(credentials: $credentials)
        }
      `,
      variables: { credentials },
    });
  }
}
