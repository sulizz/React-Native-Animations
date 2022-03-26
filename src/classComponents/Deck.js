import { Text, View, Animated, StyleSheet } from "react-native";
import React, { Component } from "react";
import { Card, Button, Image } from "react-native-elements";
import DeckCard from "./DeckCard";
import deckData from "../data/deckData";
import { AntDesign } from "@expo/vector-icons";

class Deck extends Component {
    renderCard(item) {
        return (
            <Card key={item.id}>
                <Card.Title>{item.text}</Card.Title>
                <Image
                    source={{ uri: item.uri }}
                    style={styles.imageContainer}
                    resizeMode="cover"
                />
                <Button title="NAME_LASTNAME" icon={{ name: "home" }} />
                <Text>hobbies n shit</Text>
            </Card>
        );
    }

    render() {
        return (
            <View>
                <DeckCard data={deckData} renderCard={this.renderCard} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    imageContainer: {
        width: "100%",
        height: 100,
        resizeMode: "contain",
    },
});

export default Deck;
