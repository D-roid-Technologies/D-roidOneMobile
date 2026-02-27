import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
  StatusBar,
  Platform,
} from "react-native";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useSelector } from "react-redux";

// ─── Types ────────────────────────────────────────────────
interface RouteParams {
  event: any;
  isRegistered: boolean;
  registrationData?: any;
}

// ─── Chess milestone data ─────────────────────────────────
const CHESS_MILESTONES = [
  {
    phase: "Pre-Tournament",
    icon: "📋",
    color: "#3B82F6",
    steps: [
      {
        title: "Registration Confirmed",
        desc: "Your spot on the board is locked in. Check your email for your player ID and tournament link.",
        done: true,
      },
      {
        title: "Platform Setup",
        desc: "Create or connect your Chess.com / Lichess account. The official platform link will be emailed to you 3 days before the event.",
        done: false,
      },
      {
        title: "Bracket Assignment",
        desc: "You'll be assigned to your tier bracket (Elite, Challenger, or Rising Star) based on your submitted ELO rating.",
        done: false,
      },
    ],
  },
  {
    phase: "Day 1 – March 15",
    icon: "⚔️",
    color: "#F59E0B",
    steps: [
      {
        title: "Opening Ceremony & Orientation",
        desc: "10:00 AM – Live stream briefing. Tournament rules, format explanation, and introductions. Attendance is mandatory.",
        done: false,
      },
      {
        title: "Round 1 & 2 – Group Stage",
        desc: "12:00 PM – First matches begin. Each player competes in 2 rounds. Results are tracked on the live leaderboard.",
        done: false,
      },
    ],
  },
  {
    phase: "Day 2 – March 16",
    icon: "♟",
    color: "#8B5CF6",
    steps: [
      {
        title: "Round 3 & 4 – Elimination Stage",
        desc: "Players with fewer than 2 wins are eliminated. Remaining players advance to Round 4. The pressure intensifies.",
        done: false,
      },
      {
        title: "Blitz Special Round",
        desc: "Optional 5-minute blitz round open to all eliminated players. Winners earn a consolation prize and recognition.",
        done: false,
      },
    ],
  },
  {
    phase: "Day 3 – March 17",
    icon: "👑",
    color: "#10B981",
    steps: [
      {
        title: "Semi-Finals",
        desc: "Top 4 players per tier face off in the semi-finals. Matches are streamed live. Every move is watched.",
        done: false,
      },
      {
        title: "Grand Finals",
        desc: "The top 2 players in each tier compete for the championship title. The winner of the Elite tier represents Nigeria in the Pan-African Chess Invitational.",
        done: false,
      },
      {
        title: "Prize Ceremony & Closing",
        desc: "Cash prizes, digital trophies, and national ranking points are awarded. Winners are announced live.",
        done: false,
      },
    ],
  },
];

