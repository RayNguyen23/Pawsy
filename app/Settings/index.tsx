import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const SettingsScreen = () => {
  const router = useRouter();

  const handleLogout = () => {
    Alert.alert("Đăng xuất", "Bạn có chắc chắn muốn đăng xuất?", [
      { text: "Hủy", style: "cancel" },
      {
        text: "Đăng xuất",
        onPress: () => Alert.alert("Thông báo", "Đã đăng xuất thành công!"),
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Cài đặt</Text>
      </View>
      <ScrollView style={styles.content}>
        <Text style={styles.sectionTitle}>Tài khoản</Text>
        <TouchableOpacity
          style={styles.settingItem}
          onPress={() => router.push("/Settings/ProfileScreen")}
        >
          <Ionicons
            name="person-outline"
            size={24}
            color="#DC143C"
            style={styles.settingIcon}
          />
          <Text style={styles.settingLabel}>Thông tin cá nhân</Text>
          <Ionicons name="chevron-forward" size={20} color="#999" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.settingItem}
          onPress={() => router.push("/Settings/NotificationScreen")}
        >
          <Ionicons
            name="notifications-outline"
            size={24}
            color="#DC143C"
            style={styles.settingIcon}
          />
          <Text style={styles.settingLabel}>Thông báo</Text>
          <Ionicons name="chevron-forward" size={20} color="#999" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.settingItem}
          onPress={() => router.push("/Settings/PrivacyScreen")}
        >
          <Ionicons
            name="lock-closed-outline"
            size={24}
            color="#DC143C"
            style={styles.settingIcon}
          />
          <Text style={styles.settingLabel}>Quyền riêng tư</Text>
          <Ionicons name="chevron-forward" size={20} color="#999" />
        </TouchableOpacity>

        <Text style={styles.sectionTitle}>Cài đặt chung</Text>
        <TouchableOpacity
          style={styles.settingItem}
          onPress={() => router.push("/Settings/LanguageScreen")}
        >
          <Ionicons
            name="language-outline"
            size={24}
            color="#DC143C"
            style={styles.settingIcon}
          />
          <Text style={styles.settingLabel}>Ngôn ngữ</Text>
          <Ionicons name="chevron-forward" size={20} color="#999" />
        </TouchableOpacity>
        {/* Add more general settings here */}

        <Text style={styles.sectionTitle}>Hỗ trợ</Text>
        <TouchableOpacity
          style={styles.settingItem}
          onPress={() => router.push("/Settings/HelpScreen")}
        >
          <Ionicons
            name="help-circle-outline"
            size={24}
            color="#DC143C"
            style={styles.settingIcon}
          />
          <Text style={styles.settingLabel}>Trợ giúp & Hỗ trợ</Text>
          <Ionicons name="chevron-forward" size={20} color="#999" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.settingItem}
          onPress={() => router.push("/Settings/AboutScreen")}
        >
          <Ionicons
            name="information-circle-outline"
            size={24}
            color="#DC143C"
            style={styles.settingIcon}
          />
          <Text style={styles.settingLabel}>Về chúng tôi</Text>
          <Ionicons name="chevron-forward" size={20} color="#999" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Ionicons
            name="log-out-outline"
            size={24}
            color="#FFFFFF"
            style={styles.settingIcon}
          />
          <Text style={styles.logoutButtonText}>Đăng xuất</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F8F8",
  },
  header: {
    padding: 20,
    paddingTop: 50,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  content: {
    flex: 1,
    padding: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#666",
    marginTop: 20,
    marginBottom: 10,
  },
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  settingIcon: {
    marginRight: 15,
  },
  settingLabel: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#DC143C",
    padding: 15,
    borderRadius: 10,
    marginTop: 30,
    marginBottom: 50,
    justifyContent: "center",
  },
  logoutButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 10,
  },
});

export default SettingsScreen;
