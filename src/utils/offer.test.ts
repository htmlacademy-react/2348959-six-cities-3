import {describe, expect, it} from 'vitest';
import {SORT_TYPE} from '../const';
import type {Offer} from '../types/offer';
import {getSortedOffers} from './offer';

const firstOffer = {
  id: 'first',
  price: 100,
  rating: 2,
} as Offer;

const secondOffer = {
  id: 'second',
  price: 50,
  rating: 5,
} as Offer;

const offers = [firstOffer, secondOffer];

describe('getSortedOffers', () => {
  it('should return offers without sorting for popular sort type', () => {
    expect(getSortedOffers(offers, SORT_TYPE.Popular)).toEqual(offers);
  });

  it('should sort offers from low price to high price', () => {
    expect(getSortedOffers(offers, SORT_TYPE.PriceLowToHigh)).toEqual([secondOffer, firstOffer]);
  });

  it('should sort offers from high price to low price', () => {
    expect(getSortedOffers(offers, SORT_TYPE.PriceHighToLow)).toEqual([firstOffer, secondOffer]);
  });

  it('should sort offers from high rating to low rating', () => {
    expect(getSortedOffers(offers, SORT_TYPE.TopRatedFirst)).toEqual([secondOffer, firstOffer]);
  });
});
