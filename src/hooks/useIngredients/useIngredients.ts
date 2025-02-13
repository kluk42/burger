import { useQuery } from '@tanstack/react-query';

import axios from '../../infrastructure/network/axios-ingredients';
import { IngredientsToBuildOf } from './types';

const queryKey = ['ingredients'];

export const useIngredients = (enabled?: boolean) => {
  const { data, isFetching, isError } = useQuery({
    queryKey,
    queryFn: async () => (await axios.get<IngredientsToBuildOf>('/ingredients.json')).data,
    enabled,
  });

  return { data, isFetching, isError };
};
