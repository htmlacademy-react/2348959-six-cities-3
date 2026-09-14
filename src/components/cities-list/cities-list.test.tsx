import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {CITIES, CITY_NAME} from '../../const';
import CitiesList from './cities-list';

describe('CitiesList', () => {
  it('should render city names and call callback after city click', async () => {
    const handleCityChange = vi.fn();

    render(
      <CitiesList
        cities={CITIES}
        currentCity={CITY_NAME.Paris}
        onCityChange={handleCityChange}
      />
    );

    await userEvent.click(screen.getByText(CITY_NAME.Amsterdam));

    expect(screen.getByText(CITY_NAME.Paris)).toBeInTheDocument();
    expect(handleCityChange).toHaveBeenCalledWith(CITY_NAME.Amsterdam);
  });
});
