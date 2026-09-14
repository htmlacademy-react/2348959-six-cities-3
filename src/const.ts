const APP_ROUTE = {
  Main: '/',
  Login: '/login',
  Favorites: '/favorites',
  Offer: '/offer/:id',
  NotFound: '*',
} as const;

const AUTHORIZATION_STATUS = {
  Auth: 'AUTH',
  NoAuth: 'NO_AUTH',
  Unknown: 'UNKNOWN',
} as const;

const CITY_NAME = {
  Paris: 'Paris',
  Cologne: 'Cologne',
  Brussels: 'Brussels',
  Amsterdam: 'Amsterdam',
  Hamburg: 'Hamburg',
  Dusseldorf: 'Dusseldorf',
} as const;

const CITIES = [
  CITY_NAME.Paris,
  CITY_NAME.Cologne,
  CITY_NAME.Brussels,
  CITY_NAME.Amsterdam,
  CITY_NAME.Hamburg,
  CITY_NAME.Dusseldorf,
] as const;

const SORT_TYPE = {
  Popular: 'Popular',
  PriceLowToHigh: 'Price: low to high',
  PriceHighToLow: 'Price: high to low',
  TopRatedFirst: 'Top rated first',
} as const;

const SERVER_CONFIG = {
  Url: 'https://15.design.htmlacademy.pro/six-cities',
  Timeout: 5000,
} as const;

const FAVORITE_STATUS = {
  Add: 1,
  Remove: 0,
} as const;

type SortTypeName = typeof SORT_TYPE[keyof typeof SORT_TYPE];

type CityNameType = typeof CITY_NAME[keyof typeof CITY_NAME];

type FavoriteStatusValue = typeof FAVORITE_STATUS[keyof typeof FAVORITE_STATUS];

export {APP_ROUTE, AUTHORIZATION_STATUS, CITY_NAME, CITIES, FAVORITE_STATUS, SORT_TYPE, SERVER_CONFIG};
export type {CityNameType, FavoriteStatusValue, SortTypeName};
