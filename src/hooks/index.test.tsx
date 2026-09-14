import {renderHook} from '@testing-library/react';
import {Provider} from 'react-redux';
import type {ReactNode} from 'react';
import {store} from '../store';
import {CITY_NAME} from '../const';
import {useAppDispatch, useAppSelector} from './index';

type StoreProviderProps = {
  children: ReactNode;
};

function StoreProvider({children}: StoreProviderProps): JSX.Element {
  return <Provider store={store}>{children}</Provider>;
}

describe('Application hooks', () => {
  it('should return typed dispatch function', () => {
    const {result} = renderHook(() => useAppDispatch(), {
      wrapper: StoreProvider,
    });

    expect(typeof result.current).toBe('function');
  });

  it('should select data from store', () => {
    const {result} = renderHook(() => useAppSelector((state) => state.app.city), {
      wrapper: StoreProvider,
    });

    expect(result.current).toBe(CITY_NAME.Paris);
  });
});
