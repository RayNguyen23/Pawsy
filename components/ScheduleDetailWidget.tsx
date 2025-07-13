import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  Alert,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface ScheduleDetailScreenProps {
  visible: boolean;
  onClose: () => void;
}

const ScheduleDetailScreen: React.FC<ScheduleDetailScreenProps> = ({
  visible,
  onClose,
}) => {
  const scheduleData = {
    service: "Spa & Grooming",
    pet: "Mimi",
    date: "Thứ 5, 15/07/2024",
    time: "10:00 - 11:30",
    location: "Pawsy Pet Shop - Chi nhánh Quận 1",
    address: "123 Nguyễn Huệ, Quận 1, TP.HCM",
    staff: "Chị Mai Anh",
    phone: "0901234567",
    services: [
      { name: "Tắm gội", price: "100,000đ" },
      { name: "Cắt tỉa lông", price: "80,000đ" },
      { name: "Cắt móng", price: "20,000đ" },
    ],
    total: "200,000đ",
    status: "confirmed", // 'confirmed', 'pending', 'completed', 'cancelled'
    notes: "Mimi hơi nhút nhát, cần xử lý nhẹ nhàng",
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "confirmed":
        return { backgroundColor: "#28A745", text: "Đã xác nhận" };
      case "pending":
        return { backgroundColor: "#FF9500", text: "Đang chờ" };
      case "completed":
        return { backgroundColor: "#6A0DAD", text: "Đã hoàn thành" };
      case "cancelled":
        return { backgroundColor: "#DC143C", text: "Đã hủy" };
      default:
        return { backgroundColor: "#999", text: "Không rõ" };
    }
  };

  const statusInfo = getStatusStyle(scheduleData.status);

  const handleCancel = () => {
    Alert.alert(
      "Hủy lịch hẹn",
      "Bạn có chắc chắn muốn hủy lịch hẹn này không?",
      [
        { text: "Không", style: "cancel" },
        {
          text: "Hủy lịch",
          style: "destructive",
          onPress: () => {
            Alert.alert("Thành công", "Lịch hẹn đã được hủy");
            onClose();
          },
        },
      ]
    );
  };

  const handleReschedule = () => {
    Alert.alert("Đổi lịch", "Chức năng đổi lịch sẽ được cập nhật sớm");
    // In a real app, this would navigate to a booking modification screen
  };

  const handleCall = () => {
    Alert.alert("Gọi điện", `Gọi đến ${scheduleData.phone}?`);
    // In a real app, this would use Linking.openURL(`tel:${scheduleData.phone}`)
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Chi tiết lịch hẹn</Text>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Ionicons name="close" size={24} color="#333" />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.scrollViewContent}>
          {/* Status Badge */}
          <View style={styles.statusContainer}>
            <View
              style={[
                styles.statusBadge,
                { backgroundColor: statusInfo.backgroundColor },
              ]}
            >
              <Ionicons name="checkmark-circle" size={16} color="#FFFFFF" />
              <Text style={styles.statusText}>{statusInfo.text}</Text>
            </View>
          </View>

          {/* Main Info */}
          <View style={styles.mainInfo}>
            <View style={styles.serviceHeader}>
              <View style={styles.serviceIcon}>
                <Ionicons name="cut" size={32} color="#DC143C" />
              </View>
              <View style={styles.serviceDetails}>
                <Text style={styles.serviceName}>{scheduleData.service}</Text>
                <Text style={styles.petName}>Cho {scheduleData.pet}</Text>
              </View>
            </View>
          </View>

          {/* Details */}
          <View style={styles.detailsContainer}>
            <View style={styles.detailRow}>
              <Ionicons
                name="calendar"
                size={20}
                color="#666"
                style={styles.detailIcon}
              />
              <View style={styles.detailContent}>
                <Text style={styles.detailLabel}>Ngày & Giờ</Text>
                <Text style={styles.detailValue}>{scheduleData.date}</Text>
                <Text style={styles.detailValue}>{scheduleData.time}</Text>
              </View>
            </View>

            <View style={styles.detailRow}>
              <Ionicons
                name="location"
                size={20}
                color="#666"
                style={styles.detailIcon}
              />
              <View style={styles.detailContent}>
                <Text style={styles.detailLabel}>Địa điểm</Text>
                <Text style={styles.detailValue}>{scheduleData.location}</Text>
                <Text style={styles.detailSubValue}>
                  {scheduleData.address}
                </Text>
              </View>
            </View>

            <View style={styles.detailRow}>
              <Ionicons
                name="person"
                size={20}
                color="#666"
                style={styles.detailIcon}
              />
              <View style={styles.detailContent}>
                <Text style={styles.detailLabel}>Nhân viên phụ trách</Text>
                <Text style={styles.detailValue}>{scheduleData.staff}</Text>
                <TouchableOpacity
                  onPress={handleCall}
                  style={styles.phoneButton}
                >
                  <Ionicons name="call" size={16} color="#DC143C" />
                  <Text style={styles.phoneText}>{scheduleData.phone}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Services */}
          <View style={styles.servicesContainer}>
            <Text style={styles.sectionSubTitle}>Dịch vụ đã đặt</Text>
            {scheduleData.services.map((service, index) => (
              <View key={index} style={styles.serviceItem}>
                <Text style={styles.serviceItemName}>{service.name}</Text>
                <Text style={styles.serviceItemPrice}>{service.price}</Text>
              </View>
            ))}
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Tổng cộng:</Text>
              <Text style={styles.totalValue}>{scheduleData.total}</Text>
            </View>
          </View>

          {/* Notes */}
          {scheduleData.notes && (
            <View style={styles.notesContainer}>
              <Text style={styles.sectionSubTitle}>Ghi chú</Text>
              <Text style={styles.notesText}>{scheduleData.notes}</Text>
            </View>
          )}

          <View style={styles.bottomSpacing} />
        </ScrollView>

        {/* Action Buttons */}
        <View style={styles.actionButtonsContainer}>
          <TouchableOpacity
            style={styles.rescheduleButton}
            onPress={handleReschedule}
          >
            <Ionicons name="repeat" size={20} color="#DC143C" />
            <Text style={styles.rescheduleButtonText}>Đổi lịch</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
            <Ionicons name="close-circle" size={20} color="#FFFFFF" />
            <Text style={styles.cancelButtonText}>Hủy lịch</Text>
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
    paddingTop: 50,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  closeButton: {
    padding: 8,
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingBottom: 20, // Add padding for scrollable content
  },
  statusContainer: {
    alignItems: "center",
    paddingVertical: 10,
    backgroundColor: "#FAFAFA",
    marginBottom: 20,
  },
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  statusText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "bold",
    marginLeft: 8,
  },
  mainInfo: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  serviceHeader: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF5F5",
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: "#DC143C",
  },
  serviceIcon: {
    width: 60,
    height: 60,
    backgroundColor: "#FFFFFF",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  serviceDetails: {
    flex: 1,
  },
  serviceName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  petName: {
    fontSize: 16,
    color: "#666",
    marginTop: 4,
  },
  detailsContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "#FAFAFA",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  detailIcon: {
    marginRight: 16,
    marginTop: 4,
  },
  detailContent: {
    flex: 1,
  },
  detailLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#666",
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 16,
    color: "#333",
    fontWeight: "500",
  },
  detailSubValue: {
    fontSize: 14,
    color: "#999",
    marginTop: 2,
  },
  phoneButton: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
    backgroundColor: "#FFF5F5",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    alignSelf: "flex-start",
  },
  phoneText: {
    color: "#DC143C",
    fontSize: 14,
    fontWeight: "600",
    marginLeft: 6,
  },
  servicesContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
    backgroundColor: "#FAFAFA",
    paddingVertical: 20,
    borderRadius: 12,
    marginHorizontal: 20,
  },
  sectionSubTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 16,
  },
  serviceItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  serviceItemName: {
    fontSize: 16,
    color: "#333",
  },
  serviceItemPrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#DC143C",
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 15,
    borderTopWidth: 2,
    borderTopColor: "#DC143C",
    marginTop: 10,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  totalValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#DC143C",
  },
  notesContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  notesText: {
    fontSize: 16,
    color: "#666",
    lineHeight: 24,
  },
  bottomSpacing: {
    height: 20,
  },
  actionButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: "#F0F0F0",
    backgroundColor: "#FFFFFF",
  },
  rescheduleButton: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#FFF5F5",
    padding: 16,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
    borderWidth: 1,
    borderColor: "#DC143C",
  },
  rescheduleButtonText: {
    color: "#DC143C",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 8,
  },
  cancelButton: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#DC143C",
    padding: 16,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
  },
  cancelButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 8,
  },
});

export default ScheduleDetailScreen;
