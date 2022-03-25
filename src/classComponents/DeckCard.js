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
            // Ask to be the responder:
            //function is exectued anytime a user taps on the screen. Press down.
            onStartShouldSetPanResponder: () => true,

            //callback will be called as user is pressing and dragging.
            onPanResponderMove: (event, gestureState) => {
                // The most recent move distance is gestureState.move{X,Y}
                // The accumulated gesture distance since becoming responder is
                // gestureState.d{x,y}
                position.setValue({ x: gestureState.dx, y: gestureState.dy });
            },

            //user presses down and drag and release.
            onPanResponderRelease: () => {
                // The user has released all touches while this view is the
                // responder. This typically means a gesture has succeeded
            },
        });

        this.state = { panResponder, position };
    }

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
