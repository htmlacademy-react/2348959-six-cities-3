import {Link} from 'react-router-dom';
import {AppRoute} from '../../const';

function NotFoundPage(): JSX.Element {
  return (
    <div className="page">
      <main className="page__main">
        <h1>404 Not Found</h1>
        <Link to={AppRoute.Main}>Go to main page</Link>
      </main>
    </div>
  );
}

export default NotFoundPage;
