import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  Dimensions,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { width, height } = Dimensions.get("window");

interface Product {
  id: number;
  name: string;
  price: string;
  image: string;
  objFile?: string;
  category: string;
  description: string;
  rating: number;
  inStock: boolean;
  fullDescription?: string;
  specifications?: string[];
}

interface ProductDetailScreenProps {
  product: Product;
  visible: boolean;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
}

const ProductDetailScreen: React.FC<ProductDetailScreenProps> = ({
  product,
  visible,
  onClose,
  onAddToCart,
}) => {
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Ionicons key={i} name="star" size={16} color="#FFD700" />);
    }

    if (hasHalfStar) {
      stars.push(
        <Ionicons key="half" name="star-half" size={16} color="#FFD700" />
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Ionicons
          key={`empty-${i}`}
          name="star-outline"
          size={16}
          color="#FFD700"
        />
      );
    }

    return stars;
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="fullScreen"
    >
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#333" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Chi tiết sản phẩm</Text>
          <TouchableOpacity style={styles.shareButton}>
            <Ionicons name="share-outline" size={24} color="#333" />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Product Image */}
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: product.image }}
              style={styles.productImage}
            />
            {product.objFile && (
              <View style={styles.threeDContainer}>
                <View style={styles.threeDIcon}>
                  <Text style={styles.threeDText}>3D</Text>
                </View>
                <TouchableOpacity style={styles.view3DButton}>
                  <Ionicons name="cube" size={16} color="#FFFFFF" />
                  <Text style={styles.view3DText}>Xem 3D</Text>
                </TouchableOpacity>
              </View>
            )}
            {!product.inStock && product.category !== "Nhận nuôi" && (
              <View style={styles.outOfStockBadge}>
                <Text style={styles.outOfStockText}>Hết hàng</Text>
              </View>
            )}
          </View>

          {/* Product Info */}
          <View style={styles.productInfo}>
            <View style={styles.categoryBadge}>
              <Text style={styles.categoryText}>{product.category}</Text>
            </View>

            <Text style={styles.productName}>{product.name}</Text>

            <View style={styles.ratingContainer}>
              <View style={styles.starsContainer}>
                {renderStars(product.rating)}
              </View>
              <Text style={styles.ratingText}>({product.rating})</Text>
            </View>

            <Text
              style={[
                styles.productPrice,
                product.category === "Nhận nuôi" && styles.adoptionPrice,
              ]}
            >
              {product.price}
            </Text>

            {product.category === "Nhận nuôi" && (
              <View style={styles.adoptionNotice}>
                <Ionicons name="heart" size={20} color="#28A745" />
                <Text style={styles.adoptionNoticeText}>
                  Miễn phí nhận nuôi - Chỉ cần yêu thương
                </Text>
              </View>
            )}
          </View>

          {/* Description */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Mô tả</Text>
            <Text style={styles.description}>
              {product.fullDescription || product.description}
            </Text>
          </View>

          {/* Specifications */}
          {product.specifications && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Thông số kỹ thuật</Text>
              {product.specifications.map((spec, index) => (
                <View key={index} style={styles.specItem}>
                  <Ionicons name="checkmark-circle" size={16} color="#28A745" />
                  <Text style={styles.specText}>{spec}</Text>
                </View>
              ))}
            </View>
          )}

          {/* Stock Status */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Tình trạng</Text>
            <View style={styles.stockContainer}>
              <Ionicons
                name={product.inStock ? "checkmark-circle" : "close-circle"}
                size={20}
                color={product.inStock ? "#28A745" : "#DC143C"}
              />
              <Text
                style={[
                  styles.stockText,
                  { color: product.inStock ? "#28A745" : "#DC143C" },
                ]}
              >
                {product.inStock ? "Còn hàng" : "Hết hàng"}
              </Text>
            </View>
          </View>

          <View style={styles.bottomSpacing} />
        </ScrollView>

        {/* Bottom Action */}
        <View style={styles.bottomAction}>
          <TouchableOpacity
            style={[
              styles.addToCartButton,
              !product.inStock &&
                product.category !== "Nhận nuôi" &&
                styles.disabledButton,
              product.category === "Nhận nuôi" && styles.adoptButton,
            ]}
            onPress={() => onAddToCart(product)}
            disabled={!product.inStock && product.category !== "Nhận nuôi"}
          >
            <Ionicons
              name={product.category === "Nhận nuôi" ? "heart" : "bag-add"}
              size={20}
              color="#FFFFFF"
            />
            <Text style={styles.addToCartText}>
              {product.category === "Nhận nuôi"
                ? "Đăng ký nhận nuôi"
                : "Thêm vào giỏ hàng"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    paddingTop: 50,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  shareButton: {
    padding: 8,
  },
  content: {
    flex: 1,
  },
  imageContainer: {
    position: "relative",
    height: height * 0.4,
  },
  productImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  threeDContainer: {
    position: "absolute",
    top: 16,
    left: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  threeDIcon: {
    backgroundColor: "#DC143C",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginRight: 8,
  },
  threeDText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "bold",
  },
  view3DButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.7)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  view3DText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "600",
    marginLeft: 4,
  },
  outOfStockBadge: {
    position: "absolute",
    top: 16,
    right: 16,
    backgroundColor: "#DC143C",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  outOfStockText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "bold",
  },
  productInfo: {
    padding: 20,
  },
  categoryBadge: {
    alignSelf: "flex-start",
    backgroundColor: "#F0F0F0",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 12,
  },
  categoryText: {
    fontSize: 12,
    color: "#666",
    fontWeight: "600",
  },
  productName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 12,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  starsContainer: {
    flexDirection: "row",
    marginRight: 8,
  },
  ratingText: {
    fontSize: 14,
    color: "#666",
  },
  productPrice: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#DC143C",
    marginBottom: 16,
  },
  adoptionPrice: {
    color: "#28A745",
  },
  adoptionNotice: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F0FFF4",
    padding: 12,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: "#28A745",
  },
  adoptionNoticeText: {
    fontSize: 14,
    color: "#28A745",
    fontWeight: "600",
    marginLeft: 8,
  },
  section: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: "#F0F0F0",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    color: "#666",
    lineHeight: 24,
  },
  specItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  specText: {
    fontSize: 14,
    color: "#666",
    marginLeft: 8,
  },
  stockContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  stockText: {
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
  bottomSpacing: {
    height: 20,
  },
  bottomAction: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: "#F0F0F0",
  },
  addToCartButton: {
    flexDirection: "row",
    backgroundColor: "#DC143C",
    padding: 16,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  adoptButton: {
    backgroundColor: "#28A745",
  },
  disabledButton: {
    backgroundColor: "#999",
  },
  addToCartText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 8,
  },
});

export default ProductDetailScreen;
