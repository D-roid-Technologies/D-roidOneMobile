import React, { useState, useRef, useEffect, useCallback, lazy, Suspense } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
    ActivityIndicator,
    Modal,
    Dimensions,
} from "react-native";
import { Shield, User } from "lucide-react-native";
import Toast from "react-native-toast-message";
import emailjs from "emailjs-com";
import type { Plan } from "../../utils/Types";
import { formatCurrency } from "../../utils/paystack";
import BottomSheetModal from "../../components/BottomSheetModal";
import { PaystackProvider, usePaystack } from "react-native-paystack-webview";
import { useDispatch } from "react-redux";
import { setTier, TierType } from "../../redux/slice/membershiptierslice";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

interface PaystackResponse {
    transactionRef?: string;
    status?: string;
    message?: string;
}

interface CheckoutPageProps {
    visible: boolean;
    selectedPlan?: Plan;
    onClose: () => void;
    onPaymentSuccess?: () => void;
    onPaymentInitiated?: () => void;
}

// Inner component to trigger transaction via hook
const AutoStartPaystack: React.FC<{
  amount: number;
  email: string;
  name: string;
  phone: string;
  reference: string;
  onSuccess: (res: any) => void;
  onCancel: () => void;
}> = ({ amount, email, name, phone, reference, onSuccess, onCancel }) => {
  const { popup } = usePaystack();
  const hasStarted = useRef(false);

  useEffect(() => {
    if (popup && !hasStarted.current) {
        hasStarted.current = true;
        popup.checkout({
            amount,
            email,
            reference,
            metadata: {
                custom_fields: [
                    {
                        display_name: "Name",
                        variable_name: "name",
                        value: name
                    },
                    {
                        display_name: "Phone Number",
                        variable_name: "phone",
                        value: phone
                    }
                ]
            },
            onSuccess,
            onCancel
        });
    }
  }, [popup, amount, email, name, phone, reference, onSuccess, onCancel]);

  return <ActivityIndicator size="large" color="#3B82F6" style={{ marginTop: 20 }} />;
};

// Paystack Component wrapper to handle the payment
const PaystackPayment: React.FC<{
    paystackKey: string;
    amount: number;
    email: string;
    name: string;
    phone: string;
    reference: string;
    onSuccess: (response: any) => void;
    onCancel: () => void;
}> = ({ paystackKey, amount, email, name, phone, reference, onSuccess, onCancel }) => {
    return (
        <View style={{ flex: 1 }}>
            <PaystackProvider 
                publicKey={paystackKey}
                onGlobalSuccess={(res) => onSuccess(res)}
                onGlobalCancel={() => onCancel()}
                defaultChannels={["card", "bank", "ussd", "mobile_money"]}
                currency="NGN"
            >
                <AutoStartPaystack 
                    amount={amount}
                    email={email}
                    name={name}
                    phone={phone}
                    reference={reference}
                    onSuccess={onSuccess}
                    onCancel={onCancel}
                />
            </PaystackProvider>
        </View>
    );
};

