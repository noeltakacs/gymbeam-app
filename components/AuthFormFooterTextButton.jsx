import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

const AuthFormFooterTextButton = ({ title, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.6}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

export default AuthFormFooterTextButton;

const styles = StyleSheet.create({
  buttonText: {
    color: "#eb5e2b",
    fontWeight: "500",
  },
});
