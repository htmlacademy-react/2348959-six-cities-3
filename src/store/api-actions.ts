import {
  fillFavoriteOffers,
  fillOffers,
  setOffersLoadingStatus,
  requireAuthorization,
  fillNearbyOffers,
  fillReviews,
  setCurrentOffer,
  setOfferLoadingStatus,
  updateOffer,
  setUserData
} from './action';
import {AuthorizationStatus, FavoriteStatus} from '../const';
import type {Review, ReviewData} from '../types/review';
import {dropToken, saveToken} from '../services/token';
import {adaptOfferToClient} from '../utils/adapter';
import type {FavoriteStatusValue} from '../const';
import type {AuthData} from '../types/auth-data';
import type {UserData} from '../types/user-data';
import type {ServerOffer} from '../types/offer';
import {AppDispatch, State} from './index';
import {AxiosInstance} from 'axios';

const OFFERS_ROUTE = '/offers';

const FAVORITES_ROUTE = '/favorite';

const LOGIN_ROUTE = '/login';

const LOGOUT_ROUTE = '/logout';

function getOfferRoute(offerId: string): string {
  return `/offers/${offerId}`;
}

function getFavoriteStatusRoute(offerId: string, status: FavoriteStatusValue): string {
  return `/favorite/${offerId}/${status}`;
}

function getNearbyOffersRoute(offerId: string): string {
  return `/offers/${offerId}/nearby`;
}

function getReviewsRoute(offerId: string): string {
  return `/comments/${offerId}`;
}

function fetchOfferAction(offerId: string) {
  return async (
    dispatch: AppDispatch,
    _getState: () => State,
    api: AxiosInstance
  ): Promise<void> => {
    dispatch(setOfferLoadingStatus(true));

    try {
      const {data} = await api.get<ServerOffer>(getOfferRoute(offerId));
      dispatch(setCurrentOffer(adaptOfferToClient(data)));
    } catch {
      dispatch(setCurrentOffer(null));
    } finally {
      dispatch(setOfferLoadingStatus(false));
    }
  };
}

function fetchNearbyOffersAction(offerId: string) {
  return async (
    dispatch: AppDispatch,
    _getState: () => State,
    api: AxiosInstance
  ): Promise<void> => {
    try {
      const {data} = await api.get<ServerOffer[]>(getNearbyOffersRoute(offerId));
      const nearbyOffers = data.map(adaptOfferToClient);

      dispatch(fillNearbyOffers(nearbyOffers));
    } catch {
      dispatch(fillNearbyOffers([]));
    }
  };
}
function fetchReviewsAction(offerId: string) {
  return async (
    dispatch: AppDispatch,
    _getState: () => State,
    api: AxiosInstance
  ): Promise<void> => {
    try {
      const {data} = await api.get<Review[]>(getReviewsRoute(offerId));

      dispatch(fillReviews(data));
    } catch {
      dispatch(fillReviews([]));
    }
  };
}

function postReviewAction(offerId: string, reviewData: ReviewData) {
  return async (
    dispatch: AppDispatch,
    getState: () => State,
    api: AxiosInstance
  ): Promise<void> => {
    const {data: newReview} = await api.post<Review>(getReviewsRoute(offerId), reviewData);
    const reviews = getState().offer.reviews;

    dispatch(fillReviews([newReview, ...reviews]));
  };
}

function fetchFavoriteOffersAction() {
  return async (
    dispatch: AppDispatch,
    _getState: () => State,
    api: AxiosInstance
  ): Promise<void> => {
    const {data} = await api.get<ServerOffer[]>(FAVORITES_ROUTE);
    const favoriteOffers = data.map(adaptOfferToClient);

    dispatch(fillFavoriteOffers(favoriteOffers));
  };
}

function changeFavoriteStatusAction(offerId: string, isFavorite: boolean) {
  return async (
    dispatch: AppDispatch,
    _getState: () => State,
    api: AxiosInstance
  ): Promise<void> => {
    const status = isFavorite ? FavoriteStatus.Remove : FavoriteStatus.Add;
    const {data} = await api.post<ServerOffer>(getFavoriteStatusRoute(offerId, status));
    const updatedOffer = adaptOfferToClient(data);

    dispatch(updateOffer(updatedOffer));
  };
}

function fetchOffersAction() {
  return async (
    dispatch: AppDispatch,
    _getState: () => State,
    api: AxiosInstance
  ): Promise<void> => {
    dispatch(setOffersLoadingStatus(true));

    try {
      const {data} = await api.get<ServerOffer[]>(OFFERS_ROUTE);
      const offers = data.map(adaptOfferToClient);

      dispatch(fillOffers(offers));
    } catch {
      dispatch(fillOffers([]));
    } finally {
      dispatch(setOffersLoadingStatus(false));
    }
  };
}

function checkAuthAction() {
  return async (
    dispatch: AppDispatch,
    _getState: () => State,
    api: AxiosInstance
  ): Promise<void> => {
    try {
      const {data} = await api.get<UserData>(LOGIN_ROUTE);
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
      dispatch(setUserData(data));
      dispatch(fetchFavoriteOffersAction());
    } catch {
      dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
      dispatch(fillFavoriteOffers([]));
      dispatch(setUserData(null));
    }
  };
}

function loginAction(authData: AuthData) {
  return async (
    dispatch: AppDispatch,
    _getState: () => State,
    api: AxiosInstance
  ): Promise<void> => {
    const {data} = await api.post<UserData>(LOGIN_ROUTE, authData);

    saveToken(data.token);
    dispatch(requireAuthorization(AuthorizationStatus.Auth));
    dispatch(setUserData(data));
    dispatch(fetchFavoriteOffersAction());
  };
}

function logoutAction() {
  return async (
    dispatch: AppDispatch,
    _getState: () => State,
    api: AxiosInstance
  ): Promise<void> => {
    try {
      await api.delete(LOGOUT_ROUTE);
    } catch {
      // ignore logout request error
    }

    dropToken();
    dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    dispatch(setUserData(null));
    dispatch(fillFavoriteOffers([]));
  };
}

export {
  changeFavoriteStatusAction,
  checkAuthAction,
  fetchFavoriteOffersAction,
  fetchNearbyOffersAction,
  fetchOfferAction,
  fetchOffersAction,
  fetchReviewsAction,
  loginAction,
  logoutAction,
  postReviewAction
};
