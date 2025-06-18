import React, { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useRouter } from "expo-router";

const ProductDetails = () => {
  const { id } = useLocalSearchParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setLoading(false);
      });
  }, [id]);

  return (
    <View>
      <View>
        <TouchableOpacity onPress={() => router.push("/products")}>
          <MaterialIcons name="arrow-back-ios-new" size={24} color="black" />
        </TouchableOpacity>
      </View>
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <View>
          <Image source={{ uri: product.image }} style={styles.image} />
          <Text>{product.title}</Text>
          <Text>{product.category}</Text>
          <Text>{product.price}</Text>
          <Text>{product.description}</Text>
        </View>
      )}
    </View>
  );
};

export default ProductDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fff",
  },
  image: {
    width: "100%",
    height: 300,
    resizeMode: "contain",
  },
});
