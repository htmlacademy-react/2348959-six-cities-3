import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {render, screen} from '@testing-library/react';
import {Provider} from 'react-redux';
import {MemoryRouter, Route, Routes} from 'react-router-dom';
import {APP_ROUTE, AUTHORIZATION_STATUS} from '../../const';
import {
  fillNearbyOffers,
  fillReviews,
  requireAuthorization,
  setCurrentOffer,
  setOfferLoadingStatus
} from '../../store/action';
import {appProcess} from '../../store/app-process';
import {favoritesData} from '../../store/favorites-data';
import {offerData} from '../../store/offer-data';
import {offersData} from '../../store/offers-data';
import {userProcess} from '../../store/user-process';
import {makeFakeOffer, makeFakeReview} from '../../utils/test-mocks';
import OfferPage from './offer-page';

vi.mock('../../components/map/map', () => ({
  default: () => <section>Map mock</section>,
}));

vi.mock('../../store/api-actions', async () => {
  const actual = await vi.importActual<typeof import('../../store/api-actions')>('../../store/api-actions');

  return {
    ...actual,
    fetchOfferAction: vi.fn(() => vi.fn()),
    fetchNearbyOffersAction: vi.fn(() => vi.fn()),
    fetchReviewsAction: vi.fn(() => vi.fn()),
  };
});

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

function renderOfferPage(testStore: ReturnType<typeof createTestStore>) {
  render(
    <Provider store={testStore}>
      <MemoryRouter initialEntries={['/offer/1']}>
        <Routes>
          <Route path={APP_ROUTE.Offer} element={<OfferPage />} />
        </Routes>
      </MemoryRouter>
    </Provider>
  );
}

describe('OfferPage', () => {
  it('should render spinner while offer is loading', () => {
    const testStore = createTestStore();

    testStore.dispatch(setOfferLoadingStatus(true));

    renderOfferPage(testStore);

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('should render not found page when current offer is empty', () => {
    const testStore = createTestStore();

    testStore.dispatch(setOfferLoadingStatus(false));
    testStore.dispatch(setCurrentOffer(null));

    renderOfferPage(testStore);

    expect(screen.getByText('404 Not Found')).toBeInTheDocument();
  });

  it('should render offer details, reviews and nearby offers', () => {
    const testStore = createTestStore();

    testStore.dispatch(requireAuthorization(AUTHORIZATION_STATUS.Auth));
    testStore.dispatch(setCurrentOffer(makeFakeOffer('1')));
    testStore.dispatch(fillNearbyOffers([makeFakeOffer('2')]));
    testStore.dispatch(fillReviews([makeFakeReview('1')]));

    renderOfferPage(testStore);

    expect(screen.getByRole('heading', {name: 'Test offer 1'})).toBeInTheDocument();
    expect(screen.getByText('Test description')).toBeInTheDocument();
    expect(screen.getByText('Test review comment')).toBeInTheDocument();
    expect(screen.getByText('Other places in the neighbourhood')).toBeInTheDocument();
    expect(screen.getByText('Test offer 2')).toBeInTheDocument();
    expect(screen.getByText('Map mock')).toBeInTheDocument();
  });

  it('should render review form for authorized user', () => {
    const testStore = createTestStore();

    testStore.dispatch(requireAuthorization(AUTHORIZATION_STATUS.Auth));
    testStore.dispatch(setCurrentOffer(makeFakeOffer('1')));

    renderOfferPage(testStore);

    expect(screen.getByRole('button', {name: 'Submit'})).toBeInTheDocument();
  });

  it('should not render review form for guest', () => {
    const testStore = createTestStore();

    testStore.dispatch(requireAuthorization(AUTHORIZATION_STATUS.NoAuth));
    testStore.dispatch(setCurrentOffer(makeFakeOffer('1')));

    renderOfferPage(testStore);

    expect(screen.queryByRole('button', {name: 'Submit'})).not.toBeInTheDocument();
  });
});
