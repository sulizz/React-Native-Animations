import { Text, View, PanResponder, Animated } from "react-native";
import React, { Component } from "react";

export default class DeckCard extends Component {
    constructor(props) {
        super(props);

        const position = new Animated.ValueXY();

        const panResponder = PanResponder.create({
            //function is exectued anytime a user taps on the screen. Press down.
            onStartShouldSetPanResponder: () => true,

            //callback will be called as user is pressing and dragging.
            onPanResponderMove: (event, gestureState) => {
                position.setValue({ x: gestureState.dx, y: gestureState.dy });
            },

            //user presses down and drag and release.
            onPanResponderRelease: () => {
                position.setValue({ x: 0, y: 0 });
            },
        });

        this.state = { panResponder, position };
    }

    //helper function that controls the card animation and styling.
    getCardStyle() {
        const { position } = this.state;
        const rotate = position.x.interpolate({
            inputRange: [-400, 0, 400],
            outputRange: ["-120deg", "0deg", "120deg"],
        });

        return {
            ...position.getLayout(),
            transform: [{ rotate: rotate }],
        };
    }

    renderCards() {
        return this.props.data.map((item, index) => {
            if (index === 0) {
                return (
                    <Animated.View
                        key={item.id}
                        style={this.getCardStyle()}
                        {...this.state.panResponder.panHandlers}
                    >
                        {this.props.renderCard(item)}
                    </Animated.View>
                );
            }
            return this.props.renderCard(item);
        });
    }
    render() {
        return <View>{this.renderCards()}</View>;
    }
}
