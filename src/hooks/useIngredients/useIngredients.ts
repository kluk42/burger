import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { IngredientsToBuildOf } from './types';

const queryKey = ['ingredients'];

export const useIngredients = (enabled?: boolean) => {
  const { data, isFetching, isError } = useQuery({
    queryKey,
    queryFn: async () =>
      (
        await axios.get<IngredientsToBuildOf>(
          'https://burger-feca9-default-rtdb.firebaseio.com/ingredients.json'
        )
      ).data,
    enabled,
  });

  return { data, isFetching, isError };
};
