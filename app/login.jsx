import React, { useState } from "react";
import { StyleSheet, View, Alert } from "react-native";
import { useRouter } from "expo-router";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import CustomTextInput from "../components/CustomTextInput";
import HeaderWithArrow from "../components/HeaderWithArrow";
import AuthForm from "../components/AuthForm";

// This is a simple login page that allows users to log in with their username and password.
// It uses the Fake Store API for authentication and redirects to the products page upon successful login.
const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    if (!username) {
      Alert.alert("Please enter your username");
      return;
    }

    if (!password) {
      Alert.alert("Please enter your password");
      return;
    }

    // Make a POST request to the Fake Store API for login
    try {
      const response = await fetch("https://fakestoreapi.com/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        Alert.alert("Login failed", "Invalid username or password");
        return;
      }

      const data = await response.json();

      // If login is successful, redirect to products page
      if (data.token) {
        router.push("/products");
      } else {
        Alert.alert("Login failed", "Something went wrong, please try again");
      }
    } catch (error) {
      Alert.alert("Login failed", "An error occurred while trying to log in");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <HeaderWithArrow title="Back to Start" onPress={() => router.push("/")} />
      </View>
      <View style={styles.mainContentContainer}>
        <KeyboardAwareScrollView
          contentContainerStyle={styles.scrollContentContainer}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          enableOnAndroid
          extraScrollHeight={50}
          keyboardOpeningTime={0}
        >
          <AuthForm
            onSubmit={handleLogin}
            buttonText="Log In"
            footerButtonText="Don't have an account? Sign Up"
            footerButtonOnPress={() => router.push("/signup")}
          >
            <CustomTextInput
              label="Username"
              placeholder="Enter your username"
              value={username}
              onChangeText={setUsername}
              autoCapitalize="none"
            />
            <CustomTextInput
              label="Password"
              placeholder="Enter your password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              autoCapitalize="none"
            />
          </AuthForm>
        </KeyboardAwareScrollView>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  headerContainer: {
    width: "100%",
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  mainContentContainer: {
    flex: 1,
    width: "100%",
  },
  scrollContentContainer: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
    alignItems: "center",
  },
});
