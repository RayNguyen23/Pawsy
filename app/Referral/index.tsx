import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  Alert,
  Modal,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface ReferralScreenProps {
  visible: boolean;
  onClose: () => void;
}

const ReferralScreen: React.FC<ReferralScreenProps> = ({
  visible,
  onClose,
}) => {
  const referralCode = "MINH123";
  const referralLink = `https://pawsy.app/ref/${referralCode}`;

  const handleShare = async (platform: string) => {
    let message = "";

    switch (platform) {
      case "general":
        message = `🐾 Tham gia Pawsy cùng mình nhé!\n\nSử dụng mã giới thiệu: ${referralCode}\nTải app tại: ${referralLink}\n\n✨ Nhận ngay ưu đãi đặc biệt cho lần đầu sử dụng dịch vụ!`;
        break;
      case "facebook":
        message = `🐾 Pawsy Pet Shop - Ứng dụng chăm sóc thú cưng tuyệt vời!\n\nMình đang sử dụng và rất hài lòng. Bạn cũng thử nhé!\nMã giới thiệu: ${referralCode}\n${referralLink}`;
        break;
      case "zalo":
        message = `Pawsy Pet Shop 🐾\nMã giới thiệu: ${referralCode}\nLink: ${referralLink}`;
        break;
    }

    try {
      await Share.share({
        message: message,
        title: "Giới thiệu Pawsy Pet Shop",
      });
    } catch (error) {
      console.log("Error sharing:", error);
    }
  };

  const copyToClipboard = (text: string, type: string) => {
    // In a real app, you would use Clipboard from @react-native-clipboard/clipboard
    Alert.alert("Đã sao chép", `${type} đã được sao chép vào clipboard`);
  };

  const rewards = [
    {
      icon: "gift",
      title: "Spa miễn phí",
      description: "Mỗi bạn bè đăng ký thành công",
    },
    {
      icon: "star",
      title: "50 điểm thưởng",
      description: "Cho mỗi lần giới thiệu",
    },
    { icon: "card", title: "Giảm 20%", description: "Cho đơn hàng tiếp theo" },
  ];

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Giới thiệu bạn bè</Text>
          <TouchableOpacity onPress={onClose}>
            <Ionicons name="close" size={24} color="#333" />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Hero Section */}
          <View style={styles.heroSection}>
            <View style={styles.heroIcon}>
              <Ionicons name="people" size={48} color="#DC143C" />
            </View>
            <Text style={styles.heroTitle}>Chia sẻ niềm vui với bạn bè!</Text>
            <Text style={styles.heroSubtitle}>
              Giới thiệu Pawsy cho bạn bè và nhận những phần thưởng hấp dẫn
            </Text>
          </View>

          {/* Referral Code */}
          <View style={styles.codeSection}>
            <Text style={styles.sectionTitle}>Mã giới thiệu của bạn</Text>
            <View style={styles.codeContainer}>
              <Text style={styles.codeText}>{referralCode}</Text>
              <TouchableOpacity
                style={styles.copyButton}
                onPress={() => copyToClipboard(referralCode, "Mã giới thiệu")}
              >
                <Ionicons name="copy" size={20} color="#DC143C" />
              </TouchableOpacity>
            </View>

            <View style={styles.linkContainer}>
              <Text style={styles.linkLabel}>Link giới thiệu:</Text>
              <View style={styles.linkRow}>
                <Text style={styles.linkText} numberOfLines={1}>
                  {referralLink}
                </Text>
                <TouchableOpacity
                  style={styles.copyButton}
                  onPress={() =>
                    copyToClipboard(referralLink, "Link giới thiệu")
                  }
                >
                  <Ionicons name="copy" size={20} color="#DC143C" />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Rewards */}
          <View style={styles.rewardsSection}>
            <Text style={styles.sectionTitle}>Phần thưởng dành cho bạn</Text>
            {rewards.map((reward, index) => (
              <View key={index} style={styles.rewardItem}>
                <View style={styles.rewardIcon}>
                  <Ionicons
                    name={reward.icon as any}
                    size={24}
                    color="#DC143C"
                  />
                </View>
                <View style={styles.rewardInfo}>
                  <Text style={styles.rewardTitle}>{reward.title}</Text>
                  <Text style={styles.rewardDescription}>
                    {reward.description}
                  </Text>
                </View>
              </View>
            ))}
          </View>

          {/* Share Options */}
          <View style={styles.shareSection}>
            <Text style={styles.sectionTitle}>Chia sẻ ngay</Text>

            <TouchableOpacity
              style={styles.shareButton}
              onPress={() => handleShare("general")}
            >
              <Ionicons name="share-social" size={24} color="#FFFFFF" />
              <Text style={styles.shareButtonText}>Chia sẻ chung</Text>
            </TouchableOpacity>

            <View style={styles.socialButtons}>
              <TouchableOpacity
                style={[styles.socialButton, { backgroundColor: "#1877F2" }]}
                onPress={() => handleShare("facebook")}
              >
                <Ionicons name="logo-facebook" size={24} color="#FFFFFF" />
                <Text style={styles.socialButtonText}>Facebook</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.socialButton, { backgroundColor: "#0084FF" }]}
                onPress={() => handleShare("zalo")}
              >
                <Text style={styles.zaloText}>Z</Text>
                <Text style={styles.socialButtonText}>Zalo</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* How it works */}
          <View style={styles.howItWorksSection}>
            <Text style={styles.sectionTitle}>Cách thức hoạt động</Text>
            <View style={styles.stepContainer}>
              <View style={styles.step}>
                <View style={styles.stepNumber}>
                  <Text style={styles.stepNumberText}>1</Text>
                </View>
                <Text style={styles.stepText}>
                  Chia sẻ mã giới thiệu với bạn bè
                </Text>
              </View>

              <View style={styles.step}>
                <View style={styles.stepNumber}>
                  <Text style={styles.stepNumberText}>2</Text>
                </View>
                <Text style={styles.stepText}>
                  Bạn bè đăng ký và sử dụng dịch vụ
                </Text>
              </View>

              <View style={styles.step}>
                <View style={styles.stepNumber}>
                  <Text style={styles.stepNumberText}>3</Text>
                </View>
                <Text style={styles.stepText}>
                  Bạn nhận phần thưởng hấp dẫn
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
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
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  content: {
    flex: 1,
  },
  heroSection: {
    alignItems: "center",
    padding: 30,
    backgroundColor: "#FFF5F5",
  },
  heroIcon: {
    width: 80,
    height: 80,
    backgroundColor: "#FFFFFF",
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  heroTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: 8,
  },
  heroSubtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    lineHeight: 24,
  },
  codeSection: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 16,
  },
  codeContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF5F5",
    padding: 20,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#DC143C",
    marginBottom: 16,
  },
  codeText: {
    flex: 1,
    fontSize: 24,
    fontWeight: "bold",
    color: "#DC143C",
    textAlign: "center",
  },
  copyButton: {
    padding: 8,
  },
  linkContainer: {
    backgroundColor: "#FAFAFA",
    padding: 16,
    borderRadius: 12,
  },
  linkLabel: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
  },
  linkRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  linkText: {
    flex: 1,
    fontSize: 14,
    color: "#333",
  },
  rewardsSection: {
    padding: 20,
    backgroundColor: "#FAFAFA",
  },
  rewardItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  rewardIcon: {
    width: 48,
    height: 48,
    backgroundColor: "#FFF5F5",
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  rewardInfo: {
    flex: 1,
  },
  rewardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  rewardDescription: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  shareSection: {
    padding: 20,
  },
  shareButton: {
    flexDirection: "row",
    backgroundColor: "#DC143C",
    padding: 16,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  shareButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 8,
  },
  socialButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  socialButton: {
    flex: 1,
    flexDirection: "row",
    padding: 12,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 4,
  },
  socialButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
    marginLeft: 8,
  },
  zaloText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  howItWorksSection: {
    padding: 20,
  },
  stepContainer: {
    marginTop: 8,
  },
  step: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  stepNumber: {
    width: 32,
    height: 32,
    backgroundColor: "#DC143C",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  stepNumberText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  stepText: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
});

export default ReferralScreen;
