import {CITY_NAME} from '../const';
import type {Offer} from '../types/offer';
import type {Review} from '../types/review';

function makeFakeOffer(id = '1'): Offer {
  return {
    id,
    title: `Test offer ${id}`,
    type: 'apartment',
    price: 100,
    city: {
      name: CITY_NAME.Paris,
      location: {
        latitude: 48.85661,
        longitude: 2.351499,
        zoom: 13,
      },
    },
    location: {
      latitude: 48.85661,
      longitude: 2.351499,
      zoom: 13,
    },
    isFavorite: false,
    isPremium: false,
    rating: 4,
    previewImage: 'img/test.jpg',
    images: ['img/test.jpg'],
    bedrooms: 1,
    maxAdults: 2,
    goods: ['Wi-Fi'],
    host: {
      name: 'John',
      avatarUrl: 'img/avatar.jpg',
      isPro: false,
    },
    description: 'Test description',
  };
}

function makeFakeReview(id = '1'): Review {
  return {
    id,
    user: {
      name: 'John',
      avatarUrl: 'img/avatar.jpg',
      isPro: false,
    },
    rating: 4,
    comment: 'Test review comment',
    date: '2024-04-01T00:00:00.000Z',
  };
}

export {makeFakeOffer, makeFakeReview};
