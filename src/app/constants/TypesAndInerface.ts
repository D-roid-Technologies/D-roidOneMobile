export type UserType = {
    firstName: string;
    lastName: string;
    middleName: string;
    initials: string;
    userType: string;
    uniqueId: string;
    staffId: string;
    email: string;
    phone: string;
    agreeToPolicy: boolean;
    isLoggedIn: boolean;
    gender: string;
    dateOfBirth: string;
    disability: boolean;
    disabilityType: string;
    photoUrl: string;
    educationalLevel: string;
    referralName: string;
    secondaryEmail: string;
    securityQuestion: string;
    securityAnswer: string;
    verifiedEmail: boolean;
    verifyPhoneNumber: boolean;
    agreedToTerms: boolean;
    twoFactorSettings: boolean;
    password: string;
    role?: string;
    streetNumber: string;
    streetName: string;
    city: string;
    state: string;
    country: string;
    organisationalType: string;
    isCompanyRegistered: string;
    dateOfRegistration: string;
    skills: string[];
    certifications: string[];
    accessLevel: string;
    permissions: string[];
    notificationPreferences: {
        email: boolean;
    };

    // Essential fields for Staff Homepage
    position?: string;
    department?: string;
    employeeId?: string;
    joinDate?: string;

    // Optional performance metrics
    performanceScore?: number;
    attendanceRate?: number;
    trainingProgress?: number;
    activeTasks?: number;
    employmentStatus?: string;
    workLocation?: string;
};