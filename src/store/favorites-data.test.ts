import {CITY_NAME} from '../const';
import type {Offer} from '../types/offer';
import {fillFavoriteOffers, updateOffer} from './action';
import {favoritesData} from './favorites-data';

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
  isFavorite: true,
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

describe('FavoritesData reducer', () => {
  it('should fill favorite offers', () => {
    const state = favoritesData(undefined, fillFavoriteOffers([offer]));

    expect(state.favoriteOffers).toEqual([offer]);
  });

  it('should remove offer from favorites', () => {
    const updatedOffer = {...offer, isFavorite: false};

    const state = favoritesData({favoriteOffers: [offer]}, updateOffer(updatedOffer));

    expect(state.favoriteOffers).toEqual([]);
  });
});
