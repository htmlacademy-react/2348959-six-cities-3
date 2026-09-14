import type {AuthorizationStatusType} from '../types/authorization-status';
import {requireAuthorization, setUserData} from './action';
import type {UserData} from '../types/user-data';
import {createReducer} from '@reduxjs/toolkit';
import {AUTHORIZATION_STATUS} from '../const';

type UserProcess = {
  authorizationStatus: AuthorizationStatusType;
  userData: UserData | null;
};

const initialState: UserProcess = {
  authorizationStatus: AUTHORIZATION_STATUS.Unknown,
  userData: null,
};

const userProcess = createReducer(initialState, (builder) => {
  builder
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(setUserData, (state, action) => {
      state.userData = action.payload;
    });
});

export {userProcess};
