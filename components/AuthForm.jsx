import React from "react";
import { StyleSheet, View, Image } from "react-native";
import CustomButton from "../components/CustomButton";
import AuthFormFooterTextButton from "../components/AuthFormFooterTextButton";

const AuthForm = ({ children, onSubmit, buttonText, footerButtonText, footerButtonOnPress }) => {
  return (
    <View style={styles.container}>
      <Image source={require("../assets/icon.png")} style={styles.logo} />
      {children}
      <View style={styles.footerButtonContainer}>
        <AuthFormFooterTextButton title={footerButtonText} onPress={footerButtonOnPress} />
      </View>
      <CustomButton title={buttonText} onPress={onSubmit} />
    </View>
  );
};

export default AuthForm;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 16,
    borderRadius: 12,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
    alignItems: "center",
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 50,
    resizeMode: "contain",
  },
  footerButtonContainer: {
    width: "100%",
    alignItems: "flex-start",
    marginBottom: 30,
  },
});
