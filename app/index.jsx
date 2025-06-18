import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Link } from "expo-router";

const Welcome = () => {
  return (
    <View>
      <Link href={"/login"} asChild>
        <TouchableOpacity>
          <Text>Log In</Text>
        </TouchableOpacity>
      </Link>

      <Link href={"/signup"} asChild>
        <TouchableOpacity>
          <Text>Sign Up</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
};

export default Welcome;

const styles = StyleSheet.create({});
