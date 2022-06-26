import { StatusBar } from 'expo-status-bar';
import { Animated, StyleSheet, Text, View, Image } from 'react-native';
import { useEffect, useState, useRef } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AppLoading from 'expo-app-loading';
import MainScreen from './componets/MainScreen';
import * as Font from "expo-font";
import LocationRecommendationScreen from "./componets/LocationRecommendationSceen";
import RatingRecommendationScreen from './componets/RatingRecommendationScreen';
import ReviewRecommendationScreen from './componets/ReviewRecommendationScreen';
import { Provider } from 'react-redux';
import useRequests from './hooks/useRequest';
import { useDispatch } from 'react-redux';
import { actionContants } from './redux/actions/actions';
import store from './redux/store';
import axios from "axios";
const Stack = createNativeStackNavigator();
const MainApplication = () => {
    const dispatch = useDispatch();
    const updateAllLocations = (data) => {
        dispatch({
            type: actionContants.UPDATE_ALL_LOCATIONS,
            payload: data,
        })
    }
    const { doRequest, errors, isLoading } = useRequests("/get-locations", null, updateAllLocations, null);
    useEffect(async () => {
        const response = await axios({
            method: "GET",
            url: `http://localhost:9000/get-locations`,
            data: null,
        });
        console.log(response);
    }, [])
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Home" component={MainScreen} options={{ headerShown: false }} />
                <Stack.Screen name="LocationRec" component={LocationRecommendationScreen} options={{ headerShown: true, headerTitle: "Location Based Recommendation", headerStyle: { backgroundColor: "rgba(255,100,0,1.0)" } }} />
                <Stack.Screen name="ReviewRec" component={ReviewRecommendationScreen} options={{ headerTitle: "Review Based Recommendation", headerStyle: { backgroundColor: "rgba(255,100,0,1.0)", fontFamily: "happy-food" } }} />
                <Stack.Screen name="RatingRec" component={RatingRecommendationScreen} options={{
                    headerTitle: "Rating Based Recommendation",
                    headerStyle: { backgroundColor: "rgba(255,100,0,1.0)" },
                }} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default MainApplication

const styles = StyleSheet.create({})