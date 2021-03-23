import { WebSocketLink } from '@apollo/client/link/ws';
import { NgModule } from '@angular/core';
import {
  ApolloClientOptions,
  ApolloLink,
  InMemoryCache,
  split,
} from '@apollo/client/core';
import { setContext } from '@apollo/client/link/context';
import { APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { environment } from '../../../environments/environment';
import { getMainDefinition } from '@apollo/client/utilities';

const uri = `${environment.endpoint}/graphql`; // <-- add the URL of the GraphQL server here
const subsUri = `${environment.ws}/subs`;

export function createApollo(httpLink: HttpLink): ApolloClientOptions<any> {
  const token = localStorage.getItem('token');

  const ws = new WebSocketLink({
    uri: subsUri,
    options: {
      reconnect: true,
      connectionParams: {
        authorization: token ? `${token}` : '',
      },
    },
  });

  const basic = setContext((operation, context) => ({
    headers: {
      Accept: 'charset=utf-8',
    },
  }));

  const auth = setContext((operation, context) => {
    if (token === null) {
      return {};
    } else {
      return {
        headers: {
          Authorization: `${token}`,
        },
      };
    }
  });
  const http = ApolloLink.from([basic, auth, httpLink.create({ uri })]);

  const newLink = split(
    ({ query }) => {
      const def = getMainDefinition(query);
      return (
        def.kind === 'OperationDefinition' && def.operation === 'subscription'
      );
    },
    ws,
    http
  );

  const cache = new InMemoryCache();

  return {
    link: newLink,
    headers: {
      authorization: token ? `${token}` : '',
    },
    cache,
    defaultOptions: {
      watchQuery: {
        fetchPolicy: 'network-only',
        errorPolicy: 'all',
      },
    },
  };
}

// const httpLink = new HttpLink({uri: uri})
@NgModule({
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink],
    },
  ],
})
export class GraphQLModule {}
