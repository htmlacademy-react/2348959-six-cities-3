import {
  fetchNearbyOffersAction,
  fetchOfferAction,
  fetchReviewsAction,
  postReviewAction
} from '../../store/api-actions';
import {
  getAuthorizationStatus,
  getCurrentOffer,
  getNearbyOffers,
  getOfferLoadingStatus,
  getReviews
} from '../../store/selectors';
import {useEffect, useState} from 'react';
import ReviewsList from '../../components/reviews-list/reviews-list';
import {changeFavoriteStatusAction} from '../../store/api-actions';
import OffersList from '../../components/offers-list/offers-list';
import ReviewForm from '../../components/review-form/review-form';
import NotFoundPage from '../not-found-page/not-found-page';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {AppRoute, AuthorizationStatus} from '../../const';
import {useNavigate, useParams} from 'react-router-dom';
import Spinner from '../../components/spinner/spinner';
import Header from '../../components/header/header';
import type {ReviewData} from '../../types/review';
import type {Offer} from '../../types/offer';
import Map from '../../components/map/map';

const OFFER_IMAGES_COUNT = 6;
const NEARBY_OFFERS_COUNT = 3;
const RATING_PERCENT_MULTIPLIER = 20;

function getRatingWidth(rating: number): string {
  return `${Math.round(rating) * RATING_PERCENT_MULTIPLIER}%`;
}

function getFormattedOfferType(type: Offer['type']): string {
  return type[0].toUpperCase() + type.slice(1);
}

function OfferPage(): JSX.Element {
  const {id} = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const currentOffer = useAppSelector(getCurrentOffer);
  const nearbyOffers = useAppSelector(getNearbyOffers);
  const reviews = useAppSelector(getReviews);
  const isOfferLoading = useAppSelector(getOfferLoadingStatus);
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const [isReviewSending, setIsReviewSending] = useState(false);

  useEffect(() => {
    if (!id) {
      return;
    }

    dispatch(fetchOfferAction(id));
    dispatch(fetchNearbyOffersAction(id));
    dispatch(fetchReviewsAction(id));
  }, [dispatch, id]);

  if (isOfferLoading) {
    return <Spinner />;
  }

  if (!currentOffer) {
    return <NotFoundPage />;
  }

  const {
    title,
    images,
    isPremium,
    isFavorite,
    rating,
    type,
    bedrooms,
    maxAdults,
    price,
    goods,
    host,
    description,
  } = currentOffer;

  const limitedNearbyOffers = nearbyOffers.slice(0, NEARBY_OFFERS_COUNT);
  const offerMapOffers = [currentOffer, ...limitedNearbyOffers];

  const handleReviewSubmit = async (reviewData: ReviewData) => {
    if (!id) {
      return;
    }

    setIsReviewSending(true);

    try {
      await dispatch(postReviewAction(id, reviewData));
    } finally {
      setIsReviewSending(false);
    }
  };

  const handleFavoriteButtonClick = (offer: Offer) => {
    if (authorizationStatus !== AuthorizationStatus.Auth) {
      navigate(AppRoute.Login);
      return;
    }

    dispatch(changeFavoriteStatusAction(offer.id, offer.isFavorite));
  };

  return (
    <div className="page">
      <Header />

      <main className="page__main page__main--offer">
        <section className="offer">
          <div className="offer__gallery-container container">
            <div className="offer__gallery">
              {images.slice(0, OFFER_IMAGES_COUNT).map((image) => (
                <div className="offer__image-wrapper" key={image}>
                  <img className="offer__image" src={image} alt={title} />
                </div>
              ))}
            </div>
          </div>
          <div className="offer__container container">
            <div className="offer__wrapper">
              {isPremium && (
                <div className="offer__mark">
                  <span>Premium</span>
                </div>
              )}
              <div className="offer__name-wrapper">
                <h1 className="offer__name">
                  {title}
                </h1>
                <button
                  className={`offer__bookmark-button ${isFavorite ? 'offer__bookmark-button--active' : ''} button`}
                  type="button"
                  onClick={() => handleFavoriteButtonClick(currentOffer)}
                >
                  <svg className="offer__bookmark-icon" width="31" height="33">
                    <use xlinkHref="#icon-bookmark"></use>
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>
              <div className="offer__rating rating">
                <div className="offer__stars rating__stars">
                  <span style={{width: getRatingWidth(rating)}}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="offer__rating-value rating__value">{rating}</span>
              </div>
              <ul className="offer__features">
                <li className="offer__feature offer__feature--entire">
                  {getFormattedOfferType(type)}
                </li>
                <li className="offer__feature offer__feature--bedrooms">
                  {bedrooms} Bedrooms
                </li>
                <li className="offer__feature offer__feature--adults">
                  Max {maxAdults} adults
                </li>
              </ul>
              <div className="offer__price">
                <b className="offer__price-value">&euro;{price}</b>
                <span className="offer__price-text">&nbsp;night</span>
              </div>
              <div className="offer__inside">
                <h2 className="offer__inside-title">What&apos;s inside</h2>
                <ul className="offer__inside-list">
                  {goods.map((good) => (
                    <li className="offer__inside-item" key={good}>
                      {good}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="offer__host">
                <h2 className="offer__host-title">Meet the host</h2>
                <div className="offer__host-user user">
                  <div className={`offer__avatar-wrapper ${host.isPro ? 'offer__avatar-wrapper--pro' : ''} user__avatar-wrapper`}>
                    <img className="offer__avatar user__avatar" src={host.avatarUrl} width="74" height="74" alt="Host avatar" />
                  </div>
                  <span className="offer__user-name">
                    {host.name}
                  </span>
                  {host.isPro && (
                    <span className="offer__user-status">
                      Pro
                    </span>
                  )}
                </div>
                <div className="offer__description">
                  <p className="offer__text">
                    {description}
                  </p>
                </div>
              </div>
              <section className="offer__reviews reviews">
                <ReviewsList reviews={reviews} />
                {authorizationStatus === AuthorizationStatus.Auth && (
                  <ReviewForm
                    isSending={isReviewSending}
                    onReviewSubmit={handleReviewSubmit}
                  />
                )}
              </section>
            </div>
          </div>
          <Map
            city={currentOffer.city}
            offers={offerMapOffers}
            selectedOfferId={currentOffer.id}
            className="offer__map map"
          />
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <div className="near-places__list places__list">
              <OffersList
                offers={limitedNearbyOffers}
                cardClassName="near-places__card place-card"
                onFavoriteButtonClick={handleFavoriteButtonClick}
              />
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default OfferPage;
