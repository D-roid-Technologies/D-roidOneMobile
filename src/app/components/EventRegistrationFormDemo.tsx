// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   ScrollView,
//   StyleSheet,
//   Alert,
//   Modal,
//   FlatList,
// } from "react-native";
// import { Ionicons } from "@expo/vector-icons";

// // import React, { useState } from "react";
// // import {
// //   View,
// //   Text,
// //   TextInput,
// //   TouchableOpacity,
// //   ScrollView,
// //   StyleSheet,
// //   Alert,
// // } from "react-native";
// // import { Ionicons } from "@expo/vector-icons";
// import { Picker } from "@react-native-picker/picker";

// interface Event {
//   id: number;
//   title: string;
//   date: string;
//   excerpt: string;
//   author: string;
//   authorAvatar: string;
//   category: string;
//   readTime: string;
//   image: any;
//   content: string[];
// }

// interface FormData {
//   fullName: string;
//   email: string;
//   phoneNumber: string;
//   experienceLevel: string;
//   areasOfInterest: string;
//   teamName: string;
//   teamMembers: string;
//   projectIdea: string;
//   technicalSkills: string;
//   githubProfile: string;
//   portfolioUrl: string;
//   role: string;
//   profession: string;
//   organization: string;
//   specialization: string;
//   businessStage: string;
//   industry: string;
//   challenges: string;
//   expectations: string;
//   dietaryRestrictions: string;
//   specialNeeds: string;
//   country: string;
//   fieldOfInterest: string;
//   programmingLanguages: string;
//   motivation: string;
// }

// interface EventRegistrationFormProps {
//   selectedEvent: Event | null;
//   onClose: () => void;
//   onSubmit: (data: FormData & { eventId: number }) => void;
// }

// // Custom Dropdown Component
// interface DropdownProps {
//   label: string;
//   value: string;
//   options: string[];
//   onSelect: (value: string) => void;
//   placeholder?: string;
//   required?: boolean;
// }

// const CustomDropdown: React.FC<DropdownProps> = ({
//   label,
//   value,
//   options,
//   onSelect,
//   placeholder = "Select...",
//   required = false,
// }) => {
//   const [isOpen, setIsOpen] = useState(false);

//   return (
//     <>
//       <Text style={styles.label}>
//         {label} {required && <Text style={styles.required}>*</Text>}
//       </Text>
//       <TouchableOpacity
//         style={styles.dropdownButton}
//         onPress={() => setIsOpen(true)}
//       >
//         <Text
//           style={[
//             styles.dropdownButtonText,
//             !value && styles.dropdownPlaceholder,
//           ]}
//         >
//           {value || placeholder}
//         </Text>
//         <Ionicons name="chevron-down" size={20} color="#666" />
//       </TouchableOpacity>

//       <Modal
//         visible={isOpen}
//         transparent
//         animationType="slide"
//         onRequestClose={() => setIsOpen(false)}
//       >
//         <TouchableOpacity
//           style={styles.dropdownOverlay}
//           activeOpacity={1}
//           onPress={() => setIsOpen(false)}
//         >
//           <View style={styles.dropdownModal}>
//             <View style={styles.dropdownHeader}>
//               <Text style={styles.dropdownHeaderText}>{label}</Text>
//               <TouchableOpacity onPress={() => setIsOpen(false)}>
//                 <Ionicons name="close" size={24} color="#000c3a" />
//               </TouchableOpacity>
//             </View>
//             <FlatList
//               data={options}
//               keyExtractor={(item) => item}
//               renderItem={({ item }) => (
//                 <TouchableOpacity
//                   style={[
//                     styles.dropdownOption,
//                     value === item && styles.dropdownOptionSelected,
//                   ]}
//                   onPress={() => {
//                     onSelect(item);
//                     setIsOpen(false);
//                   }}
//                 >
//                   <Text
//                     style={[
//                       styles.dropdownOptionText,
//                       value === item && styles.dropdownOptionTextSelected,
//                     ]}
//                   >
//                     {item}
//                   </Text>
//                   {value === item && (
//                     <Ionicons name="checkmark" size={20} color="#203499" />
//                   )}
//                 </TouchableOpacity>
//               )}
//             />
//           </View>
//         </TouchableOpacity>
//       </Modal>
//     </>
//   );
// };

// const EventRegistrationForm: React.FC<EventRegistrationFormProps> = ({
//   selectedEvent,
//   onClose,
//   onSubmit,
// }) => {
//   const [formData, setFormData] = useState<FormData>({
//     // Common fields
//     fullName: "",
//     email: "",
//     phoneNumber: "",

//     // Tech Webinar specific
//     experienceLevel: "",
//     areasOfInterest: "",

//     // Conference & Hackathon specific
//     teamName: "",
//     teamMembers: "",
//     projectIdea: "",
//     technicalSkills: "",

//     // Hackathon specific
//     githubProfile: "",
//     portfolioUrl: "",
//     role: "",

//     // Health & Innovation specific
//     profession: "",
//     organization: "",
//     specialization: "",

//     // Entrepreneurial Webinar specific
//     businessStage: "",
//     industry: "",
//     challenges: "",

//     // General fields
//     expectations: "",
//     dietaryRestrictions: "",
//     specialNeeds: "",

//     // DevDive specific
//     country: "Nigeria",
//     fieldOfInterest: "",
//     programmingLanguages: "",
//     motivation: "",
//   });

//   const updateField = (field: keyof FormData, value: string) => {
//     setFormData((prev) => ({ ...prev, [field]: value }));
//   };

//   const handleSubmit = () => {
//     // Basic validation
//     if (!formData.email || !formData.phoneNumber) {
//       Alert.alert("Error", "Please fill in all required fields");
//       return;
//     }

