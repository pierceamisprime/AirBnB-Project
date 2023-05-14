import { useDispatch, useSelector } from "react-redux"
import "./SpotReviews.css"
import { useEffect } from "react"
import { fetchOneSpot } from "../../store/spots"
import OpenModalButton from "../OpenModalButton"
import CreateReviewModal from "./CreateReview"
import DeleteReviewModal from "./DeleteReview"
import { getReviewsThunk } from "../../store/reviews"

const SpotReviews = ({ reviews, spotId }) => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    // const reviewObj = useSelector(state => state.reviews.spot)
    // console.log(reviewObj)
    // const reviewsArr = Object.values(reviewObj)
    const spot = useSelector(state => state.spots.singleSpot)

    useEffect(() => {
        dispatch(fetchOneSpot(spotId))
    }, [dispatch, spotId])

    useEffect(() => {
        dispatch(getReviewsThunk(spotId))
    }, [dispatch, spotId])


    if (!spot || !spotId || !user) return null

    let months = {
        "01": "January",
        "02": "Feburary",
        "03": "March",
        "04": "April",
        "05": "May",
        "06": "June",
        "07": "July",
        "08": "August",
        "09": "September",
        "10": "October",
        "11": "November",
        "12": "December"
    }

    const newReviews = reviews.toReversed()
    console.log('Reviews:', newReviews)

    return (
        <div>
            {(user?.id !== spot.ownerId) && !(reviews.find(review => review.userId === user.id)) &&
                <div  className='create-review-btn'>
                    <OpenModalButton
                        // className='create-review-btn'
                        buttonText="Post Your Review"
                        modalComponent={<CreateReviewModal spotId={spotId} />}
                    />
                </div>}
            {!reviews.length && user.id !== spot.ownerId ?
                (<div>
                    <p>Be the first to post a review!</p>
                </div>) :
                (<div>
                    {newReviews.map(review => {
                        return !review.User ? null :
                            (
                                <div key={review.id}>
                                    <div className="review-detail">
                                        <p className="review-name">{review.User.firstName}</p>
                                        <p className="review-date">{months[review.createdAt.slice(5, 7)]} {review.createdAt.slice(0, 4)}</p>
                                        <p className="review-review">{review.review}</p>
                                        {review.userId === user?.id &&
                                            <div className="delete-review-btn">

                                                <OpenModalButton
                                                    buttonText="Delete Review"
                                                    modalComponent={<DeleteReviewModal reviewId={review.id} spotId={spotId} />}
                                                />


                                            </div>
                    }
                                    </div>
                                </div>
                            )
                    })}
                </div>)
            }
        </div>
    )

}





export default SpotReviews
