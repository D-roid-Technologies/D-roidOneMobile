import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Modal,
  TextInput,
  Pressable,
} from "react-native";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";

interface Task {
  id: string;
  title: string;
}

const SchedulesScreen: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [taskTitle, setTaskTitle] = useState("");
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const [activeScreen, setActiveScreen] = useState<"main" | "tasks" | "calendar">("main");

  const handleSaveTask = () => {
    if (taskTitle.trim() === "") return;

    if (editingTaskId) {
      setTasks((prev) =>
        prev.map((t) =>
          t.id === editingTaskId ? { ...t, title: taskTitle } : t
        )
      );
    } else {
      setTasks((prev) => [
        ...prev,
        { id: Date.now().toString(), title: taskTitle },
      ]);
    }

    setTaskTitle("");
    setEditingTaskId(null);
    setModalVisible(false);
  };

  const handleDeleteTask = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const handleEditTask = (task: Task) => {
    setTaskTitle(task.title);
    setEditingTaskId(task.id);
    setModalVisible(true);
  };

  // Main screen with two cards
  if (activeScreen === "main") {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Schedules</Text>
        <Text style={styles.subtitle}>Manage your events and appointments</Text>

        <View style={styles.cardsContainer}>
          <TouchableOpacity
            style={[styles.mainCard, { backgroundColor: "#3B82F6" }]}
            onPress={() => setActiveScreen("calendar")}
          >
            <Ionicons name="calendar" size={36} color="#fff" />
            <Text style={styles.cardText}>Calendar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.mainCard, { backgroundColor: "#10B981" }]}
            onPress={() => setActiveScreen("tasks")}
          >
            <FontAwesome5 name="tasks" size={36} color="#fff" />
            <Text style={styles.cardText}>Task Scheduler</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  // Task Scheduler screen
  if (activeScreen === "tasks") {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Task Scheduler</Text>

        <TouchableOpacity
          style={styles.backButton}
          onPress={() => setActiveScreen("main")}
        >
          <Ionicons name="arrow-back" size={20} color="#fff" />
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setModalVisible(true)}
        >
          <Ionicons name="add-circle" size={24} color="#fff" />
          <Text style={styles.addButtonText}>Add Task</Text>
        </TouchableOpacity>

        <FlatList
          data={tasks}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.taskItem}>
              <Text style={styles.taskText}>{item.title}</Text>
              <View style={styles.taskActions}>
                <TouchableOpacity onPress={() => handleEditTask(item)}>
                  <Ionicons name="pencil" size={20} color="#10B981" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleDeleteTask(item.id)}>
                  <Ionicons name="trash" size={20} color="#EF4444" />
                </TouchableOpacity>
              </View>
            </View>
          )}
          ListEmptyComponent={
            <Text style={{ textAlign: "center", marginTop: 20, color: "#555" }}>
              No tasks yet. Add a new task!
            </Text>
          }
          contentContainerStyle={{ paddingBottom: 50 }}
        />

        <Modal animationType="slide" transparent={true} visible={modalVisible}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalBox}>
              <Text style={styles.modalTitle}>
                {editingTaskId ? "Edit Task" : "New Task"}
              </Text>
              <TextInput
                style={styles.input}
                placeholder="Task title"
                value={taskTitle}
                onChangeText={setTaskTitle}
              />
              <View style={styles.modalButtons}>
                <Pressable
                  style={[styles.button, { backgroundColor: "#10B981" }]}
                  onPress={handleSaveTask}
                >
                  <Text style={styles.buttonText}>Save</Text>
                </Pressable>
                <Pressable
                  style={[styles.button, { backgroundColor: "#EF4444" }]}
                  onPress={() => {
                    setModalVisible(false);
                    setTaskTitle("");
                    setEditingTaskId(null);
                  }}
                >
                  <Text style={styles.buttonText}>Cancel</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    );
  }

  // Calendar screen placeholder
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Calendar</Text>
      <Text style={styles.subtitle}>Your scheduled events will appear here</Text>

      <TouchableOpacity
        style={styles.backButton}
        onPress={() => setActiveScreen("main")}
      >
        <Ionicons name="arrow-back" size={20} color="#fff" />
        <Text style={styles.backText}>Back</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SchedulesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
    padding: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#071D6A",
    marginBottom: 4,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 14,
    color: "#555",
    marginBottom: 20,
    textAlign: "center",
  },
  cardsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 40,
  },
  mainCard: {
    width: "48%",
    height: 150,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    elevation: 3,
  },
  cardText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
    marginTop: 10,
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#203499",
    padding: 10,
    borderRadius: 8,
    marginBottom: 20,
    alignSelf: "flex-start",
  },
  backText: {
    color: "#fff",
    fontWeight: "700",
    marginLeft: 6,
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#203499",
    padding: 12,
    borderRadius: 10,
    marginBottom: 20,
  },
  addButtonText: {
    color: "#fff",
    fontWeight: "700",
    marginLeft: 8,
  },
  taskItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 1,
  },
  taskText: {
    fontSize: 16,
    color: "#071D6A",
    fontWeight: "600",
  },
  taskActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalBox: {
    width: "85%",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 12,
    textAlign: "center",
    color: "#071D6A",
  },
  input: {
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 8,
    padding: 12,
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    marginHorizontal: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "700",
  },
});