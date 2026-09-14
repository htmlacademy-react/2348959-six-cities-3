import React, {ChangeEvent, FormEvent, useState} from 'react';
import type {ReviewData} from '../../types/review';

const MIN_REVIEW_LENGTH = 50;
const MAX_REVIEW_LENGTH = 300;

const RATING_TITLES = [
  'perfect',
  'good',
  'not bad',
  'badly',
  'terribly',
] as const;

type ReviewFormState = {
  rating: number;
  comment: string;
};

type ReviewFormProps = {
  isSending: boolean;
  onReviewSubmit: (reviewData: ReviewData) => Promise<void>;
};

function ReviewForm({isSending, onReviewSubmit}: ReviewFormProps): JSX.Element {
  const [reviewForm, setReviewForm] = useState<ReviewFormState>({
    rating: 0,
    comment: '',
  });

  const handleRatingChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setReviewForm({
      ...reviewForm,
      rating: Number(evt.target.value),
    });
  };

  const handleCommentChange = (evt: ChangeEvent<HTMLTextAreaElement>) => {
    setReviewForm({
      ...reviewForm,
      comment: evt.target.value,
    });
  };

  const handleFormSubmit = async (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    await onReviewSubmit({
      rating: reviewForm.rating,
      comment: reviewForm.comment,
    });

    setReviewForm({
      rating: 0,
      comment: '',
    });
  };

  const isSubmitDisabled =
    reviewForm.rating === 0 ||
    reviewForm.comment.length < MIN_REVIEW_LENGTH ||
    reviewForm.comment.length > MAX_REVIEW_LENGTH;

  return (
    <form
      className="reviews__form form"
      action="#"
      method="post"
      onSubmit={(evt) => {
        void handleFormSubmit(evt);
      }}
    >
      <label className="reviews__label form__label" htmlFor="review">Your review</label>

      <div className="reviews__rating-form form__rating">
        {RATING_TITLES.map((title, index) => {
          const ratingValue = RATING_TITLES.length - index;

          return (
            <React.Fragment key={title}>
              <input
                className="form__rating-input visually-hidden"
                name="rating"
                value={ratingValue}
                id={`${ratingValue}-stars`}
                type="radio"
                checked={reviewForm.rating === ratingValue}
                onChange={handleRatingChange}
                disabled={isSending}
              />
              <label htmlFor={`${ratingValue}-stars`} className="reviews__rating-label form__rating-label" title={title}>
                <svg className="form__star-image" width="37" height="33">
                  <use xlinkHref="#icon-star"></use>
                </svg>
              </label>
            </React.Fragment>
          );
        })}
      </div>

      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={reviewForm.comment}
        onChange={handleCommentChange}
        disabled={isSending}
      >
      </textarea>

      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set rating and describe your stay with at least{' '}
          <b className="reviews__text-amount">{MIN_REVIEW_LENGTH} characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit" disabled={isSubmitDisabled || isSending}>
          Submit
        </button>
      </div>
    </form>
  );
}

export default ReviewForm;