// ─── DevDive milestone data ───────────────────────────────
const DEVDIVE_MILESTONES = [
  {
    phase: "Week 1 – Onboarding",
    icon: "🚀",
    color: "#3B82F6",
    steps: [
      {
        title: "Application Accepted",
        desc: "Congratulations! Your application has been reviewed and accepted. Welcome to the DevDive family.",
        done: true,
      },
      {
        title: "Orientation & Team Introduction",
        desc: "Meet your cohort, mentors, and the D'roid Technologies team. Receive your intern handbook and communication channels (Slack, GitHub, Notion).",
        done: false,
      },
      {
        title: "Dev Environment Setup",
        desc: "Set up your local development environment. Install required tools: VS Code, Git, Node.js, and any project-specific dependencies.",
        done: false,
      },
    ],
  },
  {
    phase: "Week 2–3 – Foundation Sprint",
    icon: "🧱",
    color: "#F59E0B",
    steps: [
      {
        title: "Codebase Walkthrough",
        desc: "Deep dive into the existing D'roid Technologies codebase. Understand the architecture, naming conventions, and component structure.",
        done: false,
      },
      {
        title: "First Task Assignment",
        desc: "Receive your first real ticket from the project board. Tasks are scoped for learning but are shipped to production.",
        done: false,
      },
      {
        title: "Code Review Process",
        desc: "Submit your first pull request. Learn the team's review process, how to respond to feedback, and the merge workflow.",
        done: false,
      },
    ],
  },
  {
    phase: "Week 2–3 – Active Development",
    icon: "💻",
    color: "#8B5CF6",
    steps: [
      {
        title: "Feature Development",
        desc: "Build and ship 2–3 features independently. You'll work on real user-facing functionality with mentor oversight.",
        done: false,
      },
      {
        title: "Daily Standups",
        desc: "Participate in async or live daily standups. Share blockers, progress, and plans. Communication is a core skill here.",
        done: false,
      },
      {
        title: "Peer Collaboration Session",
        desc: "Pair program with a fellow intern or senior developer. Collaborative problem-solving is a key part of the DevDive experience.",
        done: false,
      },
    ],
  },
  {
    phase: "Week 4 – Wrap Up & Showcase",
    icon: "🎓",
    color: "#10B981",
    steps: [
      {
        title: "Final Project Submission",
        desc: "Package and document your contributions. Submit a brief write-up of what you built, the challenges you faced, and how you solved them.",
        done: false,
      },
      {
        title: "Demo Day",
        desc: "Present your work to the D'roid Technologies team and fellow interns. Clear and confident communication of your output is expected.",
        done: false,
      },
      {
        title: "Certificate & Portfolio Entry",
        desc: "Receive your DevDive completion certificate. Your contributions are documented as part of your official portfolio. Strong performers may receive a full-time offer.",
        done: false,
      },
    ],
  },
];

const CHESS_PRIZES = [
  {
    place: "1st",
    icon: "🥇",
    amount: "₦50,000",
    extra: "Pan-African Invitational Slot",
  },
  {
    place: "2nd",
    icon: "🥈",
    amount: "₦25,000",
    extra: "Digital Trophy + Ranking Points",
  },
  {
    place: "3rd",
    icon: "🥉",
    amount: "₦10,000",
    extra: "Certificate of Excellence",
  },
];

const DEVDIVE_PERKS = [
  {
    icon: "💼",
    title: "Real Work Experience",
    desc: "Ship to production, not sandboxes",
  },
  { icon: "🧑‍🏫", title: "Dedicated Mentor", desc: "1-on-1 guidance every week" },
  {
    icon: "📜",
    title: "Official Certificate",
    desc: "Recognised by D'roid Technologies",
  },
  {
    icon: "🌐",
    title: "Portfolio Projects",
    desc: "Live products you can reference",
  },
  { icon: "💰", title: "Full-time Potential", desc: "Top interns get offers" },
  { icon: "🤝", title: "Industry Network", desc: "Connect with professionals" },
];

