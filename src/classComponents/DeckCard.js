import { Text, View } from "react-native";
import React, { Component } from "react";

export default class DeckCard extends Component {
    renderCards() {
        return this.props.data.map((item) => {
            return this.props.renderCard(item);
        });
    }
    render() {
        return <View>{this.renderCards()}</View>;
    }
}
