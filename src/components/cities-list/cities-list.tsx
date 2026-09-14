import {memo, MouseEvent} from 'react';
import type {CityNameType} from '../../const';

type CitiesListProps = {
  cities: readonly CityNameType[];
  currentCity: CityNameType;
  onCityChange: (city: CityNameType) => void;
};

function CitiesList({cities, currentCity, onCityChange}: CitiesListProps): JSX.Element {
  return (
    <div className="tabs">
      <section className="locations container">
        <ul className="locations__list tabs__list">
          {cities.map((city) => {
            const cityLinkClassName = city === currentCity
              ? 'locations__item-link tabs__item tabs__item--active'
              : 'locations__item-link tabs__item';

            const handleCityClick = (evt: MouseEvent<HTMLAnchorElement>) => {
              evt.preventDefault();
              onCityChange(city);
            };

            return (
              <li className="locations__item" key={city}>
                <a className={cityLinkClassName} href="#todo" onClick={handleCityClick}>
                  <span>{city}</span>
                </a>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}

const MemoizedCitiesList = memo(CitiesList);

export default MemoizedCitiesList;
