import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {render, screen} from '@testing-library/react';
import {Provider} from 'react-redux';
import {MemoryRouter} from 'react-router-dom';
import {fillFavoriteOffers, requireAuthorization} from '../../store/action';
import {appProcess} from '../../store/app-process';
import {favoritesData} from '../../store/favorites-data';
import {offerData} from '../../store/offer-data';
import {offersData} from '../../store/offers-data';
import {userProcess} from '../../store/user-process';
import {AuthorizationStatus} from '../../const';
import {makeFakeOffer} from '../../utils/test-mocks';
import FavoritesPage from './favorites-page';

const reducer = combineReducers({
  app: appProcess,
  favorites: favoritesData,
  offer: offerData,
  offers: offersData,
  user: userProcess,
});

function renderFavoritesPage(favoriteOffersCount: number) {
  const testStore = configureStore({reducer});

  const favoriteOffers = Array.from({length: favoriteOffersCount}, (_, index) => ({
    ...makeFakeOffer(String(index + 1)),
    isFavorite: true,
  }));

  testStore.dispatch(requireAuthorization(AuthorizationStatus.Auth));
  testStore.dispatch(fillFavoriteOffers(favoriteOffers));

  render(
    <Provider store={testStore}>
      <MemoryRouter>
        <FavoritesPage />
      </MemoryRouter>
    </Provider>
  );
}

describe('FavoritesPage', () => {
  it('should render favorite offers', () => {
    renderFavoritesPage(2);

    expect(screen.getByRole('heading', {name: 'Saved listing'})).toBeInTheDocument();
    expect(screen.getByText('Test offer 1')).toBeInTheDocument();
    expect(screen.getByText('Test offer 2')).toBeInTheDocument();
  });

  it('should render empty favorites message', () => {
    renderFavoritesPage(0);

    expect(screen.getByText('Nothing yet saved.')).toBeInTheDocument();
    expect(screen.getByText('Save properties to narrow down search or plan your future trips.')).toBeInTheDocument();
  });
});
