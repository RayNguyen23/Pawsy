import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const SettingsScreen = () => {
  const settingsOptions = [
    {
      icon: "person",
      title: "Thông tin cá nhân",
      subtitle: "Chỉnh sửa hồ sơ của bạn",
    },
    {
      icon: "paw",
      title: "Quản lý thú cưng",
      subtitle: "Thêm hoặc chỉnh sửa thông tin pet",
    },
    {
      icon: "location",
      title: "Địa chỉ",
      subtitle: "Quản lý địa chỉ giao hàng",
    },
    { icon: "card", title: "Thanh toán", subtitle: "Phương thức thanh toán" },
    {
      icon: "notifications",
      title: "Thông báo",
      subtitle: "Cài đặt thông báo",
    },
    { icon: "help-circle", title: "Hỗ trợ", subtitle: "Liên hệ với chúng tôi" },
    {
      icon: "information-circle",
      title: "Về ứng dụng",
      subtitle: "Phiên bản 1.0.0",
    },
  ];

  return (
    <View style={styles.container}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <Image
            source={{
              uri: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
            }}
            style={styles.profileImage}
          />
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>Minh Nguyen</Text>
            <Text style={styles.profileEmail}>minh@pawsy.com</Text>
          </View>
          <TouchableOpacity style={styles.editButton}>
            <Ionicons name="pencil" size={16} color="#DC143C" />
          </TouchableOpacity>
        </View>

        {/* Settings Options */}
        <View style={styles.section}>
          {settingsOptions.map((option, index) => (
            <TouchableOpacity key={index} style={styles.settingItem}>
              <View style={styles.settingIcon}>
                <Ionicons name={option.icon as any} size={24} color="#DC143C" />
              </View>
              <View style={styles.settingContent}>
                <Text style={styles.settingTitle}>{option.title}</Text>
                <Text style={styles.settingSubtitle}>{option.subtitle}</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#999" />
            </TouchableOpacity>
          ))}
        </View>

        {/* Logout Button */}
        <View style={styles.section}>
          <TouchableOpacity style={styles.logoutButton}>
            <Ionicons name="log-out" size={20} color="#DC143C" />
            <Text style={styles.logoutText}>Đăng xuất</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.bottomSpacing} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  content: {
    flex: 1,
  },
  profileHeader: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#FAFAFA",
    marginBottom: 20,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: "#DC143C",
  },
  profileInfo: {
    flex: 1,
    marginLeft: 16,
  },
  profileName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  profileEmail: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  editButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#FFF5F5",
    justifyContent: "center",
    alignItems: "center",
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  settingIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#FFF5F5",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  settingSubtitle: {
    fontSize: 14,
    color: "#666",
    marginTop: 2,
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    backgroundColor: "#FFF5F5",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#FFE4E1",
  },
  logoutText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#DC143C",
    marginLeft: 8,
  },
  bottomSpacing: {
    height: 20,
  },
});

export default SettingsScreen;
