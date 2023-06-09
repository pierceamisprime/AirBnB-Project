import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { getReviewsThunk } from "../../store/reviews"
import { fetchOneSpot } from "../../store/spots"
import SpotReviews from "./SpotReviews"
import './ViewSingleSpot.css'

const ViewSingleSpot = () => {
    const { spotId } = useParams()
    const dispatch = useDispatch()

    const spot = useSelector(state => state.spots.singleSpot)
    const reviewsObj = useSelector(state => state.reviews.spot)
    // const user = useSelector(state => state.session.user)
    // console.log('Reviews:', reviewsObj)
    const reviews = Object.values(reviewsObj)


    useEffect(() => {
        dispatch(fetchOneSpot(spotId))
    }, [dispatch, spotId])

    useEffect(() => {
        dispatch(getReviewsThunk(spotId))

    }, [dispatch, spotId])

    if (!spot) {
        console.log('spot not found')
        return null
    };


    const handleReserveBtn = () => {
        alert('Feature coming soon...')
    }

    const Spotimages = spot?.Spotimages?.sort((a, b) => a.id - b.id)


    return (

        <div className="spot-page">
            <div className="spot-name-loco">
                <h1 className="spot-name">{spot.name}</h1>
                <h4>{spot.city}, {spot.state}, {spot.country}</h4>
            </div>
            {spot.Spotimages &&
                <div className="spot-images">
                    <div className="big-img">
                        <img className="preview-img-single" src={Spotimages[0]?.url}></img>
                    </div>
                    <div className="small-images">
                        <img className="small-images-size" src={Spotimages[1]?.url} />
                        <img className="small-images-size" src={Spotimages[2]?.url} />
                        <img className="small-images-size" src={Spotimages[3]?.url} />
                        <img className="small-images-size" src={Spotimages[4]?.url} />
                    </div>
                </div>}
            <div className="hosted-reserve">
                <div className="hosted-container">
                    <h3>Hosted by {spot.Owner?.firstName} {spot.Owner?.lastName}</h3>
                    <p>{spot.description}</p>
                </div>
                <div className="reserve-container">
                    <div className="reserve-info">
                        <span className="price-single">${parseFloat(spot.price).toFixed(2)}     night</span>
                        <div className="reserve-star-reviews">
                        <span className="star-single"><i className="fa-solid fa-star"></i>{spot.avgStarRating <= 5 ? parseFloat(spot.avgStarRating).toFixed(1) : 'New'}</span><span>•</span>
                        <span className="reviews-single">#{spot.numReviews} {spot.numReviews > 1 ? "reviews" : "review"}</span>
                        </div>

                    </div>

                    <div className="button-container">
                        <button className="reserve-button" onClick={handleReserveBtn}>Reserve</button>
                    </div>
                </div>
            </div>
            <div className="spot-reviews-details">
                {reviews.length ?
                    <>
                        <h3><i className="fa-solid fa-star"></i> {parseFloat(spot.avgStarRating).toFixed(1)} • {spot.numReviews} {spot.numReviews > 1 ? "reviews" : "review"}</h3>
                        <SpotReviews reviews={reviews} spotId={spotId} />
                    </>
                    : <>
                        <h3><i className="fa-solid fa-star"></i> New</h3>
                        <SpotReviews reviews={reviews} new={true} spotId={spotId} />
                    </>
                }
            </div>
        </div>


    )
}

export default ViewSingleSpot
