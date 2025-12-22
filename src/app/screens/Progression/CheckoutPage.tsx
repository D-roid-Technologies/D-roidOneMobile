import React, { useState } from "react";
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
} from "react-native";
import { Shield, User } from "lucide-react-native";
import Paystack from "react-native-paystack-webview";
import Toast from "react-native-toast-message";
import emailjs from "emailjs-com";
import type { Plan } from "../../utils/Types";
import { formatCurrency } from "../../utils/paystack";
import BottomSheetModal from "../../components/BottomSheetModal";

interface CheckoutPageProps {
    visible: boolean;
    selectedPlan?: Plan;
    onClose: () => void;
    onPaymentSuccess?: () => void;
    onPaymentInitiated?: () => void;
}

export const CheckoutPage: React.FC<CheckoutPageProps> = ({
    visible,
    selectedPlan,
    onClose,
    onPaymentSuccess,
    onPaymentInitiated,
}) => {
    const plan = selectedPlan || {
        id: "default",
        name: "Premium Tools Access",
        price: 2999,
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
    const PAYSTACK_PUBLIC_KEY = "pk_live_d2b967eddda456841f504b85549767fc33cc9fd4";

    const [customerInfo, setCustomerInfo] = useState({
        name: "",
        email: "",
        phone: "",
    });

    const [isProcessing, setIsProcessing] = useState(false);
    const [referenceNumber, setReferenceNumber] = useState<string | null>(null);

    const handleInputChange = (field: string, value: string) => {
        setCustomerInfo({
            ...customerInfo,
            [field]: value,
        });
    };

    const isFormValid = customerInfo.name && customerInfo.email && customerInfo.phone;

    const generateReferenceNumber = (): string => {
        const prefix = "PT";
        const timestamp = Date.now().toString(36);
        const random = Math.random().toString(36).substring(2, 8).toUpperCase();
        return `${prefix}-${timestamp}-${random}`;
    };

    const handlePayment = () => {
        if (!customerInfo.email) {
            Toast.show({
                type: "error",
                text1: "Validation Error",
                text2: "Please enter a valid email!",
            });
            return;
        }

        const generatedRef = generateReferenceNumber();
        setReferenceNumber(generatedRef);

        // Log checkout form data
        console.log("=== CHECKOUT FORM DATA ===");
        console.log("Customer Info:", customerInfo);
        console.log("Selected Plan:", plan);
        console.log("Reference Number:", generatedRef);
        console.log("Amount (Kobo):", plan.price * 100);
        console.log("========================");

        if (onPaymentInitiated) {
            onPaymentInitiated();
        }

        setIsProcessing(true);
    };

    const handlePaymentSuccess = async (response: any) => {
        console.log("Payment success:", response);

        const templateParams = {
            name: customerInfo.name,
            title: `Thank You for Your Purchase!

Your subscription to ${plan.name} has been successfully activated. We're excited to have you on board!

Your Details:
• Name: ${customerInfo.name}
• Email: ${customerInfo.email}
• Phone: ${customerInfo.phone}
• Plan: ${plan.name}
• Amount Paid: ${formatCurrency(plan.price)}
• Reference: ${referenceNumber}

Your premium features are now available! Log in to access all the tools and features included in your plan.

If you have any questions or need assistance, our support team is available 24/7.

Thank you for choosing us!`,
            email: customerInfo.email,
        };

        try {
            await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY);
            Toast.show({
                type: "success",
                text1: "Payment Successful!",
                text2: `Welcome ${customerInfo.name}. Check your email for confirmation.`,
            });

            if (onPaymentSuccess) {
                onPaymentSuccess();
            }

            setCustomerInfo({
                name: "",
                email: "",
                phone: "",
            });

            // Close modal after success
            setTimeout(() => {
                onClose();
            }, 1500);
        } catch (error) {
            console.error("Error sending email:", error);
            Toast.show({
                type: "warning",
                text1: "Payment Successful",
                text2: "But we couldn't send the confirmation email. Please contact support.",
            });
        }

        setIsProcessing(false);
    };

    const handlePaymentCancel = () => {
        console.log("Payment cancelled");
        Toast.show({
            type: "error",
            text1: "Payment Cancelled",
            text2: "Your payment was cancelled.",
        });
        setIsProcessing(false);
    };

    return (
        <>
            <BottomSheetModal
                visible={visible}
                onClose={onClose}
                maxHeight={Platform.OS === "ios" ? 700 : 650}
                showHandle={true}
            >
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                    style={{ flex: 1 }}
                >
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={styles.scrollContent}
                    >
                        <Text style={styles.mainTitle}>Complete Your Order</Text>

                        {/* Order Summary */}
                        <View style={styles.card}>
                            <Text style={styles.cardTitle}>Order Summary</Text>

                            <View style={styles.orderSummary}>
                                <View style={styles.orderItem}>
                                    <Text style={styles.orderItemName}>{plan.name}</Text>
                                    <Text style={styles.orderItemPrice}>
                                        {formatCurrency(plan.price)}
                                    </Text>
                                </View>
                                <Text style={styles.billingInterval}>
                                    Billed {plan.interval}ly
                                </Text>
                            </View>

                            <View style={styles.divider} />

                            <View style={styles.total}>
                                <Text style={styles.totalLabel}>Total</Text>
                                <Text style={styles.totalAmount}>
                                    {formatCurrency(plan.price)}
                                </Text>
                            </View>

                            <View style={styles.guarantees}>
                                <Text style={styles.guaranteeText}>
                                    ✓ 30-day money-back guarantee
                                </Text>
                                <Text style={styles.guaranteeText}>
                                    ✓ Instant account activation
                                </Text>
                                <Text style={styles.guaranteeText}>✓ 24/7 customer support</Text>
                                <Text style={styles.guaranteeText}>
                                    ✓ Secure payment processing
                                </Text>
                            </View>
                        </View>

                        {/* Customer Information */}
                        <View style={styles.formSection}>
                            <View style={styles.sectionHeader}>
                                <User size={20} color="#fff" />
                                <Text style={styles.sectionTitle}>Customer Information</Text>
                            </View>

                            <TextInput
                                style={styles.input}
                                placeholder="Full Name"
                                placeholderTextColor="#888"
                                value={customerInfo.name}
                                onChangeText={(value) => handleInputChange("name", value)}
                            />

                            <TextInput
                                style={styles.input}
                                placeholder="Email Address"
                                placeholderTextColor="#888"
                                keyboardType="email-address"
                                autoCapitalize="none"
                                value={customerInfo.email}
                                onChangeText={(value) => handleInputChange("email", value)}
                            />

                            <TextInput
                                style={styles.input}
                                placeholder="Phone Number"
                                placeholderTextColor="#888"
                                keyboardType="phone-pad"
                                value={customerInfo.phone}
                                onChangeText={(value) => handleInputChange("phone", value)}
                            />
                        </View>

                        {/* Payment Information */}
                        <View style={styles.formSection}>
                            <View style={styles.sectionHeader}>
                                <Shield size={20} color="#fff" />
                                <Text style={styles.sectionTitle}>Payment Information</Text>
                            </View>

                            <View style={styles.paymentInfo}>
                                <Text style={styles.paymentInfoText}>
                                    Click the button below to proceed with secure payment via
                                    Paystack.
                                </Text>
                                <Text style={styles.paymentInfoText}>You can pay with:</Text>
                                <View style={styles.paymentMethods}>
                                    <Text style={styles.paymentMethod}>• Debit/Credit Card</Text>
                                    <Text style={styles.paymentMethod}>• Bank Transfer</Text>
                                    <Text style={styles.paymentMethod}>• USSD</Text>
                                    <Text style={styles.paymentMethod}>• Mobile Money</Text>
                                </View>
                            </View>
                        </View>

                        {/* Submit Button */}
                        <TouchableOpacity
                            style={[
                                styles.submitButton,
                                (!isFormValid || isProcessing) && styles.submitButtonDisabled,
                            ]}
                            onPress={handlePayment}
                            disabled={!isFormValid || isProcessing}
                        >
                            {isProcessing ? (
                                <View style={styles.processingContainer}>
                                    <ActivityIndicator color="#fff" size="small" />
                                    <Text style={styles.submitButtonText}>
                                        Initializing Payment...
                                    </Text>
                                </View>
                            ) : (
                                <Text style={styles.submitButtonText}>
                                    Proceed to Payment - {formatCurrency(plan.price)}
                                </Text>
                            )}
                        </TouchableOpacity>

                        <Text style={styles.disclaimer}>
                            🔒 Secured by Paystack. Your payment information is encrypted and
                            secure.
                        </Text>
                    </ScrollView>
                </KeyboardAvoidingView>
            </BottomSheetModal>

            {/* Paystack WebView - Only render when processing */}
            {isProcessing && referenceNumber && (
                <Paystack
                    paystackKey={PAYSTACK_PUBLIC_KEY}
                    amount={plan.price * 100}
                    billingEmail={customerInfo.email}
                    billingName={customerInfo.name}
                    billingMobile={customerInfo.phone}
                    channels={["card", "bank", "ussd", "mobile_money"]}
                    refNumber={referenceNumber}
                    onCancel={handlePaymentCancel}
                    onSuccess={handlePaymentSuccess}
                    autoStart={true}
                />
            )}
        </>
    );
};

