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
          <View style={styles.priceAndCategoryContainer}>
            <Text style={styles.productPrice}>{product.price.toFixed(2)}€</Text>
            <Text style={styles.productCategory}>
              {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
            </Text>
          </View>
          <Text style={styles.secondaryTitle}>Description</Text>
          <Text style={styles.productDescription}>{product.description}</Text>
        </View>
      </ScrollView>
    );
  };

  if (loading) return <LoadingScreen />;

  return (
    <View style={styles.container}>
      <HeaderWithArrow title="Back to Products" onPress={() => router.push("/products")} />
      <View style={styles.mainContentContainer}>
        {renderProductDetails()}
        <View style={styles.buttonContainer}>
          <AddToCartButton onPress={() => {}} />
        </View>
      </View>
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
    marginBottom: 30,
  },
  priceAndCategoryContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30,
  },
  productPrice: {
    fontSize: 24,
    fontWeight: "700",
    color: "#eb5e2b",
  },
  productCategory: {
    fontSize: 16,
    fontWeight: "600",
    color: "#555",
  },
  secondaryTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
  },
  productDescription: {
    fontSize: 16,
    color: "#333",
    marginBottom: 30,
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
