import { actionContants } from "../actions/actions"

const initial_state = []

const allLocationsReducer = (state = initial_state, action) => {
    console.log(action);
    switch (action.type) {
        case actionContants.UPDATE_ALL_LOCATIONS:
            return [
                ...action.payload
            ]

        default: return state;
    }
}

export default allLocationsReducer;