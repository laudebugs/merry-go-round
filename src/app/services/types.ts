export interface User {
  username: string;
  email: string;
  avatar: number;
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
    public number_bids: number = 0,
    public ave_bid: number = 0,
    public total_tickets: number = 0
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
