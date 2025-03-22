import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

const Pagination = ({
  currentPage,
  totalPages,
  onSearch,
}: {
  currentPage: number;
  totalPages: number;
  onSearch: (page: number) => void;
}) => {
  if (totalPages <= 1) return null;

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      // Show all pages if total pages are less than or equal to max visible pages
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // Always include first page
      pageNumbers.push(1);

      // Calculate start and end of the middle section
      let startPage = Math.max(2, currentPage - 1);
      let endPage = Math.min(totalPages - 1, currentPage + 1);

      // Adjust if we're near the beginning
      if (currentPage <= 3) {
        endPage = Math.min(totalPages - 1, 4);
      }

      // Adjust if we're near the end
      if (currentPage >= totalPages - 2) {
        startPage = Math.max(2, totalPages - 3);
      }

      // Add ellipsis if needed before middle section
      if (startPage > 2) {
        pageNumbers.push("...");
      }

      // Add middle section
      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }

      // Add ellipsis if needed after middle section
      if (endPage < totalPages - 1) {
        pageNumbers.push("...");
      }

      // Always include last page
      pageNumbers.push(totalPages);
    }

    return pageNumbers;
  };

  const pageNumbers = getPageNumbers();

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages || page === currentPage) return;
    onSearch(page);
  };

  return (
    <View style={styles.paginationContainer}>
      {/* Previous button */}
      <TouchableOpacity
        style={[
          styles.pageButton,
          currentPage === 1 ? styles.disabledPageButton : null,
        ]}
        onPress={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <Ionicons
          name="chevron-back"
          size={16}
          color={currentPage === 1 ? "#F48C0660" : "#F48C06"}
        />
      </TouchableOpacity>

      {/* Page numbers */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.pageNumbersContainer}
      >
        {pageNumbers.map((page, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.pageButton,
              page === currentPage ? styles.activePageButton : null,
              page === "..." ? styles.ellipsisButton : null,
            ]}
            onPress={() =>
              typeof page === "number" ? handlePageChange(page) : null
            }
            disabled={page === "..." || page === currentPage}
          >
            <Text
              style={[
                styles.pageButtonText,
                page === currentPage ? styles.activePageButtonText : null,
                page === "..." ? styles.ellipsisText : null,
              ]}
            >
              {page}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Next button */}
      <TouchableOpacity
        style={[
          styles.pageButton,
          currentPage === totalPages ? styles.disabledPageButton : null,
        ]}
        onPress={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <Ionicons
          name="chevron-forward"
          size={16}
          color={currentPage === totalPages ? "#F48C0660" : "#F48C06"}
        />
      </TouchableOpacity>
    </View>
  );
};

export default Pagination;

const styles = StyleSheet.create({
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 16,
    marginBottom: 24,
    paddingHorizontal: 8,
  },
  pageNumbersContainer: {
    flexDirection: "row",
    paddingHorizontal: 8,
  },
  pageButton: {
    minWidth: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(3, 7, 30, 0.6)",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 4,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  activePageButton: {
    backgroundColor: "#E85D04",
    borderColor: "#F48C06",
  },
  disabledPageButton: {
    opacity: 0.5,
  },
  ellipsisButton: {
    backgroundColor: "transparent",
    borderWidth: 0,
  },
  pageButtonText: {
    color: "#F48C06",
    fontFamily: "Rubik-Medium",
    fontSize: 14,
  },
  activePageButtonText: {
    color: "#FFFFFF",
  },
  ellipsisText: {
    color: "#F48C06",
  },
});
