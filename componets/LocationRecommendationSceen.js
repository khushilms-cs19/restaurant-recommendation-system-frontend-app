import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from "axios";
import { actionContants } from '../redux/actions/actions';
import RestaurantItem from './RestaurantItem';

const DUMMYDATA = [
    {
        name: "Truffles",
        location: "Saint Marks Road",
        rating: "4.5",
        cuisine: ["Burgers", "Pastas", "Italian", "Pastries"],
    },
    {
        name: "Shanti Sagar",
        location: "Vital Nagraj Road",
        rating: "4.3",
        cuisine: ["North Indian", "South Indian", "Chinese"],
    },
]

const Dummy = DUMMYDATA.map((ele) => {
    let cuis = "";
    ele.cuisine.forEach((c) => {
        cuis += c + ", ";
    })
    ele.cuisine = cuis;
    return ele;
})
const RecommendationScreen = () => {
    const dispatch = useDispatch();
    const fetchRestLocation = async (name) => {
        const response = await axios({
            method: "GET",
            url: `http://localhost:9000/restaurant-on-location?location=${name}`,
            data: null,
        });
        console.log(response);
        dispatch({
            type: actionContants.UPDATE_LOCATION_RECOMMENDATION,
            payload: response.data.data,
        })
    }
    useEffect(() => {
        // fetchRestLocation("Whitefield");
    }, [])
    const locationRecommendation = useSelector((state) => state.locationRecommendations);
    locationRecommendation.sort((a, b) => b["Mean Rating"] - a["Mean Rating"]);
    return (
        <ScrollView contentContainerStyle={styles.container}>
            {
                locationRecommendation.map((rest, index) => {
                    return (
                        <RestaurantItem rest={rest} key={index} />

                    )
                })
            }
        </ScrollView>
    )
}

export default RecommendationScreen;

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        alignItems: "center",
        backgroundColor: "rgba(255,200,0,1.0)",
        padding: 20,
    },
})