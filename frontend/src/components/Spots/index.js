import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { fetchSpots } from "../../store/spots";
import './Spots.css'

const SpotIndex = () => {

    const dispatch = useDispatch()
    const spotsObj = useSelector(state => state.spots.allSpots)
    const history = useHistory()


    useEffect(() => {
        dispatch(fetchSpots())
    }, [dispatch])

    if (!spotsObj) {
        // console.log('no spots found')
        return null
    }

    const spots = Object.values(spotsObj);



    return (
        <div className="spots-body">
            <div className="spots-index">
                {spots.map(spot => (
                    <div key={spot.id}
                        onClick={() => {
                            history.push(`/spots/${spot.id}`)
                        }}>
                        <img className="preview-img" src={spot.previewImage ? spot.previewImage : 'https://thumbs.dreamstime.com/b/no-image-available-icon-flat-vector-no-image-available-icon-flat-vector-illustration-132482953.jpg'}></img>
                            <p>{spot.city}, {spot.state}</p>
                            <span><i className="fa-solid fa-star"></i>{spot.avgRating <= 5 ? spot.avgRating : 'New'}</span>
                            <p>${spot.price} /night</p>
                    </div>
                ))}
            </div>
        </div>
    )
};

export default SpotIndex;
