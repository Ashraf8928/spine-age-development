import { Check } from 'lucide-react';
import { useSpineForm } from '../context/SpineFormContext';

export default function ResultScreen() {
    const { totalScore, userInfo } = useSpineForm();

    // Determine score interpretation
    const getScoreInterpretation = (score) => {
        if (score <= 8) {
            return {
                level: 'Excellent',
                message: 'Your spine is in great shape',
                color: '#10b981',
                bgColor: '#d1fae5'
            };
        } else if (score <= 16) {
            return {
                level: 'Good',
                message: 'Mild signs, worth monitoring',
                color: '#3b82f6',
                bgColor: '#dbeafe'
            };
        } else if (score <= 25) {
            return {
                level: 'Moderate',
                message: 'Consider professional evaluation',
                color: '#f59e0b',
                bgColor: '#fef3c7'
            };
        } else {
            return {
                level: 'High',
                message: 'Strongly recommend specialist consultation',
                color: '#ef4444',
                bgColor: '#fee2e2'
            };
        }
    };

    const interpretation = getScoreInterpretation(totalScore);
    const percentage = (totalScore / 41) * 100;

    return (
        <div style={{
            padding: '32px 24px',
            textAlign: 'center',
            maxHeight: '400px',
            overflowY: 'auto'
        }}>
            {/* Checkmark Animation */}
            <div style={{
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                background: '#10b981',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 24px',
                animation: 'scaleIn 0.5s ease-out'
            }}>
                <Check size={48} color="#fff" strokeWidth={3} />
            </div>

            {/* Heading */}
            <h2 style={{
                fontSize: '24px',
                fontWeight: 700,
                color: '#313283',
                marginBottom: '8px'
            }}>
                Assessment Complete!
            </h2>

            {/* User Name */}
            <p style={{
                fontSize: '16px',
                color: '#666',
                marginBottom: '24px'
            }}>
                Thank you, {userInfo.full_name}
            </p>

            {/* Score Display */}
            <div style={{
                background: '#f8f9fa',
                borderRadius: '16px',
                padding: '24px',
                marginBottom: '24px'
            }}>
                <p style={{
                    fontSize: '14px',
                    fontWeight: 600,
                    color: '#666',
                    marginBottom: '8px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                }}>
                    Your Spine Score
                </p>
                <div style={{
                    fontSize: '48px',
                    fontWeight: 700,
                    color: '#313283',
                    marginBottom: '16px'
                }}>
                    {totalScore} <span style={{ fontSize: '24px', color: '#999' }}>/ 41</span>
                </div>

                {/* Score Bar */}
                <div style={{
                    width: '100%',
                    height: '12px',
                    background: '#e5e7eb',
                    borderRadius: '6px',
                    overflow: 'hidden',
                    marginBottom: '16px'
                }}>
                    <div style={{
                        width: `${percentage}%`,
                        height: '100%',
                        background: interpretation.color,
                        transition: 'width 1s ease-out'
                    }} />
                </div>

                {/* Interpretation Badge */}
                <div style={{
                    display: 'inline-block',
                    padding: '8px 20px',
                    borderRadius: '20px',
                    background: interpretation.bgColor,
                    marginBottom: '8px'
                }}>
                    <span style={{
                        fontSize: '16px',
                        fontWeight: 700,
                        color: interpretation.color
                    }}>
                        {interpretation.level}
                    </span>
                </div>

                {/* Interpretation Message */}
                <p style={{
                    fontSize: '14px',
                    color: '#666',
                    lineHeight: '1.6'
                }}>
                    {interpretation.message}
                </p>
            </div>

            {/* Additional Info */}
            <p style={{
                fontSize: '13px',
                color: '#999',
                lineHeight: '1.6'
            }}>
                We've recorded your assessment. A specialist may contact you at {userInfo.email} or {userInfo.phone_number} for follow-up.
            </p>

            <style>{`
        @keyframes scaleIn {
          from {
            transform: scale(0);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
      `}</style>
        </div>
    );
}
