import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const AboutScreen = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Về chúng tôi</Text>
      </View>
      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <Image
            source={{ uri: "/placeholder.svg?height=80&width=80" }}
            style={styles.logo}
          />
          <Text style={styles.appName}>Pawsy</Text>
          <Text style={styles.versionText}>Phiên bản 1.0.0</Text>
        </View>
        <Text style={styles.descriptionText}>
          Pawsy là ứng dụng chăm sóc thú cưng toàn diện, mang đến cho bạn những
          dịch vụ tốt nhất từ spa, khám sức khỏe đến nhận nuôi và mua sắm sản
          phẩm. Chúng tôi cam kết mang lại trải nghiệm tuyệt vời nhất cho bạn và
          người bạn bốn chân của mình.
        </Text>
        <TouchableOpacity style={styles.linkItem}>
          <Text style={styles.linkLabel}>Truy cập website của chúng tôi</Text>
          <Ionicons name="open-outline" size={20} color="#DC143C" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.linkItem}>
          <Text style={styles.linkLabel}>Theo dõi chúng tôi trên Facebook</Text>
          <Ionicons name="logo-facebook" size={20} color="#DC143C" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F8F8",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    paddingTop: 50,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  backButton: {
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  content: {
    padding: 20,
    alignItems: "center",
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  logo: {
    width: 80,
    height: 80,
    resizeMode: "contain",
    marginBottom: 10,
  },
  appName: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#DC143C",
  },
  versionText: {
    fontSize: 14,
    color: "#666",
    marginTop: 5,
  },
  descriptionText: {
    fontSize: 16,
    color: "#333",
    textAlign: "center",
    marginBottom: 30,
    lineHeight: 24,
  },
  linkItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    width: "100%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  linkLabel: {
    fontSize: 16,
    color: "#333",
  },
});

export default AboutScreen;
