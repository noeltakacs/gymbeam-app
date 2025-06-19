import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

const HeaderWithLogOut = ({ title, onLogout }) => {
  return (
    <View style={styles.container}>
      <View style={{ width: 30 }} />
      <Text style={styles.headerTitle}>{title}</Text>
      <TouchableOpacity onPress={onLogout} activeOpacity={0.6}>
        <MaterialIcons name="logout" size={30} color="black" />
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
  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
  },
});
