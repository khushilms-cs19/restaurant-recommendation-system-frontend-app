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

const Stack = createNativeStackNavigator();

const fetchFonts = () => {
    return Font.loadAsync({
        "happy-food": require("./assets/fonts/Happy-Food.ttf"),
        "happy-food-italics": require("./assets/fonts/Happy-Food-Italic.ttf")
    })
}

export default function App() {
    const [fontsFetched, setFontsFetched] = useState(false);
    if (fontsFetched) {
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
        );
    } else {
        return (
            <AppLoading
                startAsync={fetchFonts}
                onError={() => {
                    setFontsFetched(false);
                }}
                onFinish={() => {
                    setFontsFetched(true);
                }}
            />
        );
    }
}

const styles = StyleSheet.create({});
