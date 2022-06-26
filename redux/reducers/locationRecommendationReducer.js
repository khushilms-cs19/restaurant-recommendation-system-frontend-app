import { actionContants } from "../actions/actions"

const initial_state = []

const locationRecommendationReducer = (state = initial_state, action) => {
    switch (action.type) {
        case actionContants.UPDATE_LOCATION_RECOMMENDATION:
            return [
                ...action.payload
            ];
        default: return state;
    }
}

export default locationRecommendationReducer;