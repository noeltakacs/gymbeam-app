import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

const AddToCartButton = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress} activeOpacity={0.6}>
      <MaterialIcons name="shopping-cart" size={24} color="#fff" />
      <Text style={styles.buttonText}>Add to Cart</Text>
    </TouchableOpacity>
  );
};

export default AddToCartButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#111",
    paddingVertical: 14,
    borderRadius: 12,
    width: "100%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
    flexDirection: "row",
    justifyContent: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 18,
    letterSpacing: 0.5,
    marginLeft: 10,
  },
});