// ─── Not Registered Screen ────────────────────────────────
const NotRegisteredView: React.FC<{ event: any; onRegister: () => void }> = ({
  event,
  onRegister,
}) => {
  const isChess = event?.id === 25;

  return (
    <View style={styles.notRegisteredContainer}>
      <View
        style={[
          styles.notRegisteredIcon,
          { backgroundColor: isChess ? "#000c3a" : "#EEF2FF" },
        ]}
      >
        <Text style={{ fontSize: 52 }}>{isChess ? "♟" : "💻"}</Text>
      </View>
      <Text style={styles.notRegisteredTitle}>You're Not Registered Yet</Text>
      <Text style={styles.notRegisteredSubtitle}>
        {isChess
          ? "Register for Checkmate Online to unlock your tournament roadmap, tier placement, and match schedule."
          : "Apply for DevDive to unlock your full internship roadmap, weekly tasks, and mentor assignments."}
      </Text>

      <View style={styles.notRegisteredCard}>
        <Ionicons name="information-circle-outline" size={20} color="#3B82F6" />
        <Text style={styles.notRegisteredCardText}>
          {isChess
            ? "Registration is free for players under 18. Limited spots available."
            : "DevDive is a free, tuition-free internship program. Apply early — cohort size is limited."}
        </Text>
      </View>

      <TouchableOpacity
        style={[styles.registerCTA, isChess && styles.chessCTA]}
        onPress={onRegister}
      >
        <Text style={styles.registerCTAText}>
          {isChess ? "♟  Register for Championship" : "Apply for DevDive"}
        </Text>
        <Ionicons name="arrow-forward" size={18} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

// ─── Main Screen ──────────────────────────────────────────
const EventProgressScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const route = useRoute();
  // // Route params — only event object is used. Registration status is always
  // re-derived live from Redux to avoid stale closure/navigation param issues.
  const { event } = route.params as RouteParams;

  // Always read registration status LIVE from Redux — never trust route params.
  // Fix: route params can be stale if the user registers then navigates here immediately.
  // Change this in both files:
  const registeredEvents = useSelector(
    (state: any) => state.droidevents?.registeredEvents || [],
  );

  // const registeredEvents = useSelector(
  //   (state: any) => state.events?.registeredEvents || [],
  // );
  const liveRegistered = registeredEvents.some((e: any) => e.id === event?.id);
  const liveRegistrationDataRaw =
    registeredEvents.find((e: any) => e.id === event?.id)?.registrationData ??
    null;
  const liveRegistrationData = liveRegistrationDataRaw;

  const isChess = event?.id === 25;
  const isDevDive = event?.id === 24;
  const milestones = isChess ? CHESS_MILESTONES : DEVDIVE_MILESTONES;
  const accentColor = isChess ? "#000c3a" : "#203499";

  const handleRegisterRedirect = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={accentColor}
        translucent={false}
      />

      {/* ── Header ── */}
      <View style={[styles.header, { backgroundColor: accentColor }]}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backBtn}
        >
          <Ionicons name="chevron-back" size={26} color="#ffffff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>
          {isChess ? "♟ Championship Hub" : "DevDive Portal"}
        </Text>
        <View style={{ width: 36 }} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* ── Hero card ── */}
        <View style={[styles.heroCard, { backgroundColor: accentColor }]}>
          <Text style={styles.heroEmoji}>{isChess ? "♟" : "💻"}</Text>
          <Text style={styles.heroTitle}>
            {isChess ? "Checkmate Online 2026" : "DevDive Internship Program"}
          </Text>
          <Text style={styles.heroDate}>{event?.date}</Text>

          {liveRegistered ? (
            <View style={styles.registeredPill}>
              <Ionicons name="checkmark-circle" size={16} color="#10B981" />
              <Text style={styles.registeredPillText}>
                {isChess ? "Registered Player" : "Active Intern"}
              </Text>
            </View>
          ) : (
            <View style={styles.unregisteredPill}>
              <Ionicons name="alert-circle-outline" size={16} color="#F59E0B" />
              <Text style={styles.unregisteredPillText}>Not Registered</Text>
            </View>
          )}
        </View>

        {/* ── NOT REGISTERED STATE ── */}
        {!liveRegistered && (
          <NotRegisteredView
            event={event}
            onRegister={handleRegisterRedirect}
          />
        )}

        {/* ── REGISTERED STATE ── */}
        {liveRegistered && (
          <>
            {/* Welcome banner */}
            <View style={styles.welcomeBanner}>
              <Text style={styles.welcomeTitle}>
                {isChess
                  ? "Welcome to the Championship!"
                  : "Welcome to DevDive!"}
              </Text>
              <Text style={styles.welcomeSubtitle}>
                {isChess
                  ? "Your player profile is active. Below is your full tournament roadmap — every phase, every round, every prize."
                  : "Your internship journey starts here. Below is your complete DevDive roadmap — every phase, every task, every milestone."}
              </Text>
            </View>

            {/* Registration summary pill row */}
            {liveRegistrationData && (
              <View style={styles.summaryRow}>
                {isChess && liveRegistrationData.chessTier && (
                  <View
                    style={[styles.summaryPill, { backgroundColor: "#FEF3C7" }]}
                  >
                    <Text
                      style={[styles.summaryPillText, { color: "#92400E" }]}
                    >
                      {liveRegistrationData.chessTier === "Elite"
                        ? "♛ Elite"
                        : liveRegistrationData.chessTier === "Challenger"
                          ? "♜ Challenger"
                          : "♞ Rising Star"}
                    </Text>
                  </View>
                )}
                {isChess && liveRegistrationData.chessPreferredFormat && (
                  <View
                    style={[styles.summaryPill, { backgroundColor: "#EEF2FF" }]}
                  >
                    <Text
                      style={[styles.summaryPillText, { color: "#3730A3" }]}
                    >
                      {liveRegistrationData.chessPreferredFormat} Format
                    </Text>
                  </View>
                )}
                {isDevDive && liveRegistrationData.fieldOfInterest && (
                  <View
                    style={[styles.summaryPill, { backgroundColor: "#EEF2FF" }]}
                  >
                    <Text
                      style={[styles.summaryPillText, { color: "#3730A3" }]}
                    >
                      {liveRegistrationData.fieldOfInterest}
                    </Text>
                  </View>
                )}
                {isDevDive && liveRegistrationData.experienceLevel && (
                  <View
                    style={[styles.summaryPill, { backgroundColor: "#F0FDF4" }]}
                  >
                    <Text
                      style={[styles.summaryPillText, { color: "#166534" }]}
                    >
                      {liveRegistrationData.experienceLevel}
                    </Text>
                  </View>
                )}
              </View>
            )}

            {/* ── Milestones / Roadmap ── */}
            <Text style={styles.sectionLabel}>
              {isChess ? "Tournament Roadmap" : "Internship Roadmap"}
            </Text>

            {milestones.map((phase, pIdx) => (
              <View key={pIdx} style={styles.phaseBlock}>
                {/* Phase header */}
                <View
                  style={[styles.phaseHeader, { borderLeftColor: phase.color }]}
                >
                  <Text style={styles.phaseIcon}>{phase.icon}</Text>
                  <Text style={[styles.phaseTitle, { color: phase.color }]}>
                    {phase.phase}
                  </Text>
                </View>

                {/* Steps */}
                {phase.steps.map((step, sIdx) => (
                  <View key={sIdx} style={styles.stepRow}>
                    {/* Timeline dot */}
                    <View style={styles.timelineCol}>
                      <View
                        style={[
                          styles.timelineDot,
                          step.done
                            ? {
                                backgroundColor: "#10B981",
                                borderColor: "#10B981",
                              }
                            : {
                                backgroundColor: "#fff",
                                borderColor: "#D1D5DB",
                              },
                        ]}
                      >
                        {step.done && (
                          <Ionicons name="checkmark" size={10} color="#fff" />
                        )}
                      </View>
                      {sIdx < phase.steps.length - 1 && (
                        <View style={styles.timelineLine} />
                      )}
                    </View>

                    {/* Content */}
                    <View
                      style={[
                        styles.stepCard,
                        step.done && styles.stepCardDone,
                      ]}
                    >
                      <Text
                        style={[
                          styles.stepTitle,
                          step.done && styles.stepTitleDone,
                        ]}
                      >
                        {step.title}
                        {step.done && (
                          <Text style={styles.doneTag}> ✓ Complete</Text>
                        )}
                      </Text>
                      <Text style={styles.stepDesc}>{step.desc}</Text>
                    </View>
                  </View>
                ))}
              </View>
            ))}

            {/* ── Prizes / Perks section ── */}
            {isChess && (
              <>
                <Text style={styles.sectionLabel}>Prizes</Text>
                {CHESS_PRIZES.map((prize, i) => (
                  <View key={i} style={styles.prizeRow}>
                    <Text style={styles.prizeIcon}>{prize.icon}</Text>
                    <View style={styles.prizeContent}>
                      <Text style={styles.prizePlace}>{prize.place} Place</Text>
                      <Text style={styles.prizeAmount}>{prize.amount}</Text>
                      <Text style={styles.prizeExtra}>{prize.extra}</Text>
                    </View>
                  </View>
                ))}
              </>
            )}

            {isDevDive && (
              <>
                <Text style={styles.sectionLabel}>What You'll Get</Text>
                <View style={styles.perksGrid}>
                  {DEVDIVE_PERKS.map((perk, i) => (
                    <View key={i} style={styles.perkCard}>
                      <Text style={styles.perkIcon}>{perk.icon}</Text>
                      <Text style={styles.perkTitle}>{perk.title}</Text>
                      <Text style={styles.perkDesc}>{perk.desc}</Text>
                    </View>
                  ))}
                </View>
              </>
            )}

            {/* ── Important info card ── */}
            <View style={[styles.infoCard, { borderLeftColor: accentColor }]}>
              <Ionicons
                name="information-circle"
                size={22}
                color={accentColor}
              />
              <Text style={styles.infoCardText}>
                {isChess
                  ? "Your match schedule, tournament platform link, and opponent assignments will be sent to your registered email 48 hours before the event begins."
                  : "Your mentor assignment, Slack workspace invite, and first task brief will be sent to your registered email before Week 1 begins. Keep an eye on your inbox."}
              </Text>
            </View>
          </>
        )}
      </ScrollView>
    </View>
  );
};

