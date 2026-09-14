import FavoritesPage from '../../pages/favorites-page/favorites-page';
import NotFoundPage from '../../pages/not-found-page/not-found-page';
import LoginPage from '../../pages/login-page/login-page';
import OfferPage from '../../pages/offer-page/offer-page';
import PrivateRoute from '../private-route/private-route';
import MainPage from '../../pages/main-page/main-page';
import {Route, Routes} from 'react-router-dom';
import {APP_ROUTE} from '../../const';

function App(): JSX.Element {
  return (
    <Routes>
      <Route
        path={APP_ROUTE.Main}
        element={<MainPage />}
      />
      <Route
        path={APP_ROUTE.Login}
        element={<LoginPage />}
      />

      <Route
        path={APP_ROUTE.Favorites}
        element={
          <PrivateRoute>
            <FavoritesPage />
          </PrivateRoute>
        }
      />

      <Route
        path={APP_ROUTE.Offer}
        element={<OfferPage />}
      />
      <Route
        path={APP_ROUTE.NotFound}
        element={<NotFoundPage />}
      />
    </Routes>
  );
}

export default App;
