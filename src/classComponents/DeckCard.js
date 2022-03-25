import {
    Text,
    View,
    PanResponder,
    Animated,
    TurboModuleRegistry,
} from "react-native";
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
            onPanResponderRelease: () => {},
        });

        this.state = { panResponder, position };
    }

    //helper function that controls the card animation and styling.
    getCardStyle() {}

    renderCards() {
        return this.props.data.map((item, index) => {
            if (index === 0) {
                return (
                    <Animated.View
                        key={item.id}
                        style={this.state.position.getLayout()}
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