export const CheckoutPage: React.FC<CheckoutPageProps> = ({
    visible,
    selectedPlan,
    onClose,
    onPaymentSuccess,
    onPaymentInitiated,
}) => {
    const dispatch = useDispatch();
    const plan = selectedPlan || {
        id: "default",
        name: "Premium Tools Access",
        price: 3750,
        interval: "month",
        features: [
            "Access to all premium tools",
            "AI Background Remover",
            "Advanced PDF Editor",
            "Resume & CV Analyzer",
            "Code Complexity Analyzer",
            "Bulk Image Watermarker",
            "Priority support",
        ],
    };

    const SERVICE_ID = "service_o1jbklr";
    const TEMPLATE_ID = "template_p8h58ur";
    const PUBLIC_KEY = "hcj3DsJ8MfNfUrE8J";
    const PAYSTACK_PUBLIC_KEY = "pk_test_db0145199289f83c428d57cf70755142bb0b8b28";
    // const PAYSTACK_PUBLIC_KEY = "pk_live_d2b967eddda456841f504b85549767fc33cc9fd4";

    const [customerInfo, setCustomerInfo] = useState({
        name: "",
        email: "",
        phone: "",
    });

    const [isFormSubmitted, setIsFormSubmitted] = useState(false);
    const [referenceNumber, setReferenceNumber] = useState<string>("");
    const [showPaystackModal, setShowPaystackModal] = useState(false);

    // Debug logging
    useEffect(() => {
        console.log("=== CheckoutPage State ===");
        console.log("Visible:", visible);
        console.log("Selected Plan:", selectedPlan?.name);
        console.log("Form Submitted:", isFormSubmitted);
    }, [visible, selectedPlan, isFormSubmitted]);

    const handleInputChange = (field: string, value: string) => {
        setCustomerInfo(prev => ({
            ...prev,
            [field]: value,
        }));
    };

    const isFormValid = Boolean(
        customerInfo.name.trim() && 
        customerInfo.email.trim() && 
        customerInfo.phone.trim()
    );

    const generateReferenceNumber = (): string => {
        const prefix = "PT";
        const timestamp = Date.now().toString(36);
        const random = Math.random().toString(36).substring(2, 8).toUpperCase();
        return `${prefix}-${timestamp}-${random}`;
    };

    const isValidEmail = (email: string): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleValidateAndProceed = () => {
        console.log("=== Validate Form Clicked ===");

        if (!customerInfo.name.trim()) {
            Toast.show({
                type: "error",
                text1: "Missing Information",
                text2: "Please enter your full name",
            });
            return;
        }

        if (!customerInfo.email.trim() || !isValidEmail(customerInfo.email.trim())) {
            Toast.show({
                type: "error",
                text1: "Invalid Email",
                text2: "Please enter a valid email address",
            });
            return;
        }

        if (!customerInfo.phone.trim()) {
            Toast.show({
                type: "error",
                text1: "Missing Information",
                text2: "Please enter your phone number",
            });
            return;
        }

        const newRef = generateReferenceNumber();
        console.log("Generated Reference:", newRef);
        
        setReferenceNumber(newRef);
        setIsFormSubmitted(true);
        
        // Open Paystack in a separate modal
        setShowPaystackModal(true);

        if (onPaymentInitiated) {
            onPaymentInitiated();
        }
    };

    const handlePaymentSuccess = useCallback(async (response: PaystackResponse) => {
        console.log("=== Payment Success ===", response);

        setShowPaystackModal(false);

        const templateParams = {
            name: customerInfo.name,
            title: `Thank You for Your Purchase!

Your subscription to ${plan.name} has been successfully activated.

Your Details:
• Name: ${customerInfo.name}
• Email: ${customerInfo.email}
• Phone: ${customerInfo.phone}
• Plan: ${plan.name}
• Amount Paid: ${formatCurrency(plan.price)}
• Reference: ${referenceNumber}

Thank you for choosing us!`,
            email: customerInfo.email,
        };

        // Upgrade user tier based on plan immediately after payment success
        let newTier: TierType = "Silver";
        if (plan.name.toLowerCase().includes("premium")) {
            newTier = "Premium";
        } else if (plan.name.toLowerCase().includes("gold")) {
            newTier = "Gold";
        }
        
        console.log(`Upgrading user to ${newTier} tier`);
        dispatch(setTier(newTier));

        try {
            await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY);
            
            Toast.show({
                type: "success",
                text1: "Payment Successful!",
                text2: `Welcome ${customerInfo.name}! You are now a ${newTier} member.`,
                visibilityTime: 4000,
            });
        } catch (error) {
            console.error("Email error:", error);
            // Show success toast even if email fails, as payment and upgrade succeeded
            Toast.show({
                type: "success",
                text1: "Payment Successful!",
                text2: `Welcome ${customerInfo.name}! You are now a ${newTier} member. (Email confirmation failed)`,
                visibilityTime: 4000,
            });
            // We don't re-throw because the core value (upgrade) is delivered
        }

        if (onPaymentSuccess) {
            onPaymentSuccess();
        }

        // Reset state
        setCustomerInfo({ name: "", email: "", phone: "" });
        setIsFormSubmitted(false);
        setReferenceNumber("");

        setTimeout(() => {
            onClose();
        }, 2000);
    }, [customerInfo, plan, referenceNumber, onPaymentSuccess, onClose]);

    const handlePaymentCancel = useCallback(() => {
        console.log("=== Payment Cancelled ===");
        
        setShowPaystackModal(false);
        
        Toast.show({
            type: "error",
            text1: "Payment Cancelled",
            text2: "You cancelled the payment",
        });

        setIsFormSubmitted(false);
        setReferenceNumber("");
    }, []);

    const handleClose = () => {
        setCustomerInfo({ name: "", email: "", phone: "" });
        setIsFormSubmitted(false);
        setReferenceNumber("");
        setShowPaystackModal(false);
        onClose();
    };

    // Reset state when modal visibility changes
    useEffect(() => {
        if (!visible) {
            setIsFormSubmitted(false);
            setReferenceNumber("");
            setShowPaystackModal(false);
        }
    }, [visible]);

    return (
        <>
            <BottomSheetModal
                visible={visible}
                onClose={handleClose}
                maxHeight={Platform.OS === "ios" ? 700 : 650}
                showHandle={true}
            >
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                >
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={styles.scrollContent}
                        keyboardShouldPersistTaps="handled"
                    >
                        <Text style={styles.mainTitle}>Complete Your Order</Text>

                        {/* Order Summary */}
                        <View style={styles.card}>
                            <Text style={styles.cardTitle}>Order Summary</Text>

                            <View style={styles.orderItem}>
                                <Text style={styles.orderItemName}>{plan.name}</Text>
                                <Text style={styles.orderItemPrice}>
                                    {formatCurrency(plan.price)}
                                </Text>
                            </View>
                            <Text style={styles.billingInterval}>
                                Billed {plan.interval}ly
                            </Text>

                            <View style={styles.divider} />

                            <View style={styles.total}>
                                <Text style={styles.totalLabel}>Total</Text>
                                <Text style={styles.totalAmount}>
                                    {formatCurrency(plan.price)}
                                </Text>
                            </View>

                            <View style={styles.guarantees}>
                                <Text style={styles.guaranteeText}>✓ 30-day money-back guarantee</Text>
                                <Text style={styles.guaranteeText}>✓ Instant account activation</Text>
                                <Text style={styles.guaranteeText}>✓ 24/7 customer support</Text>
                            </View>
                        </View>

                        {/* Customer Information Form */}
                        <View style={styles.formSection}>
                            <View style={styles.sectionHeader}>
                                <User size={20} color="#fff" />
                                <Text style={styles.sectionTitle}>Your Information</Text>
                            </View>

                            <TextInput
                                style={styles.input}
                                placeholder="Full Name *"
                                placeholderTextColor="#666"
                                value={customerInfo.name}
                                onChangeText={(value) => handleInputChange("name", value)}
                                autoCorrect={false}
                            />

                            <TextInput
                                style={styles.input}
                                placeholder="Email Address *"
                                placeholderTextColor="#666"
                                keyboardType="email-address"
                                autoCapitalize="none"
                                autoCorrect={false}
                                value={customerInfo.email}
                                onChangeText={(value) => handleInputChange("email", value)}
                            />

                            <TextInput
                                style={styles.input}
                                placeholder="Phone Number *"
                                placeholderTextColor="#666"
                                keyboardType="phone-pad"
                                value={customerInfo.phone}
                                onChangeText={(value) => handleInputChange("phone", value)}
                            />
                        </View>

                        {/* Payment Section */}
                        <View style={styles.formSection}>
                            <View style={styles.sectionHeader}>
                                <Shield size={20} color="#fff" />
                                <Text style={styles.sectionTitle}>Payment</Text>
                            </View>

                            <View style={styles.paymentInfo}>
                                <Text style={styles.paymentInfoText}>
                                    Secure payment via Paystack
                                </Text>
                                <Text style={styles.paymentMethod}>
                                    Pay with: Card • Bank • USSD • Mobile Money
                                </Text>
                            </View>

                            {/* Proceed Button */}
                            <TouchableOpacity
                                style={[
                                    styles.proceedButton,
                                    !isFormValid && styles.proceedButtonDisabled,
                                ]}
                                onPress={handleValidateAndProceed}
                                disabled={!isFormValid}
                                activeOpacity={0.7}
                            >
                                <Text style={styles.proceedButtonText}>
                                    Pay {formatCurrency(plan.price)}
                                </Text>
                            </TouchableOpacity>
                        </View>

                        <Text style={styles.disclaimer}>
                            🔒 Secured by Paystack
                        </Text>
                    </ScrollView>
                </KeyboardAvoidingView>
            </BottomSheetModal>

            {/* Separate Modal for Paystack Payment */}
            <Modal
                visible={showPaystackModal}
                animationType="slide"
                transparent={false}
                onRequestClose={handlePaymentCancel}
            >
                <View style={styles.paystackModalContainer}>
                    <View style={styles.paystackHeader}>
                        <Text style={styles.paystackHeaderText}>Complete Payment</Text>
                        <TouchableOpacity 
                            onPress={handlePaymentCancel}
                            style={styles.cancelButton}
                        >
                            <Text style={styles.cancelButtonText}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                    
                    {referenceNumber ? (
                        <View style={styles.paystackContent}>
                            <PaystackPayment
                                paystackKey={PAYSTACK_PUBLIC_KEY}
                                amount={plan.price * 100}
                                email={customerInfo.email.trim()}
                                name={customerInfo.name.trim()}
                                phone={customerInfo.phone.trim()}
                                reference={referenceNumber}
                                onSuccess={handlePaymentSuccess}
                                onCancel={handlePaymentCancel}
                            />
                            
                            <Text style={styles.paystackInstructions}>
                                Tap the button above to proceed with payment
                            </Text>
                        </View>
                    ) : (
                        <View style={styles.loadingContainer}>
                            <ActivityIndicator size="large" color="#3B82F6" />
                            <Text style={styles.loadingText}>Preparing payment...</Text>
                        </View>
                    )}
                </View>
            </Modal>
        </>
    );
};

