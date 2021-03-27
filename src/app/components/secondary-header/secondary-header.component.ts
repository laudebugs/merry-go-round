import { StateService } from './../../services/state/state.service';
import { Apollo } from 'apollo-angular';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BidService } from 'src/app/services/bid/bid.service';
import { Message, State } from '../../services/types';
import { STATE_QUERY } from 'src/app/services/state/state.service';

@Component({
  selector: 'secondary-header',
  templateUrl: './secondary-header.component.html',
  styleUrls: ['./secondary-header.component.scss'],
})
export class SecondaryHeaderComponent implements OnInit {
  @Input()
  tickets: number = 5;

  @Output()
  state: State;

  @Output()
  biddingStateChange = new EventEmitter<State>();

  @Input()
  roles!: string[];
  constructor(
    private stateService: StateService,
    private bidService: BidService,
    private apollo: Apollo
  ) {}

  @Input()
  messages: Message[] = [];
  ngOnInit(): void {
    this.apollo
      .watchQuery<any>({
        query: STATE_QUERY,
        pollInterval: 1000,
      })
      .valueChanges.subscribe(({ data, loading }): any => {
        console.log(data);
        // if (!data.getState) {
        this.state = data.getState;
        this.biddingStateChange.emit(this.state);
        // }
      });
  }
  getBiddingState() {
    if (!this.state) {
      return false;
    } else {
      return this.state.active;
    }
  }

  startBiddingProcess() {
    console.log('start bidding');
    this.stateService.startBidding().subscribe((data) => {
      console.log(data);
    });
  }

  endBiddingProcess() {
    console.log('start bidding');
    this.stateService.stopBidding().subscribe((data) => {
      console.log(data);
    });
  }
  getUnreadCount() {
    if (!!this.messages) {
      return this.messages.filter((msg) => !msg.seen).length;
    } else return 0;
  }
  seeMessage(msg) {
    msg.seen = true;
  }

  getMessages() {
    if (!!this.messages) {
      return this.messages.length;
    } else return 0;
  }
}
