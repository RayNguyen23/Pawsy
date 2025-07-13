import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import SettingsScreen from "../Settings";
import StoreScreen from "../Store";
import HomeScreen from "./HomeScreen";

const TabNavigator = () => {
  const [activeTab, setActiveTab] = React.useState("Home");

  const tabs = [
    { name: "Store", icon: "storefront", label: "Cửa hàng" },
    { name: "Home", icon: "home", label: "Trang chủ" },
    { name: "Settings", icon: "settings", label: "Cài đặt" },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "Home":
        return <HomeScreen />;
      case "Store":
        return <StoreScreen />;
      case "Settings":
        return <SettingsScreen />;
      default:
        return <HomeScreen />;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>{renderContent()}</View>

      <View style={styles.tabBar}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab.name}
            style={[
              styles.tabItem,
              activeTab === tab.name && styles.activeTabItem,
            ]}
            onPress={() => setActiveTab(tab.name)}
          >
            <Ionicons
              name={tab.icon as any}
              size={24}
              color={activeTab === tab.name ? "#DC143C" : "#999"}
            />
            <Text
              style={[
                styles.tabLabel,
                activeTab === tab.name && styles.activeTabLabel,
              ]}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
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
  tabBar: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#E0E0E0",
    paddingBottom: 10,
    paddingTop: 10,
    paddingHorizontal: 8,
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
  activeTabItem: {
    backgroundColor: "#FFF5F5",
    borderRadius: 12,
  },
  tabLabel: {
    fontSize: 12,
    color: "#999",
    marginTop: 4,
    fontWeight: "500",
  },
  activeTabLabel: {
    color: "#DC143C",
    fontWeight: "600",
  },
});

export default TabNavigator;
