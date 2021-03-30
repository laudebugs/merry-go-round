export class User {
  public addTickets?: number;

  constructor(
    public username: string,
    public email: string,
    public avatar: number,
    public tickets?: number,
    public totalTickets?: number,
    public bids?: [string],
    public award?: number,
    public roles?: [string],
    public likedProducts?: []
  ) {
    this.addTickets = 0;
  }
}

export class Credentials {
  constructor(public email: string, private password: string) {}
}

export class Product {
  public liked = false;
  constructor(
    public _id: string,
    public name: string,
    public description: string,
    public photo: string,
    public owner: string,
    public bid: Bid,
    public likes: number,
    public number_bids: number = 0,
    public ave_bid: number = 0,
    public total_tickets: number = 0,
    public awardee: string = ''
  ) {}
}
export class Bid {
  public submitted: number = 0;
  public tempValue: number;
  constructor(
    public productId: string,
    public tickets: number,
    public user: string,
    public _id: string = '-1',
    public prev_value: number = 0
  ) {}
}

export class Message {
  constructor(
    public content: string,
    public seen: boolean,
    public icon: string
  ) {}
}

export class State {
  constructor(public active: boolean, public startTime: Date) {}
}
