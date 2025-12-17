import React, { useState, useEffect, useRef } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView, 
  SafeAreaView, 
  Alert,
  StatusBar,
  BackHandler,
  StyleProp,
  ViewStyle,
  TextStyle
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { CheckCircle, XCircle, Clock, AlertTriangle } from 'lucide-react-native';

interface QuizQuestion {
    id: number;
    question: string;
    options: string[];
    correctAnswer: number;
    explanation: string;
}

const QuizScreen: React.FC = () => {
    const navigation = useNavigation<any>();
    const route = useRoute<any>();
    const { testData } = route.params || {};

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
    const [userAnswers, setUserAnswers] = useState<(number | null)[]>([]);
    const [isAnswered, setIsAnswered] = useState(false);
    const [showResults, setShowResults] = useState(false);
    const [timeRemaining, setTimeRemaining] = useState(0);
    const [startTime] = useState(Date.now());
    
    // Initialize userAnswers based on quiz length
    useEffect(() => {
        if (testData?.quiz) {
            setUserAnswers(new Array(testData.quiz.length).fill(null));
            
            // Parse duration
            const durationMatch = testData.duration.match(/(\d+)/);
            const minutes = durationMatch ? parseInt(durationMatch[1]) : 30;
            setTimeRemaining(minutes * 60);
        }
    }, [testData]);

    // Timer logic
    useEffect(() => {
        if (showResults) return;

        const timer = setInterval(() => {
            setTimeRemaining((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    handleSubmitQuiz();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [showResults]);

    // Prevent accidental back press
    useEffect(() => {
        const backAction = () => {
            if (showResults) {
                navigation.goBack();
                return true;
            }
            
            Alert.alert("Exit Quiz?", "Your progress will be lost. Are you sure?", [
                { text: "Cancel", onPress: () => null, style: "cancel" },
                { text: "Exit", onPress: () => navigation.goBack() }
            ]);
            return true;
        };

        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
        );

        return () => backHandler.remove();
    }, [showResults]);

    if (!testData || !testData.quiz) return null;

    const currentQuestion = testData.quiz[currentQuestionIndex];
    const progress = ((currentQuestionIndex + 1) / testData.quiz.length) * 100;
    const answeredCount = userAnswers.filter((a) => a !== null).length;
    const canSubmit = answeredCount === testData.quiz.length;

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
    };

    const handleAnswerSelect = (index: number) => {
        if (!isAnswered) {
            setSelectedAnswer(index);
        }
    };

    const handleConfirmAnswer = () => {
        if (selectedAnswer === null) return;
        
        const newAnswers = [...userAnswers];
        newAnswers[currentQuestionIndex] = selectedAnswer;
        setUserAnswers(newAnswers);
        setIsAnswered(true);
    };

    const handleNext = () => {
        if (currentQuestionIndex < testData.quiz.length - 1) {
            setCurrentQuestionIndex(prev => prev + 1);
            // Load next answer if already answered
            const nextAnswer = userAnswers[currentQuestionIndex + 1];
            setSelectedAnswer(nextAnswer);
            setIsAnswered(nextAnswer !== null);
        }
    };

    const handlePrevious = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(prev => prev - 1);
            const prevAnswer = userAnswers[currentQuestionIndex - 1];
            setSelectedAnswer(prevAnswer);
            setIsAnswered(prevAnswer !== null);
        }
    };

    const handleSubmitQuiz = () => {
        setShowResults(true);
    };

    const handleRetake = () => {
        setShowResults(false);
        setCurrentQuestionIndex(0);
        setSelectedAnswer(null);
        setUserAnswers(new Array(testData.quiz.length).fill(null));
        setIsAnswered(false);
        
        const durationMatch = testData.duration.match(/(\d+)/);
        const minutes = durationMatch ? parseInt(durationMatch[1]) : 30;
        setTimeRemaining(minutes * 60);
    };

    if (showResults) {
        const score = userAnswers.filter((a, i) => a === testData.quiz[i].correctAnswer).length;
        const percentage = Math.round((score / testData.quiz.length) * 100);
        
        return (
            <SafeAreaView style={styles.container}>
                <StatusBar barStyle="light-content" backgroundColor="#071D6A" />
                <View style={[styles.header, { justifyContent: 'center' }]}>
                   <Text style={[styles.headerTitle, { textAlign: 'center' }]}>Quiz Results</Text>
                </View>
                
                <ScrollView contentContainerStyle={styles.resultsContent}>
                    <View style={styles.scoreCard}>
                        <View style={styles.scoreCircle}>
                            <Text style={styles.scorePercent}>{percentage}%</Text>
                            <Text style={styles.scoreLabel}>Score</Text>
                        </View>
                        
                        <View style={styles.statsRow}>
                            <View style={styles.statItem}>
                                <Text style={styles.statValue}>{score}</Text>
                                <Text style={styles.statLabel}>Correct</Text>
                            </View>
                            <View style={styles.statItem}>
                                <Text style={[styles.statValue, { color: '#ef4444' }]}>
                                    {testData.quiz.length - score}
                                </Text>
                                <Text style={styles.statLabel}>Incorrect</Text>
                            </View>
                            <View style={styles.statItem}>
                                <Text style={styles.statValue}>
                                    {formatTime(Math.floor((Date.now() - startTime) / 1000))}
                                </Text>
                                <Text style={styles.statLabel}>Time</Text>
                            </View>
                        </View>

                        {percentage >= 70 ? (
                             <Text style={styles.passText}>Great Job! You Passed.</Text>
                        ) : (
                             <Text style={styles.failText}>Keep Practicing!</Text>
                        )}
                    </View>

                    <Text style={styles.reviewTitle}>Answer Review</Text>
                    {testData.quiz.map((q: QuizQuestion, index: number) => {
                        const userAnswer = userAnswers[index];
                        const isCorrect = userAnswer === q.correctAnswer;
                        
                        return (
                            <View key={index} style={[styles.reviewCard, isCorrect ? styles.correctBorder : styles.wrongBorder]}>
                                <View style={styles.reviewHeader}>
                                    <View style={styles.qParams}>
                                        <Text style={styles.qNumber}>Q{index + 1}</Text>
                                        <Text style={styles.reviewQuestion}>{q.question}</Text>
                                    </View>
                                    {isCorrect ? <CheckCircle size={24} color="#10b981" /> : <XCircle size={24} color="#ef4444" />}
                                </View>
                                
                                <View style={styles.reviewAnswers}>
                                    <Text style={styles.reviewLabel}>Your Answer:</Text>
                                    <Text style={[styles.reviewValue, isCorrect ? { color: '#10b981' } : { color: '#ef4444' }]}>
                                        {userAnswer !== null ? q.options[userAnswer] : 'Skipped'}
                                    </Text>
                                    
                                    {!isCorrect && (
                                        <>
                                            <Text style={[styles.reviewLabel, { marginTop: 8 }]}>Correct Answer:</Text>
                                            <Text style={[styles.reviewValue, { color: '#10b981' }]}>
                                                {q.options[q.correctAnswer]}
                                            </Text>
                                        </>
                                    )}
                                    
                                    <View style={styles.explanationBox}>
                                        <Text style={styles.explanationTitle}>Explanation:</Text>
                                        <Text style={styles.explanationText}>{q.explanation}</Text>
                                    </View>
                                </View>
                            </View>
                        );
                    })}
                </ScrollView>

                <View style={styles.footer}>
                    <View style={{ flexDirection: 'row', gap: 12, marginBottom: 12 }}>
                        <TouchableOpacity style={[styles.secondaryButton, { flex: 1 }]} onPress={() => navigation.navigate('TestListScreen')}>
                            <Text style={styles.secondaryButtonText}>Back to Tests</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.primaryButton, { flex: 1 }]} onPress={handleRetake}>
                            <Text style={styles.primaryButtonText}>Retake Quiz</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={styles.secondaryButton} onPress={() => navigation.navigate('BottomTabs')}>
                        <Text style={styles.secondaryButtonText}>Go to Homepage</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#071D6A" />
            
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => BackHandler.exitApp()} style={{ padding: 8 }}>
                     {/* Placeholder for alignment, back handled by hardware/alert */}
                </TouchableOpacity>
                <Text style={styles.headerTitle} numberOfLines={1}>{testData.title}</Text>
                <View style={[styles.timerBadge, timeRemaining < 60 && styles.timerWarning]}>
                    <Clock size={14} color={timeRemaining < 60 ? "#ef4444" : "#fff"} />
                    <Text style={[styles.timerText, timeRemaining < 60 && { color: '#ef4444' }]}>
                        {formatTime(timeRemaining)}
                    </Text>
                </View>
            </View>
            
            {/* Progress Bar */}
            <View style={styles.progressContainer}>
                <View style={[styles.progressBar, { width: `${progress}%` }]} />
            </View>
            
            <View style={styles.progressInfo}>
                <Text style={styles.progressText}>Question {currentQuestionIndex + 1} / {testData.quiz.length}</Text>
                <Text style={styles.progressText}>{Math.round(progress)}%</Text>
            </View>

            <ScrollView contentContainerStyle={styles.quizContent}>
                <View style={styles.questionCard}>
                    <Text style={styles.questionText}>{currentQuestion.question}</Text>
                    
                    <View style={styles.optionsContainer}>
                        {currentQuestion.options.map((option: string, index: number) => {
                            const isSelected = selectedAnswer === index;
                            const isCorrect = index === currentQuestion.correctAnswer;
                            
                            let optionStyle: StyleProp<ViewStyle> = styles.optionButton;
                            let textStyle: StyleProp<TextStyle> = styles.optionText;
                            let icon = null;

                            if (isSelected) {
                                optionStyle = [styles.optionButton, styles.optionSelected];
                                textStyle = [styles.optionText, styles.optionTextSelected];
                            }
                            
                            // Visualize correctness if confirmed
                            if (isAnswered) {
                                if (isCorrect) {
                                    optionStyle = [styles.optionButton, styles.optionCorrect];
                                    textStyle = [styles.optionText, styles.optionTextCorrect];
                                    icon = <CheckCircle size={20} color="#059669" />;
                                } else if (isSelected && !isCorrect) {
                                     optionStyle = [styles.optionButton, styles.optionWrong];
                                     textStyle = [styles.optionText, styles.optionTextWrong];
                                     icon = <XCircle size={20} color="#dc2626" />;
                                } else if (isSelected) {
                                    // Should not happen logic wise but just in case
                                } else if (!isSelected && !isCorrect) {
                                    optionStyle = [styles.optionButton, styles.optionDisabled];
                                     textStyle = [styles.optionText, styles.optionTextDisabled];
                                }
                            }

                            return (
                                <TouchableOpacity 
                                    key={index} 
                                    style={optionStyle}
                                    onPress={() => handleAnswerSelect(index)}
                                    disabled={isAnswered}
                                >
                                    <View style={styles.optionContent}>
                                        <View style={[styles.optionLetter, isSelected && styles.optionLetterSelected]}>
                                            <Text style={[styles.optionLetterText, isSelected && styles.optionLetterTextSelected]}>
                                                {String.fromCharCode(65 + index)}
                                            </Text>
                                        </View>
                                        <Text style={textStyle}>{option}</Text>
                                    </View>
                                    {icon}
                                </TouchableOpacity>
                            );
                        })}
                    </View>

                    {isAnswered && (
                        <View style={styles.explanationContainer}>
                            <View style={styles.explanationHeader}>
                                <AlertTriangle size={18} color="#d97706" />
                                <Text style={styles.explanationTitle}>Explanation</Text>
                            </View>
                            <Text style={styles.explanationDetail}>{currentQuestion.explanation}</Text>
                        </View>
                    )}
                </View>
            </ScrollView>

            <View style={styles.footer}>
                {!isAnswered ? (
                     <TouchableOpacity 
                        style={[styles.primaryButton, selectedAnswer === null && styles.disabledButton]} 
                        onPress={handleConfirmAnswer}
                        disabled={selectedAnswer === null}
                     >
                        <Text style={styles.primaryButtonText}>Confirm Answer</Text>
                     </TouchableOpacity>
                ) : (
                    <View style={styles.navButtons}>
                        <TouchableOpacity 
                            style={[styles.secondaryButton, styles.flexButton]} 
                            onPress={handlePrevious}
                            disabled={currentQuestionIndex === 0}
                        >
                            <Text style={[styles.secondaryButtonText, currentQuestionIndex === 0 && { color: '#ccc' }]}>Previous</Text>
                        </TouchableOpacity>
                        
                        {currentQuestionIndex < testData.quiz.length - 1 ? (
                             <TouchableOpacity style={[styles.primaryButton, styles.flexButton]} onPress={handleNext}>
                                <Text style={styles.primaryButtonText}>Next</Text>
                             </TouchableOpacity>
                        ) : (
                             <TouchableOpacity 
                                style={[styles.successButton, styles.flexButton]} 
                                onPress={handleSubmitQuiz}
                                disabled={!canSubmit}
                             >
                                <Text style={styles.primaryButtonText}>Submit Quiz</Text>
                             </TouchableOpacity>
                        )}
                    </View>
                )}
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8fafc',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16,
        backgroundColor: '#071D6A',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#fff',
        flex: 1,
        marginHorizontal: 12,
    },
    timerBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.2)',
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 20,
        gap: 6,
    },
    timerWarning: {
        backgroundColor: 'rgba(239, 68, 68, 0.2)',
        borderWidth: 1,
        borderColor: '#ef4444',
    },
    timerText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 14,
    },
    progressContainer: {
        height: 4,
        backgroundColor: '#e2e8f0',
        width: '100%',
    },
    progressBar: {
        height: '100%',
        backgroundColor: '#10b981',
    },
    progressInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 8,
        backgroundColor: '#fff',
    },
    progressText: {
        color: '#64748b',
        fontSize: 12,
        fontWeight: '500',
    },
    quizContent: {
        padding: 16,
        paddingBottom: 100,
    },
    questionCard: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 20,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
    },
    questionText: {
        fontSize: 18,
        fontWeight: '600',
        color: '#1e293b',
        lineHeight: 28,
        marginBottom: 24,
    },
    optionsContainer: {
        gap: 12,
    },
    optionButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16,
        borderRadius: 12,
        borderWidth: 1.5,
        borderColor: '#e2e8f0',
        backgroundColor: '#f8fafc',
    },
    optionSelected: {
        borderColor: '#071D6A',
        backgroundColor: '#eff6ff',
    },
    optionCorrect: {
        borderColor: '#059669',
        backgroundColor: '#ecfdf5',
    },
    optionWrong: {
        borderColor: '#dc2626',
        backgroundColor: '#fef2f2',
    },
    optionDisabled: {
        opacity: 0.6,
    },
    optionContent: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        gap: 12,
    },
    optionLetter: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: '#e2e8f0',
        justifyContent: 'center',
        alignItems: 'center',
    },
    optionLetterSelected: {
        backgroundColor: '#071D6A',
    },
    optionLetterText: {
        fontWeight: '600',
        color: '#64748b',
    },
    optionLetterTextSelected: {
        color: '#fff',
    },
    optionText: {
        fontSize: 16,
        color: '#334155',
        flex: 1,
    },
    optionTextSelected: {
        color: '#071D6A',
        fontWeight: '500',
    },
    optionTextCorrect: {
        color: '#065f46',
        fontWeight: '600',
    },
    optionTextWrong: {
        color: '#991b1b',
        fontWeight: '600',
    },
    optionTextDisabled: {
        color: '#94a3b8',
    },
    explanationContainer: {
        marginTop: 24,
        padding: 16,
        backgroundColor: '#fffbeb',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#fcd34d',
    },
    explanationHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginBottom: 8,
    },
    explanationTitle: {
        fontWeight: '700',
        color: '#d97706',
    },
    explanationDetail: {
        color: '#92400e',
        lineHeight: 20,
    },
    footer: {
        padding: 16,
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#e2e8f0',
    },
    navButtons: {
        flexDirection: 'row',
        gap: 12,
    },
    flexButton: {
        flex: 1,
        justifyContent: 'center',
    },
    primaryButton: {
        backgroundColor: '#071D6A',
        paddingVertical: 14,
        paddingHorizontal: 24,
        borderRadius: 12,
        alignItems: 'center',
    },
    successButton: {
        backgroundColor: '#059669',
        paddingVertical: 14,
        paddingHorizontal: 24,
        borderRadius: 12,
        alignItems: 'center',
    },
    disabledButton: {
        backgroundColor: '#94a3b8',
    },
    primaryButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    secondaryButton: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#cbd5e1',
        paddingVertical: 14,
        paddingHorizontal: 24,
        borderRadius: 12,
        alignItems: 'center',
    },
    secondaryButtonText: {
        color: '#475569',
        fontSize: 16,
        fontWeight: '600',
    },
    // Results Styles
    resultsContent: {
        padding: 20,
        paddingBottom: 40,
    },
    scoreCard: {
        backgroundColor: '#fff',
        borderRadius: 24,
        padding: 32,
        alignItems: 'center',
        marginBottom: 24,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
    },
    scoreCircle: {
        width: 160,
        height: 160,
        borderRadius: 100,
        borderWidth: 8,
        borderColor: '#071D6A',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 24,
    },
    scorePercent: {
        fontSize: 48,
        fontWeight: 'bold',
        color: '#071D6A',
    },
    scoreLabel: {
        fontSize: 16,
        color: '#64748b',
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    statsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 24,
    },
    statItem: {
        alignItems: 'center',
    },
    statValue: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#10b981',
    },
    statLabel: {
        fontSize: 12,
        color: '#64748b',
    },
    passText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#10b981',
    },
    failText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#f59e0b',
    },
    reviewTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#1e293b',
        marginBottom: 16,
    },
    reviewCard: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        borderLeftWidth: 4,
        elevation: 1,
    },
    correctBorder: {
        borderLeftColor: '#10b981',
    },
    wrongBorder: {
        borderLeftColor: '#ef4444',
    },
    reviewHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 12,
    },
    qParams: {
        flex: 1,
    },
    qNumber: {
        fontSize: 12,
        color: '#64748b',
        fontWeight: '600',
        marginBottom: 4,
    },
    reviewQuestion: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1e293b',
    },
    reviewAnswers: {
        backgroundColor: '#f8fafc',
        padding: 12,
        borderRadius: 8,
    },
    reviewLabel: {
        fontSize: 12,
        color: '#64748b',
        marginBottom: 2,
    },
    reviewValue: {
        fontSize: 15,
        fontWeight: '500',
    },
    explanationBox: {
        marginTop: 12,
        borderTopWidth: 1,
        borderTopColor: '#e2e8f0',
        paddingTop: 8,
    },
    explanationText: {
        fontSize: 14,
        color: '#475569',
        fontStyle: 'italic',
    },
});

export default QuizScreen;
