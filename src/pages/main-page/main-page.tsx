import {getAuthorizationStatus, getCity, getFilteredOffers, getOffersLoadingStatus} from '../../store/selectors';
import SortingOptions from '../../components/sorting-options/sorting-options';
import {APP_ROUTE, AUTHORIZATION_STATUS, CITIES, SORT_TYPE} from '../../const';
import {changeFavoriteStatusAction} from '../../store/api-actions';
import CitiesList from '../../components/cities-list/cities-list';
import OffersList from '../../components/offers-list/offers-list';
import MainEmpty from '../../components/main-empty/main-empty';
import type {CityNameType, SortTypeName} from '../../const';
import {useAppDispatch, useAppSelector} from '../../hooks';
import Spinner from '../../components/spinner/spinner';
import {useCallback, useMemo, useState} from 'react';
import Header from '../../components/header/header';
import {getSortedOffers} from '../../utils/offer';
import {changeCity} from '../../store/action';
import type {Offer} from '../../types/offer';
import {useNavigate} from 'react-router-dom';
import Map from '../../components/map/map';

function MainPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [currentSortType, setCurrentSortType] = useState<SortTypeName>(SORT_TYPE.Popular);
  const [activeOfferId, setActiveOfferId] = useState<string | null>(null);

  const currentCity = useAppSelector(getCity);
  const filteredOffers = useAppSelector(getFilteredOffers);
  const isOffersLoading = useAppSelector(getOffersLoadingStatus);
  const authorizationStatus = useAppSelector(getAuthorizationStatus);

  const offersCount = filteredOffers.length;
  const sortedOffers = useMemo(
    () => getSortedOffers(filteredOffers, currentSortType),
    [filteredOffers, currentSortType]
  );
  const currentCityData = sortedOffers[0]?.city;

  const isEmpty = !isOffersLoading && offersCount === 0;
  const mainClassName = isEmpty
    ? 'page__main page__main--index page__main--index-empty'
    : 'page__main page__main--index';

  const handleCityChange = useCallback((city: CityNameType) => {
    dispatch(changeCity(city));
    setCurrentSortType(SORT_TYPE.Popular);
  }, [dispatch]);

  const handleSortTypeChange = useCallback((sortType: SortTypeName) => {
    setCurrentSortType(sortType);
  }, []);

  const handleOfferMouseEnter = useCallback((offerId: string) => {
    setActiveOfferId(offerId);
  }, []);

  const handleOfferMouseLeave = useCallback(() => {
    setActiveOfferId(null);
  }, []);

  const handleFavoriteButtonClick = (offer: Offer) => {
    if (authorizationStatus !== AUTHORIZATION_STATUS.Auth) {
      navigate(APP_ROUTE.Login);
      return;
    }

    dispatch(changeFavoriteStatusAction(offer.id, offer.isFavorite));
  };
  const placesFoundText = `${offersCount} ${offersCount === 1 ? 'place' : 'places'} to stay in ${currentCity}`;

  return (
    <div className="page page--gray page--main">
      <Header isMainPage />

      <main className={mainClassName}>
        <h1 className="visually-hidden">Cities</h1>
        <CitiesList
          cities={CITIES}
          currentCity={currentCity}
          onCityChange={handleCityChange}
        />
        {isEmpty ? (
          <MainEmpty cityName={currentCity} />
        ) : (
          <div className="cities">
            <div className="cities__places-container container">
              <section className="cities__places places">
                <h2 className="visually-hidden">Places</h2>
                <b className="places__found">{placesFoundText}</b>
                <SortingOptions
                  currentSortType={currentSortType}
                  onSortTypeChange={handleSortTypeChange}
                />
                <div className="cities__places-list places__list tabs__content">
                  {isOffersLoading ? (
                    <Spinner />
                  ) : (
                    <OffersList
                      offers={sortedOffers}
                      onFavoriteButtonClick={handleFavoriteButtonClick}
                      onOfferMouseEnter={handleOfferMouseEnter}
                      onOfferMouseLeave={handleOfferMouseLeave}
                    />
                  )}
                </div>
              </section>
              <div className="cities__right-section">
                {!isOffersLoading && currentCityData && (
                  <Map
                    city={currentCityData}
                    offers={sortedOffers}
                    selectedOfferId={activeOfferId}
                  />
                )}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default MainPage;
