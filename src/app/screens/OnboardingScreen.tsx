import React, { useRef, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    FlatList,
    Dimensions,
} from "react-native";
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';

const { width } = Dimensions.get("window");

interface Slide {
    key: string;
    title: string;
    subtitle: string;
    image: any;
}

const slides: Slide[] = [
    {
        key: "1",
        title: "Company Management Portal",
        subtitle:
            "A centralized platform designed to streamline and manage all aspects of your organization's operations.",
        icon: "office-building",
    },
    {
        key: "2",
        title: "Innovative Tech Solutions",
        subtitle:
            "We deliver cutting-edge technology solutions tailored to your business needs.",
        icon: "lightbulb-on-outline",
    },
    {
        key: "3",
        title: "Trusted By Industry Leaders",
        subtitle:
            "Partnering with Fortune 500 companies down to startups.",
        icon: "account-group-outline",
    },
    {
        key: "4",
        title: "Digital Workbench",
        subtitle:
            "A smart workspace for tools you use every day.",
        icon: "toolbox-outline",
    },
];


const OnboardingScreen: React.FC = ({ navigation }: any) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const flatListRef = useRef<FlatList>(null);

    const handleNext = () => {
        if (currentIndex < slides.length - 1) {
            flatListRef.current?.scrollToIndex({ index: currentIndex + 1 });
        } else {
            navigation.replace("WelcomeScreen"); // last slide: go to Home
        }
    };

    const handleSkip = () => {
        navigation.replace("WelcomeScreen");
    };

    const onViewRef = useRef(({ viewableItems }: any) => {
        setCurrentIndex(viewableItems[0].index);
    });
    const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 50 });

    return (
        <View style={styles.container}>
            {/* Skip Button */}
            <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
                <Text style={styles.skipText}>Skip</Text>
            </TouchableOpacity>

            {/* Slides */}
            <FlatList
                ref={flatListRef}
                data={slides}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => item.key}
                renderItem={({ item }) => (
                    <View style={[styles.slide, { width }]}>
                        <Icon
                            name={item.icon}
                            size={width * 0.7} // large, almost full width
                            color="#FFD700"
                            style={styles.icon}
                        />
                        <Text style={styles.title}>{item.title}</Text>
                        <Text style={styles.subtitle}>{item.subtitle}</Text>
                    </View>
                )}
                onViewableItemsChanged={onViewRef.current}
                viewabilityConfig={viewConfigRef.current}
            />

            {/* Pagination Dots */}
            <View style={styles.pagination}>
                {slides.map((_, index) => (
                    <View
                        key={index}
                        style={[
                            styles.dot,
                            {
                                opacity: index === currentIndex ? 1 : 0.3,
                                backgroundColor: index === currentIndex ? "#182b90" : "#182b90",
                            },
                        ]}
                    />
                ))}
            </View>

            {/* Next / Get Started Button */}
            <TouchableOpacity style={styles.button} onPress={handleNext}>
                <Text style={styles.buttonText}>
                    {currentIndex === slides.length - 1 ? "Get Started" : "Next"}
                </Text>
            </TouchableOpacity>
        </View>
    );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#000105", // White background
    },
    skipButton: {
        position: "absolute",
        top: 50,
        right: 20,
        zIndex: 1,
    },
    skipText: {
        color: "#C7D2FE", // Primary color for contrast
        fontWeight: "900",
        fontSize: 16,
    },
    slide: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 20,
    },
    image: {
        width: "70%",
        height: 220,
        marginBottom: 30,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: "#000c3a",
    },
    title: {
        fontSize: 30,
        fontWeight: "900",
        color: "#ffffff", // Primary color
        textAlign: "center",
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 16,
        color: "#555555", // Dark gray for readability
        textAlign: "center",
        lineHeight: 22,
    },
    pagination: {
        flexDirection: "row",
        justifyContent: "center",
        marginBottom: 30,
    },
    dot: {
        height: 10,
        width: 10,
        borderRadius: 5,
        marginHorizontal: 5,
        backgroundColor: "#182b90", // Primary color dots
    },
    button: {
        backgroundColor: "#C7D2FE", // Primary color button
        paddingVertical: 14,
        paddingHorizontal: 40,
        borderRadius: 8,
        marginHorizontal: 40,
        marginBottom: 50,
    },
    buttonText: {
        color: "#000105", // White text
        fontSize: 16,
        fontWeight: "900",
        textAlign: "center",
    },
    icon: {
        marginBottom: 30,
        textAlign: "center",
        color: "#C7D2FE", // Icon in primary color
    },
});