//     // Email validation
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(formData.email)) {
//       Alert.alert("Error", "Please enter a valid email address");
//       return;
//     }

//     // Check if selectedEvent exists
//     if (!selectedEvent) {
//       Alert.alert("Error", "No event selected");
//       return;
//     }

//     onSubmit({ ...formData, eventId: selectedEvent.id });
//     Alert.alert("Success", "Registration submitted successfully!");
//   };

//   const renderCommonFields = () => (
//     <>
//       <View style={styles.fieldContainer}>
//         <Text style={styles.label}>
//           Full Name <Text style={styles.required}>*</Text>
//         </Text>
//         <TextInput
//           style={styles.input}
//           placeholder="Enter your full name"
//           value={formData.fullName}
//           onChangeText={(text) => updateField("fullName", text)}
//           placeholderTextColor="#999"
//         />
//       </View>

//       <View style={styles.fieldContainer}>
//         <Text style={styles.label}>
//           Email Address <Text style={styles.required}>*</Text>
//         </Text>
//         <TextInput
//           style={styles.input}
//           placeholder="your.email@example.com"
//           value={formData.email}
//           onChangeText={(text) => updateField("email", text)}
//           keyboardType="email-address"
//           autoCapitalize="none"
//           placeholderTextColor="#999"
//         />
//       </View>

//       <View style={styles.fieldContainer}>
//         <Text style={styles.label}>
//           Phone Number <Text style={styles.required}>*</Text>
//         </Text>
//         <TextInput
//           style={styles.input}
//           placeholder="+234 XXX XXX XXXX"
//           value={formData.phoneNumber}
//           onChangeText={(text) => updateField("phoneNumber", text)}
//           keyboardType="phone-pad"
//           placeholderTextColor="#999"
//         />
//       </View>
//     </>
//   );

//   // DevDive specific fields
//   const renderDevDiveFields = () => {
//     const countries = [
//       "Nigeria",
//       "Ghana",
//       "Kenya",
//       "South Africa",
//       "United States",
//       "United Kingdom",
//       "Canada",
//       "Other",
//     ];

//     const fieldsOfInterest = [
//       "UI/UX Design",
//       "Frontend Development",
//       "Backend Development",
//       "Full Stack Development",
//       "Mobile Development",
//       "Data Science",
//       "DevOps",
//       "Product Management",
//     ];

//     const experienceLevels = ["Beginner", "Intermediate", "Advanced", "Expert"];

//     return (
//       <>
//         <View style={styles.fieldContainer}>
//           <Text style={styles.label}>
//             Email Address <Text style={styles.required}>*</Text>
//           </Text>
//           <TextInput
//             style={styles.input}
//             placeholder="you@example.com"
//             value={formData.email}
//             onChangeText={(text) => updateField("email", text)}
//             keyboardType="email-address"
//             autoCapitalize="none"
//             placeholderTextColor="#999"
//           />
//         </View>

//         <View style={styles.rowContainer}>
//           <View style={[styles.fieldContainer, styles.halfWidth]}>
//             <Text style={styles.label}>
//               Phone Number <Text style={styles.required}>*</Text>
//             </Text>
//             <TextInput
//               style={styles.input}
//               placeholder="+234..."
//               value={formData.phoneNumber}
//               onChangeText={(text) => updateField("phoneNumber", text)}
//               keyboardType="phone-pad"
//               placeholderTextColor="#999"
//             />
//           </View>

//           <View style={[styles.fieldContainer, styles.halfWidth]}>
//             <CustomDropdown
//               label="Country"
//               value={formData.country}
//               options={countries}
//               onSelect={(value) => updateField("country", value)}
//               placeholder="Select country"
//             />
//           </View>
//         </View>

//         <View style={styles.rowContainer}>
//           <View style={[styles.fieldContainer, styles.halfWidth]}>
//             <CustomDropdown
//               label="Field of Interest"
//               value={formData.fieldOfInterest}
//               options={fieldsOfInterest}
//               onSelect={(value) => updateField("fieldOfInterest", value)}
//               placeholder="Select field"
//               required
//             />
//           </View>

//           <View style={[styles.fieldContainer, styles.halfWidth]}>
//             <CustomDropdown
//               label="Experience Level"
//               value={formData.experienceLevel}
//               options={experienceLevels}
//               onSelect={(value) => updateField("experienceLevel", value)}
//               placeholder="Select level"
//               required
//             />
//           </View>
//         </View>

//         <View style={styles.fieldContainer}>
//           <Text style={styles.label}>
//             Programming Languages / Tools (if applicable)
//           </Text>
//           <TextInput
//             style={styles.input}
//             placeholder="e.g., React, Python, Figma..."
//             value={formData.programmingLanguages}
//             onChangeText={(text) => updateField("programmingLanguages", text)}
//             placeholderTextColor="#999"
//           />
//         </View>

//         <View style={styles.fieldContainer}>
//           <Text style={styles.label}>
//             Why do you want to join this program?
//           </Text>
//           <TextInput
//             style={[styles.input, styles.textArea]}
//             placeholder="Tell us about your motivation..."
//             value={formData.motivation}
//             onChangeText={(text) => updateField("motivation", text)}
//             multiline
//             numberOfLines={4}
//             placeholderTextColor="#999"
//           />
//         </View>
//       </>
//     );
//   };
//   // const renderDevDiveFields = () => (
//   //   <>
//   //     <View style={styles.fieldContainer}>
//   //       <Text style={styles.label}>
//   //         Email Address <Text style={styles.required}>*</Text>
//   //       </Text>
//   //       <TextInput
//   //         style={styles.input}
//   //         placeholder="you@example.com"
//   //         value={formData.email}
//   //         onChangeText={(text) => updateField("email", text)}
//   //         keyboardType="email-address"
//   //         autoCapitalize="none"
//   //         placeholderTextColor="#999"
//   //       />
//   //     </View>

//   //     <View style={styles.rowContainer}>
//   //       <View style={[styles.fieldContainer, styles.halfWidth]}>
//   //         <Text style={styles.label}>
//   //           Phone Number <Text style={styles.required}>*</Text>
//   //         </Text>
//   //         <TextInput
//   //           style={styles.input}
//   //           placeholder="+234..."
//   //           value={formData.phoneNumber}
//   //           onChangeText={(text) => updateField("phoneNumber", text)}
//   //           keyboardType="phone-pad"
//   //           placeholderTextColor="#999"
//   //         />
//   //       </View>

//   //       <View style={[styles.fieldContainer, styles.halfWidth]}>
//   //         <Text style={styles.label}>Country</Text>
//   //         <View style={styles.pickerContainer}>
//   //           <Picker
//   //             selectedValue={formData.country}
//   //             onValueChange={(value) => updateField("country", value)}
//   //             style={styles.picker}
//   //           >
//   //             <Picker.Item label="Nigeria" value="Nigeria" />
//   //             <Picker.Item label="Ghana" value="Ghana" />
//   //             <Picker.Item label="Kenya" value="Kenya" />
//   //             <Picker.Item label="South Africa" value="South Africa" />
//   //             <Picker.Item label="United States" value="United States" />
//   //             <Picker.Item label="United Kingdom" value="United Kingdom" />
//   //             <Picker.Item label="Canada" value="Canada" />
//   //             <Picker.Item label="Other" value="Other" />
//   //           </Picker>
//   //         </View>
//   //       </View>
//   //     </View>

//   //     <View style={styles.rowContainer}>
//   //       <View style={[styles.fieldContainer, styles.halfWidth]}>
//   //         <Text style={styles.label}>
//   //           Field of Interest <Text style={styles.required}>*</Text>
//   //         </Text>
//   //         <View style={styles.pickerContainer}>
//   //           <Picker
//   //             selectedValue={formData.fieldOfInterest}
//   //             onValueChange={(value) => updateField("fieldOfInterest", value)}
//   //             style={styles.picker}
//   //           >
//   //             <Picker.Item label="Select..." value="" />
//   //             <Picker.Item label="UI/UX Design" value="UI/UX Design" />
//   //             <Picker.Item
//   //               label="Frontend Development"
//   //               value="Frontend Development"
//   //             />
//   //             <Picker.Item
//   //               label="Backend Development"
//   //               value="Backend Development"
//   //             />
//   //             <Picker.Item
//   //               label="Full Stack Development"
//   //               value="Full Stack Development"
//   //             />
//   //             <Picker.Item
//   //               label="Mobile Development"
//   //               value="Mobile Development"
//   //             />
//   //             <Picker.Item label="Data Science" value="Data Science" />
//   //             <Picker.Item label="DevOps" value="DevOps" />
//   //             <Picker.Item
//   //               label="Product Management"
//   //               value="Product Management"
//   //             />
//   //           </Picker>
//   //         </View>
//   //       </View>

//   //       <View style={[styles.fieldContainer, styles.halfWidth]}>
//   //         <Text style={styles.label}>
//   //           Experience Level <Text style={styles.required}>*</Text>
//   //         </Text>
//   //         <View style={styles.pickerContainer}>
//   //           <Picker
//   //             selectedValue={formData.experienceLevel}
//   //             onValueChange={(value) => updateField("experienceLevel", value)}
//   //             style={styles.picker}
//   //           >
//   //             <Picker.Item label="Select..." value="" />
//   //             <Picker.Item label="Beginner" value="Beginner" />
//   //             <Picker.Item label="Intermediate" value="Intermediate" />
//   //             <Picker.Item label="Advanced" value="Advanced" />
//   //             <Picker.Item label="Expert" value="Expert" />
//   //           </Picker>
//   //         </View>
//   //       </View>
//   //     </View>

//   //     <View style={styles.fieldContainer}>
//   //       <Text style={styles.label}>
//   //         Programming Languages / Tools (if applicable)
//   //       </Text>
//   //       <TextInput
//   //         style={styles.input}
//   //         placeholder="e.g., React, Python, Figma..."
//   //         value={formData.programmingLanguages}
//   //         onChangeText={(text) => updateField("programmingLanguages", text)}
//   //         placeholderTextColor="#999"
//   //       />
//   //     </View>

//   //     <View style={styles.fieldContainer}>
//   //       <Text style={styles.label}>Why do you want to join this program?</Text>
//   //       <TextInput
//   //         style={[styles.input, styles.textArea]}
//   //         placeholder="Tell us about your motivation..."
//   //         value={formData.motivation}
//   //         onChangeText={(text) => updateField("motivation", text)}
//   //         multiline
//   //         numberOfLines={4}
//   //         placeholderTextColor="#999"
//   //       />
//   //     </View>
//   //   </>
//   // );

//   const renderTechWebinarFields = () => (
//     <>
//       <View style={styles.fieldContainer}>
//         <Text style={styles.label}>
//           Experience Level <Text style={styles.required}>*</Text>
//         </Text>
//         <View style={styles.radioGroup}>
//           {["Beginner", "Intermediate", "Advanced"].map((level) => (
//             <TouchableOpacity
//               key={level}
//               style={[
//                 styles.radioButton,
//                 formData.experienceLevel === level &&
//                   styles.radioButtonSelected,
//               ]}
//               onPress={() => updateField("experienceLevel", level)}
//             >
//               <Text
//                 style={[
//                   styles.radioText,
//                   formData.experienceLevel === level &&
//                     styles.radioTextSelected,
//                 ]}
//               >
//                 {level}
//               </Text>
//             </TouchableOpacity>
//           ))}
//         </View>
//       </View>

//       <View style={styles.fieldContainer}>
//         <Text style={styles.label}>Areas of Interest</Text>
//         <TextInput
//           style={[styles.input, styles.textArea]}
//           placeholder="e.g., Web Development, Mobile Apps, AI/ML..."
//           value={formData.areasOfInterest}
//           onChangeText={(text) => updateField("areasOfInterest", text)}
//           multiline
//           numberOfLines={3}
//           placeholderTextColor="#999"
//         />
//       </View>

//       <View style={styles.fieldContainer}>
//         <Text style={styles.label}>What do you hope to learn?</Text>
//         <TextInput
//           style={[styles.input, styles.textArea]}
//           placeholder="Share your expectations..."
//           value={formData.expectations}
//           onChangeText={(text) => updateField("expectations", text)}
//           multiline
//           numberOfLines={3}
//           placeholderTextColor="#999"
//         />
//       </View>
//     </>
//   );

//   const renderConferenceHackathonFields = () => (
//     <>
//       <View style={styles.fieldContainer}>
//         <Text style={styles.label}>
//           Team Name <Text style={styles.required}>*</Text>
//         </Text>
//         <TextInput
//           style={styles.input}
//           placeholder="Enter your team name"
//           value={formData.teamName}
//           onChangeText={(text) => updateField("teamName", text)}
//           placeholderTextColor="#999"
//         />
//       </View>

//       <View style={styles.fieldContainer}>
//         <Text style={styles.label}>Team Members (Names & Roles)</Text>
//         <TextInput
//           style={[styles.input, styles.textArea]}
//           placeholder="e.g., John Doe - Developer, Jane Smith - Designer..."
//           value={formData.teamMembers}
//           onChangeText={(text) => updateField("teamMembers", text)}
//           multiline
//           numberOfLines={4}
//           placeholderTextColor="#999"
//         />
//       </View>

//       <View style={styles.fieldContainer}>
//         <Text style={styles.label}>Project Idea (Brief)</Text>
//         <TextInput
//           style={[styles.input, styles.textArea]}
//           placeholder="Describe your project idea..."
//           value={formData.projectIdea}
//           onChangeText={(text) => updateField("projectIdea", text)}
//           multiline
//           numberOfLines={4}
//           placeholderTextColor="#999"
//         />
//       </View>

//       <View style={styles.fieldContainer}>
//         <Text style={styles.label}>Technical Skills</Text>
//         <TextInput
//           style={[styles.input, styles.textArea]}
//           placeholder="List your team's technical skills..."
//           value={formData.technicalSkills}
//           onChangeText={(text) => updateField("technicalSkills", text)}
//           multiline
//           numberOfLines={3}
//           placeholderTextColor="#999"
//         />
//       </View>
//     </>
//   );

//   const renderHackathonFields = () => (
//     <>
//       <View style={styles.fieldContainer}>
//         <Text style={styles.label}>
//           Your Role <Text style={styles.required}>*</Text>
//         </Text>
//         <View style={styles.radioGroup}>
//           {["Frontend Dev", "Backend Dev", "UI/UX Designer", "Full Stack"].map(
//             (role) => (
//               <TouchableOpacity
//                 key={role}
//                 style={[
//                   styles.radioButton,
//                   formData.role === role && styles.radioButtonSelected,
//                 ]}
//                 onPress={() => updateField("role", role)}
//               >
//                 <Text
//                   style={[
//                     styles.radioText,
//                     formData.role === role && styles.radioTextSelected,
//                   ]}
//                 >
//                   {role}
//                 </Text>
//               </TouchableOpacity>
//             ),
//           )}
//         </View>
//       </View>

//       <View style={styles.fieldContainer}>
//         <Text style={styles.label}>GitHub Profile</Text>
//         <TextInput
//           style={styles.input}
//           placeholder="https://github.com/username"
//           value={formData.githubProfile}
//           onChangeText={(text) => updateField("githubProfile", text)}
//           autoCapitalize="none"
//           placeholderTextColor="#999"
//         />
//       </View>

//       <View style={styles.fieldContainer}>
//         <Text style={styles.label}>Portfolio URL</Text>
//         <TextInput
//           style={styles.input}
//           placeholder="https://yourportfolio.com"
//           value={formData.portfolioUrl}
//           onChangeText={(text) => updateField("portfolioUrl", text)}
//           autoCapitalize="none"
//           placeholderTextColor="#999"
//         />
//       </View>

//       <View style={styles.fieldContainer}>
//         <Text style={styles.label}>
//           Technical Skills <Text style={styles.required}>*</Text>
//         </Text>
//         <TextInput
//           style={[styles.input, styles.textArea]}
//           placeholder="List your technical skills (e.g., React, Node.js, Python...)"
//           value={formData.technicalSkills}
//           onChangeText={(text) => updateField("technicalSkills", text)}
//           multiline
//           numberOfLines={3}
//           placeholderTextColor="#999"
//         />
//       </View>
//     </>
//   );

//   const renderHealthInnovationFields = () => (
//     <>
//       <View style={styles.fieldContainer}>
//         <Text style={styles.label}>
//           Profession <Text style={styles.required}>*</Text>
//         </Text>
//         <View style={styles.radioGroup}>
//           {[
//             "Healthcare Professional",
//             "Tech Innovator",
//             "Researcher",
//             "Student",
//             "Other",
//           ].map((prof) => (
//             <TouchableOpacity
//               key={prof}
//               style={[
//                 styles.radioButton,
//                 formData.profession === prof && styles.radioButtonSelected,
//               ]}
//               onPress={() => updateField("profession", prof)}
//             >
//               <Text
//                 style={[
//                   styles.radioText,
//                   formData.profession === prof && styles.radioTextSelected,
//                 ]}
//               >
//                 {prof}
//               </Text>
//             </TouchableOpacity>
//           ))}
//         </View>
//       </View>

//       <View style={styles.fieldContainer}>
//         <Text style={styles.label}>Organization/Institution</Text>
//         <TextInput
//           style={styles.input}
//           placeholder="Enter your organization name"
//           value={formData.organization}
//           onChangeText={(text) => updateField("organization", text)}
//           placeholderTextColor="#999"
//         />
//       </View>

//       <View style={styles.fieldContainer}>
//         <Text style={styles.label}>Specialization/Area of Focus</Text>
//         <TextInput
//           style={[styles.input, styles.textArea]}
//           placeholder="e.g., Digital Health, AI in Healthcare, Telemedicine..."
//           value={formData.specialization}
//           onChangeText={(text) => updateField("specialization", text)}
//           multiline
//           numberOfLines={3}
//           placeholderTextColor="#999"
//         />
//       </View>
//     </>
//   );

//   const renderEntrepreneurialFields = () => (
//     <>
//       <View style={styles.fieldContainer}>
//         <Text style={styles.label}>
//           Business Stage <Text style={styles.required}>*</Text>
//         </Text>
//         <View style={styles.radioGroup}>
//           {["Idea Stage", "Startup", "Growth Stage", "Established"].map(
//             (stage) => (
//               <TouchableOpacity
//                 key={stage}
//                 style={[
//                   styles.radioButton,
//                   formData.businessStage === stage &&
//                     styles.radioButtonSelected,
//                 ]}
//                 onPress={() => updateField("businessStage", stage)}
//               >
//                 <Text
//                   style={[
//                     styles.radioText,
//                     formData.businessStage === stage &&
//                       styles.radioTextSelected,
//                   ]}
//                 >
//                   {stage}
//                 </Text>
//               </TouchableOpacity>
//             ),
//           )}
//         </View>
//       </View>

//       <View style={styles.fieldContainer}>
//         <Text style={styles.label}>Industry/Sector</Text>
//         <TextInput
//           style={styles.input}
//           placeholder="e.g., Technology, Healthcare, E-commerce..."
//           value={formData.industry}
//           onChangeText={(text) => updateField("industry", text)}
//           placeholderTextColor="#999"
//         />
//       </View>

//       <View style={styles.fieldContainer}>
//         <Text style={styles.label}>Current Challenges</Text>
//         <TextInput
//           style={[styles.input, styles.textArea]}
//           placeholder="What challenges are you facing in your business?"
//           value={formData.challenges}
//           onChangeText={(text) => updateField("challenges", text)}
//           multiline
//           numberOfLines={4}
//           placeholderTextColor="#999"
//         />
//       </View>

//       <View style={styles.fieldContainer}>
//         <Text style={styles.label}>What do you hope to gain?</Text>
//         <TextInput
//           style={[styles.input, styles.textArea]}
//           placeholder="Share your expectations from this webinar..."
//           value={formData.expectations}
//           onChangeText={(text) => updateField("expectations", text)}
//           multiline
//           numberOfLines={3}
//           placeholderTextColor="#999"
//         />
//       </View>
//     </>
//   );

//   const renderEventSpecificFields = () => {
//     if (!selectedEvent) return null;

//     const eventId = selectedEvent.id;

//     // DevDive Application (assign an ID for DevDive, e.g., 24)
//     if (eventId === 24) {
//       return renderDevDiveFields();
//     }

//     // Tech Webinar
//     if (eventId === 23) {
//       return renderTechWebinarFields();
//     }

//     // Lift Up Tech Conference & Hackathon
//     if (eventId === 22) {
//       return renderConferenceHackathonFields();
//     }

//     // D'roid Hackathon
//     if (eventId === 21) {
//       return renderHackathonFields();
//     }

//     // Health & Innovation Conference
//     if (eventId === 20) {
//       return renderHealthInnovationFields();
//     }

//     // Entrepreneurial Webinar
//     if (eventId === 19) {
//       return renderEntrepreneurialFields();
//     }

//     return null;
//   };

//   if (!selectedEvent) {
//     return (
//       <View style={styles.container}>
//         <Text style={styles.errorText}>No event selected</Text>
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       <View style={styles.header}>
//         <TouchableOpacity onPress={onClose} style={styles.closeButton}>
//           <Ionicons name="close" size={24} color="#000c3a" />
//         </TouchableOpacity>
//         <Text style={styles.headerTitle}>
//           {selectedEvent.id === 24
//             ? "DevDive Application"
//             : "Event Registration"}
//         </Text>
//         <View style={{ width: 24 }} />
//       </View>

//       <ScrollView
//         style={styles.scrollView}
//         showsVerticalScrollIndicator={false}
//         contentContainerStyle={styles.scrollContent}
//       >
//         <View style={styles.eventInfo}>
//           <Text style={styles.eventTitle}>{selectedEvent.title}</Text>
//           <Text style={styles.eventDate}>{selectedEvent.date}</Text>
//         </View>

//         {selectedEvent.id !== 24 && (
//           <View style={styles.formSection}>
//             <Text style={styles.sectionTitle}>Personal Information</Text>
//             {renderCommonFields()}
//           </View>
//         )}

//         <View style={styles.formSection}>
//           <Text style={styles.sectionTitle}>
//             {selectedEvent.id === 24
//               ? "Application Information"
//               : "Event-Specific Information"}
//           </Text>
//           {renderEventSpecificFields()}
//         </View>

//         {selectedEvent.id !== 24 && (
//           <View style={styles.formSection}>
//             <Text style={styles.sectionTitle}>
//               Additional Information (Optional)
//             </Text>

//             <View style={styles.fieldContainer}>
//               <Text style={styles.label}>Dietary Restrictions</Text>
//               <TextInput
//                 style={styles.input}
//                 placeholder="Any dietary restrictions or allergies?"
//                 value={formData.dietaryRestrictions}
//                 onChangeText={(text) =>
//                   updateField("dietaryRestrictions", text)
//                 }
//                 placeholderTextColor="#999"
//               />
//             </View>

//             <View style={styles.fieldContainer}>
//               <Text style={styles.label}>Special Needs/Accommodations</Text>
//               <TextInput
//                 style={[styles.input, styles.textArea]}
//                 placeholder="Any special accommodations needed?"
//                 value={formData.specialNeeds}
//                 onChangeText={(text) => updateField("specialNeeds", text)}
//                 multiline
//                 numberOfLines={3}
//                 placeholderTextColor="#999"
//               />
//             </View>
//           </View>
//         )}

//         <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
//           <Text style={styles.submitButtonText}>
//             {selectedEvent.id === 24
//               ? "Submit Application"
//               : "Submit Registration"}
//           </Text>
//         </TouchableOpacity>
//       </ScrollView>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#ffffff",
//   },
//   header: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     paddingHorizontal: 16,
//     paddingVertical: 16,
//     borderBottomWidth: 1,
//     borderBottomColor: "#eee",
//   },
//   closeButton: {
//     padding: 4,
//   },
//   headerTitle: {
//     fontSize: 18,
//     fontWeight: "700",
//     color: "#000c3a",
//   },
//   scrollView: {
//     flex: 1,
//   },
//   scrollContent: {
//     paddingBottom: 40,
//   },
//   eventInfo: {
//     backgroundColor: "#C7D2FE",
//     padding: 20,
//     marginHorizontal: 16,
//     marginTop: 16,
//     borderRadius: 12,
//   },
//   eventTitle: {
//     fontSize: 18,
//     fontWeight: "700",
//     color: "#000c3a",
//     marginBottom: 8,
//   },
//   eventDate: {
//     fontSize: 14,
//     color: "#071D6A",
//     fontWeight: "500",
//   },
//   formSection: {
//     paddingHorizontal: 16,
//     marginTop: 24,
//   },
//   sectionTitle: {
//     fontSize: 16,
//     fontWeight: "700",
//     color: "#000c3a",
//     marginBottom: 16,
//   },
//   fieldContainer: {
//     marginBottom: 20,
//   },
//   rowContainer: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     gap: 12,
//   },
//   halfWidth: {
//     flex: 1,
//   },
//   label: {
//     fontSize: 14,
//     fontWeight: "600",
//     color: "#333",
//     marginBottom: 8,
//   },
//   required: {
//     color: "#EF4444",
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: "#ddd",
//     borderRadius: 8,
//     paddingHorizontal: 16,
//     paddingVertical: 12,
//     fontSize: 14,
//     color: "#000",
//     backgroundColor: "#F9FAFB",
//   },
//   textArea: {
//     height: 100,
//     textAlignVertical: "top",
//     paddingTop: 12,
//   },
//   pickerContainer: {
//     borderWidth: 1,
//     borderColor: "#ddd",
//     borderRadius: 8,
//     backgroundColor: "#F9FAFB",
//     overflow: "hidden",
//   },
//   picker: {
//     height: 48,
//     color: "#000",
//   },
//   radioGroup: {
//     flexDirection: "row",
//     flexWrap: "wrap",
//     gap: 8,
//   },
//   radioButton: {
//     paddingHorizontal: 16,
//     paddingVertical: 10,
//     borderRadius: 20,
//     borderWidth: 1,
//     borderColor: "#ddd",
//     backgroundColor: "#fff",
//   },
//   radioButtonSelected: {
//     backgroundColor: "#203499",
//     borderColor: "#203499",
//   },
//   radioText: {
//     fontSize: 13,
//     color: "#666",
//     fontWeight: "500",
//   },
//   radioTextSelected: {
//     color: "#fff",
//   },
//   submitButton: {
//     backgroundColor: "#203499",
//     marginHorizontal: 16,
//     marginTop: 32,
//     paddingVertical: 16,
//     borderRadius: 12,
//     alignItems: "center",
//   },
//   submitButtonText: {
//     color: "#fff",
//     fontSize: 16,
//     fontWeight: "700",
//   },
//   errorText: {
//     fontSize: 16,
//     color: "#EF4444",
//     textAlign: "center",
//     marginTop: 40,
//   },
// });

// export default EventRegistrationForm;

// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   ScrollView,
//   StyleSheet,
//   Alert,
// } from "react-native";
// import { Ionicons } from "@expo/vector-icons";

// interface Event {
//   id: number;
//   title: string;
//   date: string;
//   excerpt: string;
//   author: string;
//   authorAvatar: string;
//   category: string;
//   readTime: string;
//   image: any;
//   content: string[];
// }

// interface FormData {
//   fullName: string;
//   email: string;
//   phoneNumber: string;
//   experienceLevel: string;
//   areasOfInterest: string;
//   teamName: string;
//   teamMembers: string;
//   projectIdea: string;
//   technicalSkills: string;
//   githubProfile: string;
//   portfolioUrl: string;
//   role: string;
//   profession: string;
//   organization: string;
//   specialization: string;
//   businessStage: string;
//   industry: string;
//   challenges: string;
//   expectations: string;
//   dietaryRestrictions: string;
//   specialNeeds: string;
// }

// interface EventRegistrationFormProps {
//   selectedEvent: Event | null;
//   onClose: () => void;
//   onSubmit: (data: FormData & { eventId: number }) => void;
// }

// const EventRegistrationForm: React.FC<EventRegistrationFormProps> = ({
//   selectedEvent,
//   onClose,
//   onSubmit,
// }) => {
//   const [formData, setFormData] = useState<FormData>({
//     // Common fields
//     fullName: "",
//     email: "",
//     phoneNumber: "",

//     // Tech Webinar specific
//     experienceLevel: "",
//     areasOfInterest: "",

//     // Conference & Hackathon specific
//     teamName: "",
//     teamMembers: "",
//     projectIdea: "",
//     technicalSkills: "",

//     // Hackathon specific
//     githubProfile: "",
//     portfolioUrl: "",
//     role: "",

//     // Health & Innovation specific
//     profession: "",
//     organization: "",
//     specialization: "",

//     // Entrepreneurial Webinar specific
//     businessStage: "",
//     industry: "",
//     challenges: "",

//     // General fields
//     expectations: "",
//     dietaryRestrictions: "",
//     specialNeeds: "",
//   });

//   const updateField = (field: keyof FormData, value: string) => {
//     setFormData((prev) => ({ ...prev, [field]: value }));
//   };

//   const handleSubmit = () => {
//     // Basic validation
//     if (!formData.fullName || !formData.email || !formData.phoneNumber) {
//       // Alert.alert("Error", "Please fill in all required fields");
//       return;
//     }

//     // Email validation
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(formData.email)) {
//       Alert.alert("Error", "Please enter a valid email address");
//       return;
//     }

//     // Check if selectedEvent exists
//     if (!selectedEvent) {
//       // Alert.alert("Error", "No event selected");
//       return;
//     }

//     onSubmit({ ...formData, eventId: selectedEvent.id });
//     // Alert.alert("Success", "Registration submitted successfully!");
//   };

//   const renderCommonFields = () => (
//     <>
//       <View style={styles.fieldContainer}>
//         <Text style={styles.label}>
//           Full Name <Text style={styles.required}>*</Text>
//         </Text>
//         <TextInput
//           style={styles.input}
//           placeholder="Enter your full name"
//           value={formData.fullName}
//           onChangeText={(text) => updateField("fullName", text)}
//           placeholderTextColor="#999"
//         />
//       </View>

//       <View style={styles.fieldContainer}>
//         <Text style={styles.label}>
//           Email Address <Text style={styles.required}>*</Text>
//         </Text>
//         <TextInput
//           style={styles.input}
//           placeholder="your.email@example.com"
//           value={formData.email}
//           onChangeText={(text) => updateField("email", text)}
//           keyboardType="email-address"
//           autoCapitalize="none"
//           placeholderTextColor="#999"
//         />
//       </View>

//       <View style={styles.fieldContainer}>
//         <Text style={styles.label}>
//           Phone Number <Text style={styles.required}>*</Text>
//         </Text>
//         <TextInput
//           style={styles.input}
//           placeholder="+234 XXX XXX XXXX"
//           value={formData.phoneNumber}
//           onChangeText={(text) => updateField("phoneNumber", text)}
//           keyboardType="phone-pad"
//           placeholderTextColor="#999"
//         />
//       </View>
//     </>
//   );

//   const renderTechWebinarFields = () => (
//     <>
//       <View style={styles.fieldContainer}>
//         <Text style={styles.label}>
//           Experience Level <Text style={styles.required}>*</Text>
//         </Text>
//         <View style={styles.radioGroup}>
//           {["Beginner", "Intermediate", "Advanced"].map((level) => (
//             <TouchableOpacity
//               key={level}
//               style={[
//                 styles.radioButton,
//                 formData.experienceLevel === level &&
//                   styles.radioButtonSelected,
//               ]}
//               onPress={() => updateField("experienceLevel", level)}
//             >
//               <Text
//                 style={[
//                   styles.radioText,
//                   formData.experienceLevel === level &&
//                     styles.radioTextSelected,
//                 ]}
//               >
//                 {level}
//               </Text>
//             </TouchableOpacity>
//           ))}
//         </View>
//       </View>

//       <View style={styles.fieldContainer}>
//         <Text style={styles.label}>Areas of Interest</Text>
//         <TextInput
//           style={[styles.input, styles.textArea]}
//           placeholder="e.g., Web Development, Mobile Apps, AI/ML..."
//           value={formData.areasOfInterest}
//           onChangeText={(text) => updateField("areasOfInterest", text)}
//           multiline
//           numberOfLines={3}
//           placeholderTextColor="#999"
//         />
//       </View>

//       <View style={styles.fieldContainer}>
//         <Text style={styles.label}>What do you hope to learn?</Text>
//         <TextInput
//           style={[styles.input, styles.textArea]}
//           placeholder="Share your expectations..."
//           value={formData.expectations}
//           onChangeText={(text) => updateField("expectations", text)}
//           multiline
//           numberOfLines={3}
//           placeholderTextColor="#999"
//         />
//       </View>
//     </>
//   );

//   const renderConferenceHackathonFields = () => (
//     <>
//       <View style={styles.fieldContainer}>
//         <Text style={styles.label}>
//           Team Name <Text style={styles.required}>*</Text>
//         </Text>
//         <TextInput
//           style={styles.input}
//           placeholder="Enter your team name"
//           value={formData.teamName}
//           onChangeText={(text) => updateField("teamName", text)}
//           placeholderTextColor="#999"
//         />
//       </View>

//       <View style={styles.fieldContainer}>
//         <Text style={styles.label}>Team Members (Names & Roles)</Text>
//         <TextInput
//           style={[styles.input, styles.textArea]}
//           placeholder="e.g., John Doe - Developer, Jane Smith - Designer..."
//           value={formData.teamMembers}
//           onChangeText={(text) => updateField("teamMembers", text)}
//           multiline
//           numberOfLines={4}
//           placeholderTextColor="#999"
//         />
//       </View>

//       <View style={styles.fieldContainer}>
//         <Text style={styles.label}>Project Idea (Brief)</Text>
//         <TextInput
//           style={[styles.input, styles.textArea]}
//           placeholder="Describe your project idea..."
//           value={formData.projectIdea}
//           onChangeText={(text) => updateField("projectIdea", text)}
//           multiline
//           numberOfLines={4}
//           placeholderTextColor="#999"
//         />
//       </View>

//       <View style={styles.fieldContainer}>
//         <Text style={styles.label}>Technical Skills</Text>
//         <TextInput
//           style={[styles.input, styles.textArea]}
//           placeholder="List your team's technical skills..."
//           value={formData.technicalSkills}
//           onChangeText={(text) => updateField("technicalSkills", text)}
//           multiline
//           numberOfLines={3}
//           placeholderTextColor="#999"
//         />
//       </View>
//     </>
//   );

//   const renderHackathonFields = () => (
//     <>
//       <View style={styles.fieldContainer}>
//         <Text style={styles.label}>
//           Your Role <Text style={styles.required}>*</Text>
//         </Text>
//         <View style={styles.radioGroup}>
//           {["Frontend Dev", "Backend Dev", "UI/UX Designer", "Full Stack"].map(
//             (role) => (
//               <TouchableOpacity
//                 key={role}
//                 style={[
//                   styles.radioButton,
//                   formData.role === role && styles.radioButtonSelected,
//                 ]}
//                 onPress={() => updateField("role", role)}
//               >
//                 <Text
//                   style={[
//                     styles.radioText,
//                     formData.role === role && styles.radioTextSelected,
//                   ]}
//                 >
//                   {role}
//                 </Text>
//               </TouchableOpacity>
//             )
//           )}
//         </View>
//       </View>

//       <View style={styles.fieldContainer}>
//         <Text style={styles.label}>GitHub Profile</Text>
//         <TextInput
//           style={styles.input}
//           placeholder="https://github.com/username"
//           value={formData.githubProfile}
//           onChangeText={(text) => updateField("githubProfile", text)}
//           autoCapitalize="none"
//           placeholderTextColor="#999"
//         />
//       </View>

//       <View style={styles.fieldContainer}>
//         <Text style={styles.label}>Portfolio URL</Text>
//         <TextInput
//           style={styles.input}
//           placeholder="https://yourportfolio.com"
//           value={formData.portfolioUrl}
//           onChangeText={(text) => updateField("portfolioUrl", text)}
//           autoCapitalize="none"
//           placeholderTextColor="#999"
//         />
//       </View>

//       <View style={styles.fieldContainer}>
//         <Text style={styles.label}>
//           Technical Skills <Text style={styles.required}>*</Text>
//         </Text>
//         <TextInput
//           style={[styles.input, styles.textArea]}
//           placeholder="List your technical skills (e.g., React, Node.js, Python...)"
//           value={formData.technicalSkills}
//           onChangeText={(text) => updateField("technicalSkills", text)}
//           multiline
//           numberOfLines={3}
//           placeholderTextColor="#999"
//         />
//       </View>
//     </>
//   );

//   const renderHealthInnovationFields = () => (
//     <>
//       <View style={styles.fieldContainer}>
//         <Text style={styles.label}>
//           Profession <Text style={styles.required}>*</Text>
//         </Text>
//         <View style={styles.radioGroup}>
//           {[
//             "Healthcare Professional",
//             "Tech Innovator",
//             "Researcher",
//             "Student",
//             "Other",
//           ].map((prof) => (
//             <TouchableOpacity
//               key={prof}
//               style={[
//                 styles.radioButton,
//                 formData.profession === prof && styles.radioButtonSelected,
//               ]}
//               onPress={() => updateField("profession", prof)}
//             >
//               <Text
//                 style={[
//                   styles.radioText,
//                   formData.profession === prof && styles.radioTextSelected,
//                 ]}
//               >
//                 {prof}
//               </Text>
//             </TouchableOpacity>
//           ))}
//         </View>
//       </View>

//       <View style={styles.fieldContainer}>
//         <Text style={styles.label}>Organization/Institution</Text>
//         <TextInput
//           style={styles.input}
//           placeholder="Enter your organization name"
//           value={formData.organization}
//           onChangeText={(text) => updateField("organization", text)}
//           placeholderTextColor="#999"
//         />
//       </View>

//       <View style={styles.fieldContainer}>
//         <Text style={styles.label}>Specialization/Area of Focus</Text>
//         <TextInput
//           style={[styles.input, styles.textArea]}
//           placeholder="e.g., Digital Health, AI in Healthcare, Telemedicine..."
//           value={formData.specialization}
//           onChangeText={(text) => updateField("specialization", text)}
//           multiline
//           numberOfLines={3}
//           placeholderTextColor="#999"
//         />
//       </View>
//     </>
//   );

//   const renderEntrepreneurialFields = () => (
//     <>
//       <View style={styles.fieldContainer}>
//         <Text style={styles.label}>
//           Business Stage <Text style={styles.required}>*</Text>
//         </Text>
//         <View style={styles.radioGroup}>
//           {["Idea Stage", "Startup", "Growth Stage", "Established"].map(
//             (stage) => (
//               <TouchableOpacity
//                 key={stage}
//                 style={[
//                   styles.radioButton,
//                   formData.businessStage === stage &&
//                     styles.radioButtonSelected,
//                 ]}
//                 onPress={() => updateField("businessStage", stage)}
//               >
//                 <Text
//                   style={[
//                     styles.radioText,
//                     formData.businessStage === stage &&
//                       styles.radioTextSelected,
//                   ]}
//                 >
//                   {stage}
//                 </Text>
//               </TouchableOpacity>
//             )
//           )}
//         </View>
//       </View>

//       <View style={styles.fieldContainer}>
//         <Text style={styles.label}>Industry/Sector</Text>
//         <TextInput
//           style={styles.input}
//           placeholder="e.g., Technology, Healthcare, E-commerce..."
//           value={formData.industry}
//           onChangeText={(text) => updateField("industry", text)}
//           placeholderTextColor="#999"
//         />
//       </View>

//       <View style={styles.fieldContainer}>
//         <Text style={styles.label}>Current Challenges</Text>
//         <TextInput
//           style={[styles.input, styles.textArea]}
//           placeholder="What challenges are you facing in your business?"
//           value={formData.challenges}
//           onChangeText={(text) => updateField("challenges", text)}
//           multiline
//           numberOfLines={4}
//           placeholderTextColor="#999"
//         />
//       </View>

//       <View style={styles.fieldContainer}>
//         <Text style={styles.label}>What do you hope to gain?</Text>
//         <TextInput
//           style={[styles.input, styles.textArea]}
//           placeholder="Share your expectations from this webinar..."
//           value={formData.expectations}
//           onChangeText={(text) => updateField("expectations", text)}
//           multiline
//           numberOfLines={3}
//           placeholderTextColor="#999"
//         />
//       </View>
//     </>
//   );

//   const renderEventSpecificFields = () => {
//     if (!selectedEvent) return null;

//     const eventId = selectedEvent.id;

//     // Tech Webinar
//     if (eventId === 23) {
//       return renderTechWebinarFields();
//     }

//     // Lift Up Tech Conference & Hackathon
//     if (eventId === 22) {
//       return renderConferenceHackathonFields();
//     }

//     // D'roid Hackathon
//     if (eventId === 21) {
//       return renderHackathonFields();
//     }

//     // Health & Innovation Conference
//     if (eventId === 20) {
//       return renderHealthInnovationFields();
//     }

//     // Entrepreneurial Webinar
//     if (eventId === 19) {
//       return renderEntrepreneurialFields();
//     }

//     return null;
//   };

//   if (!selectedEvent) {
//     return (
//       <View style={styles.container}>
//         <Text style={styles.errorText}>No event selected</Text>
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       <View style={styles.header}>
//         <TouchableOpacity onPress={onClose} style={styles.closeButton}>
//           <Ionicons name="close" size={24} color="#000c3a" />
//         </TouchableOpacity>
//         <Text style={styles.headerTitle}>Event Registration</Text>
//         <View style={{ width: 24 }} />
//       </View>

//       <ScrollView
//         style={styles.scrollView}
//         showsVerticalScrollIndicator={false}
//         contentContainerStyle={styles.scrollContent}
//       >
//         <View style={styles.eventInfo}>
//           <Text style={styles.eventTitle}>{selectedEvent.title}</Text>
//           <Text style={styles.eventDate}>{selectedEvent.date}</Text>
//         </View>

//         <View style={styles.formSection}>
//           <Text style={styles.sectionTitle}>Personal Information</Text>
//           {renderCommonFields()}
//         </View>

//         <View style={styles.formSection}>
//           <Text style={styles.sectionTitle}>Event-Specific Information</Text>
//           {renderEventSpecificFields()}
//         </View>

//         <View style={styles.formSection}>
//           <Text style={styles.sectionTitle}>
//             Additional Information (Optional)
//           </Text>

//           <View style={styles.fieldContainer}>
//             <Text style={styles.label}>Dietary Restrictions</Text>
//             <TextInput
//               style={styles.input}
//               placeholder="Any dietary restrictions or allergies?"
//               value={formData.dietaryRestrictions}
//               onChangeText={(text) => updateField("dietaryRestrictions", text)}
//               placeholderTextColor="#999"
//             />
//           </View>

//           <View style={styles.fieldContainer}>
//             <Text style={styles.label}>Special Needs/Accommodations</Text>
//             <TextInput
//               style={[styles.input, styles.textArea]}
//               placeholder="Any special accommodations needed?"
//               value={formData.specialNeeds}
//               onChangeText={(text) => updateField("specialNeeds", text)}
//               multiline
//               numberOfLines={3}
//               placeholderTextColor="#999"
//             />
//           </View>
//         </View>

//         <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
//           <Text style={styles.submitButtonText}>Submit Registration</Text>
//         </TouchableOpacity>
//       </ScrollView>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#ffffff",
//   },
//   header: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     paddingHorizontal: 16,
//     paddingVertical: 16,
//     borderBottomWidth: 1,
//     borderBottomColor: "#eee",
//   },
//   closeButton: {
//     padding: 4,
//   },
//   headerTitle: {
//     fontSize: 18,
//     fontWeight: "700",
//     color: "#000c3a",
//   },
//   scrollView: {
//     flex: 1,
//   },
//   scrollContent: {
//     paddingBottom: 40,
//   },
//   eventInfo: {
//     backgroundColor: "#C7D2FE",
//     padding: 20,
//     marginHorizontal: 16,
//     marginTop: 16,
//     borderRadius: 12,
//   },
//   eventTitle: {
//     fontSize: 18,
//     fontWeight: "700",
//     color: "#000c3a",
//     marginBottom: 8,
//   },
//   eventDate: {
//     fontSize: 14,
//     color: "#071D6A",
//     fontWeight: "500",
//   },
//   formSection: {
//     paddingHorizontal: 16,
//     marginTop: 24,
//   },
//   sectionTitle: {
//     fontSize: 16,
//     fontWeight: "700",
//     color: "#000c3a",
//     marginBottom: 16,
//   },
//   fieldContainer: {
//     marginBottom: 20,
//   },
//   label: {
//     fontSize: 14,
//     fontWeight: "600",
//     color: "#333",
//     marginBottom: 8,
//   },
//   required: {
//     color: "#EF4444",
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: "#ddd",
//     borderRadius: 8,
//     paddingHorizontal: 16,
//     paddingVertical: 12,
//     fontSize: 14,
//     color: "#000",
//     backgroundColor: "#F9FAFB",
//   },
//   textArea: {
//     height: 100,
//     textAlignVertical: "top",
//     paddingTop: 12,
//   },
//   radioGroup: {
//     flexDirection: "row",
//     flexWrap: "wrap",
//     gap: 8,
//   },
//   radioButton: {
//     paddingHorizontal: 16,
//     paddingVertical: 10,
//     borderRadius: 20,
//     borderWidth: 1,
//     borderColor: "#ddd",
//     backgroundColor: "#fff",
//   },
//   radioButtonSelected: {
//     backgroundColor: "#203499",
//     borderColor: "#203499",
//   },
//   radioText: {
//     fontSize: 13,
//     color: "#666",
//     fontWeight: "500",
//   },
//   radioTextSelected: {
//     color: "#fff",
//   },
//   submitButton: {
//     backgroundColor: "#203499",
//     marginHorizontal: 16,
//     marginTop: 32,
//     paddingVertical: 16,
//     borderRadius: 12,
//     alignItems: "center",
//   },
//   submitButtonText: {
//     color: "#fff",
//     fontSize: 16,
//     fontWeight: "700",
//   },
//   errorText: {
//     fontSize: 16,
//     color: "#EF4444",
//     textAlign: "center",
//     marginTop: 40,
//   },
// });

// export default EventRegistrationForm;
