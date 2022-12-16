import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { BAppDispatch, BAppRootState } from '../infrastructure/store/store';

export const useBAppSelector: TypedUseSelectorHook<BAppRootState> = useSelector;
export const useBAppDispatch = () => useDispatch<BAppDispatch>();
