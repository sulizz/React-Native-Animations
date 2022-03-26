import { Text, View, PanResponder, Animated, Dimensions } from "react-native";
import React, { Component } from "react";

const SCREEN_WIDTH = Dimensions.get("window").width;
console.log(SCREEN_WIDTH);
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
                this.resetPosition();
            },
        });
        this.state = { panResponder, position };
    }

    //helper function that controls the card animation and styling.
    getCardStyle() {
        const { position } = this.state;
        const rotate = position.x.interpolate({
            inputRange: [-SCREEN_WIDTH * 2.5, 0, SCREEN_WIDTH * 2.5],
            outputRange: ["-120deg", "0deg", "120deg"],
        });

        return {
            ...position.getLayout(),
            transform: [{ rotate: rotate }],
        };
    }

    resetPosition() {
        Animated.spring(this.state.position, {
            toValue: { x: 0, y: 0 },
            useNativeDriver: false,
        }).start();
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
