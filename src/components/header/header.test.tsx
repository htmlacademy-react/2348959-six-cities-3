import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {render, screen} from '@testing-library/react';
import {Provider} from 'react-redux';
import {MemoryRouter} from 'react-router-dom';
import {AuthorizationStatus} from '../../const';
import {fillFavoriteOffers, requireAuthorization, setUserData} from '../../store/action';
import {appProcess} from '../../store/app-process';
import {favoritesData} from '../../store/favorites-data';
import {offerData} from '../../store/offer-data';
import {offersData} from '../../store/offers-data';
import {userProcess} from '../../store/user-process';
import {makeFakeOffer} from '../../utils/test-mocks';
import Header from './header';

const reducer = combineReducers({
  app: appProcess,
  favorites: favoritesData,
  offer: offerData,
  offers: offersData,
  user: userProcess,
});

function renderHeader(authorizationStatus: typeof AuthorizationStatus[keyof typeof AuthorizationStatus]) {
  const testStore = configureStore({reducer});

  testStore.dispatch(requireAuthorization(authorizationStatus));
  testStore.dispatch(setUserData({
    name: 'Test User',
    avatarUrl: 'img/avatar.svg',
    isPro: false,
    email: 'testuser@htmlacademy.ru',
    token: 'token',
  }));
  testStore.dispatch(fillFavoriteOffers([makeFakeOffer('1'), makeFakeOffer('2')]));

  render(
    <Provider store={testStore}>
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    </Provider>
  );
}

describe('Header', () => {
  it('should render sign in link for not authorized user', () => {
    renderHeader(AuthorizationStatus.NoAuth);

    expect(screen.getByText('Sign in')).toBeInTheDocument();
  });

  it('should render user info and favorites count for authorized user', () => {
    renderHeader(AuthorizationStatus.Auth);

    expect(screen.getByText('testuser@htmlacademy.ru')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
  });
});
