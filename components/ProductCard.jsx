import { Link } from "expo-router";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";

const ProductCard = ({ product }) => {
  return (
    <Link href={`/product/${product.id}`} asChild>
      <TouchableOpacity style={styles.card} activeOpacity={0.6}>
        <Image source={{ uri: product.image }} style={styles.image} />
        <View style={styles.textContainer}>
          <Text style={styles.productTitle}>{product.title}</Text>
          <Text style={styles.productPrice}>{product.price.toFixed(2)}€</Text>
        </View>
      </TouchableOpacity>
    </Link>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 15,
    marginVertical: 10,
    marginHorizontal: 5,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: "contain",
  },
  textContainer: {
    flex: 1,
    paddingLeft: 20,
  },
  productTitle: {
    fontSize: 16,
    fontWeight: "700",
    paddingBottom: 10,
    textAlign: "left",
    color: "#111",
  },
  productPrice: {
    fontSize: 16,
    fontWeight: "700",
    color: "#eb5e2b",
    textAlign: "left",
  },
});
