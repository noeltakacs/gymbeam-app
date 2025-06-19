import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

const HeaderWithArrow = ({ title, onPress }) => {
  const router = useRouter();

  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={onPress} activeOpacity={0.6}>
        <MaterialIcons name="arrow-back-ios" size={30} color="black" />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>{title}</Text>
      <View style={{ width: 30 }} />
    </View>
  );
};

export default HeaderWithArrow;

const styles = StyleSheet.create({
  header: {
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
