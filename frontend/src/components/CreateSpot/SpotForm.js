//you are creating this form page next!!
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { createNewSpot, editSpotThunk } from '../../store/spots';
import './SpotForm.css';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';



const SpotForm = ({ spot, formType }) => {
  const { spotId } = useParams()
  const history = useHistory()
  const dispatch = useDispatch()
  const [country, setCountry] = useState(spot?.country || '')
  const [address, setAddress] = useState(spot?.address || '')
  const [city, setCity] = useState(spot?.city || '')
  const [state, setState] = useState(spot?.state || '')
  const [lat, setLatitude] = useState(1)
  const [lng, setLongitude] = useState(1)
  const [description, setDescription] = useState(spot?.description || '')
  const [name, setName] = useState(spot?.name || '')
  const [price, setPrice] = useState(spot?.price || '')
  const [previewImg, setPreviewImg] = useState('');
  const [image1, setImage1] = useState('');
  const [image2, setImage2] = useState('');
  const [image3, setImage3] = useState('');
  const [image4, setImage4] = useState('');
  const [errors, setErrors] = useState({});


  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({})

    let errors = {}
    if (!country.length) errors.country = "Country is required"
    if (!address.length) errors.address = "Address is required"
    if (!city.length) errors.city = "City is required"
    if (!state.length) errors.state = "State is required"
    if (description.length < 30) errors.description = "Description needs a minimum of 30 characters"
    if (!name.length) errors.name = "Name is required"
    if (price < 1) errors.price = "Price is required"
    if (!previewImg) errors.preview = "Preview image is required"
    if (!(previewImg.endsWith('.jpg') || previewImg.endsWith('.png') || previewImg.endsWith('.jpeg')) && previewImg) errors.preview = "Image URL must end in .png, .jpg, or .jpeg"
    if (!(image1.endsWith('.jpg') || image1.endsWith('.png') || image1.endsWith('.jpeg')) && image1) errors.image1 = "Image URL must end in .png, .jpg, or .jpeg"
    if (!(image2.endsWith('.jpg') || image2.endsWith('.png') || image2.endsWith('.jpeg')) && image2) errors.image2 = "Image URL must end in .png, .jpg, or .jpeg"
    if (!(image3.endsWith('.jpg') || image3.endsWith('.png') || image3.endsWith('.jpeg')) && image3) errors.image3 = "Image URL must end in .png, .jpg, or .jpeg"
    if (!(image4.endsWith('.jpg') || image4.endsWith('.png') || image4.endsWith('.jpeg')) && image4) errors.image4 = "Image URL must end in .png, .jpg, or .jpeg"
    setErrors(errors)

    const spotImages = []
    if (previewImg) spotImages.push({url: previewImg, preview: true})
    if (image1) spotImages.push({url: image1, preview: false})
    if (image2) spotImages.push({url: image2, preview: false})
    if (image3) spotImages.push({url: image3, preview: false})
    if (image4) spotImages.push({url: image4, preview: false})

    const spotForThunk = {
        country,
        address,
        city,
        state,
        description,
        name,
        price,
        lat,
        lng,
        // spotImages: spotImages

    }


    if (Object.values(errors).length) {
        return null
    }


    let newSpot;
    if (formType === 'put') {
            newSpot = await dispatch(editSpotThunk(spotForThunk, spotId))
            history.push(`/spots/${newSpot.id}`)
            // console.log(newSpot)
        } else {
      newSpot = await dispatch(createNewSpot(spotForThunk, spotImages))
      if (newSpot) {
          history.push(`/spots/${newSpot.id}`)

        }
    }

    // if (newSpot.id) {

        //     await dispatch(addSpotImageThunk({ url: previewImg, preview: true }, newSpot.id))

        //     spotImages.forEach(async (image) => {
            //         await dispatch(addSpotImageThunk({ url: image, preview: false}, newSpot.id))
            //     })
            // }


        };

  return (
    <form id={formType} onSubmit={handleSubmit}>
        <h1>{formType === 'post' ? 'Create a new Spot' : 'Update your Spot'}</h1>
        <div className='form'>
            <div className="form-where">
                <h2>Where's your place located?</h2>
                <p>Guests will only get your exact address once they booked a reservation.</p>
                <label>
                    Country
                    <input
                    type="text"
                    value={country}
                    placeholder='Country'
                    onChange={(e) => setCountry(e.target.value)}
                    />
                </label>
                    <p className="display-errors">{errors.country}</p>
                <label>
                    Street Address
                    <input
                    type='text'
                    value={address}
                    placeholder='Address'
                    onChange={(e) => setAddress(e.target.value)}
                    />
                </label>
                <p className="display-errors">{errors.address}</p>
                <div className='form-city-state'>
                    <label id='city'>
                        City
                        <input
                        type='text'
                        value={city}
                        placeholder='City'
                        onChange={(e) => setCity(e.target.value)}
                        />
                    </label>
                    <span></span>
                    <label id='state'>
                        State
                        <input
                        type='text'
                        value={state}
                        placeholder='State'
                        onChange={(e) => setState(e.target.value)}
                        />
                    </label>
                </div>
                   <p className="display-errors">{errors.city}</p>
                    <p className="display-errors">{errors.state}</p>
                <div className='form-lat-lng'>
                    <label id='lat'>
                        Latitude
                        <input
                        type='number'
                        value={lat}
                        placeholder='Latitude'
                        onChange={(e) => setLatitude(e.target.value)}
                        />
                    </label>
                    <span> , </span>
                    <p className="display-errors">{errors.latitude}</p>
                    <label id='lng'>
                        Longitude
                        <input
                        type='number'
                        value={lng}
                        placeholder='Longitude'
                        onChange={(e) => setLongitude(e.target.value)}
                        />
                    </label>
                    <p className="display-errors">{errors.longitude}</p>
                </div>
            </div>
            <div className='form-description'>
                <h2>Describe your place to guests</h2>
                <p>Mention the best feature of your space, any special amenities like fast wifi or parking, and what you love about the neighborhood.</p>
                <label>
                    <textarea
                    value={description}
                    placeholder='Please write at least 30 characters'
                    onChange={(e) => setDescription(e.target.value)}
                    minLength={30}
                    />
                </label>
                <p className="display-errors">{errors.description}</p>
            </div>
            <div className='form-title'>
                <h2>Create a title for your spot</h2>
                <p>Catch guests' attention with a spot title that highlights what makes your place special.</p>
                <label>
                    <input
                    type='text'
                    value={name}
                    placeholder='Name of your spot'
                    maxLength={50}
                    onChange={(e) => setName(e.target.value)}
                    />
                </label>
                <p className="display-errors">{errors.name}</p>
            </div>
            <div className='form-price'>
                <h2>Set a base price for your spot</h2>
                <p>Competitive pricing can help your listing stand out and rank higher in search results.</p>
                <label>
                    $ <input
                    type='number'
                    value={price}
                    placeholder='Price per night (USD)'
                    onChange={(e) => setPrice(e.target.value)}
                    min={0}
                    />
                </label>
                <p className="display-errors">{errors.price}</p>
            </div>
            {formType !== 'put' &&
            <div className='form-images'>
                <h2>Liven up your spot with photos</h2>
                <p>Submit a link to at least one photo to publish your spot</p>
                <label>
                    <input
                    type='text'
                    value={previewImg}
                    placeholder='Preview Image URL'
                     onChange={(e) => setPreviewImg(e.target.value)}
                    />
                </label>
                <p className='display-errors'>{errors.preview}</p>
                <label>
                    <input
                    type='text'
                    placeholder='Image URL'
                    value={image1}
                    onChange={(e) => setImage1(e.target.value)}
                    />
                </label>
                <p className='display-errors'>{errors.image1}</p>
                <label>
                    <input
                    type='text'
                    placeholder='Image URL'
                    value={image2}
                    onChange={(e) => setImage2(e.target.value)}
                    />
                </label>
                <p className='display-errors'>{errors.image2}</p>
                <label>
                    <input
                    type='text'
                    placeholder='Image URL'
                    value={image3}
                    onChange={(e) => setImage3(e.target.value)}
                    />
                </label>
                <p className='display-errors'>{errors.image3}</p>
                <label>
                    <input
                    type='text'
                    placeholder='Image URL'
                    value={image4}
                    onChange={(e) => setImage4(e.target.value)}
                    />
                </label>
                <p className='display-errors'>{errors.image4}</p>
            </div>}
        </div>
        <div className='form-button-house'>
            <button type='submit'>Create Spot</button>
        </div>
    </form>
  );
};

export default SpotForm;
