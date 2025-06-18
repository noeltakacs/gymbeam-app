import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Alert } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useRouter } from "expo-router";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

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

  const validateUsername = (username) => {
    const regex = /^(?=.*[a-zA-Z])(?!.*\s).+$/;
    return regex.test(username);
  };

  const validateEmail = (email) => {
    const regex = /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/;
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

    try {
      const response = await fetch("https://fakestoreapi.com/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();

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
    <View>
      <View>
        <TouchableOpacity onPress={() => router.push("/")}>
          <MaterialIcons name="arrow-back-ios-new" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <View>
        <TextInput placeholder="Username" value={username} onChangeText={setUsername} />
        <TextInput placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address" />
        <TextInput placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />
        <TouchableOpacity onPress={handleSignUp}>
          <Text>Sign Up</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push("/login")}>
          <Text>Already have an account? Log In</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SignUp;

const styles = StyleSheet.create({});
