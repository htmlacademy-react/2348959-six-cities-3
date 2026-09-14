import {describe, expect, it} from 'vitest';
import {getOfferRoute} from './route';

describe('getOfferRoute', () => {
  it('should return offer route by id', () => {
    expect(getOfferRoute('test-offer-id')).toBe('/offer/test-offer-id');
  });
});
