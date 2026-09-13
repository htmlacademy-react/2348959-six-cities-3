import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {Provider} from 'react-redux';
import {MemoryRouter, Route, Routes} from 'react-router-dom';
import {AppRoute, AuthorizationStatus, CityName, SortType} from '../../const';
import {fillOffers, requireAuthorization} from '../../store/action';
import {appProcess} from '../../store/app-process';
import {favoritesData} from '../../store/favorites-data';
import {offerData} from '../../store/offer-data';
import {offersData} from '../../store/offers-data';
import {userProcess} from '../../store/user-process';
import {makeFakeOffer} from '../../utils/test-mocks';
import MainPage from './main-page';

vi.mock('../../components/map/map', () => ({
  default: () => <section>Map mock</section>,
}));

const reducer = combineReducers({
  app: appProcess,
  favorites: favoritesData,
  offer: offerData,
  offers: offersData,
  user: userProcess,
});

function createTestStore() {
  return configureStore({reducer});
}

describe('MainPage', () => {
  it('should render offers for selected city', () => {
    const testStore = createTestStore();

    testStore.dispatch(requireAuthorization(AuthorizationStatus.Auth));
    testStore.dispatch(fillOffers([
      makeFakeOffer('1'),
      makeFakeOffer('2'),
    ]));

    render(
      <Provider store={testStore}>
        <MemoryRouter>
          <MainPage />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('2 places to stay in Paris')).toBeInTheDocument();
    expect(screen.getByText('Test offer 1')).toBeInTheDocument();
    expect(screen.getByText('Test offer 2')).toBeInTheDocument();
    expect(screen.getByText('Map mock')).toBeInTheDocument();
  });

  it('should render empty page when selected city has no offers', () => {
    const testStore = createTestStore();

    testStore.dispatch(requireAuthorization(AuthorizationStatus.Auth));
    testStore.dispatch(fillOffers([]));

    render(
      <Provider store={testStore}>
        <MemoryRouter>
          <MainPage />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('No places to stay available')).toBeInTheDocument();
    expect(screen.getByText(`We could not find any property available at the moment in ${CityName.Paris}`)).toBeInTheDocument();
  });

  it('should change sorting type after sort option click', async () => {
    const testStore = createTestStore();

    testStore.dispatch(requireAuthorization(AuthorizationStatus.Auth));
    testStore.dispatch(fillOffers([
      {...makeFakeOffer('1'), price: 300},
      {...makeFakeOffer('2'), price: 100},
    ]));

    render(
      <Provider store={testStore}>
        <MemoryRouter>
          <MainPage />
        </MemoryRouter>
      </Provider>
    );

    await userEvent.click(screen.getByText(SortType.Popular, {selector: '.places__sorting-type'}));
    await userEvent.click(screen.getByText(SortType.PriceLowToHigh));

    expect(screen.getByText(SortType.PriceLowToHigh, {selector: '.places__sorting-type'})).toBeInTheDocument();
  });

  it('should redirect guest to login after favorite button click', async () => {
    const testStore = createTestStore();

    testStore.dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    testStore.dispatch(fillOffers([makeFakeOffer('1')]));

    render(
      <Provider store={testStore}>
        <MemoryRouter initialEntries={[AppRoute.Main]}>
          <Routes>
            <Route path={AppRoute.Main} element={<MainPage />} />
            <Route path={AppRoute.Login} element={<span>Login page</span>} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    await userEvent.click(screen.getByRole('button', {name: 'To bookmarks'}));

    expect(screen.getByText('Login page')).toBeInTheDocument();
  });
});
