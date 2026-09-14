import {createReducer} from '@reduxjs/toolkit';
import {CITY_NAME} from '../const';
import {changeCity} from './action';
import type {CityNameType} from '../const';

type AppProcess = {
  city: CityNameType;
};

const initialState: AppProcess = {
  city: CITY_NAME.Paris,
};

const appProcess = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.city = action.payload;
    });
});

export {appProcess};
