import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  ScrollView,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export type FilterOptions = {
  type: string;
  year: string;
};

interface MovieFilterProps {
  onApplyFilters: (filters: FilterOptions) => void;
  currentFilters: FilterOptions;
}

const MovieFilter: React.FC<MovieFilterProps> = ({
  onApplyFilters,
  currentFilters,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [tempFilters, setTempFilters] = useState<FilterOptions>(currentFilters);

  // Available filter options
  const typeOptions = ["All", "movie", "series", "episode"];
  
  // Generate years from 1900 to current year
  const currentYear = new Date().getFullYear();
  const yearOptions = ["All", ...Array.from({ length: currentYear - 1899 }, (_, i) => (currentYear - i).toString())];

  const handleApplyFilters = () => {
    onApplyFilters(tempFilters);
    setModalVisible(false);
  };

  const handleResetFilters = () => {
    const resetFilters = { type: "All", year: "All" };
    setTempFilters(resetFilters);
    onApplyFilters(resetFilters);
    setModalVisible(false);
  };

  // Check if any filters are active
  const hasActiveFilters = 
    currentFilters.type !== "All" || 
    currentFilters.year !== "All";

  return (
    <View>
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        style={[
          styles.filterButton,
          hasActiveFilters && styles.activeFilterButton,
        ]}
      >
        <Ionicons
          name="filter"
          size={18}
          color={hasActiveFilters ? "#FFBA08" : "#FFFFFF"}
        />
        <Text
          style={[
            styles.filterButtonText,
            hasActiveFilters && styles.activeFilterText,
          ]}
        >
          Filter
        </Text>
        {hasActiveFilters && (
          <View style={styles.filterBadge}>
            <Text style={styles.filterBadgeText}>
              {(currentFilters.type !== "All" ? 1 : 0) +
                (currentFilters.year !== "All" ? 1 : 0)}
            </Text>
          </View>
        )}
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Filter Movies</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Ionicons name="close" size={24} color="#FFFFFF" />
              </TouchableOpacity>
            </View>

            {/* Type Filter */}
            <View style={styles.filterSection}>
              <Text style={styles.filterSectionTitle}>Type</Text>
              <View style={styles.optionsContainer}>
                {typeOptions.map((type) => (
                  <TouchableOpacity
                    key={type}
                    style={[
                      styles.optionButton,
                      tempFilters.type === type && styles.selectedOption,
                    ]}
                    onPress={() => setTempFilters({ ...tempFilters, type })}
                  >
                    <Text
                      style={[
                        styles.optionText,
                        tempFilters.type === type && styles.selectedOptionText,
                      ]}
                    >
                      {type === "All" ? "All Types" : type.charAt(0).toUpperCase() + type.slice(1)}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Year Filter */}
            <View style={styles.filterSection}>
              <Text style={styles.filterSectionTitle}>Year</Text>
              <ScrollView 
                style={styles.yearScrollView}
                contentContainerStyle={styles.yearOptionsContainer}
              >
                {yearOptions.map((year) => (
                  <TouchableOpacity
                    key={year}
                    style={[
                      styles.yearOption,
                      tempFilters.year === year && styles.selectedOption,
                    ]}
                    onPress={() => setTempFilters({ ...tempFilters, year })}
                  >
                    <Text
                      style={[
                        styles.optionText,
                        tempFilters.year === year && styles.selectedOptionText,
                      ]}
                    >
                      {year === "All" ? "All Years" : year}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.resetButton}
                onPress={handleResetFilters}
              >
                <Text style={styles.resetButtonText}>Reset</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.applyButton}
                onPress={handleApplyFilters}
              >
                <Text style={styles.applyButtonText}>Apply</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  filterButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(55, 6, 23, 0.8)",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  activeFilterButton: {
    backgroundColor: "rgba(106, 4, 15, 0.8)",
    borderColor: "#FFBA08",
  },
  filterButtonText: {
    color: "#FFFFFF",
    marginLeft: 5,
    fontFamily: "Rubik-Medium",
  },
  activeFilterText: {
    color: "#FFBA08",
  },
  filterBadge: {
    backgroundColor: "#FFBA08",
    width: 18,
    height: 18,
    borderRadius: 9,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 5,
  },
  filterBadgeText: {
    color: "#03071E",
    fontSize: 10,
    fontWeight: "bold",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(3, 7, 30, 0.9)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "#03071E",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
    maxHeight: "80%",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.1)",
  },
  modalTitle: {
    color: "#FFBA08",
    fontSize: 18,
    fontFamily: "Rubik-Medium",
  },
  filterSection: {
    marginBottom: 20,
  },
  filterSectionTitle: {
    color: "#F48C06",
    fontSize: 16,
    marginBottom: 10,
    fontFamily: "Rubik-Medium",
  },
  optionsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  optionButton: {
    backgroundColor: "rgba(55, 6, 23, 0.5)",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  selectedOption: {
    backgroundColor: "rgba(220, 47, 2, 0.5)",
    borderColor: "#FFBA08",
  },
  optionText: {
    color: "#FFFFFF",
    fontFamily: "Rubik-Regular",
  },
  selectedOptionText: {
    color: "#FFBA08",
    fontFamily: "Rubik-Medium",
  },
  yearScrollView: {
    maxHeight: 200,
  },
  yearOptionsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  yearOption: {
    backgroundColor: "rgba(55, 6, 23, 0.5)",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  resetButton: {
    backgroundColor: "rgba(55, 6, 23, 0.8)",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    flex: 1,
    marginRight: 10,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  resetButtonText: {
    color: "#FFFFFF",
    fontFamily: "Rubik-Medium",
  },
  applyButton: {
    backgroundColor: "#E85D04",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    flex: 1,
    marginLeft: 10,
    alignItems: "center",
  },
  applyButtonText: {
    color: "#FFFFFF",
    fontFamily: "Rubik-Bold",
  },
});

export default MovieFilter;
