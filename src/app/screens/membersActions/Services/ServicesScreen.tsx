import React, { useMemo, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Clock, Users, Award } from "lucide-react-native";

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
  classes as CLASSES,
  techStacks as TECH_STACKS,
  trainingList as TRAININGS,
  consultingItems as CONSULTING,
  animationItems,
  trainingPrograms,
  stories,
} from "./data/index";

import ServiceCard from "./ServiceCard";
import BackButton from "./components/BackButton";
import WhatsAppButton from "./WhatsAppButton";
import ServiceDetailView, { ServiceDetailData } from "./components/ServiceDetailView";
import StoryReader from "./components/StoryReader";

const ServicesScreen: React.FC<ServicesScreenProps> = ({ onOpenSayIt, whatsappPhone }) => {
  const navigation = useNavigation();
  const [view, setView] = useState<ViewState>("HOME");

  const [activeCategory, setActiveCategory] = useState<TechCategoryKey | null>(null);
  const [activeClass, setActiveClass] = useState<ClassItem | null>(null);
  const [activeTech, setActiveTech] = useState<TechItem | null>(null);

  const [activeTraining, setActiveTraining] = useState<TrainingItem | null>(null);

  const [activeConsulting, setActiveConsulting] = useState<ConsultingItem | null>(null);

  const [activeStory, setActiveStory] = useState<StoryItem | null>(null);

  const openContact = () => {
    if (onOpenSayIt) return onOpenSayIt();
    // Navigate to Contact screen if available, otherwise fallback
    // @ts-ignore
    navigation.navigate("Contact");
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

  // Handle back navigation
  const goBack = () => {
    if (view === "HOME") {
      navigation.goBack();
      return;
    }
    if (view === "SOFTWARE_CLASSES") {
      setView("HOME");
      return;
    }
    if (view === "TECH_STACKS") {
      setActiveClass(null);
      setView("SOFTWARE_CLASSES");
      return;
    }
    if (view === "TECH_DETAIL") {
      setActiveTech(null);
      setView("TECH_STACKS");
      return;
    }
    if (view === "TRAININGS") {
      setView("HOME");
      return;
    }
    if (view === "TRAINING_DETAIL") {
      setActiveTraining(null);
      setView("TRAININGS");
      return;
    }
    if (view === "CONSULTING") {
      setView("HOME");
      return;
    }
    if (view === "CONSULTING_DETAIL") {
      setActiveConsulting(null);
      setView("CONSULTING");
      return;
    }
    if (view === "ANIMATION") {
      setView("HOME");
      return;
    }
    if (view === "ANIMATION_DETAIL") {
      setActiveStory(null);
      setView("ANIMATION");
      return;
    }
    // Default fallback
    setView("HOME");
  };

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
          icon={item.icon}
          onPress={() => {
            setActiveClass(item);
            setView("TECH_STACKS");
          }}
        />
      )}
    />
  );

  const renderTechStacks = () => {
    if (!activeClass) return null;
    const stacks = TECH_STACKS[activeClass.category] || [];
    return (
      <View style={styles.sectionWrap}>
        <Text style={styles.subHeader}>
          {activeClass.title} Capabilities
        </Text>
        <FlatList
          data={stacks}
          keyExtractor={(i) => i.id}
          numColumns={2}
          contentContainerStyle={styles.list}
          columnWrapperStyle={styles.columnWrapper}
          renderItem={({ item }) => (
            <ServiceCard
              title={item.title}
              description={item.description}
              icon={item.icon}
              onPress={() => {
                setActiveTech(item);
                setView("TECH_DETAIL");
              }}
            />
          )}
        />
      </View>
    );
  };

  const renderTechDetail = () => {
    if (!activeTech) return null;
    
    // Transform TechItem to ServiceDetailData
    const detailData: ServiceDetailData = {
      title: activeTech.title,
      subTitle: activeClass?.title, // e.g. "Frontend Development"
      summary: activeTech.description,
      icon: activeTech.icon,
      benefits: activeTech.bullets,
      benefitsLabel: "Key Capabilities",
    };

    return (
      <ServiceDetailView
        data={detailData}
        contactLabel="Contact about this Tech Stack"
        onContact={openContact}
      />
    );
  };

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

  const renderTrainingDetail = () => {
    if (!activeTraining) return null;
    const program = trainingPrograms.find((p) => p.id === activeTraining.program);
    
    // Fallback data if program details missing
    if (!program) return null;

    const detailData: ServiceDetailData = {
      title: program.title,
      subTitle: program.subTitle,
      summary: program.summary,
      icon: program.icon,
      stats: [
        { icon: <Clock color="#2667cc" size={16} />, text: program.duration },
        { icon: <Users color="#2667cc" size={16} />, text: program.level },
        { icon: <Award color="#2667cc" size={16} />, text: "Certificate" },
      ],
      tags: program.tools,
      tagsLabel: "Tools & Technologies",
      benefits: program.benefits,
      benefitsLabel: "What You'll Gain",
      price: program.price,
    };

    return (
      <ServiceDetailView
        data={detailData}
        onContact={openContact}
      />
    );
  };

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

  const renderConsultingDetail = () => {
    if (!activeConsulting) return null;

    const detailData: ServiceDetailData = {
      title: activeConsulting.title,
      summary: activeConsulting.description,
      benefits: activeConsulting.bullets,
      benefitsLabel: "Focus Areas",
    };

    return (
      <ServiceDetailView
        data={detailData}
        contactLabel="Contact about Consulting"
        onContact={openContact}
      />
    );
  };

  const renderAnimation = () => (
    <FlatList
      data={animationItems}
      keyExtractor={(i) => i.id}
      numColumns={2}
      contentContainerStyle={styles.list}
      columnWrapperStyle={styles.columnWrapper}
      renderItem={({ item }) => (
        <ServiceCard
          title={item.title}
          description={item.description}
          onPress={() => {
            // Find specific story logic
            // We match based on ID (case-insensitive for safety)
            const found = stories.find((s) => s.id.toLowerCase() === item.id.toLowerCase());
            if (found) {
                // @ts-ignore - mismatch between Story (full) and StoryItem (lite)
                // We will use the full story in renderAnimationDetail anyway
              setActiveStory(found);
              setView("ANIMATION_DETAIL");
            }
          }}
        />
      )}
    />
  );

  const renderAnimationDetail = () => {
    if (!activeStory) return null;
    
    // Find the full story object from our rich data source that matches the active ID
    // The IDs in animationItems are like 'brothers', 'Cityboy', etc.
    // The match was fixed in data.tsx, so activeStory.id should strictly match.
    const fullStory = stories.find(s => s.id.toLowerCase() === activeStory.id.toLowerCase());

    if (!fullStory) {
        // Fallback or error handling if somehow data is missing
        return (
            <View style={{padding: 20}}>
                <Text>Story data not found for {activeStory.title}</Text>
                <BackButton onPress={() => setView("ANIMATION")} />
            </View>
        )
    }

    return (
        <StoryReader 
            story={fullStory} 
            onClose={() => setView("ANIMATION")} 
        />
    );
  }

  return (
    <View style={styles.container}>
      {/* Header Row */}
      <View style={styles.header}>
        <BackButton onPress={goBack} />
        <Text style={styles.title}>{title}</Text>
      </View>

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
  container: { flex: 1, paddingTop: 60, paddingHorizontal: 16, backgroundColor: "#000105" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    gap: 16, // Space between back button and title
  },
  title: { fontSize: 24, fontWeight: "900", color: "#ffffff" },
  sectionWrap: { flex: 1 },
  subHeader: { fontSize: 18, fontWeight: "700", color: "#ffffff", marginBottom: 16 },
  list: { paddingBottom: 120 },
  columnWrapper: { justifyContent: "space-between" },
});
