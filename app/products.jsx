import React, { useEffect, useState } from "react";
import { StyleSheet, View, Alert, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import ProductCard from "../components/ProductCard";
import LoadingScreen from "../components/LoadingScreen";
import HeaderWithLogOut from "../components/HeaderWithLogOut";

// This component fetches and displays a list of products from an API.
// It includes a header with a logout button, and shows a loading screen while fetching data.
// The products are displayed in a scrollable list using ProductCard components.
const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Fetch products from the API when the component mounts.
  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setLoading(false);
      });
  }, []);

  return (
    <View style={styles.container}>
      <HeaderWithLogOut
        title="Products"
        onLogout={() => {
          Alert.alert("Log Out", "Are you sure you want to log out?", [
            { text: "Cancel", style: "cancel" },
            {
              text: "Log Out",
              style: "destructive",
              onPress: () => {
                router.push("/");
              },
            },
          ]);
        }}
      />
      {loading ? (
        <LoadingScreen />
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </ScrollView>
      )}
    </View>
  );
};

export default Products;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});
