import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import {StatusCodes} from 'http-status-codes';
import {AUTHORIZATION_STATUS, CITY_NAME} from '../const';
import type {ServerOffer} from '../types/offer';
import {fillOffers, requireAuthorization, setOffersLoadingStatus} from './action';
import {checkAuthAction, fetchOffersAction} from './api-actions';
import type {AppDispatch, State} from './index';

const serverOffer: ServerOffer = {
  id: '1',
  title: 'Beautiful room',
  type: 'room',
  price: 100,
  city: {
    name: CITY_NAME.Paris,
    location: {latitude: 48.85661, longitude: 2.351499, zoom: 13},
  },
  location: {latitude: 48.85661, longitude: 2.351499, zoom: 13},
  isFavorite: false,
  isPremium: false,
  rating: 4,
  previewImage: 'img/test.jpg',
  images: [],
  bedrooms: 1,
  maxAdults: 2,
  goods: [],
  host: {name: 'John', avatarUrl: 'img/avatar.jpg', isPro: false},
  description: 'Test description',
};

describe('Async actions', () => {
  const api = axios.create();
  const mockApi = new MockAdapter(api);
  const getState = vi.fn() as unknown as () => State;

  beforeEach(() => {
    mockApi.reset();
  });

  it('should dispatch fillOffers when server returns offers', async () => {
    const dispatch = vi.fn() as unknown as AppDispatch;
    mockApi.onGet('/offers').reply(StatusCodes.OK, [serverOffer]);

    await fetchOffersAction()(dispatch, getState, api);

    expect(dispatch).toHaveBeenCalledWith(setOffersLoadingStatus(true));
    expect(dispatch).toHaveBeenCalledWith(fillOffers([serverOffer]));
    expect(dispatch).toHaveBeenCalledWith(setOffersLoadingStatus(false));
  });

  it('should dispatch Auth when authorization check succeeds', async () => {
    const dispatch = vi.fn() as unknown as AppDispatch;
    mockApi.onGet('/login').reply(StatusCodes.OK);

    await checkAuthAction()(dispatch, getState, api);

    expect(dispatch).toHaveBeenCalledWith(requireAuthorization(AUTHORIZATION_STATUS.Auth));
  });

  it('should dispatch NoAuth when authorization check fails', async () => {
    const dispatch = vi.fn() as unknown as AppDispatch;
    mockApi.onGet('/login').reply(StatusCodes.UNAUTHORIZED);

    await checkAuthAction()(dispatch, getState, api);

    expect(dispatch).toHaveBeenCalledWith(requireAuthorization(AUTHORIZATION_STATUS.NoAuth));
  });
});
