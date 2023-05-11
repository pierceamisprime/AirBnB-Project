import { useDispatch, useSelector } from "react-redux"
import "./ManageSpot.css"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"
import { useEffect } from "react"
import { fetchSpots, userSpotsThunk } from "../../store/spots"
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem"
import DeleteSpotModal from "./DeleteSpotModal"

const ManageSpot = () => {
    const dispatch = useDispatch()
    const history = useHistory()


    const spotObj = useSelector(state => state.spots.allSpots)
    // console.log(spotObj)
    const spots = Object.values(spotObj)

    // const user = useSelector(state => state.session.user)
    // const currentUserSpot = spots.filter(spot => spot.ownerId === user.id)
    // console.log(currentUserSpot)
    // console.log(user)
    useEffect(() => {
        dispatch(userSpotsThunk())
    }, [dispatch])



    return (
        <div className="manage-spot-page">
            <div className="manage-spot-header">
                {spots.length ?
                    <h1 className="manage-spot-title">Manage your spots</h1> : <h1 className="manage-spot-title">Add a spot</h1>
                }
                <button
                    className="create-new-spot-manage-button"
                    onClick={(e) => history.push(`/spots/new`)}
                >
                    Create a New Spot
                </button>
            </div>
            <div className="current-user-spot">
                {spots.length > 0 && spots.map(spot =>
                    <li key={spot.id}>
                         <img className="preview-img" src={spot.previewImage ? spot.previewImage : 'https://thumbs.dreamstime.com/b/no-image-available-icon-flat-vector-no-image-available-icon-flat-vector-illustration-132482953.jpg'}></img>
                            <p>{spot.city}, {spot.state}</p>
                            <span><i className="fa-solid fa-star"></i>{spot.avgRating <= 5 ? spot.avgRating : 'New'}</span>
                            <p>${spot.price} /night</p>

                            <button onClick={(e) => history.push(`/spots/${spot.id}/edit`)}>
                                Update
                            </button>

                            <button><OpenModalMenuItem
                                itemText="Delete"
                                modalComponent={<DeleteSpotModal  spot={spot}/>}
                            /></button>

                    </li>
                )}
            </div>
        </div>
    )

}



export default ManageSpot
