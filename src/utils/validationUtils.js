import { questionAnswer } from '../data/questionData';

// Map step keys to array indices
const STEP_KEY_TO_INDEX = {
    'step_one': 0,
    'step_two': 1,
    'step_three': 2,
    'step_four': 3,
    'step_five': 4,
    'step_six': 5
};

/**
 * Get the total number of questions for a given step
 * @param {string} stepKey - e.g., 'step_one', 'step_two', etc.
 * @returns {number} Total number of questions in the step
 */
export function getStepQuestionCount(stepKey) {
    const stepIndex = STEP_KEY_TO_INDEX[stepKey];

    if (stepIndex === undefined) {
        return 0;
    }

    const stepData = questionAnswer[stepIndex];
    if (!stepData || !stepData[stepKey]) {
        return 0;
    }

    return stepData[stepKey].length;
}

/**
 * Validate if all questions in a step have been answered
 * @param {string} stepKey - e.g., 'step_one', 'step_two', etc.
 * @param {Object} selections - The selections object from context
 * @returns {Object} { isValid: boolean, unansweredQuestions: number[] }
 */
export function validateStep(stepKey, selections) {
    const stepIndex = STEP_KEY_TO_INDEX[stepKey];

    if (stepIndex === undefined) {
        return { isValid: true, unansweredQuestions: [] };
    }

    const stepData = questionAnswer[stepIndex];
    if (!stepData || !stepData[stepKey]) {
        return { isValid: true, unansweredQuestions: [] };
    }

    const questions = stepData[stepKey];
    const stepSelections = selections[stepKey] || {};
    const unansweredQuestions = [];

    questions.forEach((question) => {
        if (!stepSelections[question.id]) {
            unansweredQuestions.push(question.id);
        }
    });

    return {
        isValid: unansweredQuestions.length === 0,
        unansweredQuestions
    };
}

/**
 * Get step key from step number
 * @param {number} stepNumber - 1-7
 * @returns {string|null} Step key or null if invalid
 */
export function getStepKey(stepNumber) {
    const stepKeys = ['step_one', 'step_two', 'step_three', 'step_four', 'step_five', 'step_six'];

    if (stepNumber < 1 || stepNumber > 6) {
        return null;
    }

    return stepKeys[stepNumber - 1];
}

