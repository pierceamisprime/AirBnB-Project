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
        <div className="delete-modal">
        <h1>Confirm Delete</h1>
        <p>Are you sure you want to delete this review?</p>
        <div className='delete-modal-button-container'>
            <button className="delete-buttons"
                    id='yes-button'
                    onClick={handleDelete}>Yes (Delete Review)</button>
            <button className="delete-buttons"
                    onClick={() => closeModal()}>No (Keep Review)</button>
        </div>
    </div>
    )

}



export default DeleteReviewModal