export default EventProgressScreen;

// ─── Styles ───────────────────────────────────────────────
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0A0A1A",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 16,
    paddingTop: Platform.OS === "ios" ? 54 : 16,
  },
  backBtn: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#ffffff",
  },
  scrollContent: {
    paddingBottom: 60,
  },
  // Hero
  heroCard: {
    paddingVertical: 32,
    paddingHorizontal: 24,
    alignItems: "center",
  },
  heroEmoji: {
    fontSize: 52,
    marginBottom: 10,
  },
  heroTitle: {
    fontSize: 22,
    fontWeight: "900",
    color: "#ffffff",
    textAlign: "center",
    marginBottom: 6,
  },
  heroDate: {
    fontSize: 13,
    color: "#C7D2FE",
    marginBottom: 16,
    fontWeight: "500",
  },
  registeredPill: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#022C22",
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 14,
    gap: 6,
    borderWidth: 1,
    borderColor: "#10B981",
  },
  registeredPillText: {
    color: "#10B981",
    fontWeight: "700",
    fontSize: 13,
  },
  unregisteredPill: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1C1500",
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 14,
    gap: 6,
    borderWidth: 1,
    borderColor: "#F59E0B",
  },
  unregisteredPillText: {
    color: "#F59E0B",
    fontWeight: "700",
    fontSize: 13,
  },
  // Not registered
  notRegisteredContainer: {
    margin: 20,
    alignItems: "center",
    paddingVertical: 16,
  },
  notRegisteredIcon: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  notRegisteredTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: "#ffffff",
    marginBottom: 10,
    textAlign: "center",
  },
  notRegisteredSubtitle: {
    fontSize: 14,
    color: "#9CA3AF",
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 20,
    paddingHorizontal: 8,
  },
  notRegisteredCard: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "#1E1E3F",
    borderRadius: 12,
    padding: 14,
    gap: 10,
    marginBottom: 28,
    width: "100%",
  },
  notRegisteredCardText: {
    flex: 1,
    fontSize: 13,
    color: "#C7D2FE",
    lineHeight: 20,
  },
  registerCTA: {
    backgroundColor: "#203499",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 14,
    gap: 10,
    width: "100%",
  },
  chessCTA: {
    backgroundColor: "#000c3a",
  },
  registerCTAText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
  // Registered
  welcomeBanner: {
    backgroundColor: "#1E1E3F",
    margin: 16,
    borderRadius: 16,
    padding: 20,
  },
  welcomeTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: "#ffffff",
    marginBottom: 8,
  },
  welcomeSubtitle: {
    fontSize: 14,
    color: "#C7D2FE",
    lineHeight: 22,
  },
  summaryRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  summaryPill: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 20,
  },
  summaryPillText: {
    fontSize: 13,
    fontWeight: "700",
  },
  sectionLabel: {
    fontSize: 18,
    fontWeight: "800",
    color: "#ffffff",
    paddingHorizontal: 16,
    marginTop: 24,
    marginBottom: 12,
  },
  // Milestone / Roadmap
  phaseBlock: {
    marginHorizontal: 16,
    marginBottom: 8,
  },
  phaseHeader: {
    flexDirection: "row",
    alignItems: "center",
    borderLeftWidth: 3,
    paddingLeft: 10,
    marginBottom: 14,
    gap: 8,
  },
  phaseIcon: {
    fontSize: 20,
  },
  phaseTitle: {
    fontSize: 15,
    fontWeight: "800",
  },
  stepRow: {
    flexDirection: "row",
    marginBottom: 4,
  },
  timelineCol: {
    width: 28,
    alignItems: "center",
  },
  timelineDot: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 14,
  },
  timelineLine: {
    width: 2,
    flex: 1,
    backgroundColor: "#2D2D4E",
    marginTop: 2,
    marginBottom: 2,
    minHeight: 20,
  },
  stepCard: {
    flex: 1,
    backgroundColor: "#1E1E3F",
    borderRadius: 12,
    padding: 14,
    marginLeft: 8,
    marginBottom: 10,
  },
  stepCardDone: {
    backgroundColor: "#022C22",
    borderWidth: 1,
    borderColor: "#10B98130",
  },
  stepTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#E0E7FF",
    marginBottom: 6,
  },
  stepTitleDone: {
    color: "#10B981",
  },
  doneTag: {
    fontSize: 12,
    color: "#10B981",
    fontWeight: "600",
  },
  stepDesc: {
    fontSize: 13,
    color: "#9CA3AF",
    lineHeight: 20,
  },
  // Prizes
  prizeRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1E1E3F",
    borderRadius: 14,
    marginHorizontal: 16,
    marginBottom: 10,
    padding: 16,
    gap: 16,
  },
  prizeIcon: {
    fontSize: 36,
  },
  prizeContent: {
    flex: 1,
  },
  prizePlace: {
    fontSize: 13,
    color: "#9CA3AF",
    fontWeight: "600",
    marginBottom: 2,
  },
  prizeAmount: {
    fontSize: 22,
    fontWeight: "900",
    color: "#ffffff",
    marginBottom: 2,
  },
  prizeExtra: {
    fontSize: 12,
    color: "#C7D2FE",
  },
  // Perks grid
  perksGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 12,
    gap: 8,
  },
  perkCard: {
    width: "47%",
    backgroundColor: "#1E1E3F",
    borderRadius: 14,
    padding: 16,
    marginHorizontal: 4,
    marginBottom: 4,
  },
  perkIcon: {
    fontSize: 28,
    marginBottom: 8,
  },
  perkTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#E0E7FF",
    marginBottom: 4,
  },
  perkDesc: {
    fontSize: 12,
    color: "#9CA3AF",
    lineHeight: 18,
  },
  // Info card
  infoCard: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "#1E1E3F",
    borderRadius: 12,
    borderLeftWidth: 4,
    padding: 16,
    margin: 16,
    gap: 12,
  },
  infoCardText: {
    flex: 1,
    fontSize: 13,
    color: "#C7D2FE",
    lineHeight: 20,
  },
});
