import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {StatusCodes} from 'http-status-codes';
import MockAdapter from 'axios-mock-adapter';
import {Provider} from 'react-redux';
import {MemoryRouter, Route, Routes} from 'react-router-dom';
import {createApi} from '../../services/api';
import {AppRoute, AuthorizationStatus} from '../../const';
import {requireAuthorization} from '../../store/action';
import {appProcess} from '../../store/app-process';
import {favoritesData} from '../../store/favorites-data';
import {offerData} from '../../store/offer-data';
import {offersData} from '../../store/offers-data';
import {userProcess} from '../../store/user-process';
import LoginPage from './login-page';

const reducer = combineReducers({
  app: appProcess,
  favorites: favoritesData,
  offer: offerData,
  offers: offersData,
  user: userProcess,
});

function createTestStore() {
  const api = createApi('', 5000);

  return configureStore({
    reducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        thunk: {
          extraArgument: api,
        },
      }),
  });
}

describe('LoginPage', () => {
  it('should render login form for not authorized user', () => {
    const testStore = createTestStore();

    testStore.dispatch(requireAuthorization(AuthorizationStatus.NoAuth));

    render(
      <Provider store={testStore}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByRole('heading', {name: 'Sign in'})).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
  });

  it('should redirect authorized user to main page', () => {
    const testStore = createTestStore();

    testStore.dispatch(requireAuthorization(AuthorizationStatus.Auth));

    render(
      <Provider store={testStore}>
        <MemoryRouter initialEntries={[AppRoute.Login]}>
          <Routes>
            <Route path={AppRoute.Login} element={<LoginPage />} />
            <Route path={AppRoute.Main} element={<span>Main page</span>} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('Main page')).toBeInTheDocument();
  });

  it('should redirect to main page after successful submit', async () => {
    const api = createApi('', 5000);
    const mockApi = new MockAdapter(api);

    const storeWithMockApi = configureStore({
      reducer,
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          thunk: {
            extraArgument: api,
          },
        }),
    });

    mockApi.onPost('/login').reply(StatusCodes.OK, {
      name: 'John',
      avatarUrl: 'img/avatar.jpg',
      isPro: false,
      email: 'john@test.com',
      token: 'secret-token',
    });
    mockApi.onGet('/favorite').reply(StatusCodes.OK, []);

    storeWithMockApi.dispatch(requireAuthorization(AuthorizationStatus.NoAuth));

    render(
      <Provider store={storeWithMockApi}>
        <MemoryRouter initialEntries={[AppRoute.Login]}>
          <Routes>
            <Route path={AppRoute.Login} element={<LoginPage />} />
            <Route path={AppRoute.Main} element={<span>Main page</span>} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    await userEvent.type(screen.getByPlaceholderText('Email'), 'john@test.com');
    await userEvent.type(screen.getByPlaceholderText('Password'), 'password');
    await userEvent.click(screen.getByRole('button', {name: 'Sign in'}));

    expect(await screen.findByText('Main page')).toBeInTheDocument();
  });
});
