import React, { useState } from "react";
import { StyleSheet, View, Alert } from "react-native";
import { useRouter } from "expo-router";
import CustomTextInput from "../components/CustomTextInput";
import HeaderWithArrow from "../components/HeaderWithArrow";
import AuthForm from "../components/AuthForm";

// This is a simple sign-up page that allows users to create an account with a username, email, and password.
// It checks for existing users and validates the input before making a POST request to the Fake Store API to create a new user.
// If successful, it redirects to the products page.
const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  // Function to check if the username or email already exists in the Fake Store API
  // It fetches the list of users and checks if the provided username or email matches any existing user.
  // Returns an object indicating whether the username or email exists.
  const checkUserExists = async (username, email) => {
    try {
      const response = await fetch("https://fakestoreapi.com/users");

      const users = await response.json();

      const usernameExists = users.some((user) => user.username === username);
      const emailExists = users.some((user) => user.email === email);

      return { usernameExists, emailExists };
    } catch (error) {
      console.error("Error checking user existence:", error);
      return { usernameExists: false, emailExists: false };
    }
  };

  // Validation functions for username and email
  const validateUsername = (username) => {
    const regex = /^(?=.*[a-zA-Z])(?!.*\s).+$/; // Username must contain at least 1 letter and no spaces
    return regex.test(username);
  };

  const validateEmail = (email) => {
    const regex = /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/; // Basic email validation regex
    return regex.test(email);
  };

  const handleSignUp = async () => {
    if (!username) {
      Alert.alert("Please enter your username");
      return;
    }

    if (!email) {
      Alert.alert("Please enter your email");
      return;
    }

    if (!password) {
      Alert.alert("Please enter your password");
      return;
    }

    if (!validateUsername(username)) {
      Alert.alert("Invalid username", "Username must contain at least 1 letter and no spaces.");
      return;
    }

    if (!validateEmail(email)) {
      Alert.alert("Invalid email format", "Please enter a valid email address.");
      return;
    }

    const { usernameExists, emailExists } = await checkUserExists(username, email);

    if (usernameExists) {
      Alert.alert(
        "Username already exists",
        "Account with this username already exists. Please choose a different username."
      );
      return;
    }

    if (emailExists) {
      Alert.alert(
        "Email already exists",
        "Account with this email already exists. Please use a different email address."
      );
      return;
    }

    // Make a POST request to the Fake Store API to create a new user
    try {
      const response = await fetch("https://fakestoreapi.com/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();

      // If sign-up is successful, redirect to products page
      if (data.id) {
        router.push("/products");
      } else {
        Alert.alert("Sign Up Error", "Something went wrong, please try again.");
      }
    } catch (error) {
      Alert.alert("Sign Up Error", "An error occurred while trying to sign up.");
    }
  };

  return (
    <View style={styles.container}>
      <HeaderWithArrow title="Sign Up" onPress={() => router.push("/")} />
      <View style={styles.mainContentContainer}>
        <AuthForm
          onSubmit={handleSignUp}
          buttonText="Sign Up"
          footerButtonText="Already have an account? Log In"
          footerButtonOnPress={() => router.push("/login")}
        >
          <CustomTextInput placeholder="Username" value={username} onChangeText={setUsername} autoCapitalize="none" />
          <CustomTextInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <CustomTextInput
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            autoCapitalize="none"
          />
        </AuthForm>
      </View>
    </View>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
  },
  mainContentContainer: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});
