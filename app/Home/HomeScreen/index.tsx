import BookingScreen from "@/app/Booking";
import ReferralScreen from "@/app/Referral";
import ScheduleDetailWidget from "@/components/ScheduleDetailWidget";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Alert,
  Dimensions,
  FlatList,
  Image,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { width } = Dimensions.get("window");

interface Product {
  id: string;
  name: string;
  price: string;
  image: string;
  isNew?: boolean;
}

interface Pet {
  id: string;
  name: string;
  breed: string;
  image: string;
}

interface Tip {
  id: string;
  icon: string;
  title: string;
}

const HomeScreen = () => {
  const [userName] = useState("Minh");
  const [userPet] = useState({
    name: "Mimi",
    avatar:
      "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=100&h=100&fit=crop&crop=face",
  });

  const [showBooking, setShowBooking] = useState(false);
  const [showReferral, setShowReferral] = useState(false);
  const [showScheduleDetail, setShowScheduleDetail] = useState(false);

  const featuredProducts = [
    {
      id: "1",
      name: "Áo len cao cấp",
      price: "299,000đ",
      image:
        "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=200&h=200&fit=crop",
      isNew: true,
    },
    {
      id: "2",
      name: "Thức ăn hữu cơ",
      price: "450,000đ",
      image:
        "https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=200&h=200&fit=crop",
      isNew: false,
    },
    {
      id: "3",
      name: "Đồ chơi thông minh",
      price: "199,000đ",
      image:
        "https://images.unsplash.com/photo-1605568427561-40dd23c2acea?w=200&h=200&fit=crop",
      isNew: true,
    },
  ];

  const adoptionPets = [
    {
      id: "1",
      name: "Luna",
      breed: "Golden Retriever",
      image:
        "https://images.unsplash.com/photo-1552053831-71594a27632d?w=150&h=150&fit=crop&crop=face",
    },
    {
      id: "2",
      name: "Max",
      breed: "Husky",
      image:
        "https://images.unsplash.com/photo-1605568427561-40dd23c2acea?w=150&h=150&fit=crop&crop=face",
    },
  ];

  const petTips = [
    {
      id: "1",
      title: "3 Mẹo chăm sóc thú cưng vào mùa hè",
      icon: "🦴",
    },
    {
      id: "2",
      title: "Ưu đãi tháng này: Giảm 20% cho spa đầu tiên",
      icon: "🎁",
    },
  ];

  const handleQuickBooking = () => {
    setShowBooking(true);
  };

  const handleReferFriend = () => {
    setShowReferral(true);
  };

  const handleStore3D = () => {
    Alert.alert(
      "Cửa hàng 3D",
      "Chuyển đến tab Cửa hàng để khám phá sản phẩm 3D!"
    );
  };

  const handleShareReferral = async () => {
    try {
      await Share.share({
        message: `Tham gia Pawsy cùng mình nhé! Sử dụng mã giới thiệu MINH123 để nhận ưu đãi đặc biệt. Tải app tại: https://pawsy.app`,
        title: "Giới thiệu Pawsy Pet Shop",
      });
    } catch (error) {
      console.log("Error sharing:", error);
    }
  };

  const renderProductItem = ({
    item,
    index,
  }: {
    item: Product;
    index: number;
  }) => (
    <View
      style={[
        styles.productCard,
        { marginLeft: index === 0 ? 20 : 8, marginRight: 8 },
      ]}
    >
      <View style={styles.productImageContainer}>
        <Image source={{ uri: item.image }} style={styles.productImage} />
        {item.isNew && (
          <View style={styles.newBadge}>
            <Text style={styles.newBadgeText}>Mới</Text>
          </View>
        )}
      </View>
      <Text style={styles.productName}>{item.name}</Text>
      <Text style={styles.productPrice}>{item.price}</Text>
    </View>
  );

  const renderAdoptionPet = ({ item, index }: { item: Pet; index: number }) => (
    <View
      style={[
        styles.adoptionCard,
        { marginLeft: index === 0 ? 20 : 8, marginRight: 8 },
      ]}
    >
      <Image source={{ uri: item.image }} style={styles.adoptionImage} />
      <View style={styles.adoptionInfo}>
        <Text style={styles.adoptionName}>{item.name}</Text>
        <Text style={styles.adoptionBreed}>{item.breed}</Text>
      </View>
    </View>
  );

  const renderTipItem = ({ item, index }: { item: Tip; index: number }) => (
    <View
      style={[
        styles.tipCard,
        { marginLeft: index === 0 ? 20 : 8, marginRight: 8 },
      ]}
    >
      <Text style={styles.tipIcon}>{item.icon}</Text>
      <Text style={styles.tipTitle}>{item.title}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scrollView}
      >
        {/* Welcome Section */}
        <View style={styles.welcomeSection}>
          <View style={styles.welcomeHeader}>
            <View>
              <Text style={styles.welcomeText}>Chào mừng, {userName} 👋</Text>
              <Text style={styles.welcomeSubtext}>
                Hôm nay bạn muốn làm gì?
              </Text>
            </View>
            <View style={styles.petAvatarContainer}>
              <Image
                source={{ uri: userPet.avatar }}
                style={styles.petAvatar}
              />
              <Text style={styles.petName}>{userPet.name}</Text>
            </View>
          </View>

          <View style={styles.quickActions}>
            <TouchableOpacity
              style={styles.quickActionButton}
              onPress={handleQuickBooking}
            >
              <Ionicons name="calendar" size={20} color="#DC143C" />
              <Text style={styles.quickActionText}>Đặt lịch nhanh</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.quickActionButton}
              onPress={handleStore3D}
            >
              <Ionicons name="storefront" size={20} color="#DC143C" />
              <Text style={styles.quickActionText}>Cửa hàng 3D</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.quickActionButton}
              onPress={handleReferFriend}
            >
              <Ionicons name="people" size={20} color="#DC143C" />
              <Text style={styles.quickActionText}>Giới thiệu bạn bè</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Upcoming Booking */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Lịch hẹn sắp tới</Text>
          <TouchableOpacity
            style={styles.bookingCard}
            onPress={() => setShowScheduleDetail(true)}
          >
            <View style={styles.bookingIcon}>
              <Ionicons name="cut" size={24} color="#DC143C" />
            </View>
            <View style={styles.bookingInfo}>
              <Text style={styles.bookingTitle}>🐾 Spa cho Mimi</Text>
              <Text style={styles.bookingTime}>Thứ 5, 15/07 lúc 10:00</Text>
            </View>
            <TouchableOpacity style={styles.bookingButton}>
              <Text style={styles.bookingButtonText}>Xem chi tiết</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        </View>

        {/* Featured Products */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Sản phẩm nổi bật</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>Xem tất cả</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={featuredProducts}
            renderItem={renderProductItem}
            keyExtractor={(item) => item.id.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.flatListContainer}
          />
        </View>

        {/* Adopt a Pet */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Nhận nuôi thú cưng</Text>
          <FlatList
            data={adoptionPets}
            renderItem={renderAdoptionPet}
            keyExtractor={(item) => item.id.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.flatListContainer}
          />
          <TouchableOpacity style={styles.adoptionCTA}>
            <Text style={styles.adoptionCTAText}>
              Xem thêm thú cưng đang chờ nhận nuôi
            </Text>
            <Ionicons name="arrow-forward" size={16} color="#DC143C" />
          </TouchableOpacity>
        </View>

        {/* Referral Reward */}
        <View style={styles.section}>
          <View style={styles.referralCard}>
            <View style={styles.referralHeader}>
              <Ionicons name="gift" size={24} color="#DC143C" />
              <Text style={styles.referralTitle}>
                Giới thiệu bạn bè để nhận spa miễn phí!
              </Text>
            </View>
            <View style={styles.referralCode}>
              <Text style={styles.referralCodeLabel}>
                Mã giới thiệu của bạn:
              </Text>
              <Text style={styles.referralCodeText}>MINH123</Text>
            </View>
            <TouchableOpacity
              style={styles.shareButton}
              onPress={handleShareReferral}
            >
              <Ionicons name="share-social" size={16} color="#FFFFFF" />
              <Text style={styles.shareButtonText}>Chia sẻ ngay</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* News & Tips */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Tin tức & Mẹo hay</Text>
          <FlatList
            data={petTips}
            renderItem={renderTipItem}
            keyExtractor={(item) => item.id.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.flatListContainer}
          />
        </View>

        <View style={styles.bottomSpacing} />
      </ScrollView>

      {/* Booking Modal */}
      {showBooking && (
        <BookingScreen
          visible={showBooking}
          onClose={() => setShowBooking(false)}
        />
      )}

      {/* Referral Modal */}
      {showReferral && (
        <ReferralScreen
          visible={showReferral}
          onClose={() => setShowReferral(false)}
        />
      )}

      {/* Schedule Detail Widget */}
      {showScheduleDetail && (
        <ScheduleDetailWidget
          visible={showScheduleDetail}
          onClose={() => setShowScheduleDetail(false)}
        />
      )}
    </View>
  );
};

