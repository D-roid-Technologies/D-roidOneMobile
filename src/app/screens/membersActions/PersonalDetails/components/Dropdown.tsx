import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  FlatList,
} from "react-native";

export interface DropdownOption {
  value: string;
  label: string;
}

interface DropdownProps {
  value: string;
  placeholder: string;
  options: DropdownOption[];
  error?: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
}

const Dropdown: React.FC<DropdownProps> = ({
  value,
  placeholder,
  options,
  error,
  onChange,
  onBlur,
}) => {
  const [open, setOpen] = useState(false);

  const selectedLabel =
    options.find((opt) => opt.value === value)?.label || "";

  return (
    <View>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => setOpen(true)}
        onBlur={onBlur}
        style={[
          styles.selectBase,
          error ? styles.inputErrorBorder : styles.inputDefaultBorder,
        ]}
      >
        <Text
          style={[
            styles.selectText,
            !selectedLabel && styles.placeholderText,
          ]}
        >
          {selectedLabel || placeholder}
        </Text>
        <Text style={styles.chevronIcon}>˅</Text>
      </TouchableOpacity>

      <Modal
        transparent
        visible={open}
        animationType="fade"
        onRequestClose={() => setOpen(false)}
      >
        <TouchableOpacity
          style={styles.modalBackdrop}
          activeOpacity={1}
          onPress={() => setOpen(false)}
        >
          <View style={styles.modalContent}>
            <FlatList
              data={options}
              keyExtractor={(item) => item.value}
              renderItem={({ item }) => {
                const selected = item.value === value;
                return (
                  <TouchableOpacity
                    style={[
                      styles.dropdownItem,
                      selected && styles.dropdownItemSelected,
                    ]}
                    onPress={() => {
                      onChange(item.value);
                      setOpen(false);
                      onBlur && onBlur();
                    }}
                  >
                    <Text style={styles.dropdownItemText}>
                      {item.label}
                    </Text>
                    {selected && <Text style={styles.checkIcon}>✓</Text>}
                  </TouchableOpacity>
                );
              }}
            />
          </View>
        </TouchableOpacity>
      </Modal>

      {!!error && (
        <Text style={styles.errorText}>
          ⚠ {error}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  selectBase: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: "#1a1a2e",
    justifyContent: "space-between",
  },
  selectText: {
    fontSize: 14,
    color: "#ffffff",
    flexShrink: 1,
  },
  placeholderText: {
    color: "#6b7280",
  },
  chevronIcon: {
    marginLeft: 8,
    fontSize: 14,
    color: "#6b7280",
  },
  inputDefaultBorder: {
    borderWidth: 1,
    borderColor: "#333",
  },
  inputErrorBorder: {
    borderWidth: 1,
    borderColor: "#dc3545",
    backgroundColor: "rgba(114, 28, 36, 0.2)",
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.7)",
    justifyContent: "center",
    padding: 24,
  },
  modalContent: {
    maxHeight: "70%",
    borderRadius: 12,
    backgroundColor: "#000c3a",
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "#333",
  },
  dropdownItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 16,
    justifyContent: "space-between",
  },
  dropdownItemSelected: {
    backgroundColor: "#1e3a8a",
  },
  dropdownItemText: {
    fontSize: 14,
    color: "#ffffff",
    flexShrink: 1,
  },
  checkIcon: {
    marginLeft: 8,
    fontSize: 14,
    color: "#3B82F6",
  },
  errorText: {
    marginTop: 4,
    fontSize: 12,
    color: "#f87171",
  },
});

export default Dropdown;
