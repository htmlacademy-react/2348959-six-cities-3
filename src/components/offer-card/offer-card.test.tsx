import {render, screen} from '@testing-library/react';
import {MemoryRouter} from 'react-router-dom';
import {CITY_NAME} from '../../const';
import type {Offer} from '../../types/offer';
import OfferCard from './offer-card';

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

describe('Component: OfferCard', () => {
  it('should render offer information', () => {
    render(
      <MemoryRouter>
        <OfferCard offer={offer} />
      </MemoryRouter>
    );

    expect(screen.getByText('Beautiful room')).toBeInTheDocument();
    expect(screen.getByText('Room')).toBeInTheDocument();
    expect(screen.getByText('€100')).toBeInTheDocument();
  });
});