// ... (styles remain the same as before)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  scrollView: {
    flex: 1,
  },
  welcomeSection: {
    padding: 20,
    backgroundColor: "#FAFAFA",
  },
  welcomeHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  welcomeSubtext: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  petAvatarContainer: {
    alignItems: "center",
  },
  petAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: "#DC143C",
  },
  petName: {
    fontSize: 12,
    color: "#DC143C",
    fontWeight: "600",
    marginTop: 4,
  },
  quickActions: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  quickActionButton: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginHorizontal: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  quickActionText: {
    fontSize: 12,
    color: "#333",
    marginTop: 8,
    textAlign: "center",
    fontWeight: "500",
  },
  section: {
    paddingTop: 20,
    paddingBottom: 0,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 16,
    paddingHorizontal: 20,
  },
  seeAllText: {
    color: "#DC143C",
    fontSize: 14,
    fontWeight: "600",
  },
  flatListContainer: {
    paddingRight: 12,
    paddingVertical: 8,
  },
  bookingCard: {
    flexDirection: "row",
    backgroundColor: "#FFF5F5",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    borderLeftWidth: 4,
    borderLeftColor: "#DC143C",
    marginHorizontal: 20,
    marginBottom: 20,
  },
  bookingIcon: {
    width: 40,
    height: 40,
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  bookingInfo: {
    flex: 1,
  },
  bookingTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  bookingTime: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  bookingButton: {
    backgroundColor: "#DC143C",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  bookingButtonText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "600",
  },
  productCard: {
    width: 140,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginVertical: 4,
  },
  productImageContainer: {
    position: "relative",
  },
  productImage: {
    width: "100%",
    height: 120,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  newBadge: {
    position: "absolute",
    top: 8,
    right: 8,
    backgroundColor: "#DC143C",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  newBadgeText: {
    color: "#FFFFFF",
    fontSize: 10,
    fontWeight: "600",
  },
  productName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    padding: 12,
    paddingBottom: 4,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#DC143C",
    paddingHorizontal: 12,
    paddingBottom: 12,
  },
  adoptionCard: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    padding: 12,
    borderRadius: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    width: 200,
    marginVertical: 4,
  },
  adoptionImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 12,
  },
  adoptionInfo: {
    flex: 1,
  },
  adoptionName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  adoptionBreed: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  adoptionCTA: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 16,
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 12,
    backgroundColor: "#FFF5F5",
    borderRadius: 8,
  },
  adoptionCTAText: {
    color: "#DC143C",
    fontSize: 14,
    fontWeight: "600",
    marginRight: 8,
  },
  referralCard: {
    backgroundColor: "#FFF5F5",
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#FFE4E1",
    marginHorizontal: 20,
    marginBottom: 20,
  },
  referralHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  referralTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginLeft: 12,
    flex: 1,
  },
  referralCode: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  referralCodeLabel: {
    fontSize: 14,
    color: "#666",
  },
  referralCodeText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#DC143C",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  shareButton: {
    flexDirection: "row",
    backgroundColor: "#DC143C",
    padding: 12,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  shareButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
    marginLeft: 8,
  },
  tipCard: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 12,
    width: width * 0.7,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginVertical: 4,
  },
  tipIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  tipTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    lineHeight: 20,
  },
  bottomSpacing: {
    height: 20,
  },
});

export default HomeScreen;
