import { csrfFetch } from "./csrf";

const LOAD_SPOTS = 'spots/loadSpots';
const VIEW_SPOT = 'spots/viewSpot';
const CREATE_SPOT = 'spots/createSpot'
const ADD_SPOTIMAGE = 'spots/addSpotImage'
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

export const addSpotImage = (image) => ({
    type: ADD_SPOTIMAGE,
    image
})

export const deleteSpot = (spot) => ({
    type: DELETE_SPOT,
    spot
})

export const editSpot = (spot) => ({
    type: EDIT_SPOT,
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
    console.log('spot From Thunk ===>', spot)
    const response = await csrfFetch('/api/spots', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(spot)
    });

    if (response.ok) {
        const newSpot = await response.json()
        console.log('New Spot From Thunk:', newSpot)
        dispatch(createSpot(newSpot))
        return newSpot
    }

}

// export const addSpotImageThunk = (image, id) => async dispatch => {
//     const response = await csrfFetch(`/api/spots/${id}/images`, {
//         method: 'POST',
//         body: JSON.stringify(image)
//     })
//     if (response.ok) {
//         const newImage = await response.json()
//         dispatch(addSpotImage(newImage))
//         return newImage
//     }

// }

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


const initialState = { allSpots: null, singleSpot: null }

const spotsReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case LOAD_SPOTS:
            newState = { ...state, allSpots: { ...state.allSpots }, singleSpot: { ...state.singleSpot}}
            const spots = action.spots.Spots
            spots.forEach(spot => {
                newState.allSpots[spot.id] = spot
            })
            return newState

        case VIEW_SPOT:
            newState = {...state, singleSpot: {}};
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
            delete newState.allSpots[action.spotId]
            return newState;

        case EDIT_SPOT:
            newState = { ...state, allSpots: { ...state.allSpots } }
            newState.allSpots[action.spot.id] = action.spot
            return newState;


            // case DELETE_SPOT:
            //     const newState = { ...state, allSpots: { ...state.allSpots }, singleSpot: {} }
            //     delete newState.allSpots[action.spotId]
            //     return newState

            default:
                return state;
            }
        };

        export default spotsReducer;

        // case ADD_SPOTIMAGE:
        //     newState = { ...state, allSpots: { ...state.allSpots }, singleSpot: { ...state.singleSpot } };
        //     newState.singleSpot.Spotimages.push(action.image)
        //     return newState
