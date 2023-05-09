import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSpots } from "../../store/spots";


const SpotIndex = () => {

    const dispatch = useDispatch()
    const spots = useSelector(state => state.spots)
    // console.log(spots)

    useEffect(() => {
        dispatch(fetchSpots())
    }, [dispatch])

    if (!spots.Spots) {
        // console.log('no spots found')
        return null
    }

    return (
        <div className="spots-body">
            <div className="spots-index">
                {spots.Spots.map(spot => (
                    <div key={spot.id}>
                        <img src={spot.previewImage}></img>
                            <p>{spot.city}, {spot.state}</p>
                            <span>{spot.avgRating}</span>
                            <p>{spot.price} /night</p>
                    </div>
                ))}
            </div>
        </div>
    )
};

export default SpotIndex;
