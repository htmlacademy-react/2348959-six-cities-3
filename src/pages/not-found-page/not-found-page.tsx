import {Link} from 'react-router-dom';
import {APP_ROUTE} from '../../const';

function NotFoundPage(): JSX.Element {
  return (
    <div className="page">
      <main className="page__main">
        <h1>404 Not Found</h1>
        <Link to={APP_ROUTE.Main}>Go to main page</Link>
      </main>
    </div>
  );
}

export default NotFoundPage;
