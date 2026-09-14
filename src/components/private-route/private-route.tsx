import {Navigate} from 'react-router-dom';
import Spinner from '../spinner/spinner';
import {APP_ROUTE, AUTHORIZATION_STATUS} from '../../const';
import {useAppSelector} from '../../hooks';
import {getAuthorizationStatus} from '../../store/selectors';

type PrivateRouteProps = {
  children: JSX.Element;
};

function PrivateRoute({children}: PrivateRouteProps): JSX.Element {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);

  if (authorizationStatus === AUTHORIZATION_STATUS.Unknown) {
    return <Spinner />;
  }

  return authorizationStatus === AUTHORIZATION_STATUS.Auth
    ? children
    : <Navigate to={APP_ROUTE.Login} />;
}

export default PrivateRoute;
