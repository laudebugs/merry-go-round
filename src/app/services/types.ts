export interface User {
  username: string;
  email: string;
  password: string;
}

export class Credentials {
  constructor(private username: string, private password: string) {}
}

export class Product {
  _id: string;
  name: string;
  description: string;
  photo: string;
  owner: string;
  bid: Bid;
}
export class Bid {
  public submitted: number = 0;
  public tempValue: number;
  constructor(
    public productId: string,
    public tickets: number,
    public user: string
  ) {}
}
