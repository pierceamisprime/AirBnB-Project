import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { deleteReviewThunk } from "../../store/reviews";
import { fetchOneSpot } from "../../store/spots";
import './DeleteReviewModal.css'

const DeleteReviewModal = ({reviewId, spotId}) => {

    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const handleDelete = (e) => {
        e.preventDefault();
        dispatch(deleteReviewThunk(reviewId))
        .then(() => dispatch(fetchOneSpot(spotId)))
        .then(closeModal());
    };

    return (
        <div className="delete-review-modal">
        <p>Confirm Delete</p>
        <p>Are you sure you want to delete this review?</p>
            <button className="yes-delete"
                    onClick={handleDelete}>Yes (Delete Review)</button>
            <button className="no-delete"
                    onClick={() => closeModal()}>No (Keep Review)</button>

    </div>
    )

}



export default DeleteReviewModal
