import React, { useEffect, useState } from "react";
import { useRouter, useLocalSearchParams } from "expo-router";
import { StyleSheet, Text, View, Image, ScrollView } from "react-native";
import HeaderWithArrow from "../../components/HeaderWithArrow";
import LoadingScreen from "../../components/LoadingScreen";
import AddToCartButton from "../../components/AddToCartButton";

// This component fetches and displays the details of a specific product based on its ID.
// It includes a header with a back arrow, shows a loading screen while fetching data,
// and displays the product's image, title, price, and description once loaded.
const ProductDetails = () => {
  const { id } = useLocalSearchParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Fetch product details from the API when the component mounts or when the ID changes.
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

  // Render the product details including image, title, price, and description.
  const renderProductDetails = () => {
    return (
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.contentContainer}>
        <Image source={{ uri: product.image }} style={styles.image} />
        <View style={styles.productTextContainer}>
          <Text style={styles.productTitle}>{product.title}</Text>
          <Text style={styles.productPrice}>{product.price.toFixed(2)}€</Text>
          <Text style={styles.productDescription}>{product.description}</Text>
        </View>
      </ScrollView>
    );
  };

  return (
    <View style={styles.container}>
      <HeaderWithArrow title="Product Details" onPress={() => router.push("/products")} />
      {loading ? (
        <LoadingScreen />
      ) : (
        <View style={styles.mainContentContainer}>
          {renderProductDetails()}
          <View style={styles.buttonContainer}>
            <AddToCartButton onPress={() => {}} />
          </View>
        </View>
      )}
    </View>
  );
};

export default ProductDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  mainContentContainer: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 90,
  },
  image: {
    width: "100%",
    height: 300,
    resizeMode: "contain",
    marginTop: 15,
  },
  productTextContainer: {
    paddingTop: 30,
  },
  productTitle: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 20,
  },
  productPrice: {
    fontSize: 20,
    fontWeight: "700",
    color: "#eb5e2b",
    marginBottom: 20,
  },
  productDescription: {
    fontSize: 16,
    color: "#333",
  },
  buttonContainer: {
    position: "absolute",
    bottom: 0,
    alignItems: "center",
    width: "100%",
    backgroundColor: "#fff",
    paddingTop: 20,
  },
});
