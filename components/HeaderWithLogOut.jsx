import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image, Platform } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

const HeaderWithLogOut = ({ onLogout }) => {
  return (
    <View style={{ ...styles.container, paddingTop: Platform.OS === "android" ? 20 : 0 }}>
      <Image source={require("../assets/icon.png")} style={styles.logo} />
      <TouchableOpacity onPress={onLogout} activeOpacity={0.6} style={styles.button}>
        <Text style={styles.headerText}>Log Out</Text>
        <MaterialIcons name="logout" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
};

export default HeaderWithLogOut;

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
    marginRight: 8,
  },
  logo: {
    width: 40,
    height: 40,
  },
});
