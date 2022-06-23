import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React from 'react'

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
const RatingRecommendationScreen = () => {
    return (
        <ScrollView contentContainerStyle={styles.container}>
            {
                Dummy.map((rest, index) => {
                    return (
                        <View style={styles.restaurantContainer} key={index}>
                            <View style={styles.restaurantRow}>
                                <Text style={styles.rowTitle}>Name :</Text>
                                <Text style={styles.rowContent}>{rest.name}</Text>
                            </View>
                            <View style={styles.restaurantRow}>
                                <Text style={styles.rowTitle}>Cuisine:</Text>
                                <Text style={styles.rowContent}>{rest.cuisine}</Text>
                            </View>
                            <View style={styles.restaurantRow}>
                                <Text style={styles.rowTitle}>Rating :</Text>
                                <Text style={styles.rowContent}>{rest.rating}</Text>
                            </View>
                            <View style={styles.restaurantRow}>
                                <Text style={styles.rowTitle}>Location :</Text>
                                <Text style={styles.rowContent}>{rest.location}</Text>
                            </View>
                        </View>
                    )
                })
            }
        </ScrollView>
    )
}

export default RatingRecommendationScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        backgroundColor: "rgba(255,200,0,1.0)",
        padding: 20,
    },
    restaurantContainer: {
        width: "100%",
        height: "150px",
        margin: 10,
        padding: 20,
        backgroundColor: "rgba(255,255,255,0.6)",
        borderRadius: 10,
    },
    restaurantRow: {
        flexDirection: "row",
    },
    rowTitle: {
        // fontFamily: "happy-food",
        fontSize: 15,
        paddingHorizontal: 10,
        fontWeight: 700,
    },
    rowContent: {
        // fontFamily: "happy-food",
        fontSize: 15,
    }
})