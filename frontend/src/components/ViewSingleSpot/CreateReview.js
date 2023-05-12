import { useEffect, useState } from "react"
import { useModal } from "../../context/Modal"
import { useDispatch } from "react-redux"
import "./CreateReviewModal.css"
import { createReviewThunk, getReviewsThunk } from "../../store/reviews"


const CreateReviewModal = ({ spotId }) => {

    const dispatch = useDispatch()
    const { closeModal } = useModal()
    const [review, setReview] = useState("")
    const [stars, setStars] = useState("")
    const [rating, setRating] = useState(1)

    const handleClick = (e) => {
        e.preventDefault()

        const reviewData = {
            spotId: spotId,
            review,
            stars
        }

         dispatch(createReviewThunk(reviewData))
         closeModal()

    }

    return (
        <form onSubmit={handleClick}>
            <div className="create-review-modal">
                <h2>How was your stay?</h2>
                <textarea
                    className="review-text"
                    placeholder="Leave your review here..."
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    rows={10}
                    cols={30}
                />

                <div className="rating-input">
                    <div
                        className={rating >= 1 ? "rated" : "not-rated"}
                        onMouseEnter={() => setRating(1)}
                        onClick={() => setStars(1)}
                    >
                        <i className="fa-solid fa-star medium-big-star clickable" ></i>
                    </div>
                    <div
                        className={rating >= 2 ? "rated" : "not-rated"}
                        onMouseEnter={() => setRating(2)}
                        onClick={() => setStars(2)}
                    >
                        <i className="fa-solid fa-star medium-big-star clickable" ></i>
                    </div>
                    <div
                        className={rating >= 3 ? "rated" : "not-rated"}
                        onMouseEnter={() => setRating(3)}
                        onClick={() => setStars(3)}
                    >
                        <i className="fa-solid fa-star medium-big-star clickable" ></i>
                    </div>
                    <div
                        className={rating >= 4 ? "rated" : "not-rated"}
                        onMouseEnter={() => setRating(4)}
                        onClick={() => setStars(4)}
                    >
                        <i className="fa-solid fa-star medium-big-star clickable" ></i>
                    </div>
                    <div
                        className={rating >= 5 ? "rated" : "not-rated"}
                        onMouseEnter={() => setRating(5)}
                        onClick={() => setStars(5)}
                    >
                        <i className="fa-solid fa-star medium-big-star clickable" ></i>
                    </div>
                </div>
                <button type="submit" className="submit-review-button" disabled={(review.length < 10) || !stars}>Submit Your Review</button>
            </div>
        </form>
    )

}




export default CreateReviewModal
