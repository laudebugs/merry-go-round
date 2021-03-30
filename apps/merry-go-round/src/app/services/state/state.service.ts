import { Apollo, gql } from 'apollo-angular';
import { Injectable } from '@angular/core';

export const STATE_QUERY = gql`
  query GetState {
    getState {
      active
      startTime
      endTime
    }
  }
`;

export const STOP_BIDDING = gql`
  mutation StopBidding {
    stopBidding {
      active
      startTime
      endTime
    }
  }
`;

export const START_BIDDING = gql`
  mutation startBidding {
    startBidding {
      active
      startTime
      endTime
    }
  }
`;

@Injectable({
  providedIn: 'root',
})
export class StateService {
  constructor(private apollo: Apollo) {}

  getState() {
    return this.apollo.watchQuery({
      query: STATE_QUERY,
    });
  }

  stopBidding() {
    return this.apollo.mutate({ mutation: STOP_BIDDING });
  }

  startBidding() {
    return this.apollo.mutate({ mutation: START_BIDDING });
  }
}
