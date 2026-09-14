import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {SORT_TYPE} from '../../const';
import SortingOptions from './sorting-options';

describe('SortingOptions', () => {
  it('should call callback after sort option click', async () => {
    const handleSortTypeChange = vi.fn();

    render(
      <SortingOptions
        currentSortType={SORT_TYPE.Popular}
        onSortTypeChange={handleSortTypeChange}
      />
    );

    await userEvent.click(screen.getByText(SORT_TYPE.Popular, {selector: '.places__sorting-type'}));
    await userEvent.click(screen.getByText(SORT_TYPE.PriceLowToHigh));

    expect(handleSortTypeChange).toHaveBeenCalledWith(SORT_TYPE.PriceLowToHigh);
  });
});
