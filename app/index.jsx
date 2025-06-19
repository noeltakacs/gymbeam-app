import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { useRouter } from "expo-router";
import CustomButton from "../components/CustomButton";

// Welcome screen for the app
// Provides options to choose between logging in or signing up
const Welcome = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Image source={require("../assets/img/gymbeam.png")} style={styles.image} />
      <View style={styles.buttonContainer}>
        <CustomButton title="Log In" onPress={() => router.push("/login")} />
        <CustomButton title="Sign Up" onPress={() => router.push("/signup")} />
      </View>
    </View>
  );
};
export default Welcome;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    justifyContent: "space-evenly",
    paddingVertical: 40,
  },
  image: {
    width: "100%",
    resizeMode: "contain",
  },
  buttonContainer: {
    width: "100%",
    alignItems: "center",
  },
});
