import React, { Component } from "react";
import { StyleSheet, View, Animated, Text } from "react-native";

// class component
// class Ball extends Component {
//     render() {
//         return <View style={styles.ball} />;
//     }
// }

// const styles = {
//     ball: {
//         height: 60,
//         width: 60,
//         borderRadius: 60 / 2,
//         borderWidth: 30,
//         borderColor: "black",
//     },
// };

//define a position with new Animated.ValueXY(0, 0);
//how the position will modify, pass in the position and a object that has toValue property and start the animation
//define what view is going to be animated in the return. wrap it with  <Animated.View> and pass in the style property
//that contains position and calls the getLayout function.

const Ball = () => {
    //ValueXY is where the element is at any given time
    const position = new Animated.ValueXY(0, 0);

    //spring updates the value of the element
    //takes in the position, what we want to modify to and we need to start.
    Animated.spring(position, {
        toValue: { x: 100, y: 500 },
        useNativeDriver: false,
    }).start();

    return (
        //Animated.View takes in a position, element that we are trying to modify
        <Animated.View style={position.getLayout()}>
            <View style={styles.ball} />
            <Text>Hello </Text>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    ball: {
        height: 60,
        width: 60,
        borderRadius: 60 / 2,
        borderColor: "black",
        borderWidth: 60 / 2,
    },
});

export default Ball;
