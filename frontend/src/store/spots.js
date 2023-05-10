import { csrfFetch } from "./csrf";

const LOAD_SPOTS = 'spots/loadSpots';
const VIEW_SPOT = 'spots/viewSpot';
const CREATE_SPOT = 'spots/createSpot'

export const loadSpots = (spots) => ({
    type: LOAD_SPOTS,
    spots
});

export const viewSpot = (spot) => ({
    type: VIEW_SPOT,
    spot
});

export const createSpot = (spot) => ({
    type: CREATE_SPOT,
    spot
})

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
        console.log('Spot from fetch:', spot)
        dispatch(viewSpot(spot))
        return spot
    }
};

export const createNewSpot = (spot) => async dispatch => {
    const response = await csrfFetch('/api/spots', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(spot)
    });

    if (response.ok) {
        const newSpot = await response.json()
        dispatch(createSpot(newSpot))
        return newSpot
    }

}


const initialState = { allSpots: null, singleSpot: null}

const spotsReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case LOAD_SPOTS:
            newState = { ...state, allSpots: { ...state.allSpots }, singleSpot: null}
            const spots = action.spots.Spots
            spots.forEach(spot => {
                newState.allSpots[spot.id] = spot
            })
            return newState

        case VIEW_SPOT:
            newState = {...state, allSpots: { ...state.allSpots }, singleSpot: { ...state.singleSpot }}
            newState.singleSpot = action.spot
            return newState

        case CREATE_SPOT:
            newState = { ...state, allSpots: { ...state.allSpots }, singleSpot: { ...state.singleSpot }}
            newState.singleSpot = action.spot
            return newState

        default:
            return state;
    }
};

export default spotsReducer;
