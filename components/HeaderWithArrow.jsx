import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image, Platform } from "react-native";
import { useRouter } from "expo-router";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

const HeaderWithArrow = ({ title, onPress }) => {
  const router = useRouter();

  return (
    <View style={{ ...styles.container, paddingTop: Platform.OS === "android" ? 20 : 0 }}>
      <TouchableOpacity onPress={onPress} activeOpacity={0.6} style={styles.button}>
        <MaterialIcons name="arrow-back-ios" size={24} color="black" />
        <Text style={styles.headerText}>{title}</Text>
      </TouchableOpacity>
      <Image source={require("../assets/icon.png")} style={styles.logo} />
    </View>
  );
};

export default HeaderWithArrow;

const styles = StyleSheet.create({
  container: {
    paddingBottom: 15,
    width: "100%",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerText: {
    fontSize: 16,
    fontWeight: "500",
  },
  logo: {
    width: 40,
    height: 40,
  },
});
