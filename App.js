import { StatusBar } from 'expo-status-bar';
import { Animated, StyleSheet, Text, View, Image } from 'react-native';
import { useEffect, useState, useRef } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AppLoading from 'expo-app-loading';
import MainScreen from './componets/MainScreen';
import * as Font from "expo-font";

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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        padding: 20,
        fontFamily: "happy-food",
        backgroundColor: "rgba(255,200,0,1.0)",
    },
    title: {
        fontFamily: "happy-food",
        fontSize: "20px",
        textAlign: "center",
        color: "rgba(255,200,0,1.0)"
    },
    titleContainer: {
        backgroundColor: "rgba(255,0,0,1.0)",
        padding: 10,
        borderRadius: 10,
    },
    loading: {
        width: "50px",
        height: "50px",
        borderRadius: "50%",
        borderColor: "black",
        borderBottomWidth: "0px",
        borderLeftWidth: "0px",
        borderRightWidth: "5px",
        borderTopWidth: "5px",
    },
    logos: {
        width: "50px",
        minHeight: "50px",
        borderRadius: "10px",
    },
    logosContainer: {
        padding: 10,
        marginVertical: 20,
        width: '100%',
        height: "10%",
        flexDirection: "row",
        justifyContent: "space-between",
    }
});
