import { useMutation } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';

import axios from '../../infrastructure/network/axios-orders';

import { Order } from './types';

export const usePurchaseBurger = ({
  onSuccess,
}: {
  onSuccess?: (
    data: AxiosResponse<{
      name: string;
    }>
  ) => void;
}) => {
  const { mutate, isPending } = useMutation({
    mutationFn: async ({ order, token }: { order: Order; token: string }) =>
      axios.post<{ name: string }>('/orders.json?auth=' + token, order),
    onSuccess,
  });

  return { mutate, isPending };
};
