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
import MainApplication from './MainApplication';

const fetchFonts = () => {
    return Font.loadAsync({
        "happy-food": require("./assets/fonts/Happy-Food.ttf"),
        "happy-food-italics": require("./assets/fonts/Happy-Food-Italic.ttf")
    })
}

export default function App() {
    const [fontsFetched, setFontsFetched] = useState(false);
    if (!fontsFetched) {
        return <AppLoading
            startAsync={fetchFonts}
            onError={() => {
                setFontsFetched(false);
            }}
            onFinish={() => {
                setFontsFetched(true);
            }}
        />
    }
    return (
        <Provider store={store}>
            <MainApplication />
        </Provider>
    );
}

const styles = StyleSheet.create({});
