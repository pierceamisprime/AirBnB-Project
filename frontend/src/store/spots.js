import { csrfFetch } from "./csrf";

const LOAD_SPOTS = 'spots/loadSpots';
const VIEW_SPOT = 'spots/viewSpot'

export const loadSpots = (spots) => ({
    type: LOAD_SPOTS,
    spots
});

export const viewSpot = (spot) => ({
    type: VIEW_SPOT,
    spot
});

export const fetchSpots = () => async dispatch => {
    const response = await csrfFetch('/api/spots');

    if (response.ok) {
        const spots = await response.json()
        dispatch(loadSpots(spots))
        return spots
    }
};

export const fetchOneSpot = (spotId) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spotId}`)

    if (response.ok) {
        const spot = await response.json()
        dispatch(viewSpot(spot))
        return spot
    }
};


const initialState = {}

const spotsReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case LOAD_SPOTS: {
            newState = {...state, ...action.spots};
            return newState
        }
        case VIEW_SPOT: {
            newState = {...state, [action.spot.id]: action.spot}
            return newState
        }
        default:
            return state;
    }
};

export default spotsReducer;
