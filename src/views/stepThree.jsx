import { useSpineForm } from '../context/SpineFormContext';
import { questionAnswer } from '../data/questionData';
import { useEffect, useRef } from 'react';

export default function StepThree({ validationErrors = [] }) {
    const { selections, setAnswer } = useSpineForm();
    const questions = questionAnswer[2].step_three;
    const questionRefs = useRef({});

    const handleAnswer = (questionId, answerId, point) => {
        setAnswer('step_three', questionId, answerId, point);
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
        <div style={{ padding: '24px', maxHeight: '468px', overflowY: 'auto' }}>
            <h2 style={{
                fontSize: '20px',
                fontWeight: 700,
                color: '#313283',
                letterSpacing: '0.5px',
                marginBottom: '24px',
                textTransform: 'uppercase'
            }} className='font-dm'>
                Range of Motion
            </h2>

            {questions.map((q) => {
                const selectedAnswerId = selections.step_three[q.id]?.answerId;
                const hasError = validationErrors.includes(q.id);

                return (
                    <div
                        key={q.id}
                        ref={(el) => questionRefs.current[q.id] = el}
                        style={{ marginBottom: '60px' }}
                        className='font-dm'
                    >
                        <p style={{
                            fontSize: '18px',
                            color: '#313283',
                            marginBottom: '12px',
                            lineHeight: '1.5',
                            textTransform : 'capitalize'
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
                                            borderRadius: '30px',
                                            border: 'none',
                                            fontSize: '14px',
                                            fontWeight: 600,
                                            cursor: 'pointer',
                                            background: isSelected ? '#313283' : '#D7D8FF',
                                            color: isSelected ? '#FFFFFF' : '#313283',
                                            transition: 'all 0.2s ease',
                                            lineHeight : 'normal',
                                            textAlign : 'center'
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
