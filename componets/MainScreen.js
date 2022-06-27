import { StyleSheet, Text, View, Image, TextInput, Animated, TouchableOpacity } from 'react-native'
import React, { useEffect, useRef, useState } from 'react';
import { FontAwesome } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import { useSelector } from "react-redux"
import { actionContants } from '../redux/actions/actions';
import axios from "axios";
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

const DUMMY_LOCATION = [
    'Rajajinagar',
    "Malleswaram",
    "Basaveswarnagar",
    "Sadashivnagar",
    "Banashankari",
    "Basavangudi",
    "Indiranagar",
    "Halsuru",
    "Hebbal",
    "Nehrunagar"
]

const DropDownItem = (props) => {
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
    const fetchRestReview = async (name) => {
        const response = await axios({
            method: "GET",
            url: `http://localhost:9000/recommend-me?restname=${name}`,
            data: null,
        });
        console.log(response);
        dispatch({
            type: actionContants.UPDATE_REVIEW_RECOMMENDATION,
            payload: response.data.data,
        })
    }
    return <TouchableOpacity style={styles.dropdownitem} onPress={() => {
        if (props.type === "restaurant") {
            fetchRestReview(props.name);
        } else {
            fetchRestLocation(props.name);
        }
        props.goToNext()
    }}>
        <Text>{props.name}</Text>
    </TouchableOpacity>
}

const MainScreen = ({ navigation }) => {
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const popInAnim = useRef(new Animated.Value(-200)).current;
    const popOutAnim = useRef(new Animated.Value(0)).current;
    const searchBasedAnim = useRef(new Animated.Value(-400)).current;
    const textBoxAnim = useRef(new Animated.Value(-100)).current;
    const [restaurant, setRestaurant] = useState("");
    const [activeTextBox, setActiveTextBox] = useState("location");
    const [location, setLocation] = useState("");
    const allAreas = useSelector((state) => state.allAreas);
    const allLocations = useSelector((state) => state.allLocations);
    const handleLocationText = (text) => {
        if (text.length === 1) {
            popOutSearch();
        } else if (text.length === 0) {
            popInSearch();
        }
        setLocation(text);
    }
    const handleRestaurantText = (text) => {
        if (text.length === 1) {
            popOutSearch();
        } else if (text.length === 0) {
            popInSearch();
        }
        setRestaurant(text);
    }
    let filteredLocations;
    let filteredRestaurants;
    if (activeTextBox == "location") {
        filteredLocations = allAreas.filter((ele) => {
            return ele.toLowerCase().includes(location.toLowerCase());
        });
    } else {
        filteredRestaurants = allLocations.filter((ele) => {
            return ele.toLowerCase().includes(restaurant.toLowerCase());
        });
    }

    const fadeIn = () => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1000,
            delay: 1000,
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
            duration: 300,
            useNativeDriver: true,
        }).start();
    }
    const popInSearch = () => {
        Animated.timing(popOutAnim, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
        }).start();
    }
    const popInSearchBased = () => {
        Animated.timing(searchBasedAnim, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: true,
        }).start();
    }
    const popInSeachText = () => {
        Animated.timing(textBoxAnim, {
            toValue: 0,
            duration: 500,
            delay: 1000,
            useNativeDriver: true,
        }).start();
    }

    const selectLocation = () => {
        setActiveTextBox("location");
    }
    const selectReview = () => {
        setActiveTextBox("review");
    }

    useEffect(() => {
        fadeIn();
        popIn();
        popInSearchBased();
        popInSeachText();
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
            <Animated.View style={{ width: "100%", transform: [{ translateY: searchBasedAnim }] }}>
                <Animated.View style={[styles.searchBasedContainer]}>
                    <Text style={styles.searchBasedTitle}>Search Based On...</Text>
                    <View style={styles.searchBasedButtonContainer}>
                        <TouchableOpacity style={styles.searchBasedButton} onPress={selectLocation}>
                            <Text style={styles.searchBasedButtonText}>Location</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.searchBasedButton}>
                            <Text style={styles.searchBasedButtonText} onPress={() => navigation.navigate("RatingRec")}>Rating</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.searchBasedButton} onPress={selectReview}>
                            <Text style={styles.searchBasedButtonText}>Review</Text>
                        </TouchableOpacity>
                    </View>
                </Animated.View>
                <View style={{ backgroundColor: "rgba(255, 200, 0, 1.0)", transform: [{ translateY: textBoxAnim }] }}>
                    {
                        activeTextBox === "location" ?
                            <View style={styles.textInputContainer}>
                                <TextInput style={styles.searchRestaurantText} placeholder={"Search a Location..."} onChangeText={handleLocationText} value={location} />
                                <Animated.View style={{ transform: [{ translateX: popOutAnim }] }}>
                                    <FontAwesome name="search" size={24} color="black" />
                                </Animated.View>
                            </View> :
                            <View style={styles.textInputContainer}>
                                <TextInput style={styles.searchRestaurantText} placeholder={"Search a Restaurant..."} onChangeText={handleRestaurantText} value={restaurant} />
                                <Animated.View style={{ transform: [{ translateX: popOutAnim }] }}>
                                    <FontAwesome name="search" size={24} color="black" />
                                </Animated.View>
                            </View>
                    }
                </View>
                <View style={styles.dropDownContainer}>
                    {
                        activeTextBox === "location" ?
                            (
                                location.length !== 0 &&
                                filteredLocations.slice(0, 8).map((rest, index) => {
                                    return (<DropDownItem name={rest} key={index} goToNext={() => navigation.navigate("LocationRec")} type={"location"} />)
                                })
                            ) :
                            (
                                restaurant.length !== 0 &&
                                filteredRestaurants.map((rest, index) => {
                                    return (<DropDownItem name={rest} key={index} goToNext={() => navigation.navigate("ReviewRec")} type={"restaurant"} />)
                                })

                            )
                    }
                </View>
            </Animated.View>
        </View >
    )
}

export default MainScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
    },
    searchBasedTitle: {
        fontFamily: "happy-food",
        fontSize: '15px',
        textAlign: "center",
        color: "rgba(255,100,0,1.0)",
    },
    searchBasedContainer: {
        padding: 10,
        borderWidth: 3,
        marginBottom: 10,
        width: '100%',
        justifyContent: "center",
        flexDirection: "column",
        borderColor: "rgba(255,100,0,1.0)",
        backgroundColor: "rgba(255,200,0,1.0)",
        borderRadius: 10,
    },
    searchBasedButtonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        margin: 10,
    },
    searchBasedButton: {
        backgroundColor: "rgba(255,0,0,1.0)",
        padding: 5,
        borderRadius: 10,
        width: "30%",
    },
    searchBasedButtonText: {
        textAlign: "center",
        fontFamily: "happy-food",
        color: "white",
        fontSize: 12,
        fontWeight: "300",
    }
})