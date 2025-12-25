import React, { useState, useEffect, useRef } from "react";
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    StyleSheet,
    Image,
    StatusBar,
    Platform,
    Modal, // <-- Added Modal
    Dimensions, // <-- Added Dimensions for calculating height
    Alert,
    AppState,
    AppStateStatus, // Using Alert for the simple quick action notification as per existing code
} from "react-native";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import { ASSETS } from "../constants/Assets";
// Updated Redux imports
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../redux/store";
import { logoutUser } from "../redux/slice/user"; // <-- Import logout action
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { loadNotifications } from "../redux/slice/notifications";
import { addHours } from "../redux/slice/membershiptierslice";
import BottomSheetModal from "../components/BottomSheetModal";
import { authService } from "../redux/configuration/auth.service";

const { height } = Dimensions.get('window'); // Get screen height for modal styling

const HomeScreen: React.FC = ({ navigation }: any) => {
    const userMain: any = useSelector((state: RootState) => state.user);
    const userTypee = userMain.userType;
    const membershipTier = useSelector((state: RootState) => state.membershipTier);

    const dispatch = useDispatch<AppDispatch>();
    const count = useSelector((state: RootState) => state.notifications.notifications.length);
    const unreadCount = useSelector(
        (state: RootState) => state.notifications.unreadCount
    );

    const [isModalVisible, setIsModalVisible] = useState(false);
    useEffect(() => {
        dispatch(loadNotifications());
    }, []);
    const [totalSeconds, setTotalSeconds] = useState(0);
    const appState = useRef(AppState.currentState);

    useEffect(() => {
        const subscription = AppState.addEventListener("change", (nextAppState: AppStateStatus) => {
            // If the app is going away (background/inactive), sync seconds to Redux
            if (appState.current === "active" && nextAppState.match(/inactive|background/)) {
                syncTimeToRedux();
            }
            appState.current = nextAppState;
        });

        const interval = setInterval(() => {
            if (appState.current === "active") {
                setTotalSeconds((prev) => prev + 1);
            }
        }, 1000);

        return () => {
            subscription.remove();
            clearInterval(interval);
            // Also sync when the component unmounts
            syncTimeToRedux();
        };
    }, [totalSeconds]);

    const syncTimeToRedux = () => {
        if (totalSeconds > 0) {
            const hoursToAdd = totalSeconds / 3600;
            dispatch(addHours(hoursToAdd));
            setTotalSeconds(0);
        }
    };

    const eventsPosts = [
        {
            id: 12,
            title: "Clash of Kings - Chess Tournament[2025]",
            excerpt:
                "An exciting chess tournament featuring some of the region's top players.",
            date: "Sunday, 7th December 2025",
            author: "D'roid Technologies",
            authorAvatar: "https://randomuser.me/api/portraits/lego/2.jpg",
            category: "Events",
            readTime: "5 min read",
            image: ASSETS.images.chessOne,
            //   readMoreLink: generateBlogLink("events", "Clash of Kings - Chess Tournament[2025/2026]"),
            content: [
                "Clash of Kings, organized by D'roid Technologies, is a premier annual chess competition dedicated to empowering minds through strategy, focus, and creativity. The event brings together chess enthusiasts, learners, and masters from across communities, creating an atmosphere of inspiration, competition, and excellence.",

                "Every round is designed as a battlefield — from intense opening moves to decisive endgames — participants are challenged to test their skills, resilience, and tactical brilliance. Players not only sharpen their chess strategies but also gain valuable lessons in patience, discipline, and problem-solving that extend beyond the board.",

                "Beyond the matches, Clash of Kings emphasizes values of resilience, intelligence, and creativity. It offers participants an opportunity to network, collaborate, and grow while being supported by a community of like-minded competitors and learners.",

                "Winners receive exciting rewards: 1st Place — ₦15,000 + crowned the Chess King 2025 + named Ambassador of D'roid Technologies; 2nd Place — ₦10,000; 3rd Place — ₦5,000. Other prizes include books, pens, and chess boards.",

                "Registration is open to all with a participation fee of ₦1000. Hurry, registration closes on November 30, 2025. Secure your spot, make your moves, and claim your crown in the ultimate Clash of Kings!"
            ]

        },
        {
            id: 9,
            title: "CUMSA Financial Summit 2025 – Money Meets Medicine",
            excerpt: "Think Health, Think Wealth, Think Global.",
            date: "Wednesday, 17th September 2025",
            author: "Medical/Tech Events Team",
            authorAvatar: "https://randomuser.me/api/portraits/lego/5.jpg",
            category: "Events",
            readTime: "6 min read",
            image: ASSETS.images.cumsaEvent,
            featured: true,
            //   readMoreLink: generateBlogLink(
            //     "events",
            //     "CUMSA Financial Summit 2025 – Money Meets Medicine"
            //   ),
            content: [
                "The Calabar University Medical Students’ Association (CUMSA) through the Office of the Financial Secretary proudly presents the CUMSA Financial Summit 2025. This forward-thinking event is designed to empower medical students and young professionals with the knowledge and tools to merge health, wealth, and global opportunities in today’s fast-evolving world.",
            ],
        },
        {
            id: 10,
            title: "Lift Off - Tech Conference",
            excerpt:
                "Highlights and key takeaways from this year's premier developer event.",
            date: "Monday, 15th June 2026",
            author: "D'roid Technologies",
            authorAvatar: "https://randomuser.me/api/portraits/lego/5.jpg",
            category: "Events",
            readTime: "6 min read",
            image:
                "https://media.istockphoto.com/id/1271984096/vector/help-to-succeed.jpg?s=612x612&w=0&k=20&c=X4MT1Uk3i70u-XOJE1phLMOcAkhjVAFvMA-bKOMLiDQ=",
            featured: true,
            //   readMoreLink: generateBlogLink("events", "Lift Off - Tech Conference"),
            content: [
                "LiftOff - Tech Conference, organized by D'roid Technologies, is a premier annual event dedicated to empowering individuals and helping them stand on their own two feet through the power of technology. The conference brings together innovators, professionals, entrepreneurs, and learners from across industries, creating an atmosphere of inspiration, collaboration, and transformation.",

                "Every session is designed as a launchpad — from keynote speeches by industry leaders to hands-on workshops and panel discussions — participants are guided to explore cutting-edge innovations, practical tools, and success strategies that can fuel their personal and professional growth. Attendees not only gain valuable insights but also learn actionable skills to apply in real-world scenarios.",

                "Beyond the talks and workshops, LiftOff emphasizes values of independence, resilience, and creativity. It offers participants an opportunity to network, collaborate, and challenge themselves while being supported by a community of like-minded innovators and changemakers.",

                "Individuals register with a participation fee, and the most outstanding participants — including entrepreneurs with innovative solutions, developers with impactful projects, and learners who demonstrate exceptional growth — receive awards, monetary prizes, and recognition on stage. Hosted twice each year, LiftOff stands as a beacon of empowerment, showcasing how technology can inspire people of all ages to rise, stand strong, and create their own path to success.",
            ],
        },
        {
            id: 11,
            title: "Tech Conference Calabar",
            excerpt:
                "A fast-paced event packed with learning opportunities for tech enthusiasts.",
            date: "Friday, 5th December 2025",
            author: "Calabar Tech Community",
            authorAvatar: "https://randomuser.me/api/portraits/lego/2.jpg",
            category: "Events",
            readTime: "5 min read",
            image: ASSETS.images.CTC2025,
            //   readMoreLink: generateBlogLink("events", "Tech Conference Calabar"),
            content: [
                "The Tech Conference Calabar is a premier gathering for innovators, developers, entrepreneurs, and tech enthusiasts from across Nigeria and beyond.",
                "This event features keynote sessions, workshops, and panel discussions focused on emerging technologies, digital transformation, and real-world applications.",
                "Attendees will learn directly from industry leaders, connect with startups and established companies, and explore how technology is shaping the future of Africa.",
                "Hosted in the vibrant city of Calabar, the conference also provides rich networking opportunities, cultural experiences, and inspiration for both beginners and seasoned professionals.",
            ],
        },

        {
            id: 13,
            title: "Clash of Kings - Chess Tournament[2022/2023]",
            excerpt:
                "A fast-paced event packed with learning opportunities for tech enthusiasts.",
            date: "Thursday, 30th November 2023",
            author: "Community Team",
            authorAvatar: "https://randomuser.me/api/portraits/lego/2.jpg",
            category: "Events",
            readTime: "5 min read",
            image: ASSETS.images.chessOne,
            //   readMoreLink: generateBlogLink("events", "Clash of Kings - Chess Tournament[2022/2023]"),
            content: [
                "The Rapid Training Conference is designed for tech enthusiasts who want to level up their skills quickly.",
                "The program includes lightning talks, live coding sessions, and interactive problem-solving challenges.",
                "Industry experts will share strategies for staying productive, learning faster, and adapting to changing tech trends.",
                "It's the perfect opportunity for both beginners and seasoned developers to gain valuable insights in a short time.",
            ],
        },
        {
            id: 14,
            title: "Clash of Kings - Chess Tournament[2021/2022]",
            excerpt:
                "A fast-paced event packed with learning opportunities for tech enthusiasts.",
            date: "Wednesday, 30th November 2022",
            author: "Community Team",
            authorAvatar: "https://randomuser.me/api/portraits/lego/2.jpg",
            category: "Events",
            readTime: "5 min read",
            image: ASSETS.images.chessOne,
            //   readMoreLink: generateBlogLink("events", "Clash of Kings - Chess Tournament[2021/2022]"),
            content: [
                "The Rapid Training Conference is designed for tech enthusiasts who want to level up their skills quickly.",
                "The program includes lightning talks, live coding sessions, and interactive problem-solving challenges.",
                "Industry experts will share strategies for staying productive, learning faster, and adapting to changing tech trends.",
                "It's the perfect opportunity for both beginners and seasoned developers to gain valuable insights in a short time.",
            ],
        },
        {
            id: 15,
            title: "National ICT Competition 2020",
            excerpt:
                "A fast-paced event packed with learning opportunities for tech enthusiasts.",
            date: "May 30, 2023",
            author: "Community Team",
            authorAvatar: "https://randomuser.me/api/portraits/lego/2.jpg",
            category: "Events",
            readTime: "5 min read",
            image: ASSETS.images.nationalICT,
            //   readMoreLink: generateBlogLink("events", "National ICT Competition 2020"),
            content: [
                "The Rapid Training Conference is designed for tech enthusiasts who want to level up their skills quickly.",
                "The program includes lightning talks, live coding sessions, and interactive problem-solving challenges.",
                "Industry experts will share strategies for staying productive, learning faster, and adapting to changing tech trends.",
                "It's the perfect opportunity for both beginners and seasoned developers to gain valuable insights in a short time.",
            ],
        },
        {
            id: 16,
            title: "National ICT Competition 2022",
            excerpt:
                "A fast-paced event packed with learning opportunities for tech enthusiasts.",
            date: "May 30, 2023",
            author: "Community Team",
            authorAvatar: "https://randomuser.me/api/portraits/lego/2.jpg",
            category: "Events",
            readTime: "5 min read",
            image: ASSETS.images.nationalICT2,
            //   readMoreLink: generateBlogLink("events", "National ICT Competition 2022"),
            content: [
                "The Rapid Training Conference is designed for tech enthusiasts who want to level up their skills quickly.",
                "The program includes lightning talks, live coding sessions, and interactive problem-solving challenges.",
                "Industry experts will share strategies for staying productive, learning faster, and adapting to changing tech trends.",
                "It's the perfect opportunity for both beginners and seasoned developers to gain valuable insights in a short time.",
            ],
        },
        {
            id: 17,
            title: "Outreach at State Primary School Rukpokwu, Rivers State",
            excerpt:
                "Photos of the outreach held on 07/10/25 at State Primary School Rukpokwu, Rivers State — supported by D'ROID Technologies. It was all shades of amazing!",
            date: "October 7, 2025",
            author: "Community Team",
            authorAvatar: "https://randomuser.me/api/portraits/lego/2.jpg",
            category: "Outreach",
            readTime: "3 min read",
            image: ASSETS.images.PrimarySchoolRukpokwu,
            //   readMoreLink: generateBlogLink("events", "Outreach at State Primary School Rukpokwu Rivers State"),
            content: [
                "Our team, supported by D'ROID Technologies, held an inspiring outreach program at State Primary School, Rukpokwu, Rivers State, on October 7, 2025.",
                "The event was filled with excitement, learning, and community spirit as pupils engaged in tech awareness activities and motivational sessions.",
                "It was a day to remember — filled with smiles, shared knowledge, and positive energy.",
                "A huge thank you to everyone who made this outreach possible. It was truly all shades of amazing!"
            ],
        },

    ];

    const quickActions = [
        { title: "Personal Details", icon: "user", color: "#3B82F6", type: "all" },
        { title: "Services", icon: "cogs", color: "#10B981", type: "all" },
        { title: "Careers", icon: "briefcase", color: "#F59E0B", type: "all" },
        { title: "Trainings / Tests", icon: "clipboard-check", color: "#8B5CF6", type: "all" },
        { title: "Tasks", icon: "tasks", color: "#4F46E5", type: "staff" },                // Indigo
        { title: "Payslip", icon: "money-bill-alt", color: "#14B8A6", type: "staff" },     // Teal
        { title: "Onboarding", icon: "user-plus", color: "#EAB308", type: "staff" },       // Yellow
        { title: "Training", icon: "graduation-cap", color: "#EC4899", type: "staff" },    // Pink
        { title: "Attendance", icon: "calendar-check", color: "#6366F1", type: "staff" },
        { title: "Progression", icon: "chart-line", color: "#EF4444", type: "all" },     // Red
        { title: "Contact Us", icon: "envelope", color: "#06B6D4", type: "all" },
    ];

    const filteredQuickActions = quickActions.filter(
        (action) => action.type === "all" || action.type === userTypee.toLowerCase()
    );

    const getGreeting = (): string => {
        const currentHour = new Date().getHours();

        if (currentHour < 12) {
            return "Good morning 🌅";
        } else if (currentHour < 18) {
            return "Good afternoon ☀️";
        } else {
            return "Good evening 🌙";
        }
    };

    const greeting = getGreeting();

    const handleQuickAction = (title: string) => {
        // NOTE: Changed alert() to a simple, non-blocking notification
        // Alert.alert("Action Required", `Navigating to ${title} screen.`);
        navigation.navigate(`${title}`);
    }

    // Sign out handler function
    const handleSignOut = async () => {
        setIsModalVisible(false);
        dispatch(logoutUser());
        await signOut(auth).then(() => {
            navigation.navigate("Login")
        })
    };

    useEffect(() => {
        authService.pullNotificationsFromFirebase();
    }, []);


    return (
        <View
            style={styles.container}
        >
            <StatusBar
                barStyle={Platform.OS === "ios" ? "light-content" : "dark-content"}
                backgroundColor="#203499"
            />

            {/* Header */}
            <View style={styles.header}>
                <View style={styles.headerLeft}>
                    <Text style={styles.headerName}>D'roid One</Text>
                </View>

                <View style={styles.headerRight}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate("Notifications")}
                        style={{ marginHorizontal: 6 }}
                    >
                        <View style={{ position: "relative" }}>
                            {/* Notification Icon */}
                            <View
                                style={{
                                    backgroundColor: "transparent",
                                    padding: 10,
                                    borderRadius: 8,
                                }}
                            >
                                <Ionicons name="notifications-outline" size={22} color="#ffffff" />
                            </View>

                            {/* Badge */}
                            {unreadCount > 0 && (
                                <View
                                    style={{
                                        position: "absolute",
                                        top: -4,
                                        right: -4,
                                        width: 20,
                                        height: 20,
                                        borderRadius: 10,
                                        backgroundColor: "red",
                                        justifyContent: "center",
                                        alignItems: "center",
                                    }}
                                >
                                    <Text
                                        style={{
                                            color: "white",
                                            fontSize: 12,
                                            fontWeight: "bold",
                                        }}
                                    >
                                        {unreadCount}
                                    </Text>
                                </View>
                            )}
                        </View>
                    </TouchableOpacity>


                    <TouchableOpacity
                        style={styles.avatar}
                        onPress={() => setIsModalVisible(true)}
                    >
                        <Text style={styles.avatarText}>{userMain.initials}</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Greeting */}
            <View style={styles.greetingContainer}>
                <View>
                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                        <View>
                            <Text style={styles.greetingText}>{greeting}</Text>
                            <Text style={styles.userName}>{userMain.firstName} {userMain.lastName}</Text>
                        </View>
                        <Text style={styles.userEmail}>{userMain.email}</Text>
                    </View>

                    <Text style={styles.userDetails}>
                        {userMain.userType} | {userMain.staffId}
                    </Text>
                </View>
            </View>

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 80 }}
            >
                {/* Membership Overview */}
                <Text style={styles.sectionTitle}>Membership Overview</Text>
                <View style={styles.statsContainer}>
                    {/* Membership Status */}
                    <View style={styles.statCard}>
                        <Text style={styles.statTitle}>Membership</Text>
                        <Text style={styles.statValue}>{membershipTier.tier}</Text>
                        <Text style={styles.statChange}>
                            {membershipTier.nextTier ? `Next: ${membershipTier.nextTier}` : "Top Tier"}
                        </Text>
                    </View>

                    {/* Total Hours */}
                    <View style={styles.statCard}>
                        <Text style={styles.statTitle}>Total Hours</Text>
                        <Text style={styles.statValue}>{membershipTier.status}: {membershipTier.totalHours.toFixed(3)} Hours</Text>
                        <Text style={styles.statChange}>
                            Membership: {membershipTier.progressPercentage}%
                        </Text>
                    </View>
                </View>

                {/* Quick Actions */}
                <Text style={styles.sectionTitle}>Quick Actions</Text>
                <View style={styles.quickActionsContainer}>
                    {filteredQuickActions.map((action, index) => (
                        <TouchableOpacity
                            key={index}
                            style={styles.actionCard}
                            onPress={() => handleQuickAction(action.title)}
                        >
                            <View
                                style={[styles.iconWrapper, { backgroundColor: action.color + "20" }]}
                            >
                                <FontAwesome5
                                    name={action.icon as any}
                                    size={20}
                                    color={action.color}
                                />
                            </View>
                            <Text style={styles.actionText}>{action.title}</Text>
                        </TouchableOpacity>
                    ))}
                </View>


                {/* Our Events */}
                <Text style={styles.sectionTitle}>Upcoming Events</Text>
                {eventsPosts
                    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()) // Sort by date ascending
                    .slice(0, 3) // Take top 3
                    .map((event: any, index: React.Key | null | undefined) => (
                        <TouchableOpacity
                            onPress={() => navigation.navigate("EventDescription", { event })}
                            key={index}
                            style={styles.eventCard}
                        >
                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                                <Image
                                    source={event.image}
                                    style={{ width: 100, height: 100, borderRadius: 8 }}
                                    accessibilityLabel="Event Image"
                                />
                                <View style={{ marginLeft: 12, flex: 1 }}>
                                    <Text style={styles.eventTitle}>{event.title}</Text>
                                    <Text style={styles.eventDate}>{event.date}</Text>
                                </View>
                            </View>
                            <Ionicons name="chevron-forward" size={18} color="#999" />
                        </TouchableOpacity>
                    ))}

                {/* Button to see all events */}
                <TouchableOpacity
                    style={{
                        marginHorizontal: 16,
                        marginTop: 10,
                        paddingVertical: 12,
                        borderRadius: 10,
                        backgroundColor: "#C7D2FE",
                        alignItems: "center",
                    }}
                    onPress={() => navigation.navigate("AllEventsScreen", { eventsPosts })}
                >
                    <Text style={{ fontSize: 16, fontWeight: "600", color: "#071D6A" }}>
                        See All Events
                    </Text>
                </TouchableOpacity>

            </ScrollView>

            <BottomSheetModal
                visible={isModalVisible}
                onClose={() => setIsModalVisible(false)}
            >
                {/* User Info */}
                <View style={styles.modalUserInfo}>
                    <View style={[styles.avatar, styles.modalAvatar]}>
                        <Text style={styles.avatarText}>{userMain.initials}</Text>
                    </View>
                    <Text style={styles.modalUserName}>{userMain.firstName} {userMain.lastName}</Text>
                    <Text style={styles.modalUserDetail}>{userMain.userType}</Text>
                    <Text style={styles.modalUserDetail}>{userMain.email}</Text>
                </View>

                {/* Action Buttons */}
                <TouchableOpacity
                    style={styles.modalButton}
                    onPress={() => {
                        setIsModalVisible(false);
                        navigation.navigate('Profile');
                    }}
                >
                    <Ionicons name="person-circle-outline" size={24} color="#000c3a" />
                    <Text style={styles.modalButtonText}>View Profile</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.modalButton}
                    onPress={() => {
                        setIsModalVisible(false);
                        navigation.navigate('Settings');
                    }}
                >
                    <Ionicons name="settings-outline" size={24} color="#000c3a" />
                    <Text style={styles.modalButtonText}>Settings</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.modalButton, styles.signOutButton]}
                    onPress={handleSignOut}
                >
                    <Ionicons name="log-out-outline" size={24} color="#FF6F61" />
                    <Text style={[styles.modalButtonText, styles.signOutButtonText]}>Sign Out</Text>
                </TouchableOpacity>

                {/* Close button (optional, but good for UX) */}
                <TouchableOpacity
                    style={styles.modalCloseButton}
                    onPress={() => setIsModalVisible(false)}
                >
                    <Text style={styles.modalCloseButtonText}>Close</Text>
                </TouchableOpacity>
            </BottomSheetModal>
        </View>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#000105" },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 16,
        backgroundColor: "#000c3a",
        height: 60
    },
    headerLeft: { flexDirection: "row", alignItems: "center", gap: 10 },
    headerRight: { flexDirection: "row", alignItems: "center" },
    logo: { width: 100, height: 35, marginLeft: 10 },
    iconBtn: { marginHorizontal: 6, color: "#ffffff", },
    avatar: {
        backgroundColor: "#ffffff",
        borderRadius: 20,
        width: 36,
        height: 36,
        justifyContent: "center",
        alignItems: "center",
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    avatarText: { color: "#000105", fontWeight: "700" },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "400",
        color: "#ffffff",
        marginBottom: 10,
        paddingHorizontal: 16,
        marginTop: 10,
    },
    statsContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        paddingHorizontal: 20,
        paddingVertical: 20
    },
    statCard: {
        backgroundColor: "#000c3a",
        borderRadius: 16,
        padding: 16,
        width: "48%",
        marginBottom: 12,
        height: 110
    },
    statTitle: { color: "#C7D2FE", fontWeight: "900", marginBottom: 20 },
    statValue: { fontSize: 16, fontWeight: "400", color: "#e6e6e8" },
    statChange: { fontSize: 12, color: "#999", fontWeight: "600" },
    quickActionsContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        paddingHorizontal: 22,
    },
    actionCard: {
        width: "48%",
        backgroundColor: "#C7D2FE",
        borderRadius: 16,
        paddingVertical: 20,
        alignItems: "center",
        marginBottom: 12,
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowRadius: 3,
        elevation: 1,
    },
    iconWrapper: {
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 8,
    },
    actionText: { color: "#071D6A", fontWeight: "600", fontSize: 14 },
    eventCard: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 14,
        backgroundColor: "#ffffff",
        marginBlock: 10,
        height: 120
    },
    eventTitle: { fontSize: 16, fontWeight: "400", color: "#000c3a" },
    eventDate: { fontSize: 12, color: "#666", fontWeight: "300", },
    analyticsContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 16,
        marginBottom: 30,
    },
    analyticsCard: {
        backgroundColor: "#C7D2FE",
        borderRadius: 14,
        paddingVertical: 20,
        alignItems: "center",
        width: "30%",
    },
    analyticsValue: { fontSize: 22, fontWeight: "700", color: "#203499" },
    analyticsLabel: { fontSize: 12, color: "#555" },
    greetingContainer: {
        backgroundColor: "#000c3a", // primary color
        borderRadius: 0,
        padding: 20,
        marginBottom: 20,
        // marginTop: 5,
        height: 140,
    },
    greetingText: {
        fontSize: 14,
        color: "#E0E7FF",
        marginBottom: 4,
    },
    userName: {
        fontSize: 28,
        fontWeight: "900",
        color: "#ffffff",
        marginBottom: 4,
    },
    headerName: {
        fontSize: 20,
        fontWeight: "900",
        color: "#ffffff",
        marginBottom: 4,
    },
    userEmail: {
        fontSize: 14,
        color: "#E0E7FF",
        marginBottom: 2,
        fontWeight: "300"
    },
    userDetails: {
        fontSize: 13,
        color: "#C7D2FE",
        marginTop: 10,
        fontWeight: "300"
    },
    // --- MODAL STYLES (New) ---
    modalUserInfo: {
        alignItems: 'center',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        marginBottom: 15,
    },
    modalAvatar: {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginBottom: 10,
        backgroundColor: '#C7D2FE',
    },
    modalUserName: {
        fontSize: 22,
        fontWeight: '700',
        color: '#ffffff',
    },
    modalUserDetail: {
        fontSize: 14,
        color: '#ffffff',
        marginTop: 4,
    },
    modalButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
        borderRadius: 10,
        backgroundColor: '#F3F4F6', // Light gray background
        marginBottom: 10,
        paddingHorizontal: 15,
    },
    modalButtonText: {
        marginLeft: 10,
        fontSize: 16,
        fontWeight: '600',
        color: '#000c3a',
    },
    signOutButton: {
        backgroundColor: '#FFEBEE', // Light red for sign out context
        marginTop: 10,
    },
    signOutButtonText: {
        color: '#FF6F61', // Red text
    },
    modalCloseButton: {
        marginTop: 20,
        paddingVertical: 10,
        alignItems: 'center',
    },
    modalCloseButtonText: {
        fontSize: 16,
        color: '#999',
    },
});