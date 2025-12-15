import React, { useMemo, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";

import type {
  ServicesScreenProps,
  ViewState,
  ServiceItem,
  ClassItem,
  TechItem,
  TrainingItem,
  ConsultingItem,
  StoryItem,
  TechCategoryKey,
} from "./types";

import {
  SERVICES,
  CLASSES,
  TECH_STACKS,
  TRAININGS,
  CONSULTING,
  ANIMATION_ITEMS,
  STORIES,
} from "./data";

import ServiceCard from "./ServiceCard";
import BackButton from "./components/BackButton";
import DetailPage from "./components/DetailPage";
import TrainingDetail from "./components/TrainingDetail";
import StoryDetail from "./components/StoryDetail";
import WhatsAppButton from "./WhatsAppButton";

const ServicesScreen: React.FC<ServicesScreenProps> = ({ onOpenSayIt, whatsappPhone, navigation }) => {
  const [view, setView] = useState<ViewState>("HOME");

  const [activeCategory, setActiveCategory] = useState<TechCategoryKey | null>(null);
  const [activeTech, setActiveTech] = useState<TechItem | null>(null);

  const [activeTraining, setActiveTraining] = useState<TrainingItem | null>(null);

  const [activeConsulting, setActiveConsulting] = useState<ConsultingItem | null>(null);

  const [activeStory, setActiveStory] = useState<StoryItem | null>(null);

  const openContact = () => {
    if (onOpenSayIt) return onOpenSayIt();
    // If no in-app modal, WhatsApp FAB is always available.
  };

  const title = useMemo(() => {
    switch (view) {
      case "HOME":
        return "What We Do";
      case "SOFTWARE_CLASSES":
        return "Software Development";
      case "TECH_STACKS":
        return "Tech Stacks";
      case "TECH_DETAIL":
        return "Tech Detail";
      case "TRAININGS":
        return "Training Programs";
      case "TRAINING_DETAIL":
        return "Training Detail";
      case "ANIMATION":
        return "Animation / Stories";
      case "ANIMATION_DETAIL":
        return "Story";
      case "CONSULTING":
        return "Consulting";
      case "CONSULTING_DETAIL":
        return "Consulting Detail";
      default:
        return "Services";
    }
  }, [view]);

  const goBack = () => {
    switch (view) {
      case "HOME":
        if (navigation && navigation.canGoBack()) {
          navigation.goBack();
        }
        break;

      case "SOFTWARE_CLASSES":
      case "TRAININGS":
      case "ANIMATION":
      case "CONSULTING":
        setView("HOME");
        break;

      case "TECH_STACKS":
        setActiveCategory(null);
        setView("SOFTWARE_CLASSES");
        break;

      case "TECH_DETAIL":
        setActiveTech(null);
        setView("TECH_STACKS");
        break;

      case "TRAINING_DETAIL":
        setActiveTraining(null);
        setView("TRAININGS");
        break;

      case "CONSULTING_DETAIL":
        setActiveConsulting(null);
        setView("CONSULTING");
        break;

      case "ANIMATION_DETAIL":
        setActiveStory(null);
        setView("ANIMATION");
        break;

      default:
        setView("HOME");
    }
  };

  // ... render methods ...

  // Always show back button, or specific logic if needed. 
  // User asked for back button to default homescreen.
  // If we are at HOME, back button goes to previous screen (HomeScreen).
  // If we are deep in stack, it goes up one level in local state.
  const shouldShowBack = true; 

  const renderHome = () => (
    <FlatList
      data={SERVICES}
      keyExtractor={(i) => i.id}
      numColumns={2}
      contentContainerStyle={styles.list}
      columnWrapperStyle={styles.columnWrapper}
      renderItem={({ item }) => (
        <ServiceCard
          title={item.title}
          description={item.description}
          onPress={() => {
            if (item.key === "software") setView("SOFTWARE_CLASSES");
            if (item.key === "training") setView("TRAININGS");
            if (item.key === "animation") setView("ANIMATION");
            if (item.key === "consulting") setView("CONSULTING");
          }}
        />
      )}
    />
  );

  const renderSoftwareClasses = () => (
    <>
      <Text style={styles.subtitle}>
        Select a category to view available tech stacks.
      </Text>
      <FlatList
        data={CLASSES}
        keyExtractor={(i) => i.id}
        numColumns={2}
        contentContainerStyle={styles.list}
        columnWrapperStyle={styles.columnWrapper}
        renderItem={({ item }) => (
          <ServiceCard
            title={item.title}
            description={item.description}
            onPress={() => {
              setActiveCategory(item.category);
              setView("TECH_STACKS");
            }}
          />
        )}
      />
    </>
  );

  const techList: TechItem[] = useMemo(() => {
    if (!activeCategory) return [];
    return TECH_STACKS[activeCategory] ?? [];
  }, [activeCategory]);

  const renderTechStacks = () => (
    <>
      <Text style={styles.subtitle}>
        Tap a card to open details and contact.
      </Text>
      <FlatList
        data={techList}
        keyExtractor={(i) => i.id}
        numColumns={2}
        contentContainerStyle={styles.list}
        columnWrapperStyle={styles.columnWrapper}
        renderItem={({ item }) => (
          <ServiceCard
            title={item.title}
            description={item.description}
            onPress={() => {
              setActiveTech(item);
              setView("TECH_DETAIL");
            }}
          />
        )}
      />
    </>
  );

  const renderTechDetail = () =>
    activeTech ? (
      <DetailPage
        title={activeTech.title}
        description={activeTech.description}
        bullets={activeTech.bullets}
        onContact={openContact}
        contactLabel="Contact about this Tech Stack"
      />
    ) : null;

  const renderTrainings = () => (
    <FlatList
      data={TRAININGS}
      keyExtractor={(i) => i.id}
      numColumns={2}
      contentContainerStyle={styles.list}
      columnWrapperStyle={styles.columnWrapper}
      renderItem={({ item }) => (
        <ServiceCard
          title={item.title}
          description={item.description}
          onPress={() => {
            setActiveTraining(item);
            setView("TRAINING_DETAIL");
          }}
        />
      )}
    />
  );

  const renderTrainingDetail = () =>
    activeTraining ? (
      <TrainingDetail item={activeTraining} onContact={openContact} />
    ) : null;

  const renderConsulting = () => (
    <FlatList
      data={CONSULTING}
      keyExtractor={(i) => i.id}
      numColumns={2}
      contentContainerStyle={styles.list}
      columnWrapperStyle={styles.columnWrapper}
      renderItem={({ item }) => (
        <ServiceCard
          title={item.title}
          description={item.description}
          onPress={() => {
            setActiveConsulting(item);
            setView("CONSULTING_DETAIL");
          }}
        />
      )}
    />
  );

  const renderConsultingDetail = () =>
    activeConsulting ? (
      <DetailPage
        title={activeConsulting.title}
        description={activeConsulting.description}
        bullets={activeConsulting.bullets}
        onContact={openContact}
        contactLabel="Contact about Consulting"
      />
    ) : null;

  const renderAnimation = () => (
    <FlatList
      data={ANIMATION_ITEMS}
      keyExtractor={(i) => i.id}
      numColumns={2}
      contentContainerStyle={styles.list}
      columnWrapperStyle={styles.columnWrapper}
      renderItem={({ item }) => (
        <ServiceCard
          title={item.title}
          description={item.description}
          onPress={() => {
            const found = STORIES.find((s) => s.id === item.id);
            if (found) {
              setActiveStory(found);
              setView("ANIMATION_DETAIL");
            }
          }}
        />
      )}
    />
  );

  const renderAnimationDetail = () =>
    activeStory ? <StoryDetail story={activeStory} /> : null;



  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>

      {/* Always show back button now, handling both internal and external nav */}
      <BackButton onPress={goBack} />

      {view === "HOME" && renderHome()}

      {view === "SOFTWARE_CLASSES" && renderSoftwareClasses()}
      {view === "TECH_STACKS" && renderTechStacks()}
      {view === "TECH_DETAIL" && renderTechDetail()}

      {view === "TRAININGS" && renderTrainings()}
      {view === "TRAINING_DETAIL" && renderTrainingDetail()}

      {view === "CONSULTING" && renderConsulting()}
      {view === "CONSULTING_DETAIL" && renderConsultingDetail()}

      {view === "ANIMATION" && renderAnimation()}
      {view === "ANIMATION_DETAIL" && renderAnimationDetail()}

      <WhatsAppButton phone={whatsappPhone} />
    </View>
  );
};

export default ServicesScreen;

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 16, paddingHorizontal: 14, backgroundColor: "#FFFFFF" },
  title: { fontSize: 22, fontWeight: "900", color: "#111827", marginBottom: 10 },
  subtitle: { fontSize: 13, color: "#6B7280", marginBottom: 10 },
  list: { paddingBottom: 120 },
  columnWrapper: { justifyContent: "space-between" },
});
