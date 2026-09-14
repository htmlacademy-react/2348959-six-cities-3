import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ReviewForm from './review-form';

const VALID_REVIEW_TEXT =
  'This apartment was clean, comfortable, well located and very pleasant for a short city stay.';

describe('ReviewForm', () => {
  it('should disable submit button by default', () => {
    render(<ReviewForm isSending={false} onReviewSubmit={vi.fn()} />);

    expect(screen.getByRole('button', {name: 'Submit'})).toBeDisabled();
  });

  it('should call callback after valid form submit', async () => {
    const handleReviewSubmit = vi.fn();

    render(<ReviewForm isSending={false} onReviewSubmit={handleReviewSubmit} />);

    await userEvent.click(screen.getByTitle('perfect'));
    await userEvent.type(screen.getByPlaceholderText(/Tell how was your stay/i), VALID_REVIEW_TEXT);
    await userEvent.click(screen.getByRole('button', {name: 'Submit'}));

    expect(handleReviewSubmit).toHaveBeenCalledWith({
      rating: 5,
      comment: VALID_REVIEW_TEXT,
    });
  });
});
