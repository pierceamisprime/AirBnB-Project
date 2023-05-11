import { useModal } from '../../context/Modal'
import { useDispatch } from 'react-redux'
import { deleteSpotThunk } from '../../store/spots';


function DeleteSpotModal({ spot }) {
    const { closeModal } = useModal();
    const dispatch = useDispatch();

    const closeDeleteModal = () => {
        return closeModal()
    }

    const deleteSpot = (e) => {
        e.preventDefault()
        dispatch(deleteSpotThunk(spot.id))
        closeModal()

    }


    return (
        <div className="deletemodal">
            <h1>Confirm Delete</h1>
            <h2>Are you sure you want to remove this spot
                from the listings?</h2>
            <button onClick={deleteSpot}>Yes (Delete Spot)</button>
            <button
                onClick={closeDeleteModal}>No (Keep Spot)</button>

        </div>
    )

}

export default DeleteSpotModal