const styles = StyleSheet.create({
    scrollContent: {
        paddingBottom: 40,
    },
    mainTitle: {
        fontSize: 22,
        fontWeight: "700",
        color: "#fff",
        marginBottom: 20,
    },
    card: {
        backgroundColor: "#1a1a2e",
        padding: 16,
        borderRadius: 12,
        marginBottom: 20,
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: "700",
        color: "#fff",
        marginBottom: 12,
    },
    orderItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 4,
    },
    orderItemName: {
        fontSize: 16,
        color: "#fff",
        fontWeight: "600",
    },
    orderItemPrice: {
        fontSize: 16,
        color: "#34D399",
        fontWeight: "700",
    },
    billingInterval: {
        fontSize: 13,
        color: "#888",
    },
    divider: {
        height: 1,
        backgroundColor: "#333",
        marginVertical: 12,
    },
    total: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    totalLabel: {
        fontSize: 16,
        fontWeight: "700",
        color: "#fff",
    },
    totalAmount: {
        fontSize: 18,
        fontWeight: "700",
        color: "#34D399",
    },
    guarantees: {
        marginTop: 12,
    },
    guaranteeText: {
        fontSize: 12,
        color: "#888",
        marginBottom: 2,
    },
    formSection: {
        marginBottom: 20,
    },
    sectionHeader: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 12,
        gap: 8,
    },
    sectionTitle: {
        fontSize: 15,
        fontWeight: "600",
        color: "#fff",
    },
    input: {
        backgroundColor: "#1a1a2e",
        borderWidth: 1,
        borderColor: "#333",
        borderRadius: 10,
        padding: 14,
        fontSize: 16,
        color: "#fff",
        marginBottom: 12,
    },
    paymentInfo: {
        backgroundColor: "#1a1a2e",
        padding: 14,
        borderRadius: 10,
        marginBottom: 16,
    },
    paymentInfoText: {
        fontSize: 14,
        color: "#ccc",
        marginBottom: 6,
    },
    paymentMethod: {
        fontSize: 13,
        color: "#888",
    },
    proceedButton: {
        backgroundColor: "#34D399",
        padding: 16,
        borderRadius: 12,
        alignItems: "center",
    },
    proceedButtonDisabled: {
        backgroundColor: "#1a1a2e",
        opacity: 0.5,
    },
    proceedButtonText: {
        fontSize: 16,
        fontWeight: "700",
        color: "#fff",
    },
    disclaimer: {
        fontSize: 12,
        color: "#666",
        textAlign: "center",
        marginTop: 8,
    },
    // Paystack Modal Styles
    paystackModalContainer: {
        flex: 1,
        backgroundColor: "#000105",
    },
    paystackHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 16,
        paddingTop: Platform.OS === "ios" ? 60 : 16,
        backgroundColor: "#0a0a1a",
        borderBottomWidth: 1,
        borderBottomColor: "#1a1a2e",
    },
    paystackHeaderText: {
        fontSize: 18,
        fontWeight: "700",
        color: "#fff",
    },
    cancelButton: {
        padding: 8,
    },
    cancelButtonText: {
        color: "#ff6b6b",
        fontSize: 16,
        fontWeight: "600",
    },
    paystackContent: {
        flex: 1,
        padding: 20,
        justifyContent: "center",
        alignItems: "center",
    },
    paystackInstructions: {
        marginTop: 20,
        color: "#888",
        fontSize: 14,
        textAlign: "center",
    },
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    loadingText: {
        marginTop: 12,
        color: "#888",
        fontSize: 14,
    },
});

export default CheckoutPage;