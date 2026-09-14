import {SORT_TYPE} from '../const';
import type {SortTypeName} from '../const';
import type {Offer} from '../types/offer';

function sortOffersByPriceLowToHigh(firstOffer: Offer, secondOffer: Offer): number {
  return firstOffer.price - secondOffer.price;
}

function sortOffersByPriceHighToLow(firstOffer: Offer, secondOffer: Offer): number {
  return secondOffer.price - firstOffer.price;
}

function sortOffersByRating(firstOffer: Offer, secondOffer: Offer): number {
  return secondOffer.rating - firstOffer.rating;
}

function getSortedOffers(offers: Offer[], sortType: SortTypeName): Offer[] {
  switch (sortType) {
    case SORT_TYPE.PriceLowToHigh:
      return [...offers].sort(sortOffersByPriceLowToHigh);
    case SORT_TYPE.PriceHighToLow:
      return [...offers].sort(sortOffersByPriceHighToLow);
    case SORT_TYPE.TopRatedFirst:
      return [...offers].sort(sortOffersByRating);
    case SORT_TYPE.Popular:
      return offers;
  }
}

export {getSortedOffers};
