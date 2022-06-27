import { configureStore } from "@reduxjs/toolkit";
import { combineReducers, legacy_createStore as createStore } from "redux";
import allAreasReducer from "./reducers/allAreasReducer";
import allLocationsReducer from "./reducers/allLocationReducers";
import locationRecommendationReducer from "./reducers/locationRecommendationReducer";
import reviewRecommendationReducer from "./reducers/reviewRecommendationReducer";

const rootReducer = combineReducers({
    allLocations: allLocationsReducer,
    locationRecommendations: locationRecommendationReducer,
    reviewRecommendation: reviewRecommendationReducer,
    allAreas: allAreasReducer,
});

const store = createStore(rootReducer);
export default store;