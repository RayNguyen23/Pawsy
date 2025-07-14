"use client";

import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const LanguageScreen = () => {
  const router = useRouter();
  const [selectedLanguage, setSelectedLanguage] = useState("Tiếng Việt");

  const languages = ["Tiếng Việt", "English"];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Ngôn ngữ</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.sectionTitle}>Chọn ngôn ngữ</Text>
        {languages.map((lang) => (
          <TouchableOpacity
            key={lang}
            style={styles.languageItem}
            onPress={() => setSelectedLanguage(lang)}
          >
            <Text style={styles.languageLabel}>{lang}</Text>
            {selectedLanguage === lang && (
              <Ionicons name="checkmark-circle" size={24} color="#DC143C" />
            )}
          </TouchableOpacity>
        ))}
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
  languageItem: {
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
  languageLabel: {
    fontSize: 16,
    color: "#333",
  },
});

export default LanguageScreen;
