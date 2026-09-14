import Review from '../review/review';
import {Review as ReviewType} from '../../types/review';

const MAX_REVIEWS_COUNT = 10;

type ReviewsListProps = {
  reviews: ReviewType[];
};

function ReviewsList({reviews}: ReviewsListProps): JSX.Element {
  const visibleReviews = [...reviews]
    .sort((firstReview, secondReview) => Date.parse(secondReview.date) - Date.parse(firstReview.date))
    .slice(0, MAX_REVIEWS_COUNT);

  return (
    <>
      <h2 className="reviews__title">
        Reviews &middot; <span className="reviews__amount">{reviews.length}</span>
      </h2>
      <ul className="reviews__list">
        {visibleReviews.map((review) => (
          <Review key={review.id} review={review} />
        ))}
      </ul>
    </>
  );
}

export default ReviewsList;
