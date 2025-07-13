import CheckoutScreen from "@/app/Checkout";
import { Ionicons } from "@expo/vector-icons";
import React, { useRef, useState } from "react";
import {
  Alert,
  Dimensions,
  FlatList,
  Image,
  Modal,
  StyleSheet,
  Text,
  TextInput, // Keep ScrollView for modals if needed, but remove from main screen
  TouchableOpacity,
  View,
} from "react-native";
import ProductDetailScreen from "./ProductDetails";

const { width } = Dimensions.get("window");

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

interface CartItem extends Product {
  quantity: number;
}

const StoreScreen = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Tất cả");
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showCheckout, setShowCheckout] = useState(false);
  const searchInputRef = useRef<TextInput>(null);

  const categories = [
    {
      name: "Tất cả",
      icon: "grid",
      count: 12,
      color: "#DC143C",
      description: "Tất cả sản phẩm",
    },
    {
      name: "Thức ăn",
      icon: "restaurant",
      count: 4,
      color: "#FF6B35",
      description: "Thức ăn & dinh dưỡng",
    },
    {
      name: "Đồ chơi",
      icon: "football",
      count: 3,
      color: "#4ECDC4",
      description: "Đồ chơi giải trí",
    },
    {
      name: "Phụ kiện",
      icon: "shirt",
      count: 3,
      color: "#45B7D1",
      description: "Phụ kiện thời trang",
    },
    {
      name: "Nhận nuôi",
      icon: "heart",
      count: 2,
      color: "#96CEB4",
      description: "Thú cưng cần nhà",
    },
  ];

  const allProducts: Product[] = [
    // Thức ăn
    {
      id: 1,
      name: "Thức ăn hữu cơ cho chó",
      price: "450,000đ",
      image:
        "https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=300&h=300&fit=crop",
      objFile: "/models/dog-food.obj",
      category: "Thức ăn",
      description: "Thức ăn hữu cơ cao cấp cho chó mọi lứa tuổi",
      fullDescription:
        "Thức ăn hữu cơ cao cấp được làm từ những nguyên liệu tự nhiên tốt nhất. Không chứa chất bảo quản, màu nhân tạo hay hương liệu. Giàu protein và vitamin thiết yếu cho sự phát triển khỏe mạnh của thú cưng.",
      specifications: [
        "Trọng lượng: 2kg",
        "Xuất xứ: Mỹ",
        "HSD: 24 tháng",
        "Độ tuổi: Mọi lứa tuổi",
      ],
      rating: 4.8,
      inStock: true,
    },
    {
      id: 2,
      name: "Pate cho mèo vị cá hồi",
      price: "85,000đ",
      image:
        "https://images.unsplash.com/photo-1548767797-d8c844163c4c?w=300&h=300&fit=crop",
      objFile: "/models/cat-food.obj",
      category: "Thức ăn",
      description: "Pate thơm ngon với cá hồi tươi",
      fullDescription:
        "Pate cao cấp với cá hồi tươi ngon, cung cấp đầy đủ dinh dưỡng cho mèo. Kết cấu mềm mịn, dễ tiêu hóa, phù hợp cho mèo mọi lứa tuổi.",
      specifications: [
        "Trọng lượng: 400g",
        "Xuất xứ: Nhật Bản",
        "HSD: 18 tháng",
        "Vị: Cá hồi",
      ],
      rating: 4.6,
      inStock: true,
    },
    {
      id: 3,
      name: "Snack training cho chó",
      price: "120,000đ",
      image:
        "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=300&h=300&fit=crop",
      objFile: "/models/dog-treats.obj",
      category: "Thức ăn",
      description: "Snack huấn luyện với hương vị thịt bò",
      fullDescription:
        "Snack huấn luyện đặc biệt với hương vị thịt bò thơm ngon. Kích thước nhỏ gọn, phù hợp cho việc huấn luyện và thưởng cho thú cưng.",
      specifications: [
        "Trọng lượng: 500g",
        "Xuất xứ: Úc",
        "HSD: 12 tháng",
        "Vị: Thịt bò",
      ],
      rating: 4.7,
      inStock: true,
    },
    {
      id: 4,
      name: "Sữa bột cho chó con",
      price: "280,000đ",
      image:
        "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=300&h=300&fit=crop",
      objFile: "/models/puppy-milk.obj",
      category: "Thức ăn",
      description: "Sữa bột dinh dưỡng cho chó con dưới 3 tháng",
      fullDescription:
        "Sữa bột chuyên dụng cho chó con, bổ sung đầy đủ dinh dưỡng cần thiết cho giai đoạn phát triển. Công thức gần giống sữa mẹ.",
      specifications: [
        "Trọng lượng: 1kg",
        "Xuất xứ: Pháp",
        "HSD: 24 tháng",
        "Độ tuổi: 0-3 tháng",
      ],
      rating: 4.9,
      inStock: false,
    },
    // Đồ chơi
    {
      id: 5,
      name: "Bóng cao su thông minh",
      price: "199,000đ",
      image:
        "https://images.unsplash.com/photo-1605568427561-40dd23c2acea?w=300&h=300&fit=crop",
      objFile: "/models/smart-ball.obj",
      category: "Đồ chơi",
      description: "Bóng tương tác với âm thanh và đèn LED",
      fullDescription:
        "Bóng cao su thông minh với cảm biến chuyển động, phát ra âm thanh và ánh sáng khi thú cưng chơi. Giúp kích thích trí thông minh và vận động.",
      specifications: [
        "Kích thước: 8cm",
        "Pin: Sạc USB",
        "Chất liệu: Cao su tự nhiên",
        "Chống nước: IPX4",
      ],
      rating: 4.5,
      inStock: true,
    },
    {
      id: 6,
      name: "Dây thừng nhai",
      price: "65,000đ",
      image:
        "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=300&h=300&fit=crop",
      objFile: "/models/rope-toy.obj",
      category: "Đồ chơi",
      description: "Dây thừng cotton tự nhiên an toàn",
      fullDescription:
        "Dây thừng được làm từ cotton tự nhiên 100%, an toàn cho thú cưng nhai. Giúp làm sạch răng và massage nướu.",
      specifications: [
        "Chiều dài: 30cm",
        "Chất liệu: Cotton 100%",
        "Màu sắc: Đa màu",
        "An toàn: Không độc hại",
      ],
      rating: 4.3,
      inStock: true,
    },
    {
      id: 7,
      name: "Chuột nhồi bông cho mèo",
      price: "45,000đ",
      image:
        "https://images.unsplash.com/photo-1574144611937-0df059b5ef3e?w=300&h=300&fit=crop",
      objFile: "/models/cat-mouse.obj",
      category: "Đồ chơi",
      description: "Chuột nhồi bông với catnip tự nhiên",
      fullDescription:
        "Chuột nhồi bông mềm mại với catnip tự nhiên bên trong. Kích thích bản năng săn mồi của mèo và giúp giải tỏa căng thẳng.",
      specifications: [
        "Kích thước: 12cm",
        "Chất liệu: Vải nhung",
        "Catnip: Tự nhiên",
        "Màu sắc: Xám",
      ],
      rating: 4.4,
      inStock: true,
    },
    // Phụ kiện
    {
      id: 8,
      name: "Áo len cao cấp",
      price: "299,000đ",
      image:
        "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=300&h=300&fit=crop",
      objFile: "/models/dog-sweater.obj",
      category: "Phụ kiện",
      description: "Áo len ấm áp cho mùa đông",
      fullDescription:
        "Áo len cao cấp được dệt từ sợi len mềm mại, giữ ấm tốt cho thú cưng trong mùa đông. Thiết kế thời trang, dễ mặc.",
      specifications: [
        "Size: S, M, L, XL",
        "Chất liệu: Len 100%",
        "Màu sắc: Đỏ, Xanh, Vàng",
        "Giặt máy: Được",
      ],
      rating: 4.6,
      inStock: true,
    },
    {
      id: 9,
      name: "Vòng cổ LED phát sáng",
      price: "180,000đ",
      image:
        "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=300&h=300&fit=crop",
      objFile: "/models/led-collar.obj",
      category: "Phụ kiện",
      description: "Vòng cổ an toàn với đèn LED",
      fullDescription:
        "Vòng cổ LED giúp thú cưng dễ nhận biết trong bóng tối. Pin sạc USB, chống nước, nhiều chế độ nhấp nháy.",
      specifications: [
        "Kích thước: 25-45cm",
        "Pin: Sạc USB",
        "Chống nước: IPX6",
        "Thời gian sạc: 2h",
      ],
      rating: 4.7,
      inStock: true,
    },
    {
      id: 10,
      name: "Giường ngủ êm ái",
      price: "650,000đ",
      image:
        "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=300&h=300&fit=crop",
      objFile: "/models/pet-bed.obj",
      category: "Phụ kiện",
      description: "Giường ngủ memory foam cao cấp",
      fullDescription:
        "Giường ngủ với lớp đệm memory foam cao cấp, ôm sát cơ thể thú cưng. Vỏ có thể tháo rời giặt máy.",
      specifications: [
        "Kích thước: 60x80cm",
        "Chất liệu: Memory foam",
        "Vỏ: Có thể giặt",
        "Màu sắc: Nâu, Xám",
      ],
      rating: 4.8,
      inStock: true,
    },
    // Nhận nuôi
    {
      id: 11,
      name: "Golden Retriever - Luna",
      price: "Miễn phí",
      image:
        "https://images.unsplash.com/photo-1552053831-71594a27632d?w=300&h=300&fit=crop&crop=face",
      category: "Nhận nuôi",
      description: "2 tuổi, đã tiêm phòng đầy đủ, rất thân thiện",
      fullDescription:
        "Luna là một chú chó Golden Retriever 2 tuổi, rất thân thiện và ngoan ngoãn. Đã được tiêm phòng đầy đủ, tẩy giun và triệt sản. Phù hợp với gia đình có trẻ em.",
      specifications: [
        "Tuổi: 2 năm",
        "Giới tính: Cái",
        "Cân nặng: 25kg",
        "Tình trạng: Khỏe mạnh",
      ],
      rating: 5.0,
      inStock: true,
    },
    {
      id: 12,
      name: "Husky - Max",
      price: "Miễn phí",
      image:
        "https://images.unsplash.com/photo-1605568427561-40dd23c2acea?w=300&h=300&fit=crop&crop=face",
      category: "Nhận nuôi",
      description: "1.5 tuổi, năng động, cần không gian rộng",
      fullDescription:
        "Max là chú chó Husky 1.5 tuổi, rất năng động và thông minh. Cần gia đình có kinh nghiệm nuôi chó và không gian rộng để vận động.",
      specifications: [
        "Tuổi: 1.5 năm",
        "Giới tính: Đực",
        "Cân nặng: 22kg",
        "Đặc điểm: Năng động",
      ],
      rating: 5.0,
      inStock: true,
    },
  ];

  const filteredProducts = allProducts.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "Tất cả" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const addToCart = (product: Product) => {
    if (product.category === "Nhận nuôi") {
      Alert.alert(
        "Nhận nuôi thú cưng",
        `Bạn có muốn đăng ký nhận nuôi ${product.name}?`,
        [
          { text: "Hủy", style: "cancel" },
          {
            text: "Đăng ký",
            onPress: () =>
              Alert.alert("Thành công", "Đã gửi đơn đăng ký nhận nuôi!"),
          },
        ]
      );
      return;
    }

    if (!product.inStock) {
      Alert.alert("Thông báo", "Sản phẩm hiện đang hết hàng");
      return;
    }

    const existingItem = cartItems.find((item) => item.id === product.id);
    if (existingItem) {
      setCartItems(
        cartItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
    Alert.alert("Thành công", "Đã thêm vào giỏ hàng!");
  };

  const removeFromCart = (productId: number) => {
    setCartItems(cartItems.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId: number, newQuantity: number) => {
    if (newQuantity === 0) {
      removeFromCart(productId);
      return;
    }
    setCartItems(
      cartItems.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      const price = parseInt(item.price.replace(/[^\d]/g, ""));
      return total + price * item.quantity;
    }, 0);
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const renderCategoryItem = ({
    item,
    index,
  }: {
    item: any;
    index: number;
  }) => (
    <TouchableOpacity
      style={[
        styles.categoryCard,
        { marginLeft: index === 0 ? 20 : 8, marginRight: 8 },
        selectedCategory === item.name && { backgroundColor: item.color },
      ]}
      onPress={() => setSelectedCategory(item.name)}
    >
      <View
        style={[
          styles.categoryIconContainer,
          {
            backgroundColor:
              selectedCategory === item.name
                ? "rgba(255,255,255,0.2)"
                : `${item.color}20`,
          },
        ]}
      >
        <Ionicons
          name={item.icon as any}
          size={24}
          color={selectedCategory === item.name ? "#FFFFFF" : item.color}
        />
      </View>
      <Text
        style={[
          styles.categoryName,
          selectedCategory === item.name && { color: "#FFFFFF" },
        ]}
      >
        {item.name}
      </Text>
      <Text
        style={[
          styles.categoryDescription,
          selectedCategory === item.name && { color: "rgba(255,255,255,0.8)" },
        ]}
      >
        {item.description}
      </Text>
      <View
        style={[
          styles.categoryCountBadge,
          {
            backgroundColor:
              selectedCategory === item.name
                ? "rgba(255,255,255,0.2)"
                : item.color,
          },
        ]}
      >
        <Text
          style={[
            styles.categoryCount,
            { color: selectedCategory === item.name ? "#FFFFFF" : "#FFFFFF" },
          ]}
        >
          {item.count}
        </Text>
      </View>
    </TouchableOpacity>
  );

  const renderProductItem = ({ item, index }: { item: any; index: number }) => (
    <TouchableOpacity
      style={[
        styles.productCard,
        {
          marginLeft: index % 2 === 0 ? 20 : 10,
          marginRight: index % 2 === 0 ? 10 : 20,
        },
      ]}
      onPress={() => setSelectedProduct(item)}
    >
      <View style={styles.productImageContainer}>
        <Image source={{ uri: item.image }} style={styles.productImage} />
        {!item.inStock && item.category !== "Nhận nuôi" && (
          <View style={styles.outOfStockOverlay}>
            <Text style={styles.outOfStockText}>Hết hàng</Text>
          </View>
        )}
        {item.objFile && (
          <View style={styles.threeDIcon}>
            <Text style={styles.threeDText}>3D</Text>
          </View>
        )}
      </View>

      <View style={styles.productInfo}>
        <Text style={styles.productName} numberOfLines={2}>
          {item.name}
        </Text>
        <Text style={styles.productDescription} numberOfLines={2}>
          {item.description}
        </Text>

        <View style={styles.ratingContainer}>
          <Ionicons name="star" size={14} color="#FFD700" />
          <Text style={styles.ratingText}>{item.rating}</Text>
        </View>

        <View style={styles.productFooter}>
          <Text
            style={[
              styles.productPrice,
              item.category === "Nhận nuôi" && styles.adoptionPrice,
            ]}
          >
            {item.price}
          </Text>
          <TouchableOpacity
            style={[
              styles.addButton,
              !item.inStock &&
                item.category !== "Nhận nuôi" &&
                styles.disabledButton,
              item.category === "Nhận nuôi" && styles.adoptButton,
            ]}
            onPress={() => addToCart(item)}
            disabled={!item.inStock && item.category !== "Nhận nuôi"}
          >
            <Ionicons
              name={item.category === "Nhận nuôi" ? "heart" : "add"}
              size={16}
              color="#FFFFFF"
            />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderCartItem = ({ item }: { item: any; index: number }) => (
    <View style={styles.cartItem}>
      <Image source={{ uri: item.image }} style={styles.cartItemImage} />
      <View style={styles.cartItemInfo}>
        <Text style={styles.cartItemName}>{item.name}</Text>
        <Text style={styles.cartItemPrice}>{item.price}</Text>
      </View>
      <View style={styles.quantityContainer}>
        <TouchableOpacity
          style={styles.quantityButton}
          onPress={() => updateQuantity(item.id, item.quantity - 1)}
        >
          <Ionicons name="remove" size={16} color="#DC143C" />
        </TouchableOpacity>
        <Text style={styles.quantityText}>{item.quantity}</Text>
        <TouchableOpacity
          style={styles.quantityButton}
          onPress={() => updateQuantity(item.id, item.quantity + 1)}
        >
          <Ionicons name="add" size={16} color="#DC143C" />
        </TouchableOpacity>
      </View>
    </View>
  );

  const ListHeader = () => (
    <View>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Cửa hàng 3D</Text>
        <TouchableOpacity
          style={styles.cartButton}
          onPress={() => setShowCart(true)}
        >
          <Ionicons name="bag" size={24} color="#DC143C" />
          {getTotalItems() > 0 && (
            <View style={styles.cartBadge}>
              <Text style={styles.cartBadgeText}>{getTotalItems()}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons
          name="search"
          size={20}
          color="#999"
          style={styles.searchIcon}
        />
        <TextInput
          ref={searchInputRef}
          style={styles.searchInput}
          placeholder="Tìm kiếm sản phẩm..."
          placeholderTextColor="#999"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity
            onPress={() => {
              setSearchQuery("");
              searchInputRef.current?.blur();
            }}
            style={styles.clearButton}
          >
            <Ionicons name="close-circle" size={20} color="#999" />
          </TouchableOpacity>
        )}
      </View>

      {/* Categories */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Danh mục sản phẩm</Text>
        <FlatList
          data={categories}
          renderItem={renderCategoryItem}
          keyExtractor={(item) => item.name}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesContainer}
        />
      </View>

      {/* Products Section Header */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>
          {selectedCategory === "Tất cả" ? "Tất cả sản phẩm" : selectedCategory}
        </Text>
        <Text style={styles.productCount}>
          {filteredProducts.length} sản phẩm
        </Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={filteredProducts}
        renderItem={renderProductItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.productsContainer}
        ListHeaderComponent={ListHeader}
      />

      {/* Cart Modal */}
      <Modal
        visible={showCart}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <View style={styles.cartModal}>
          <View style={styles.cartHeader}>
            <Text style={styles.cartTitle}>
              Giỏ hàng ({getTotalItems()} sản phẩm)
            </Text>
            <TouchableOpacity onPress={() => setShowCart(false)}>
              <Ionicons name="close" size={24} color="#333" />
            </TouchableOpacity>
          </View>

          {cartItems.length === 0 ? (
            <View style={styles.emptyCart}>
              <Ionicons name="bag-outline" size={64} color="#999" />
              <Text style={styles.emptyCartText}>Giỏ hàng trống</Text>
              <Text style={styles.emptyCartSubtext}>
                Thêm sản phẩm để bắt đầu mua sắm
              </Text>
            </View>
          ) : (
            <>
              <FlatList
                data={cartItems}
                renderItem={renderCartItem}
                keyExtractor={(item) => item.id.toString()}
                style={styles.cartList}
              />

              <View style={styles.cartFooter}>
                <View style={styles.totalContainer}>
                  <Text style={styles.totalLabel}>Tổng cộng:</Text>
                  <Text style={styles.totalPrice}>
                    {getTotalPrice().toLocaleString("vi-VN")}đ
                  </Text>
                </View>
                <TouchableOpacity
                  style={styles.checkoutButton}
                  onPress={() => {
                    setShowCart(false);
                    setShowCheckout(true);
                  }}
                >
                  <Text style={styles.checkoutButtonText}>Thanh toán</Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </View>
      </Modal>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <ProductDetailScreen
          product={selectedProduct}
          visible={!!selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={addToCart}
        />
      )}

      {/* Checkout Modal */}
      {showCheckout && (
        <CheckoutScreen
          visible={showCheckout}
          onClose={() => setShowCheckout(false)}
          cartItems={cartItems}
          totalPrice={getTotalPrice()}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  // Removed `content` style as main ScrollView is gone
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    paddingTop: 10,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  cartButton: {
    position: "relative",
    padding: 8,
  },
  cartBadge: {
    position: "absolute",
    top: 0,
    right: 0,
    backgroundColor: "#DC143C",
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  cartBadgeText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "bold",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    marginHorizontal: 20,
    marginBottom: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
  clearButton: {
    padding: 4,
  },
  section: {
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    paddingHorizontal: 20, // This was duplicated, keeping one
    marginBottom: 16, // This was duplicated, keeping one
  },
  productCount: {
    fontSize: 14,
    color: "#666",
  },
  categoriesContainer: {
    paddingRight: 12,
    paddingVertical: 8,
  },
  categoryCard: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 16,
    alignItems: "center",
    minWidth: 120,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginVertical: 4,
  },
  categoryIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  categoryName: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  categoryDescription: {
    fontSize: 11,
    color: "#666",
    textAlign: "center",
    marginBottom: 8,
  },
  categoryCountBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  categoryCount: {
    fontSize: 12,
    fontWeight: "bold",
  },
  productsContainer: {
    paddingBottom: 20,
  },
  productCard: {
    width: (width - 50) / 2,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  productImageContainer: {
    position: "relative",
  },
  productImage: {
    width: "100%",
    height: 140,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  outOfStockOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  outOfStockText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "bold",
  },
  threeDIcon: {
    position: "absolute",
    top: 8,
    left: 8,
    backgroundColor: "#DC143C",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  threeDText: {
    color: "#FFFFFF",
    fontSize: 10,
    fontWeight: "bold",
  },
  productInfo: {
    padding: 12,
  },
  productName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
  },
  productDescription: {
    fontSize: 12,
    color: "#666",
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  ratingText: {
    fontSize: 12,
    color: "#666",
    marginLeft: 4,
  },
  productFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  productPrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#DC143C",
  },
  adoptionPrice: {
    color: "#28A745",
  },
  addButton: {
    backgroundColor: "#DC143C",
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  adoptButton: {
    backgroundColor: "#28A745",
  },
  disabledButton: {
    backgroundColor: "#999",
  },
  bottomSpacing: {
    height: 20,
  },
  // Cart Modal Styles
  cartModal: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  cartHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  cartTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  emptyCart: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 40,
  },
  emptyCartText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginTop: 16,
  },
  emptyCartSubtext: {
    fontSize: 14,
    color: "#666",
    marginTop: 8,
    textAlign: "center",
  },
  cartList: {
    flex: 1,
    padding: 20,
  },
  cartItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FAFAFA",
    padding: 12,
    borderRadius: 12,
    marginBottom: 12,
  },
  cartItemImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
  },
  cartItemInfo: {
    flex: 1,
  },
  cartItemName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
  },
  cartItemPrice: {
    fontSize: 14,
    color: "#DC143C",
    fontWeight: "bold",
    marginTop: 4,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  quantityButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#DC143C",
  },
  quantityText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginHorizontal: 16,
  },
  cartFooter: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: "#F0F0F0",
  },
  totalContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  totalPrice: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#DC143C",
  },
  checkoutButton: {
    backgroundColor: "#DC143C",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  checkoutButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default StoreScreen;
