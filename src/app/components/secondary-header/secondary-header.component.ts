import { Component, Input, OnInit } from '@angular/core';
import { Message } from '../../services/types';

@Component({
  selector: 'secondary-header',
  templateUrl: './secondary-header.component.html',
  styleUrls: ['./secondary-header.component.scss'],
})
export class SecondaryHeaderComponent implements OnInit {
  @Input()
  tickets: number = 5;

  @Input()
  roles!: string[];
  constructor() {}

  @Input()
  messages: Message[] = [];
  ngOnInit(): void {}

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
