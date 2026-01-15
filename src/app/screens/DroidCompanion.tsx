import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Animated,
  StatusBar,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

// Placeholder images - replace with your actual image URIs
const PHONE_ONE =
  "https://droidtechhq.com/static/media/photo-1.f5f6ba47356814349133.png";
const PHONE_TWO =
  "https://droidtechhq.com/static/media/photo-1.f5f6ba47356814349133.png";

const DroidCompanion: React.FC = () => {
  const navigation = useNavigation<any>();
  // Animation values
  const heroFadeAnim = useRef(new Animated.Value(0)).current;
  const heroSlideAnim = useRef(new Animated.Value(20)).current;
  const phoneFloatAnim = useRef(new Animated.Value(0)).current;
  const featuresFadeAnim = useRef(new Animated.Value(0)).current;
  const specsFadeAnim = useRef(new Animated.Value(0)).current;
  const reviewsFadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Hero animation
    Animated.parallel([
      Animated.timing(heroFadeAnim, {
        toValue: 1,
        duration: 800,
        delay: 300,
        useNativeDriver: true,
      }),
      Animated.timing(heroSlideAnim, {
        toValue: 0,
        duration: 800,
        delay: 300,
        useNativeDriver: true,
      }),
    ]).start();

    // Phone floating animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(phoneFloatAnim, {
          toValue: 15,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(phoneFloatAnim, {
          toValue: 0,
          duration: 1500,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Stagger other sections
    setTimeout(() => {
      Animated.timing(featuresFadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }).start();
    }, 800);

    setTimeout(() => {
      Animated.timing(specsFadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }).start();
    }, 1200);

    setTimeout(() => {
      Animated.timing(reviewsFadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }).start();
    }, 1600);
  }, []);

  const handlePreOrder = () => {
    alert("Feature coming soon...");
  };

  return (
    <View style={styles.container}>
      {/* header */}
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={26} color="#ffffff" />
        </TouchableOpacity>

        <Text style={styles.header}>D'roid Companion</Text>
      </View>

      <StatusBar barStyle="light-content" backgroundColor="#121212" />
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero Section */}
        <Animated.View
          style={[
            styles.heroSection,
            {
              opacity: heroFadeAnim,
              transform: [{ translateY: heroSlideAnim }],
            },
          ]}
        >
          <View style={styles.heroContainer}>
            <Animated.View
              style={[
                styles.heroPhone,
                { transform: [{ translateY: phoneFloatAnim }] },
              ]}
            >
              <View style={styles.phoneGlow} />
              <Image source={{ uri: PHONE_ONE }} style={styles.phoneImg} />
            </Animated.View>

            <View style={styles.heroContent}>
              <Text style={styles.heroTitle}>D'roid Companion</Text>
              <Text style={styles.heroSubtitle}>
                Built for the Future. Designed for You.
              </Text>
              <Text style={styles.heroDescription}>
                Experience technology that adapts to your lifestyle. The D'roid
                Mobile is more than just a phone — it's your creative companion,
                productivity partner, and entertainment powerhouse, all in one
                sleek, powerful device.
              </Text>
              <View style={styles.heroCta}>
                <TouchableOpacity
                  style={styles.ctaPrimary}
                  onPress={handlePreOrder}
                  activeOpacity={0.8}
                >
                  <Text style={styles.ctaPrimaryText}>Pre-order Now</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.ctaSecondary}
                  onPress={handlePreOrder}
                  activeOpacity={0.8}
                >
                  <Text style={styles.ctaSecondaryText}>Explore Features</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.heroTagline}>
                <Text style={styles.heroTaglineText}>
                  Be bold. Be fast. Be D'roid.
                </Text>
              </View>
            </View>
          </View>
        </Animated.View>

        {/* Features Section */}
        <Animated.View
          style={[styles.featuresSection, { opacity: featuresFadeAnim }]}
        >
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Unmatched Features</Text>
            <View style={styles.sectionUnderline} />
            <View style={styles.featuresGrid}>
              <View style={styles.featureCard}>
                <View style={styles.featureIcon}>
                  <Text style={styles.featureIconText}>📷</Text>
                </View>
                <Text style={styles.featureTitle}>Pro-Grade Camera</Text>
                <Text style={styles.featureDescription}>
                  108MP quad camera system with night vision and AI-powered
                  photography
                </Text>
              </View>

              <View style={styles.featureCard}>
                <View style={styles.featureIcon}>
                  <Text style={styles.featureIconText}>📱</Text>
                </View>
                <Text style={styles.featureTitle}>120Hz AMOLED Display</Text>
                <Text style={styles.featureDescription}>
                  6.7" edge-to-edge display with HDR10+ and 1B colors
                </Text>
              </View>

              <View style={styles.featureCard}>
                <View style={styles.featureIcon}>
                  <Text style={styles.featureIconText}>⚡</Text>
                </View>
                <Text style={styles.featureTitle}>Next-Gen Processor</Text>
                <Text style={styles.featureDescription}>
                  D'roid X1 chip with 5nm architecture and AI acceleration
                </Text>
              </View>

              <View style={styles.featureCard}>
                <View style={styles.featureIcon}>
                  <Text style={styles.featureIconText}>🔋</Text>
                </View>
                <Text style={styles.featureTitle}>All-Day Battery</Text>
                <Text style={styles.featureDescription}>
                  5000mAh battery with 65W fast charging and wireless power
                  share
                </Text>
              </View>
            </View>
          </View>
        </Animated.View>

        {/* Specs Section */}
        <Animated.View
          style={[styles.specsSection, { opacity: specsFadeAnim }]}
        >
          <View style={styles.sectionContainer}>
            <View style={styles.specsGrid}>
              <View style={styles.specsImage}>
                <Image source={{ uri: PHONE_TWO }} style={styles.specsImg} />
              </View>
              <View style={styles.specsContent}>
                <Text style={styles.sectionTitle}>
                  Technical Specifications
                </Text>
                <View style={styles.sectionUnderline} />
                <View style={styles.specsList}>
                  <View style={styles.specItem}>
                    <Text style={styles.specName}>Display:</Text>
                    <Text style={styles.specValue}>
                      6.7" Dynamic AMOLED 2X, 120Hz
                    </Text>
                  </View>
                  <View style={styles.specItem}>
                    <Text style={styles.specName}>Processor:</Text>
                    <Text style={styles.specValue}>
                      D'roid X1 Octa-core (5nm)
                    </Text>
                  </View>
                  <View style={styles.specItem}>
                    <Text style={styles.specName}>Memory:</Text>
                    <Text style={styles.specValue}>
                      12GB RAM + 256GB/512GB storage
                    </Text>
                  </View>
                  <View style={styles.specItem}>
                    <Text style={styles.specName}>Camera:</Text>
                    <Text style={styles.specValue}>
                      108MP + 12MP + 8MP + 5MP quad rear, 32MP front
                    </Text>
                  </View>
                  <View style={styles.specItem}>
                    <Text style={styles.specName}>Battery:</Text>
                    <Text style={styles.specValue}>
                      5000mAh with 65W fast charging
                    </Text>
                  </View>
                  <View style={[styles.specItem, styles.specItemLast]}>
                    <Text style={styles.specName}>OS:</Text>
                    <Text style={styles.specValue}>
                      D'roidOS 3.0 (Android 13)
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </Animated.View>

        {/* Reviews Section */}
        <Animated.View
          style={[styles.reviewsSection, { opacity: reviewsFadeAnim }]}
        >
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>What People Are Saying</Text>
            <View style={styles.sectionUnderline} />
            <View style={styles.reviewsGrid}>
              <View style={styles.reviewCard}>
                <Text style={styles.reviewRating}>★★★★★</Text>
                <Text style={styles.reviewText}>
                  "The D'roid Mobile has completely changed how I work and play.
                  The battery life is insane!"
                </Text>
                <Text style={styles.reviewAuthor}>
                  - Sarah J., Tech Blogger
                </Text>
              </View>

              <View style={styles.reviewCard}>
                <Text style={styles.reviewRating}>★★★★☆</Text>
                <Text style={styles.reviewText}>
                  "Camera quality is unmatched. The night mode shots look like
                  they were taken in daylight."
                </Text>
                <Text style={styles.reviewAuthor}>
                  - Michael T., Photographer
                </Text>
              </View>

              <View style={styles.reviewCard}>
                <Text style={styles.reviewRating}>★★★★★</Text>
                <Text style={styles.reviewText}>
                  "Performance is buttery smooth. Games and apps load instantly
                  with no lag whatsoever."
                </Text>
                <Text style={styles.reviewAuthor}>
                  - David L., Mobile Gamer
                </Text>
              </View>
            </View>
          </View>
        </Animated.View>
      </ScrollView>
    </View>
  );
};
export default DroidCompanion;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
  },
  scrollView: {
    flex: 1,
  },
  // header
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "900",
    color: "#ffffff",
  },
  // Hero Section
  heroSection: {
    paddingVertical: 80,
    paddingHorizontal: 20,
    backgroundColor: "#0f0f0f",
  },
  heroContainer: {
    alignItems: "center",
  },
  heroPhone: {
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 40,
  },
  phoneGlow: {
    position: "absolute",
    width: 200,
    height: 200,
    borderRadius: 125,
    backgroundColor: "rgba(58, 134, 255, 0.2)",
    opacity: 0.2,
  },
  phoneImg: {
    width: width * 0.8,
    height: width * 1.3,
    resizeMode: "contain",
    maxWidth: 300,
  },
  heroContent: {
    alignItems: "center",
    paddingHorizontal: 10,
  },
  heroTitle: {
    fontSize: width > 768 ? 56 : 24,
    fontWeight: "700",
    color: "#f8f9fa",
    marginBottom: 16,
    textAlign: "center",
    lineHeight: width > 768 ? 64 : 48,
  },
  heroSubtitle: {
    fontSize: width > 768 ? 24 : 20,
    fontWeight: "500",
    color: "#2667cc",
    marginBottom: 32,
    textAlign: "center",
  },
  heroDescription: {
    fontSize: width > 768 ? 18 : 16,
    lineHeight: 28,
    color: "#adb5bd",
    marginBottom: 40,
    textAlign: "center",
    maxWidth: 600,
  },
  heroCta: {
    flexDirection: width > 576 ? "row" : "column",
    gap: 15,
    marginBottom: 32,
    width: "100%",
    maxWidth: 500,
  },
  ctaPrimary: {
    backgroundColor: "#071d6a",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
    flex: width > 576 ? 1 : undefined,
    alignItems: "center",
  },
  ctaPrimaryText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
  ctaSecondary: {
    backgroundColor: "transparent",
    paddingVertical: 10,
    paddingHorizontal: 22,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#071d6a",
    flex: width > 576 ? 1 : undefined,
    alignItems: "center",
  },
  ctaSecondaryText: {
    color: "#2667cc",
    fontSize: 16,
    fontWeight: "600",
  },
  heroTagline: {
    marginBottom: 0,
  },
  heroTaglineText: {
    fontSize: width > 768 ? 20 : 18,
    fontWeight: "600",
    color: "#f8f9fa",
    textAlign: "center",
  },
  // Section Styles
  sectionContainer: {
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: width > 768 ? 40 : 32,
    fontWeight: "700",
    color: "#f8f9fa",
    textAlign: "center",
    marginBottom: 15,
  },
  sectionUnderline: {
    width: 80,
    height: 4,
    backgroundColor: "#071d6a",
    borderRadius: 2,
    alignSelf: "center",
    marginBottom: 60,
  },
  // Features Section
  featuresSection: {
    paddingVertical: 80,
    backgroundColor: "#121212",
  },
  featuresGrid: {
    gap: 30,
  },
  featureCard: {
    backgroundColor: "#1e1e1e",
    borderRadius: 12,
    padding: 30,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.05)",
  },
  featureIcon: {
    width: 70,
    height: 70,
    backgroundColor: "rgba(58, 134, 255, 0.1)",
    borderRadius: 35,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  featureIconText: {
    fontSize: 32,
  },
  featureTitle: {
    fontSize: 21,
    fontWeight: "600",
    color: "#f8f9fa",
    marginBottom: 15,
    textAlign: "center",
  },
  featureDescription: {
    fontSize: 15,
    color: "#adb5bd",
    lineHeight: 24,
    textAlign: "center",
  },
  // Specs Section
  specsSection: {
    paddingVertical: 80,
    backgroundColor: "#0f0f0f",
  },
  specsGrid: {
    gap: 40,
  },
  specsImage: {
    alignItems: "center",
  },
  specsImg: {
    width: width * 0.5,
    height: width * 1.0,
    resizeMode: "contain",
    maxWidth: 280,
    borderRadius: 12,
  },
  specsContent: {
    marginTop: 20,
  },
  specsList: {
    gap: 20,
  },
  specItem: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.05)",
  },
  specItemLast: {
    borderBottomWidth: 0,
  },
  specName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#f8f9fa",
    marginBottom: 5,
  },
  specValue: {
    fontSize: 15,
    color: "#adb5bd",
    lineHeight: 22,
  },
  // Reviews Section
  reviewsSection: {
    paddingVertical: 80,
    backgroundColor: "#121212",
  },
  reviewsGrid: {
    gap: 30,
  },
  reviewCard: {
    backgroundColor: "#1e1e1e",
    borderRadius: 12,
    padding: 30,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.05)",
  },
  reviewRating: {
    color: "#ffc107",
    fontSize: 20,
    marginBottom: 15,
  },
  reviewText: {
    fontSize: 15,
    fontStyle: "italic",
    color: "#adb5bd",
    lineHeight: 24,
    marginBottom: 15,
  },
  reviewAuthor: {
    fontSize: 15,
    fontWeight: "600",
    color: "#2667cc",
  },
});
