import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
/*
    name
    system design
    future scope
*/
const RestaurantItem = ({ rest }) => {
    return (
        <View style={styles.restaurantContainer}>
            <View style={styles.rating}>
                <Text style={styles.rowTitle}>Rating: </Text>
                <Text style={styles.ratingText}>{
                    rest["Mean Rating"].length <= 4 ?
                        rest["Mean Rating"] :
                        rest["Mean Rating"].split("\n")[0].split("    ")[1]
                }</Text>
                <View>

                </View>
            </View>
            <View style={styles.restaurantDetails}>
                <View style={styles.restaurantMain}>
                    <View style={styles.restaurantRow}>
                        <Text style={[styles.rowContent, styles.restName]}>{
                            rest.name.length < 20 ?
                                rest.name :
                                rest.name.slice(0, 20) + "..."
                        }</Text>
                    </View>
                    <View style={styles.restaurantRow}>
                        <Text style={styles.rowContent}>In {rest.location.replace("Name: location, dtype: object", "").replace(rest.name, "")}</Text>
                    </View>
                </View>
                <View style={styles.cuisineMain}>
                    <Text style={styles.rowTitle}>Cuisine:</Text>
                    <Text style={styles.rowContent}>{rest.cuisines.slice(0, 2).reduce((final, cu) => final + cu + ", ", "")}</Text>
                </View>
            </View>
        </View>
    )
}

export default RestaurantItem;

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        alignItems: "center",
        backgroundColor: "rgba(255,200,0,1.0)",
        padding: 20,
    },
    restaurantContainer: {
        width: "100%",
        minHeight: 150,
        margin: 10,
        padding: 20,
        backgroundColor: "rgba(255,255,255,0.6)",
        borderRadius: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        boxSizing: "border-box",
    },
    restaurantRow: {
        flex: 1,
        flexDirection: "row",

    },
    restaurantDetails: {
        width: "100%",
        justifyContent: "space-between",
    },
    rowTitle: {
        fontSize: 15,
        fontWeight: 700,
        width: "fit-content",
    },
    rowContent: {
        fontSize: 15,
        width: "100%",
    },
    restName: {
        fontSize: 12,
        fontFamily: "happy-food",
        letterSpacing: 2,
    },
    rating: {
        alignItems: "center",
        justifyContent: 'center',
        width: "30%",
        border: "2px solid black",
        borderRadius: "10px",
        padding: 20,
        marginRight: 20,
    },
    ratingText: {
        fontFamily: "happy-food",
        fontSize: "20px",
        fontWeight: "600",
    },
    restaurantMain: {
        backgroundColor: "rgba(255,180,0,1.0)",
        padding: 10,
        borderRadius: 10,
        width: "60%",
        margin: 10,
    },
    cuisineMain: {
        backgroundColor: "rgba(255,180,0,1.0)",
        padding: 10,
        borderRadius: 10,
        width: "60%",
        margin: 10,
    }
})