import { useSpineForm } from '../context/SpineFormContext';
import { useState } from 'react';

export default function StepSeven() {
    const { userInfo, setUserInfo } = useSpineForm();
    const [errors, setErrors] = useState({});

    const handleChange = (field, value) => {
        setUserInfo(field, value);
        // Clear error when user starts typing
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: '' }));
        }
    };

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

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
                Your Details
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {/* Full Name */}
                <div>
                    <label style={{
                        display: 'block',
                        fontSize: '13px',
                        fontWeight: 600,
                        color: '#313283',
                        marginBottom: '8px'
                    }}>
                        Full Name *
                    </label>
                    <input
                        type="text"
                        value={userInfo.full_name}
                        onChange={(e) => handleChange('full_name', e.target.value)}
                        placeholder="Enter your full name"
                        style={{
                            width: '100%',
                            padding: '12px 16px',
                            fontSize: '14px',
                            border: `2px solid ${errors.full_name ? '#ef4444' : '#D7D8FF'}`,
                            borderRadius: '8px',
                            outline: 'none',
                            transition: 'border-color 0.2s',
                            boxSizing: 'border-box'
                        }}
                        onFocus={(e) => e.target.style.borderColor = '#313283'}
                        onBlur={(e) => {
                            if (!errors.full_name) {
                                e.target.style.borderColor = '#D7D8FF';
                            }
                        }}
                    />
                    {errors.full_name && (
                        <p style={{ fontSize: '12px', color: '#ef4444', marginTop: '4px' }}>
                            {errors.full_name}
                        </p>
                    )}
                </div>

                {/* Email */}
                <div>
                    <label style={{
                        display: 'block',
                        fontSize: '13px',
                        fontWeight: 600,
                        color: '#313283',
                        marginBottom: '8px'
                    }}>
                        Email *
                    </label>
                    <input
                        type="email"
                        value={userInfo.email}
                        onChange={(e) => handleChange('email', e.target.value)}
                        placeholder="your.email@example.com"
                        style={{
                            width: '100%',
                            padding: '12px 16px',
                            fontSize: '14px',
                            border: `2px solid ${errors.email ? '#ef4444' : '#D7D8FF'}`,
                            borderRadius: '8px',
                            outline: 'none',
                            transition: 'border-color 0.2s',
                            boxSizing: 'border-box'
                        }}
                        onFocus={(e) => e.target.style.borderColor = '#313283'}
                        onBlur={(e) => {
                            if (!errors.email) {
                                e.target.style.borderColor = '#D7D8FF';
                            }
                        }}
                    />
                    {errors.email && (
                        <p style={{ fontSize: '12px', color: '#ef4444', marginTop: '4px' }}>
                            {errors.email}
                        </p>
                    )}
                </div>

                {/* Phone Number */}
                <div>
                    <label style={{
                        display: 'block',
                        fontSize: '13px',
                        fontWeight: 600,
                        color: '#313283',
                        marginBottom: '8px'
                    }}>
                        Phone Number *
                    </label>
                    <input
                        type="tel"
                        value={userInfo.phone_number}
                        onChange={(e) => handleChange('phone_number', e.target.value)}
                        placeholder="Enter your phone number"
                        style={{
                            width: '100%',
                            padding: '12px 16px',
                            fontSize: '14px',
                            border: `2px solid ${errors.phone_number ? '#ef4444' : '#D7D8FF'}`,
                            borderRadius: '8px',
                            outline: 'none',
                            transition: 'border-color 0.2s',
                            boxSizing: 'border-box'
                        }}
                        onFocus={(e) => e.target.style.borderColor = '#313283'}
                        onBlur={(e) => {
                            if (!errors.phone_number) {
                                e.target.style.borderColor = '#D7D8FF';
                            }
                        }}
                    />
                    {errors.phone_number && (
                        <p style={{ fontSize: '12px', color: '#ef4444', marginTop: '4px' }}>
                            {errors.phone_number}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}

// Export validation function for use in App.jsx
export function validateStepSeven(userInfo) {
    const errors = {};

    if (!userInfo.full_name || userInfo.full_name.trim() === '') {
        errors.full_name = 'Full name is required';
    }

    if (!userInfo.email || userInfo.email.trim() === '') {
        errors.email = 'Email is required';
    } else {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!re.test(userInfo.email)) {
            errors.email = 'Please enter a valid email address';
        }
    }

    if (!userInfo.phone_number || userInfo.phone_number.trim() === '') {
        errors.phone_number = 'Phone number is required';
    }

    return {
        isValid: Object.keys(errors).length === 0,
        errors
    };
}
