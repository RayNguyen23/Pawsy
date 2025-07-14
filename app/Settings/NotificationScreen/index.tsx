"use client";

import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet, Switch, Text, TouchableOpacity, View } from "react-native";

const NotificationsScreen = () => {
  const router = useRouter();
  const [bookingNotifications, setBookingNotifications] = useState(true);
  const [promotionNotifications, setPromotionNotifications] = useState(true);
  const [newsNotifications, setNewsNotifications] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Cài đặt thông báo</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.sectionTitle}>Quản lý thông báo</Text>
        <View style={styles.settingItem}>
          <Text style={styles.settingLabel}>Thông báo lịch hẹn</Text>
          <Switch
            trackColor={{ false: "#E0E0E0", true: "#DC143C" }}
            thumbColor={bookingNotifications ? "#FFFFFF" : "#F4F3F4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={setBookingNotifications}
            value={bookingNotifications}
          />
        </View>
        <View style={styles.settingItem}>
          <Text style={styles.settingLabel}>Thông báo khuyến mãi</Text>
          <Switch
            trackColor={{ false: "#E0E0E0", true: "#DC143C" }}
            thumbColor={promotionNotifications ? "#FFFFFF" : "#F4F3F4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={setPromotionNotifications}
            value={promotionNotifications}
          />
        </View>
        <View style={styles.settingItem}>
          <Text style={styles.settingLabel}>Thông báo tin tức</Text>
          <Switch
            trackColor={{ false: "#E0E0E0", true: "#DC143C" }}
            thumbColor={newsNotifications ? "#FFFFFF" : "#F4F3F4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={setNewsNotifications}
            value={newsNotifications}
          />
        </View>
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
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
  },
  settingItem: {
    flexDirection: "row",
    justifyContent: "space-between",
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
  settingLabel: {
    fontSize: 16,
    color: "#333",
  },
});

export default NotificationsScreen;
