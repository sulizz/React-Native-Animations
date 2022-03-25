import { StyleSheet, Text, View } from "react-native";
import Deck from "./src/classComponents/Deck";

export default function App() {
    return (
        <View style={styles.container}>
            <Deck />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
});
