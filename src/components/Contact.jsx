import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import LoadingSpinner from './LoadingSpinner';
// Form validation utility
const validateForm = (formData) => {
    const errors = {};
    
    if (!formData.name.trim()) {
        errors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
        errors.name = 'Name must be at least 2 characters';
    }
    
    if (!formData.email.trim()) {
        errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        errors.email = 'Please enter a valid email address';
    }
    
    if (!formData.subject.trim()) {
        errors.subject = 'Subject is required';
    } else if (formData.subject.trim().length < 5) {
        errors.subject = 'Subject must be at least 5 characters';
    }
    
    if (!formData.message.trim()) {
        errors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
        errors.message = 'Message must be at least 10 characters';
    }
    
    return errors;
};

// Input field component
const FormField = ({ label, type = 'text', name, value, onChange, error, required = false, as = 'input', ...props }) => {
    const Component = as;
    
    return (
        <div className="form-group">
            <label htmlFor={name} className="form-label">
                {label}
                {required && <span className="required-asterisk" aria-label="required">*</span>}
            </label>
            <Component
                type={type}
                id={name}
                name={name}
                className={`form-control ${error ? 'error' : ''}`}
                value={value}
                onChange={onChange}
                required={required}
                aria-invalid={error ? 'true' : 'false'}
                aria-describedby={error ? `${name}-error` : undefined}
                {...props}
            />
            {error && (
                <span id={`${name}-error`} className="error-message" role="alert">
                    <i className="fas fa-exclamation-circle" aria-hidden="true"></i>
                    {error}
                </span>
            )}
        </div>
    );
};

FormField.propTypes = {
    label: PropTypes.string.isRequired,
    type: PropTypes.string,
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    error: PropTypes.string,
    required: PropTypes.bool,
    as: PropTypes.string
};

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    const handleChange = useCallback((e) => {
        const { name, value } = e.target;
        
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        
        // Clear error for this field when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    }, [errors]);
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Validate form
        const validationErrors = validateForm(formData);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            toast.error('Please fix the errors in the form');
            return;
        }
        
        setIsSubmitting(true);
        try {
            const response = await fetch(' https://tithishah-backend.onrender.com/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
                }
            );

            const data = await response.json();
            console.log("recieved data :"+data);
            if (response.ok) {
                toast.success('Message sent successfully! I\'ll get back to you soon.');
                setFormData({
                    name: '',
                    email: '',
                    subject: '',
                    message: ''
                });
                setErrors({});
            } else {
                throw new Error(data.msg || 'Failed to send message');
            }
        } catch (error) {
            console.error('Submission error:', error);
            toast.error('Failed to send message. Please try again later or contact me directly.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const containerVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5 }
        }
    };
    
    return (
        <section id="contact" className="contact">
            <div className="container">
                <motion.h2 
                    className="section-title"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    Get In Touch
                </motion.h2>
                
                <motion.div 
                    className="contact-container"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <motion.div className="contact-info" variants={itemVariants}>
                        <motion.div className="contact-item" variants={itemVariants}>
                            <div className="contact-icon">
                                <i className="fas fa-envelope" aria-hidden="true"></i>
                            </div>
                            <div>
                                <h3>Email</h3>
                                <a href="mailto:tithishah26@gmail.com" className="contact-link">
                                    tithishah26@gmail.com
                                </a>
                            </div>
                        </motion.div>
                        
                        <motion.div className="contact-item" variants={itemVariants}>
                            <div className="contact-icon">
                                <i className="fas fa-phone" aria-hidden="true"></i>
                            </div>
                            <div>
                                <h3>Phone</h3>
                                <a href="tel:+919825600097" className="contact-link">
                                    +91 98256 00097
                                </a>
                            </div>
                        </motion.div>
                        
                        <motion.div className="contact-item" variants={itemVariants}>
                            <div className="contact-icon">
                                <i className="fas fa-map-marker-alt" aria-hidden="true"></i>
                            </div>
                            <div>
                                <h3>Location</h3>
                                <p>Surat, Gujarat, India</p>
                            </div>
                        </motion.div>
                        
                        <motion.div className="contact-item" variants={itemVariants}>
                            <div className="contact-icon">
                                <i className="fas fa-share-alt" aria-hidden="true"></i>
                            </div>
                            <div>
                                <h3>Social Profiles</h3>
                                <div className="social-links">
                                    <motion.a
                                        href="https://www.linkedin.com/in/tithishah01"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="social-link"
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                        aria-label="LinkedIn profile"
                                    >
                                        <i className="fab fa-linkedin" aria-hidden="true"></i>
                                    </motion.a>
                                    <motion.a
                                        href="https://github.com/tithi0126"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="social-link"
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                        aria-label="GitHub profile"
                                    >
                                        <i className="fab fa-github" aria-hidden="true"></i>
                                    </motion.a>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                    
                    <motion.div className="contact-form" variants={itemVariants}>
                        <form onSubmit={handleSubmit} noValidate>
                            <FormField
                                label="Your Name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                error={errors.name}
                                required
                                autoComplete="name"
                                placeholder="Enter your full name"
                            />
                            
                            <FormField
                                label="Your Email"
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                error={errors.email}
                                required
                                autoComplete="email"
                                placeholder="your.email@example.com"
                            />
                            
                            <FormField
                                label="Subject"
                                name="subject"
                                value={formData.subject}
                                onChange={handleChange}
                                error={errors.subject}
                                required
                                placeholder="What is this about?"
                            />
                            
                            <FormField
                                label="Message"
                                as="textarea"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                error={errors.message}
                                required
                                placeholder="Tell me about your project or just say hello!"
                                rows={6}
                            />
                            
                            <motion.button
                                type="submit"
                                className="btn btn-primary"
                                disabled={isSubmitting}
                                whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                                whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                                aria-label={isSubmitting ? 'Sending message...' : 'Send message'}
                            >
                                {isSubmitting ? (
                                    <>
                                        <LoadingSpinner size="small" />
                                        <span>Sending...</span>
                                    </>
                                ) : (
                                    <>
                                        <i className="fas fa-paper-plane" aria-hidden="true"></i>
                                        <span>Send Message</span>
                                    </>
                                )}
                            </motion.button>
                        </form>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default Contact;
