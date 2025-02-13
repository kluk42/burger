import { useQuery } from '@tanstack/react-query';

import axios from '../../infrastructure/network/axios-orders';
import { OrderFromServer } from './types';

export const useOrders = ({ token, userId }: { token: string; userId: string }) => {
  const queryKey = ['orders', token, userId];

  const { data, isFetching } = useQuery({
    queryKey,
    queryFn: async () => {
      const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo"' + userId + '"';
      const response = await axios.get('/orders.json' + queryParams);
      // eslint-disable-next-line
      return Object.entries(response.data).map(ent => {
        return {
          ...(ent[1] as OrderFromServer),
          id: ent[0],
        };
      });
    },
  });

  return { data, isFetching, queryKey };
};
