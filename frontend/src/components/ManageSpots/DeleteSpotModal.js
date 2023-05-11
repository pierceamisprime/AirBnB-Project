import { useModal } from '../../context/Modal'
import { useDispatch } from 'react-redux'
import { deleteSpotThunk } from '../../store/spots';


function DeleteSpotModal({ spot }) {
    const { closeModal } = useModal();
    const dispatch = useDispatch();

    const closeDelete = () => {
        return closeModal()
    }

    const deleteSpotClick = async() => {
        await dispatch(deleteSpotThunk(spot.id))
        return closeModal()

    }


    return (
        <div className="deletemodal">
            <h1>Confirm Delete</h1>
            <h2>Are you sure you want to remove this spot
                from the listings?</h2>
            <button onClick={deleteSpotClick}>Yes (Delete Spot)</button>
            <button
                onClick={closeDelete}>No (Keep Spot)</button>

        </div>
    )

}

export default DeleteSpotModal
