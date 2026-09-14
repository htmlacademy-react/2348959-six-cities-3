import {changeFavoriteStatusAction} from '../../store/api-actions';
import OffersList from '../../components/offers-list/offers-list';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {getFavoriteOffers} from '../../store/selectors';
import Header from '../../components/header/header';
import {APP_ROUTE, CITIES} from '../../const';
import type {Offer} from '../../types/offer';
import {Link} from 'react-router-dom';

export default function FavoritesPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const favoriteOffers = useAppSelector(getFavoriteOffers);

  const isFavoritesEmpty = favoriteOffers.length === 0;

  const pageClassName = isFavoritesEmpty
    ? 'page page--favorites-empty'
    : 'page';

  const mainClassName = isFavoritesEmpty
    ? 'page__main page__main--favorites page__main--favorites-empty'
    : 'page__main page__main--favorites';

  const handleFavoriteButtonClick = (offer: Offer) => {
    dispatch(changeFavoriteStatusAction(offer.id, offer.isFavorite));
  };

  return (
    <div className={pageClassName}>
      <Header />

      <main className={mainClassName}>
        <div className="page__favorites-container container">
          {isFavoritesEmpty ? (
            <section className="favorites favorites--empty">
              <h1 className="visually-hidden">Favorites (empty)</h1>
              <div className="favorites__status-wrapper">
                <b className="favorites__status">Nothing yet saved.</b>
                <p className="favorites__status-description">
                  Save properties to narrow down search or plan your future trips.
                </p>
              </div>
            </section>
          ) : (
            <section className="favorites">
              <h1 className="favorites__title">Saved listing</h1>
              <ul className="favorites__list">
                {CITIES.map((city) => {
                  const cityOffers = favoriteOffers.filter((offer) => offer.city.name === city);

                  if (cityOffers.length === 0) {
                    return null;
                  }

                  return (
                    <li className="favorites__locations-items" key={city}>
                      <div className="favorites__locations locations locations--current">
                        <div className="locations__item">
                          <Link className="locations__item-link" to={APP_ROUTE.Main}>
                            <span>{city}</span>
                          </Link>
                        </div>
                      </div>
                      <div className="favorites__places">
                        <OffersList
                          offers={cityOffers}
                          cardClassName="favorites__card place-card"
                          onFavoriteButtonClick={handleFavoriteButtonClick}
                        />
                      </div>
                    </li>
                  );
                })}
              </ul>
            </section>
          )}
        </div>
      </main>
      <footer className="footer container">
        <Link className="footer__logo-link" to={APP_ROUTE.Main}>
          <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33" />
        </Link>
      </footer>
    </div>
  );
}
