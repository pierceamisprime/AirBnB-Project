import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { viewSpot } from "../../store/spots"

const ViewSingleSpot = () => {
    const { spotId } = useParams()
    const dispatch = useDispatch()

    const spot = useSelector(state => state.spots[spotId])
    console.log(spot)

    useEffect(() => {
        dispatch(viewSpot(spotId))
    }, [dispatch, spotId])

    if (!spot) {
        console.log('spot not found')
        return null
    };

    return (
        <div className="spot">
            <h1>{spot.name}</h1>
            <h4>{spot.city}, {spot.state}, {spot.country}</h4>
            {/* <img src={spot.SpotImages[0].url} alt='First Img'></img> */}
        </div>

    )
}

export default ViewSingleSpot
