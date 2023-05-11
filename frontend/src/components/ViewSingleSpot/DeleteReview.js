import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { deleteReviewThunk } from "../../store/reviews";

const DeleteReviewModal = ({reviewId}) => {

    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const handleDelete = (e) => {
        e.preventDefault();
        dispatch(deleteReviewThunk(reviewId));
        closeModal();
    };

    return (
        <div className="delete-modal">
        <h1>Confirm Delete</h1>
        <p>Are you sure you want to delete this review?</p>
        <div className='delete-modal-button-house'>
            <button className="delete-modal-buttons"
                    id='yes-button'
                    onClick={handleDelete}>Yes (Delete Review)</button>
            <button className="delete-modal-buttons"
                    id='no-button'
                    onClick={() => closeModal()}>No (Keep Review)</button>
        </div>
    </div>
    )

}



export default DeleteReviewModal
