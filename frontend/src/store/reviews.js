import { csrfFetch } from "./csrf";

const GET_REVIEWS = 'reviews/GET_REVIEWS'
const CREATE_REVIEW = 'reviews/CREATE_REVIEWS'
const DELETE_REVIEW = 'reviews/DELETE_REVIEW'



const getReviews = (reviews) => ({
    type: GET_REVIEWS,
    reviews
})

const createReview = (review) => ({
    type: CREATE_REVIEW,
    review
})

const deleteReview = (reviewId) => ({
    type: DELETE_REVIEW,
    reviewId
})



export const getReviewsThunk = (spotId) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`)

    if (response.ok) {
        const reviewsObj = await response.json()
        const reviews = reviewsObj.Reviews
        dispatch(getReviews(reviews))
        return reviews
    }
}

export const createReviewThunk = (reviewData) => async (dispatch) => {
    const { spotId, review, stars } = reviewData
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({review, stars})

    })
    if (response.ok) {
        const newReview = await response.json()
        dispatch(createReview(newReview))
        return newReview
    }
}

export const deleteReviewThunk = (reviewId) => async (dispatch) => {
    const response = await csrfFetch(`/api/reviews/${reviewId}`, {
        method: 'DELETE'
    })
    if (response.ok) {
        const deletedReview = await response.json()
        dispatch(deleteReview(reviewId))
        return deletedReview
    }

}


const initialState = { spot: {}, user: {} }

const reviewReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_REVIEWS: {
            const newState = { ...state, spot: {}, user: {...state.user}}
            const reviews = action.reviews
            reviews.forEach(review => newState.spot[review.id] = review)
            return newState
        }
        case CREATE_REVIEW: {
            const newState =  {...state, spot: {}, user: {}};
            newState.spot[action.review.id] = action.review;
            return newState;
        }
        case DELETE_REVIEW: {
            const newState =  {...state, spot: {...state.spot}, user: {...state.user}};
            delete newState.spot[action.reviewId];
            delete newState.user[action.reviewId];
            return newState;

        }
        default: {
            return state
        }
    }
}

export default reviewReducer
