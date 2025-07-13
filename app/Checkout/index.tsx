import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Alert,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

interface CartItem {
  id: number;
  name: string;
  price: string;
  image: string;
  quantity: number;
}

interface CheckoutScreenProps {
  visible: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  totalPrice: number;
}

const CheckoutScreen: React.FC<CheckoutScreenProps> = ({
  visible,
  onClose,
  cartItems,
  totalPrice,
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [deliveryInfo, setDeliveryInfo] = useState({
    fullName: "",
    phone: "",
    address: "",
    note: "",
  });

  const generateTransactionId = () => {
    return "PW" + Date.now().toString().slice(-8);
  };

  const [transactionId] = useState(generateTransactionId());

  const handleNextStep = () => {
    if (currentStep === 1) {
      // Validate delivery info
      if (
        !deliveryInfo.fullName ||
        !deliveryInfo.phone ||
        !deliveryInfo.address
      ) {
        Alert.alert("Thông báo", "Vui lòng điền đầy đủ thông tin giao hàng");
        return;
      }
      setCurrentStep(2);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep === 2) {
      setCurrentStep(1);
    }
  };

  const handleCompletePayment = () => {
    Alert.alert("Xác nhận thanh toán", "Bạn đã chuyển khoản thành công?", [
      { text: "Chưa", style: "cancel" },
      {
        text: "Đã chuyển",
        onPress: () => {
          Alert.alert(
            "Thành công",
            "Đơn hàng đã được xác nhận! Chúng tôi sẽ liên hệ với bạn sớm nhất."
          );
          onClose();
        },
      },
    ]);
  };

  const renderDeliveryForm = () => (
    <ScrollView
      style={styles.formContainer}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.stepTitle}>Thông tin giao hàng</Text>

      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>Họ và tên *</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Nhập họ và tên người nhận"
          value={deliveryInfo.fullName}
          onChangeText={(text) =>
            setDeliveryInfo({ ...deliveryInfo, fullName: text })
          }
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>Số điện thoại *</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Nhập số điện thoại"
          keyboardType="phone-pad"
          value={deliveryInfo.phone}
          onChangeText={(text) =>
            setDeliveryInfo({ ...deliveryInfo, phone: text })
          }
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>Địa chỉ giao hàng *</Text>
        <TextInput
          style={[styles.textInput, styles.addressInput]}
          placeholder="Nhập địa chỉ chi tiết"
          multiline
          numberOfLines={3}
          value={deliveryInfo.address}
          onChangeText={(text) =>
            setDeliveryInfo({ ...deliveryInfo, address: text })
          }
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>Ghi chú (tùy chọn)</Text>
        <TextInput
          style={[styles.textInput, styles.noteInput]}
          placeholder="Ghi chú thêm cho đơn hàng..."
          multiline
          numberOfLines={2}
          value={deliveryInfo.note}
          onChangeText={(text) =>
            setDeliveryInfo({ ...deliveryInfo, note: text })
          }
        />
      </View>

      {/* Order Summary */}
      <View style={styles.orderSummary}>
        <Text style={styles.summaryTitle}>Tóm tắt đơn hàng</Text>
        {cartItems.map((item) => (
          <View key={item.id} style={styles.summaryItem}>
            <Image source={{ uri: item.image }} style={styles.summaryImage} />
            <View style={styles.summaryInfo}>
              <Text style={styles.summaryName}>{item.name}</Text>
              <Text style={styles.summaryQuantity}>
                Số lượng: {item.quantity}
              </Text>
            </View>
            <Text style={styles.summaryPrice}>{item.price}</Text>
          </View>
        ))}
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Tổng cộng:</Text>
          <Text style={styles.totalAmount}>
            {totalPrice.toLocaleString("vi-VN")}đ
          </Text>
        </View>
      </View>
    </ScrollView>
  );

  const renderPaymentInfo = () => (
    <ScrollView
      style={styles.paymentContainer}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.stepTitle}>Thông tin thanh toán</Text>

      {/* QR Code */}
      <View style={styles.qrContainer}>
        <Text style={styles.qrTitle}>Quét mã QR để thanh toán</Text>
        <View style={styles.qrCodePlaceholder}>
          <Ionicons name="qr-code" size={120} color="#DC143C" />
          <Text style={styles.qrText}>Mã QR thanh toán</Text>
        </View>
      </View>

      {/* Bank Info */}
      <View style={styles.bankInfo}>
        <Text style={styles.bankTitle}>Thông tin chuyển khoản</Text>

        <View style={styles.bankDetail}>
          <View style={styles.bankRow}>
            <Text style={styles.bankLabel}>Ngân hàng:</Text>
            <Text style={styles.bankValue}>Vietcombank</Text>
          </View>

          <View style={styles.bankRow}>
            <Text style={styles.bankLabel}>Số tài khoản:</Text>
            <View style={styles.accountContainer}>
              <Text style={styles.bankValue}>1234567890</Text>
              <TouchableOpacity style={styles.copyButton}>
                <Ionicons name="copy" size={16} color="#DC143C" />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.bankRow}>
            <Text style={styles.bankLabel}>Chủ tài khoản:</Text>
            <Text style={styles.bankValue}>PAWSY PET SHOP</Text>
          </View>

          <View style={styles.bankRow}>
            <Text style={styles.bankLabel}>Mã giao dịch:</Text>
            <View style={styles.accountContainer}>
              <Text style={styles.transactionId}>{transactionId}</Text>
              <TouchableOpacity style={styles.copyButton}>
                <Ionicons name="copy" size={16} color="#DC143C" />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.bankRow}>
            <Text style={styles.bankLabel}>Số tiền:</Text>
            <Text style={styles.amountValue}>
              {totalPrice.toLocaleString("vi-VN")}đ
            </Text>
          </View>
        </View>

        <View style={styles.noteContainer}>
          <Ionicons name="information-circle" size={20} color="#FF9500" />
          <Text style={styles.noteText}>
            Vui lòng ghi đúng mã giao dịch "{transactionId}" khi chuyển khoản
          </Text>
        </View>
      </View>

      {/* Delivery Info Summary */}
      <View style={styles.deliverySummary}>
        <Text style={styles.summaryTitle}>Thông tin giao hàng</Text>
        <View style={styles.deliveryDetail}>
          <Text style={styles.deliveryLabel}>
            Người nhận: {deliveryInfo.fullName}
          </Text>
          <Text style={styles.deliveryLabel}>
            Điện thoại: {deliveryInfo.phone}
          </Text>
          <Text style={styles.deliveryLabel}>
            Địa chỉ: {deliveryInfo.address}
          </Text>
          {deliveryInfo.note && (
            <Text style={styles.deliveryLabel}>
              Ghi chú: {deliveryInfo.note}
            </Text>
          )}
        </View>
      </View>
    </ScrollView>
  );

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="fullScreen"
    >
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={currentStep === 1 ? onClose : handlePreviousStep}
            style={styles.backButton}
          >
            <Ionicons name="arrow-back" size={24} color="#333" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>
            {currentStep === 1 ? "Thông tin giao hàng" : "Thanh toán"}
          </Text>
          <View style={styles.stepIndicator}>
            <Text style={styles.stepText}>{currentStep}/2</Text>
          </View>
        </View>

        {/* Progress Bar */}
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View
              style={[
                styles.progressFill,
                { width: `${(currentStep / 2) * 100}%` },
              ]}
            />
          </View>
        </View>

        {/* Content */}
        {currentStep === 1 ? renderDeliveryForm() : renderPaymentInfo()}

        {/* Bottom Action */}
        <View style={styles.bottomAction}>
          {currentStep === 1 ? (
            <TouchableOpacity
              style={styles.nextButton}
              onPress={handleNextStep}
            >
              <Text style={styles.nextButtonText}>Tiếp tục</Text>
              <Ionicons name="arrow-forward" size={20} color="#FFFFFF" />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.completeButton}
              onPress={handleCompletePayment}
            >
              <Ionicons name="checkmark-circle" size={20} color="#FFFFFF" />
              <Text style={styles.completeButtonText}>
                Xác nhận đã thanh toán
              </Text>
            </TouchableOpacity>
          )}
        </View>
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
    paddingTop: 50,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  stepIndicator: {
    backgroundColor: "#DC143C",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  stepText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "bold",
  },
  progressContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  progressBar: {
    height: 4,
    backgroundColor: "#F0F0F0",
    borderRadius: 2,
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#DC143C",
    borderRadius: 2,
  },
  formContainer: {
    flex: 1,
    padding: 20,
  },
  stepTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    backgroundColor: "#FAFAFA",
  },
  addressInput: {
    height: 80,
    textAlignVertical: "top",
  },
  noteInput: {
    height: 60,
    textAlignVertical: "top",
  },
  orderSummary: {
    backgroundColor: "#FAFAFA",
    padding: 16,
    borderRadius: 12,
    marginTop: 20,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 16,
  },
  summaryItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  summaryImage: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 12,
  },
  summaryInfo: {
    flex: 1,
  },
  summaryName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
  },
  summaryQuantity: {
    fontSize: 12,
    color: "#666",
    marginTop: 2,
  },
  summaryPrice: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#DC143C",
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 12,
    borderTopWidth: 2,
    borderTopColor: "#DC143C",
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  totalAmount: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#DC143C",
  },
  paymentContainer: {
    flex: 1,
    padding: 20,
  },
  qrContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  qrTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 16,
  },
  qrCodePlaceholder: {
    width: 200,
    height: 200,
    backgroundColor: "#FAFAFA",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#E0E0E0",
    borderStyle: "dashed",
  },
  qrText: {
    fontSize: 14,
    color: "#666",
    marginTop: 8,
  },
  bankInfo: {
    backgroundColor: "#FAFAFA",
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
  },
  bankTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 16,
  },
  bankDetail: {
    marginBottom: 16,
  },
  bankRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  bankLabel: {
    fontSize: 14,
    color: "#666",
    flex: 1,
  },
  bankValue: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    flex: 1,
    textAlign: "right",
  },
  accountContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    justifyContent: "flex-end",
  },
  copyButton: {
    marginLeft: 8,
    padding: 4,
  },
  transactionId: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#DC143C",
  },
  amountValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#DC143C",
  },
  noteContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "#FFF9E6",
    padding: 12,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: "#FF9500",
  },
  noteText: {
    fontSize: 14,
    color: "#FF9500",
    marginLeft: 8,
    flex: 1,
    lineHeight: 20,
  },
  deliverySummary: {
    backgroundColor: "#F0FFF4",
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: "#28A745",
  },
  deliveryDetail: {
    marginTop: 8,
  },
  deliveryLabel: {
    fontSize: 14,
    color: "#333",
    marginBottom: 4,
  },
  bottomAction: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: "#F0F0F0",
  },
  nextButton: {
    flexDirection: "row",
    backgroundColor: "#DC143C",
    padding: 16,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  nextButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 8,
  },
  completeButton: {
    flexDirection: "row",
    backgroundColor: "#28A745",
    padding: 16,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  completeButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 8,
  },
});

export default CheckoutScreen;
