import { Link } from "expo-router";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";

const ProductCard = ({ product }) => {
  return (
    <Link href={`/product/${product.id}`} asChild>
      <TouchableOpacity style={styles.card}>
        <Image source={{ uri: product.image }} style={styles.image} />
        <Text>{product.title}</Text>
        <Text>{product.price}</Text>
      </TouchableOpacity>
    </Link>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: 5,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    alignItems: "center",
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 10,
    resizeMode: "contain",
  },
});
