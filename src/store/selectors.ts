import {createSelector} from '@reduxjs/toolkit';
import type {AuthorizationStatusType} from '../types/authorization-status';
import type {UserData} from '../types/user-data';
import type {Review} from '../types/review';
import type {CityNameType} from '../const';
import type {Offer} from '../types/offer';
import type {State} from './index';

function getCity(state: State): CityNameType {
  return state.app.city;
}

function getOffers(state: State): Offer[] {
  return state.offers.offers;
}

function getFavoriteOffers(state: State): Offer[] {
  return state.favorites.favoriteOffers;
}

const getFilteredOffers = createSelector(
  [getOffers, getCity],
  (offers, city) => offers.filter((offer) => offer.city.name === city)
);

function getOffersLoadingStatus(state: State): boolean {
  return state.offers.isOffersLoading;
}

function getAuthorizationStatus(state: State): AuthorizationStatusType {
  return state.user.authorizationStatus;
}

function getUserData(state: State): UserData | null {
  return state.user.userData;
}

function getCurrentOffer(state: State): Offer | null {
  return state.offer.currentOffer;
}

function getNearbyOffers(state: State): Offer[] {
  return state.offer.nearbyOffers;
}

function getReviews(state: State): Review[] {
  return state.offer.reviews;
}

function getOfferLoadingStatus(state: State): boolean {
  return state.offer.isOfferLoading;
}

export {
  getAuthorizationStatus,
  getCity,
  getCurrentOffer,
  getFavoriteOffers,
  getFilteredOffers,
  getNearbyOffers,
  getOfferLoadingStatus,
  getOffers,
  getOffersLoadingStatus,
  getReviews,
  getUserData,
};
