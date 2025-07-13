import CalendarPicker from "@/components/CalendarPicker";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Alert,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface BookingScreenProps {
  visible: boolean;
  onClose: () => void;
}

interface Service {
  id: string;
  name: string;
  price: number; // Changed to number for easier calculation
  displayPrice: string; // For display purposes
  icon: string;
}

const BookingScreen: React.FC<BookingScreenProps> = ({ visible, onClose }) => {
  const [selectedServices, setSelectedServices] = useState<string[]>([]); // Changed to array
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const services: Service[] = [
    {
      id: "spa",
      name: "Spa & Grooming",
      price: 200000,
      displayPrice: "200,000đ",
      icon: "cut",
    },
    {
      id: "health",
      name: "Khám sức khỏe",
      price: 150000,
      displayPrice: "150,000đ",
      icon: "medical",
    },
    {
      id: "vaccine",
      name: "Tiêm phòng",
      price: 100000,
      displayPrice: "100,000đ",
      icon: "shield-checkmark",
    },
    {
      id: "nail",
      name: "Cắt móng",
      price: 50000,
      displayPrice: "50,000đ",
      icon: "hand-left",
    },
    {
      id: "bath",
      name: "Tắm gội",
      price: 70000,
      displayPrice: "70,000đ",
      icon: "water",
    },
    {
      id: "haircut",
      name: "Cắt tỉa lông",
      price: 120000,
      displayPrice: "120,000đ",
      icon: "scissors",
    },
  ];

  const times = [
    { id: "09:00", name: "09:00", available: true },
    { id: "10:00", name: "10:00", available: false },
    { id: "11:00", name: "11:00", available: true },
    { id: "14:00", name: "14:00", available: true },
    { id: "15:00", name: "15:00", available: true },
    { id: "16:00", name: "16:00", available: true },
  ];

  const toggleService = (serviceId: string) => {
    setSelectedServices((prev) =>
      prev.includes(serviceId)
        ? prev.filter((id) => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  const calculateTotalPrice = () => {
    return selectedServices.reduce((total, serviceId) => {
      const service = services.find((s) => s.id === serviceId);
      return total + (service ? service.price : 0);
    }, 0);
  };

  const handleBooking = () => {
    if (selectedServices.length === 0 || !selectedDate || !selectedTime) {
      Alert.alert("Thông báo", "Vui lòng chọn đầy đủ dịch vụ, ngày và giờ.");
      return;
    }

    const selectedServiceNames = selectedServices
      .map((id) => services.find((s) => s.id === id)?.name)
      .join(", ");
    const totalPrice = calculateTotalPrice();

    Alert.alert(
      "Xác nhận đặt lịch",
      `Bạn muốn đặt lịch các dịch vụ: ${selectedServiceNames}\nVào ngày ${selectedDate} lúc ${selectedTime}?\nTổng cộng: ${totalPrice.toLocaleString(
        "vi-VN"
      )}đ`,
      [
        { text: "Hủy", style: "cancel" },
        {
          text: "Xác nhận",
          onPress: () => {
            Alert.alert(
              "Thành công",
              "Đặt lịch thành công! Chúng tôi sẽ liên hệ xác nhận."
            );
            onClose();
            // Reset state after successful booking
            setSelectedServices([]);
            setSelectedDate(null);
            setSelectedTime(null);
          },
        },
      ]
    );
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Đặt lịch nhanh</Text>
          <TouchableOpacity onPress={onClose}>
            <Ionicons name="close" size={24} color="#333" />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Services */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Chọn dịch vụ</Text>
            {services.map((service) => (
              <TouchableOpacity
                key={service.id}
                style={[
                  styles.serviceItem,
                  selectedServices.includes(service.id) && styles.selectedItem,
                ]}
                onPress={() => toggleService(service.id)}
              >
                <View style={styles.serviceIcon}>
                  <Ionicons
                    name={service.icon as any}
                    size={24}
                    color="#DC143C"
                  />
                </View>
                <View style={styles.serviceInfo}>
                  <Text style={styles.serviceName}>{service.name}</Text>
                  <Text style={styles.servicePrice}>
                    {service.displayPrice}
                  </Text>
                </View>
                {selectedServices.includes(service.id) && (
                  <Ionicons name="checkmark-circle" size={24} color="#DC143C" />
                )}
              </TouchableOpacity>
            ))}
          </View>

          {/* Dates - Using CalendarPicker */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Chọn ngày</Text>
            <CalendarPicker
              selectedDate={selectedDate}
              onSelectDate={setSelectedDate}
            />
          </View>

          {/* Times */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Chọn giờ</Text>
            <View style={styles.timeGrid}>
              {times.map((time) => (
                <TouchableOpacity
                  key={time.id}
                  style={[
                    styles.timeItem,
                    selectedTime === time.id && styles.selectedTimeItem,
                    !time.available && styles.disabledItem,
                  ]}
                  onPress={() => time.available && setSelectedTime(time.id)}
                  disabled={!time.available}
                >
                  <Text
                    style={[
                      styles.timeText,
                      selectedTime === time.id && styles.selectedText,
                      !time.available && styles.disabledText,
                    ]}
                  >
                    {time.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <View style={styles.totalBookingPriceContainer}>
            <Text style={styles.totalBookingLabel}>Tổng cộng:</Text>
            <Text style={styles.totalBookingPrice}>
              {calculateTotalPrice().toLocaleString("vi-VN")}đ
            </Text>
          </View>
          <TouchableOpacity style={styles.bookButton} onPress={handleBooking}>
            <Text style={styles.bookButtonText}>Đặt lịch ngay</Text>
          </TouchableOpacity>
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
    padding: 20,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 16,
  },
  serviceItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#FAFAFA",
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: "transparent",
  },
  selectedItem: {
    borderColor: "#DC143C",
    backgroundColor: "#FFF5F5",
  },
  serviceIcon: {
    width: 48,
    height: 48,
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  serviceInfo: {
    flex: 1,
  },
  serviceName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  servicePrice: {
    fontSize: 14,
    color: "#DC143C",
    fontWeight: "bold",
    marginTop: 4,
  },
  // Removed dateGrid and dateItem styles as CalendarPicker handles it
  timeGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  timeItem: {
    width: "30%",
    padding: 12,
    backgroundColor: "#FAFAFA",
    borderRadius: 8,
    marginBottom: 12,
    alignItems: "center",
    borderWidth: 2,
    borderColor: "transparent",
  },
  selectedTimeItem: {
    borderColor: "#DC143C",
    backgroundColor: "#FFF5F5",
  },
  timeText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
  },
  selectedText: {
    color: "#DC143C",
  },
  disabledItem: {
    opacity: 0.5,
  },
  disabledText: {
    color: "#999",
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: "#F0F0F0",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  totalBookingPriceContainer: {
    flexDirection: "column",
    alignItems: "flex-start",
  },
  totalBookingLabel: {
    fontSize: 14,
    color: "#666",
  },
  totalBookingPrice: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#DC143C",
  },
  bookButton: {
    backgroundColor: "#DC143C",
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: "center",
  },
  bookButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default BookingScreen;
