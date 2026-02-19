import { useSpineForm } from '../context/SpineFormContext';
import { questionAnswer } from '../data/questionData';
import { useEffect, useRef } from 'react';

export default function StepFive({ validationErrors = [] }) {
    const { selections, setAnswer } = useSpineForm();
    const questions = questionAnswer[4].step_five;
    const questionRefs = useRef({});

    const handleAnswer = (questionId, answerId, point) => {
        setAnswer('step_five', questionId, answerId, point);
    };

    // Scroll to first error when validationErrors change
    useEffect(() => {
        if (validationErrors.length > 0) {
            const firstErrorId = validationErrors[0];
            const element = questionRefs.current[firstErrorId];
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
    }, [validationErrors]);

    return (
        <div style={{ padding: '24px', maxHeight: '400px', overflowY: 'auto' }}>
            <h2 style={{
                fontSize: '14px',
                fontWeight: 700,
                color: '#313283',
                letterSpacing: '0.5px',
                marginBottom: '24px',
                textTransform: 'uppercase'
            }}>
                Tenderness
            </h2>

            {questions.map((q) => {
                const selectedAnswerId = selections.step_five[q.id]?.answerId;
                const hasError = validationErrors.includes(q.id);

                return (
                    <div
                        key={q.id}
                        ref={(el) => questionRefs.current[q.id] = el}
                        style={{ marginBottom: '24px' }}
                    >
                        <p style={{
                            fontSize: '14px',
                            color: '#333',
                            marginBottom: '12px',
                            lineHeight: '1.5'
                        }}>
                            {q.question}
                        </p>
                        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                            {q.answer.map((ans) => {
                                const isSelected = selectedAnswerId === ans.id;
                                return (
                                    <button
                                        key={ans.id}
                                        onClick={() => handleAnswer(q.id, ans.id, ans.point)}
                                        style={{
                                            padding: '10px 24px',
                                            borderRadius: '8px',
                                            border: 'none',
                                            fontSize: '14px',
                                            fontWeight: 600,
                                            cursor: 'pointer',
                                            background: isSelected ? '#313283' : '#D7D8FF',
                                            color: isSelected ? '#FFFFFF' : '#313283',
                                            transition: 'all 0.2s ease'
                                        }}
                                    >
                                        {ans.answer}
                                    </button>
                                );
                            })}
                        </div>
                        {hasError && (
                            <p style={{
                                fontSize: '13px',
                                color: '#ef4444',
                                marginTop: '8px',
                                fontWeight: 500
                            }}>
                                Please select an answer
                            </p>
                        )}
                    </div>
                );
            })}
        </div>
    );
}