const styles = StyleSheet.create({
    scrollContent: {
        paddingBottom: 20,
    },
    mainTitle: {
        fontSize: 24,
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
        fontSize: 18,
        fontWeight: "700",
        color: "#fff",
        marginBottom: 16,
    },
    orderSummary: {
        marginBottom: 12,
    },
    orderItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 8,
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
        fontSize: 14,
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
        marginBottom: 16,
    },
    totalLabel: {
        fontSize: 18,
        fontWeight: "700",
        color: "#fff",
    },
    totalAmount: {
        fontSize: 20,
        fontWeight: "700",
        color: "#34D399",
    },
    guarantees: {
        marginTop: 8,
    },
    guaranteeText: {
        fontSize: 13,
        color: "#888",
        marginBottom: 4,
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
        fontSize: 16,
        fontWeight: "600",
        color: "#fff",
    },
    input: {
        backgroundColor: "#1a1a2e",
        borderWidth: 1,
        borderColor: "#333",
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
        color: "#fff",
        marginBottom: 12,
    },
    paymentInfo: {
        backgroundColor: "#1a1a2e",
        padding: 12,
        borderRadius: 8,
    },
    paymentInfoText: {
        fontSize: 14,
        color: "#ccc",
        marginBottom: 8,
    },
    paymentMethods: {
        marginTop: 4,
    },
    paymentMethod: {
        fontSize: 14,
        color: "#888",
        marginBottom: 4,
    },
    submitButton: {
        backgroundColor: "#3B82F6",
        padding: 16,
        borderRadius: 12,
        alignItems: "center",
        marginTop: 8,
        marginBottom: 12,
    },
    submitButtonDisabled: {
        backgroundColor: "#555",
        opacity: 0.6,
    },
    submitButtonText: {
        fontSize: 16,
        fontWeight: "700",
        color: "#fff",
    },
    processingContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },
    disclaimer: {
        fontSize: 12,
        color: "#888",
        textAlign: "center",
    },
});
