export enum DeliveryMethods {
  Fastest = 'fastest',
  Cheapest = 'cheapest',
  OnMyOwn = 'on my own',
}

export type Order = {
  ingredients: {
    Bacon: number;
    Cheese: number;
    Meat: number;
    Salad: number;
    Seeds1: number;
    Seeds2: number;
  };
  price: number;
  customer: {
    name: string;
    address: {
      street: string;
      zipCode: number;
      country: string;
    };
    email: string;
    id: string;
  };
  deliveryMethod: DeliveryMethods;
};
