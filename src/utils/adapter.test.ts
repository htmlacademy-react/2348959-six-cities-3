import {describe, expect, it} from 'vitest';
import type {ServerOffer} from '../types/offer';
import {adaptOfferToClient} from './adapter';

const serverOffer: ServerOffer = {
  id: 'offer-id',
  title: 'Test offer',
  type: 'apartment',
  price: 120,
  city: {
    name: 'Paris',
    location: {
      latitude: 48.85661,
      longitude: 2.351499,
      zoom: 13,
    },
  },
  location: {
    latitude: 48.85661,
    longitude: 2.351499,
    zoom: 16,
  },
  isFavorite: false,
  isPremium: true,
  rating: 4.2,
  previewImage: 'preview.jpg',
  images: ['image.jpg'],
  bedrooms: 2,
  maxAdults: 3,
  goods: ['Wi-Fi'],
  host: {
    name: 'Angelina',
    avatarUrl: 'avatar.jpg',
    isPro: true,
  },
  description: 'Description',
};

describe('adaptOfferToClient', () => {
  it('should adapt server offer to client offer', () => {
    expect(adaptOfferToClient(serverOffer)).toEqual({
      id: 'offer-id',
      title: 'Test offer',
      type: 'apartment',
      price: 120,
      city: serverOffer.city,
      location: serverOffer.location,
      isFavorite: false,
      isPremium: true,
      rating: 4.2,
      previewImage: 'preview.jpg',
      images: ['image.jpg'],
      bedrooms: 2,
      maxAdults: 3,
      goods: ['Wi-Fi'],
      host: serverOffer.host,
      description: 'Description',
    });
  });
});
