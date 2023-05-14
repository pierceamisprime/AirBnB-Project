import { useModal } from '../../context/Modal'
import { useDispatch } from 'react-redux'
import { deleteSpotThunk } from '../../store/spots';
import './DeleteSpot.css'


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
        <div className="delete-spot-modal">
            <p>Confirm Delete</p>
            <p>Are you sure you want to remove this spot
                from the listings?</p>
            <button className='yes-delete' onClick={deleteSpot}>Yes (Delete Spot)</button>
            <button
               className='no-delete' onClick={closeDeleteModal}>No (Keep Spot)</button>

        </div>
    )

}

export default DeleteSpotModal
