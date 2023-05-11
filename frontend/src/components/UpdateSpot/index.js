import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import SpotForm from '../CreateSpot/SpotForm';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOneSpot } from '../../store/spots';

const EditSpot = () => {
    const dispatch = useDispatch();
    const { spotId } = useParams();
    const spotToEdit = useSelector(state => state.spots.allSpots[spotId]);
    console.log(spotToEdit);

    useEffect(() => {
        dispatch(fetchOneSpot(spotId));
    }, [dispatch, spotId])

    if (!spotToEdit) return null;

    // const spot = {
    //     country,
    //     address,
    //     city,
    //     state,
    //     lat,
    //     lng,
    //     description,
    //     name,
    //     price,
    //     previewImage
    // }


    return (
        <SpotForm spot={spotToEdit} formType={'put'} />
    )
};

export default EditSpot;
