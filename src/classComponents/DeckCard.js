import { Text, View, PanResponder, Animated, Dimensions } from "react-native";
import React, { Component } from "react";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SWIPE_THRESHOLD = Dimensions.get("window").width * 0.6;
const SWIPE_OUT_DURATION = 250;
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
            onPanResponderRelease: (event, gestureState) => {
                if (gestureState.dx > SWIPE_THRESHOLD) {
                    this.forceSwipeCard("right");
                    console.log("likee");
                } else if (gestureState.dx < -SWIPE_THRESHOLD) {
                    this.forceSwipeCard("left");
                    console.log("dislike");
                } else {
                    this.resetPosition();
                }
                // this.resetPosition();
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

    forceSwipeCard(direction) {
        const x = direction === "right" ? SCREEN_WIDTH : -SCREEN_WIDTH;
        Animated.timing(this.state.position, {
            toValue: { x: x, y: 0 },
            duration: SWIPE_OUT_DURATION,
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
