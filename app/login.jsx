import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Alert } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useRouter } from "expo-router";

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
    <View>
      <View>
        <TouchableOpacity onPress={() => router.push("/")}>
          <MaterialIcons name="arrow-back-ios-new" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <View>
        <TextInput placeholder="Username" value={username} onChangeText={setUsername} />
        <TextInput placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />
        <TouchableOpacity onPress={handleLogin}>
          <Text>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push("/signup")}>
          <Text>Don't have an account? Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({});
