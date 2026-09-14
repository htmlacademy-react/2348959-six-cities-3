import {CITY_NAME} from '../const';
import type {Offer} from '../types/offer';
import type {Review} from '../types/review';
import {
  fillNearbyOffers,
  fillReviews,
  setCurrentOffer,
  setOfferLoadingStatus,
  updateOffer,
} from './action';
import {offerData} from './offer-data';

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
  host: {name: 'John', avatarUrl: 'img/avatar.jpg', isPro: false},
  description: 'Test description',
};

const review: Review = {
  id: '1',
  date: '2025-01-01T00:00:00.000Z',
  user: {
    name: 'User',
    avatarUrl: 'img/avatar.jpg',
    isPro: false,
  },
  comment: 'Good place',
  rating: 4,
};

describe('OfferData reducer', () => {
  it('should set current offer', () => {
    const state = offerData(undefined, setCurrentOffer(offer));

    expect(state.currentOffer).toEqual(offer);
  });

  it('should fill nearby offers', () => {
    const state = offerData(undefined, fillNearbyOffers([offer]));

    expect(state.nearbyOffers).toEqual([offer]);
  });

  it('should fill reviews', () => {
    const state = offerData(undefined, fillReviews([review]));

    expect(state.reviews).toEqual([review]);
  });

  it('should set offer loading status', () => {
    const state = offerData(undefined, setOfferLoadingStatus(true));

    expect(state.isOfferLoading).toBe(true);
  });

  it('should update current offer and nearby offer', () => {
    const updatedOffer = {...offer, isFavorite: true};

    const state = offerData(
      {
        currentOffer: offer,
        nearbyOffers: [offer],
        reviews: [],
        isOfferLoading: false,
      },
      updateOffer(updatedOffer)
    );

    expect(state.currentOffer?.isFavorite).toBe(true);
    expect(state.nearbyOffers[0].isFavorite).toBe(true);
  });
});
