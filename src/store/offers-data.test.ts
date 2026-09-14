import {CITY_NAME} from '../const';
import type {Offer} from '../types/offer';
import {fillOffers, setOffersLoadingStatus, updateOffer} from './action';
import {offersData} from './offers-data';

const offer: Offer = {
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
  host: {
    name: 'John',
    avatarUrl: 'img/avatar.jpg',
    isPro: false,
  },
  description: 'Test description',
};

describe('OffersData reducer', () => {
  it('should fill offers', () => {
    const state = offersData(undefined, fillOffers([offer]));

    expect(state.offers).toEqual([offer]);
  });

  it('should set loading status', () => {
    const state = offersData(undefined, setOffersLoadingStatus(true));

    expect(state.isOffersLoading).toBe(true);
  });

  it('should update offer', () => {
    const updatedOffer = {...offer, isFavorite: true};

    const state = offersData(
      {offers: [offer], isOffersLoading: false},
      updateOffer(updatedOffer)
    );

    expect(state.offers[0].isFavorite).toBe(true);
  });
});
