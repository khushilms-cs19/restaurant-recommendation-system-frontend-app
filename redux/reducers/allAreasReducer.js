import { actionContants } from "../actions/actions";

const initial_state = [];

const allAreasReducer = (state = initial_state, action) => {
    switch (action.type) {
        case actionContants.UPDATE_ALL_AREAS:
            return [
                ...action.payload
            ];
        default: return state;
    }
}
export default allAreasReducer;