import { Check } from 'lucide-react';
import { useSpineForm } from '../context/SpineFormContext';
import ProductRecom from './ProductRecom';

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

    return (
        <div className='grid grid-cols-1 md:grid-cols-[30%_70%] gap-6 md:gap-10'>
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
            <ProductRecom score={totalScore} />
        </div>
    );
}
