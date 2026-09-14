import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {appProcess} from './app-process';
import {offerData} from './offer-data';
import {offersData} from './offers-data';
import {favoritesData} from './favorites-data';
import {userProcess} from './user-process';
import {SERVER_CONFIG} from '../const';
import {createApi} from '../services/api';

const api = createApi(SERVER_CONFIG.Url, SERVER_CONFIG.Timeout);

const reducer = combineReducers({
  app: appProcess,
  favorites: favoritesData,
  offer: offerData,
  offers: offersData,
  user: userProcess,
});

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }),
});

type State = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

export {store};
export type {AppDispatch, State};
