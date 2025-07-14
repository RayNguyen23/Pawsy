import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const HelpScreen = () => {
  const router = useRouter();

  const handleContactSupport = () => {
    Linking.openURL("mailto:support@pawsy.app");
  };

  const handleFAQ = () => {
    // Navigate to an FAQ screen or open a web link
    Linking.openURL("https://pawsy.app/faq");
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Trợ giúp & Hỗ trợ</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.sectionTitle}>Bạn cần giúp đỡ?</Text>
        <TouchableOpacity style={styles.helpItem} onPress={handleFAQ}>
          <Ionicons
            name="help-circle-outline"
            size={24}
            color="#DC143C"
            style={styles.helpIcon}
          />
          <Text style={styles.helpLabel}>Câu hỏi thường gặp (FAQ)</Text>
          <Ionicons name="chevron-forward" size={20} color="#999" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.helpItem}
          onPress={handleContactSupport}
        >
          <Ionicons
            name="mail-outline"
            size={24}
            color="#DC143C"
            style={styles.helpIcon}
          />
          <Text style={styles.helpLabel}>Liên hệ hỗ trợ</Text>
          <Ionicons name="chevron-forward" size={20} color="#999" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.helpItem}>
          <Ionicons
            name="document-text-outline"
            size={24}
            color="#DC143C"
            style={styles.helpIcon}
          />
          <Text style={styles.helpLabel}>Hướng dẫn sử dụng</Text>
          <Ionicons name="chevron-forward" size={20} color="#999" />
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
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
  },
  helpItem: {
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
  helpIcon: {
    marginRight: 15,
  },
  helpLabel: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
});

export default HelpScreen;
