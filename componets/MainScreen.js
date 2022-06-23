import { StyleSheet, Text, View, Image, TextInput, Animated } from 'react-native'
import React, { useEffect, useRef, useState } from 'react';
import { FontAwesome } from '@expo/vector-icons';


const DUMMY_DATA = [
    "Truffles",
    "Pai Vihar",
    "Shanti Sagar",
    "KFC",
    "McDonalds",
    "Socials",
    "Brik Oven",
    "Udipi Uphar",
]


const DropDownItem = (props) => {
    return <View style={styles.dropdownitem}>
        <Text>{props.name}</Text>
    </View>
}

const MainScreen = () => {
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const popInAnim = useRef(new Animated.Value(-200)).current;
    const popOutAnim = useRef(new Animated.Value(0)).current;
    const [restaurant, setRestaurant] = useState("asdf");
    const handleRestaurantText = (text) => {
        if (text.length === 1) {
            popOutSearch();
        } else if (text.length === 0) {
            popInSearch();
        }
        setRestaurant(text);
    }
    const filteredRestaurants = DUMMY_DATA.filter((ele) => {
        // console.log(ele.toLowerCase());
        return ele.toLowerCase().includes(restaurant.toLowerCase());
    })
    const fadeIn = () => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true,
        }).start();
    }
    const popIn = () => {
        Animated.timing(popInAnim, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: true,
        }).start();
    }
    const popOutSearch = () => {
        Animated.timing(popOutAnim, {
            toValue: 100,
            duration: 500,
            useNativeDriver: true,
        }).start();
    }
    const popInSearch = () => {
        Animated.timing(popOutAnim, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
        }).start();
    }
    useEffect(() => {
        fadeIn();
        popIn();
    }, [])
    return (
        <View style={styles.container}>
            <Animated.View style={[styles.titleContainer, { transform: [{ translateY: popInAnim }] }]}>
                <Text style={[styles.title, { fontSize: "25px", transform: [{ translateY: popInAnim }] }]}>Hi !!</Text>
                <Text style={styles.title}>This is a restaurant recommendation app.</Text>
            </Animated.View>
            <Animated.View style={[styles.logosContainer, { opacity: fadeAnim }]}>
                <Image source={require("../assets/images/index.jpg")} style={styles.logos} />
                <Image source={require("../assets/images/Kfc_logo.png")} style={styles.logos} />
                <Image source={require("../assets/images/star.png")} style={styles.logos} />
                <Image source={require("../assets/images/McDonalds-logo.png")} style={styles.logos} />
            </Animated.View>
            <View style={{ width: "90%" }}>
                <View style={{ backgroundColor: "rgba(255,200,0,1.0)" }}>
                    <View style={styles.textInputContainer}>
                        <TextInput style={styles.searchRestaurantText} placeholder={"Search a restaurant..."} onChangeText={handleRestaurantText} />
                        <Animated.View style={{ transform: [{ translateX: popOutAnim }] }}>
                            <FontAwesome name="search" size={24} color="black" />
                        </Animated.View>
                    </View>
                </View>
                <View style={styles.dropDownContainer}>
                    {
                        restaurant.length !== 0 &&
                        filteredRestaurants.map((rest, index) => {
                            return (<DropDownItem name={rest} key={index} />)
                        })
                    }
                </View>
            </View>
        </View >
    )
}

export default MainScreen;

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
    },
    textInputContainer: {
        backgroundColor: "rgba(255,255,255,1.0)",
        flexDirection: "row",
        alignItems: 'center',
        paddingHorizontal: 10,
        borderRadius: 20,
        overflow: "hidden",
    },
    searchRestaurantText: {
        width: '100%',
        height: "40px",
        backgroundColor: "rgba(255,255,255,1.0)",
        borderWidth: 2,
        borderColor: "white",
        borderRadius: "20px",
        fontSize: "17px",
        paddingVertical: 5,
        paddingHorizontal: 15,
        "&:focus": {
            border: "none",
        }
    },
    dropdownitem: {
        width: "90%",
        height: "30px",
        fontSize: "15px",
        backgroundColor: "rgba(255,255,255,0.5)",
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderBottomColor: "rgba(0,0,0,0.3)",
        borderBottomWidth: 2,
    },
    dropDownContainer: {
        marginTop: 4,
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
    }
})