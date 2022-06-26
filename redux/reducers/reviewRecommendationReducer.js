import { actionContants } from "../actions/actions";

const initial_state = [];

const reviewRecommendationReducer = (state = initial_state, action) => {
    switch (action.type) {
        case actionContants.UPDATE_REVIEW_RECOMMENDATION:
            return [
                ...action.payload
            ]
        default: return state;
    }
}

export default reviewRecommendationReducer;