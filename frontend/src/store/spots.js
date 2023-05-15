import { csrfFetch } from "./csrf";

const LOAD_SPOTS = 'spots/loadSpots';
const VIEW_SPOT = 'spots/viewSpot';
const CREATE_SPOT = 'spots/createSpot'
const USER_SPOTS = 'spots/userSpots'
const DELETE_SPOT = 'spots/deleteSpot'
const EDIT_SPOT = 'spots/editSpot'

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

export const deleteSpot = (spot) => ({
    type: DELETE_SPOT,
    spot
})

export const editSpot = (spot) => ({
    type: EDIT_SPOT,
    spot
})

export const userSpots = (spots) => ({
    type: USER_SPOTS,
    spots
})

export const fetchSpots = () => async dispatch => {
    const response = await csrfFetch('/api/spots');

    if (response.ok) {
        const spots = await response.json()
        // console.log('spots ===>', spots)
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

export const createNewSpot = (spot, spotImages) => async dispatch => {
    console.log('spot From Thunk ===>', spot)
    const response = await csrfFetch('/api/spots', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(spot)
    });

    if (response.ok) {
        const newSpot = await response.json()
        console.log('New Spot From Thunk:', newSpot)
        console.log('images from thunk===>', spotImages)
        for (let i = 0; i < spotImages.length; i++) {
            await csrfFetch(`/api/spots/${newSpot.id}/images`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(spotImages[i])
            })
        }

        dispatch(createSpot(newSpot))
        return newSpot
    }

}


export const deleteSpotThunk = (spotId) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spotId}`, {
        method: 'DELETE'
    })
    if (response.ok) {
        dispatch(deleteSpot(spotId))
    }
}

export const editSpotThunk = (spot, spotId) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spotId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(spot)

    })
    if (response.ok) {
        const editedSpot = await response.json();
        dispatch(editSpot(editedSpot))
        return editedSpot
    }
}

export const userSpotsThunk = () => async dispatch => {
    const response = await csrfFetch('/api/spots/current')

    if (response.ok) {
        const spots = await response.json()
        dispatch(userSpots(spots))
        return spots
    }
}


const initialState = { allSpots: {}, singleSpot: {} }

const spotsReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case LOAD_SPOTS:
            newState = { ...state, allSpots: { ...state.allSpots }, singleSpot: {}}
            const spots = action.spots.Spots
            spots.forEach(spot => {
                newState.allSpots[spot.id] = spot
            })
            return newState

        case VIEW_SPOT:
            newState = {...state, allSpots: {...state.allSpots}, singleSpot: {}};
            newState.singleSpot = action.spot;
            return newState;


        case CREATE_SPOT:
            newState = {...state, allSpots: {...state.allSpots}};
            const spot = action.spot
            newState.singleSpot = spot
            newState.allSpots[spot.id] = spot
            return newState;


        case DELETE_SPOT:
            newState = {...state, allSpots: { ...state.allSpots}, singleSpot: {}}
            delete newState.allSpots[action.spot]
            return newState;

        case EDIT_SPOT:
            newState = { ...state, allSpots: { ...state.allSpots } }
            newState.allSpots[action.spot.id] = action.spot
            return newState;

        case USER_SPOTS:
            newState = { allSpots: {}}
            action.spots.Spots.forEach((spot) => {
                newState.allSpots[spot.id] = spot
            })
            return newState;

            default:
                return state;
            }
        };

        export default spotsReducer;
