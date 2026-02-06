import React, { useMemo, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Clock, Users, Award } from "lucide-react-native";
import ContactFormModal from "../Services/components/ContactFormModal";
import Toast from "react-native-toast-message";
import { useDispatch } from "react-redux";
import { createAndDispatchNotification } from "../../../utils/Notifications";
import { Ionicons } from "@expo/vector-icons";
import ServicesNewCard from "./components/ServicesNewCard";

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
import ServiceDetailView, {
  ServiceDetailData,
} from "./components/ServiceDetailView";
import StoryReader from "./components/StoryReader";

const ServicesScreen: React.FC<ServicesScreenProps> = ({
  onOpenSayIt,
  whatsappPhone,
}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [view, setView] = useState<ViewState>("HOME");

  const [activeCategory, setActiveCategory] = useState<TechCategoryKey | null>(
    null,
  );
  const [activeClass, setActiveClass] = useState<ClassItem | null>(null);
  const [activeTech, setActiveTech] = useState<TechItem | null>(null);

  const [activeTraining, setActiveTraining] = useState<TrainingItem | null>(
    null,
  );

  const [activeConsulting, setActiveConsulting] =
    useState<ConsultingItem | null>(null);

  const [activeStory, setActiveStory] = useState<StoryItem | null>(null);

  // contact form
  const [isContactModalVisible, setIsContactModalVisible] = useState(false);
  const [contactServiceInfo, setContactServiceInfo] = useState<{
    title: string;
    type?: string;
    fees?: string;
  }>({ title: "", type: "", fees: "" });

  // Update the openContact function
  const openContact = (
    serviceTitle?: string,
    serviceType?: string,
    fees?: string,
  ) => {
    if (onOpenSayIt) return onOpenSayIt();

    // Set service info and show modal
    setContactServiceInfo({
      title:
        serviceTitle ||
        activeTech?.title ||
        activeTraining?.title ||
        activeConsulting?.title ||
        "Service",
      type: serviceType || activeClass?.title,
      fees: fees,
    });
    setIsContactModalVisible(true);
  };

  // Add handler for form submission
  const handleContactFormSubmit = (formData: any) => {
    console.log("Contact form submitted:", formData);

    Toast.show({
      type: "success",
      text1: "Inquiry Sent!",
      text2: "We'll get back to you within 24 hours.",
      visibilityTime: 5000,
    });

    createAndDispatchNotification(dispatch, {
      title: "Service Inquiry Sent",
      message: `Your inquiry about ${formData.serviceTitle} has been received.`,
    });

    setIsContactModalVisible(false);
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
        // <ServiceCard
        //   title={item.title}
        //   description={item.description}
        //   onPress={() => {
        //     if (item.key === "software") setView("SOFTWARE_CLASSES");
        //     if (item.key === "training") setView("TRAININGS");
        //     if (item.key === "animation") setView("ANIMATION");
        //     if (item.key === "consulting") setView("CONSULTING");
        //   }}
        // />
        <ServicesNewCard
          title={item.title}
          description={item.description}
          icon={item.icon} // Added icon
          color={item.color} // Added colors
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
        <Text style={styles.subHeader}>{activeClass.title} Services</Text>
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

    const detailData: ServiceDetailData = {
      title: activeTech.title,
      subTitle: activeClass?.title,
      summary: activeTech.description,
      icon: activeTech.icon,
      benefits: activeTech.bullets,
      benefitsLabel: "Key Capabilities",
    };

    return (
      <ServiceDetailView
        data={detailData}
        contactLabel="Contact about this Tech Stack"
        onContact={() => openContact(activeTech?.title, activeClass?.title)}
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
    const program = trainingPrograms.find(
      (p) => p.id === activeTraining.program,
    );

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
        onContact={() => openContact(program?.title, "Training")}
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
            // We match based on ID (case-insensitive for safety)
            const found = stories.find(
              (s) => s.id.toLowerCase() === item.id.toLowerCase(),
            );
            if (found) {
              // @ts-ignore - mismatch between Story (full) and StoryItem (lite)

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

    const fullStory = stories.find(
      (s) => s.id.toLowerCase() === activeStory.id.toLowerCase(),
    );

    if (!fullStory) {
      // Fallback or error handling if somehow data is missing
      return (
        <View style={{ padding: 20 }}>
          <Text>Story data not found for {activeStory.title}</Text>
          <BackButton onPress={() => setView("ANIMATION")} />
        </View>
      );
    }

    return (
      <StoryReader story={fullStory} onClose={() => setView("ANIMATION")} />
    );
  };

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
      {/* Contact Form Modal */}
      <ContactFormModal
        visible={isContactModalVisible}
        onClose={() => setIsContactModalVisible(false)}
        serviceTitle={contactServiceInfo.title}
        serviceType={contactServiceInfo.type}
        fees={contactServiceInfo.fees}
        onSubmit={handleContactFormSubmit}
      />
    </View>
  );
};

export default ServicesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 20,
    backgroundColor: "#000105", // dark base
  },

  /* Header */
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
    gap: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "900",
    color: "#fff",
  },

  /* Section Wrappers */
  sectionWrap: {
    flex: 1,
    marginBottom: 24,
  },
  subHeader: {
    fontSize: 20,
    fontWeight: "700",
    color: "#fff",
    marginBottom: 16,
  },

  /* FlatList Grid */
  list: {
    paddingBottom: 140,
  },
  columnWrapper: {
    justifyContent: "space-between",
    marginBottom: 16,
  },

  /* Service / Class / Training / Consulting Cards */
  serviceCard: {
    flex: 1,
    backgroundColor: "red",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#222",
  },
  serviceCardTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#000105",
    marginBottom: 6,
  },
  serviceCardDesc: {
    fontSize: 14,
    fontWeight: "400",
    color: "#334155",
    lineHeight: 20,
  },

  /* Detail / Stats / Benefits */
  detailCard: {
    backgroundColor: "#C7D2FE",
    padding: 20,
    borderRadius: 16,
    marginBottom: 24,
  },
  detailTitle: {
    fontSize: 22,
    fontWeight: "900",
    color: "#000105",
    marginBottom: 6,
  },
  detailSubTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#475569",
    marginBottom: 12,
  },
  detailText: {
    fontSize: 14,
    fontWeight: "400",
    color: "#334155",
    lineHeight: 20,
  },

  /* Floating WhatsApp Button */
  whatsappButtonContainer: {
    position: "absolute",
    bottom: 24,
    right: 24,
    backgroundColor: "#25D366",
    padding: 14,
    borderRadius: 28,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
});
