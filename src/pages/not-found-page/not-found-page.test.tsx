import {render, screen} from '@testing-library/react';
import {MemoryRouter} from 'react-router-dom';
import NotFoundPage from './not-found-page';

describe('NotFoundPage', () => {
  it('should render not found message and main page link', () => {
    render(
      <MemoryRouter>
        <NotFoundPage />
      </MemoryRouter>
    );

    expect(screen.getByRole('heading', {name: '404 Not Found'})).toBeInTheDocument();
    expect(screen.getByRole('link', {name: 'Go to main page'})).toHaveAttribute('href', '/');
  });
});
