import { Order } from '../usePurchaseBurger/types';

export type OrderFromServer = Order & { id: string };
