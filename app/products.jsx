import React, { useEffect, useState } from "react";
import { StyleSheet, View, Alert, FlatList } from "react-native";
import { useRouter } from "expo-router";
import DropDownPicker from "react-native-dropdown-picker";
import ProductCard from "../components/ProductCard";
import LoadingScreen from "../components/LoadingScreen";
import HeaderWithLogOut from "../components/HeaderWithLogOut";

// This component fetches and displays a list of products from an API.
// It includes a header with a logout button, and shows a loading screen while fetching data.
// The products are displayed in a scrollable list using ProductCard components.
// It also includes a dropdown menu to sort products by price and a dropdown to filter products by category.
const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [sortOption, setSortOption] = useState("default");
  const [sortOptionOpen, setSortOptionOpen] = useState(false);
  const [sortOptionItems, setSortOptionItems] = useState([
    { label: "Sort by: Default 🌀", value: "default" },
    { label: "Sort by Price: Low to High ⬆️", value: "priceAsc" },
    { label: "Sort by Price: High to Low ⬇️", value: "priceDesc" },
  ]);

  const [category, setCategory] = useState("all");
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [categoryItems, setCategoryItems] = useState([
    { label: "Category: All Categories 📦", value: "all" },
    { label: "Category: Men's Clothing 👕", value: "men's clothing" },
    { label: "Category: Women's Clothing 👗", value: "women's clothing" },
    { label: "Category: Jewelry 💍", value: "jewelery" },
    { label: "Category: Electronics 💻", value: "electronics" },
  ]);

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

  // Filter products based on selected category and sort option.
  const filteredProducts = () => {
    let result = [...products];

    if (category !== "all") {
      result = result.filter((p) => p.category === category);
    }

    switch (sortOption) {
      case "priceAsc":
        return result.sort((a, b) => a.price - b.price);
      case "priceDesc":
        return result.sort((a, b) => b.price - a.price);
      default:
        return result;
    }
  };

  if (loading) return <LoadingScreen />;

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

      <FlatList
        data={filteredProducts()}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <ProductCard product={item} />}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={() => (
          <View>
            <View style={[styles.dropdownContainer, categoryOpen && { marginBottom: 214 }]}>
              <DropDownPicker
                open={categoryOpen}
                value={category}
                items={categoryItems}
                setOpen={(o) => {
                  setCategoryOpen(o);
                  if (o) setSortOptionOpen(false);
                }}
                setValue={setCategory}
                setItems={setCategoryItems}
                style={styles.dropdown}
                dropDownContainerStyle={styles.dropdownMenu}
                labelStyle={styles.dropdownLabel}
                selectedItemContainerStyle={styles.selectedItemContainer}
              />
            </View>
            <View style={styles.dropdownContainer}>
              <DropDownPicker
                open={sortOptionOpen}
                value={sortOption}
                items={sortOptionItems}
                setOpen={(o) => {
                  setSortOptionOpen(o);
                  if (o) setCategoryOpen(false);
                }}
                setValue={setSortOption}
                setItems={setSortOptionItems}
                style={styles.dropdown}
                dropDownContainerStyle={styles.dropdownMenu}
                labelStyle={styles.dropdownLabel}
                selectedItemContainerStyle={styles.selectedItemContainer}
              />
            </View>
          </View>
        )}
        ListHeaderComponentStyle={{ marginBottom: sortOptionOpen ? 120 : 0 }}
      />
    </View>
  );
};

export default Products;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  dropdown: {
    borderColor: "#ccc",
  },
  dropdownContainer: {
    height: 50,
    marginBottom: 16,
  },
  dropdownMenu: {
    borderColor: "#ccc",
  },
  dropdownLabel: {
    color: "#333",
    fontSize: 14,
  },
  selectedItemContainer: {
    backgroundColor: "#f0f0f0",
  },
});
