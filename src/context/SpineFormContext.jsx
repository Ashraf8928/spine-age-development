import { createContext, useContext, useState, useEffect } from 'react';

const SpineFormContext = createContext(null);

const STORAGE_KEY = 'spine-age-assessment';

const initialState = {
    currentStep: 1,
    selections: {
        step_one: {},
        step_two: {},
        step_three: {},
        step_four: {},
        step_five: {},
        step_six: {}
    },
    userInfo: {
        full_name: '',
        email: '',
        phone_number: ''
    },
    totalScore: 0,
    isComplete: false
};

export function SpineFormProvider({ children }) {
    const [state, setState] = useState(() => {
        // Load from localStorage on initialization
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            if (saved) {
                const parsed = JSON.parse(saved);
                return {
                    ...initialState,
                    currentStep: parsed.currentStep || 1,
                    selections: parsed.selections || initialState.selections,
                    userInfo: parsed.userInfo || initialState.userInfo
                };
            }
        } catch (error) {
            console.error('Error loading from localStorage:', error);
        }
        return initialState;
    });

    // Save to localStorage whenever state changes (except totalScore and isComplete)
    useEffect(() => {
        try {
            const toSave = {
                currentStep: state.currentStep,
                selections: state.selections,
                userInfo: state.userInfo
            };
            localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
        } catch (error) {
            console.error('Error saving to localStorage:', error);
        }
    }, [state.currentStep, state.selections, state.userInfo]);

    const setAnswer = (step, questionId, answerId, point) => {
        setState(prev => ({
            ...prev,
            selections: {
                ...prev.selections,
                [step]: {
                    ...prev.selections[step],
                    [questionId]: { answerId, point }
                }
            }
        }));
    };

    const setUserInfo = (field, value) => {
        setState(prev => ({
            ...prev,
            userInfo: {
                ...prev.userInfo,
                [field]: value
            }
        }));
    };

    const setCurrentStep = (step) => {
        setState(prev => ({
            ...prev,
            currentStep: step
        }));
    };

    const calculateScore = () => {
        let total = 0;
        Object.values(state.selections).forEach(stepSelections => {
            Object.values(stepSelections).forEach(selection => {
                total += selection.point || 0;
            });
        });

        setState(prev => ({
            ...prev,
            totalScore: total,
            isComplete: true
        }));

        return total;
    };

    const resetForm = () => {
        setState(initialState);
        try {
            localStorage.removeItem(STORAGE_KEY);
        } catch (error) {
            console.error('Error clearing localStorage:', error);
        }
    };

    const value = {
        ...state,
        setAnswer,
        setUserInfo,
        setCurrentStep,
        calculateScore,
        resetForm
    };

    return (
        <SpineFormContext.Provider value={value}>
            {children}
        </SpineFormContext.Provider>
    );
}

export function useSpineForm() {
    const context = useContext(SpineFormContext);
    if (!context) {
        throw new Error('useSpineForm must be used within SpineFormProvider');
    }
    return context;
}
