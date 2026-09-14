import {KeyboardEvent, memo, MouseEvent, useState} from 'react';
import {SORT_TYPE} from '../../const';
import type {SortTypeName} from '../../const';

const SORT_TYPES = [
  SORT_TYPE.Popular,
  SORT_TYPE.PriceLowToHigh,
  SORT_TYPE.PriceHighToLow,
  SORT_TYPE.TopRatedFirst,
] as const;

const KEYBOARD_KEY = {
  Enter: 'Enter',
  Space: ' ',
} as const;

type SortingOptionsProps = {
  currentSortType: SortTypeName;
  onSortTypeChange: (sortType: SortTypeName) => void;
};

function SortingOptions({currentSortType, onSortTypeChange}: SortingOptionsProps): JSX.Element {
  const [isOpened, setIsOpened] = useState(false);

  const optionsClassName = isOpened
    ? 'places__options places__options--custom places__options--opened'
    : 'places__options places__options--custom';

  const handleSortTypeClick = (evt: MouseEvent<HTMLLIElement>, selectedSortType: SortTypeName) => {
    evt.preventDefault();

    onSortTypeChange(selectedSortType);
    setIsOpened(false);
  };

  const handleSortingTypeClick = () => {
    setIsOpened((currentValue) => !currentValue);
  };

  const handleSortingTypeKeyDown = (evt: KeyboardEvent<HTMLSpanElement>) => {
    if (evt.key === KEYBOARD_KEY.Enter || evt.key === KEYBOARD_KEY.Space) {
      evt.preventDefault();
      setIsOpened((currentValue) => !currentValue);
    }
  };

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span
        className="places__sorting-type"
        tabIndex={0}
        onClick={handleSortingTypeClick}
        onKeyDown={handleSortingTypeKeyDown}
      >
        {currentSortType}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className={optionsClassName}>
        {SORT_TYPES.map((sortType) => (
          <li
            className={`places__option ${sortType === currentSortType ? 'places__option--active' : ''}`}
            tabIndex={0}
            key={sortType}
            onClick={(evt) => handleSortTypeClick(evt, sortType)}
          >
            {sortType}
          </li>
        ))}
      </ul>
    </form>
  );
}

const MemoizedSortingOptions = memo(SortingOptions);

export default MemoizedSortingOptions;
