import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { fetchOneSpot } from "../../store/spots"
import './ViewSingleSpot.css'

const ViewSingleSpot = () => {
    const { spotId } = useParams()
    const dispatch = useDispatch()

    const spot = useSelector(state => state.spots.singleSpot)

    useEffect(() => {
        dispatch(fetchOneSpot(spotId))
    }, [dispatch, spotId])

    if (!spot) {
        console.log('spot not found')
        return null
    };

    let previewImage = [];
    let otherImages = [];

    if (spot.SpotImages && spot.SpotImages.length > 0) {
        previewImage = spot.SpotImages.find(image => image.preview === true)
        otherImages = spot.SpotImages.filter(image => image.preview === false)
    }

    const handleReserveBtn = () => {
        alert('Feature coming soon...')
    }


    return (
        <div className="spot-page">
            <div className="spot-name-loco">
            <h1>{spot.name}</h1>
            <h4>{spot.city}, {spot.state}, {spot.country}</h4>
            </div>
            <div className="spot-images">
                <div className="big-img">
                <img className="preview-img" src={previewImage ? previewImage : 'https://thumbs.dreamstime.com/b/no-image-available-icon-flat-vector-no-image-available-icon-flat-vector-illustration-132482953.jpg'}></img>
                </div>
                 <div className="small-images">
                    {otherImages < 0 && otherImages.map(image =>
                        <img key={image.id} src={image.url}></img>
                        )}
                 </div>
            </div>
            <div className="hosted-reserve">
                <div className="hosted-container">
                <h3>Hosted by {spot.Owner.firstName} {spot.Owner.lastName}</h3>
                <p>{spot.description}</p>
                </div>
                <div className="reserve-container">
                    <span>${spot.price} /night</span>
                    <span><i className="fa-solid fa-star"></i>{spot.avgStarRating <= 5 ? spot.avgStarRating : 'New'}</span>
                    <span>{spot.numReviews} Reviews</span>
                    <div className="button-container">
                        <button onClick={handleReserveBtn}>Reserve</button>
                    </div>
                </div>
            </div>
        </div>


    )
}

export default ViewSingleSpot
