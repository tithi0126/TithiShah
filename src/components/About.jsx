import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const About = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                delayChildren: 0.2,
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { y: 30, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 12
            }
        }
    };

    const imageVariants = {
        hidden: { scale: 0.8, opacity: 0 },
        visible: {
            scale: 1,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 15
            }
        }
    };

    const handleScrollToSection = (sectionId) => {
        const element = document.querySelector(sectionId);
        if (element) {
            const headerHeight = 80;
            const elementPosition = element.offsetTop - headerHeight;
            
            window.scrollTo({
                top: elementPosition,
                behavior: 'smooth'
            });
        }
    };

    const handleDownloadCV = () => {
        // Create a link element and trigger download
        const link = document.createElement('a');
        link.href = '/resume.pdf'; // Make sure to add your resume PDF to public folder
        link.download = 'Tithi_Shah_Resume.pdf';
        link.click();
    };
    
    return (
        <section id="about" className="about">
            <div className="container">
                <motion.h2 
                    className="section-title"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    About Me
                </motion.h2>
                
                <motion.div 
                    className="about-content"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <motion.div className="about-img" variants={imageVariants}>
                        <LazyLoadImage
                            src="../profile_photo.jpg"
                            alt="Tithi Shah - Software Developer"
                            className="profile-img"
                            effect="blur"
                            threshold={100}
                            placeholder={<div className="image-placeholder">Loading...</div>}
                            onError={(e) => {
                                e.target.src = '/default-avatar.jpg'; // Fallback image
                            }}
                        />
                        <motion.div 
                            className="profile-decoration"
                            animate={{
                                rotate: [0, 10, -10, 0],
                                scale: [1, 1.05, 1]
                            }}
                            transition={{
                                duration: 4,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        />
                    </motion.div>
                    
                    <motion.div className="about-text" variants={itemVariants}>
                        <motion.h3 variants={itemVariants}>
                            Hi, I'm <span className="highlight">Tithi Shah</span>
                        </motion.h3>
                        
                        <motion.p variants={itemVariants}>
                            Full-Stack Developer (Flutter & MERN) pursuing a Master's in IT with 
                            hands-on experience in AI/ML, mobile development, and scalable systems.
                        </motion.p>
                        
                        <motion.p variants={itemVariants}>
                            I have a strong foundation in data structures, algorithms, and Linux environments. 
                            My passion lies in creating innovative solutions that solve real-world problems 
                            through clean, efficient code.
                        </motion.p>
                        
                        <motion.p variants={itemVariants}>
                            I've participated in prestigious competitions like <strong>E-Yantra Innovation Competition at IIT Bombay</strong>, 
                            where I developed AI-powered solutions for agricultural and healthcare challenges, 
                            showcasing my ability to apply technology for social impact.
                        </motion.p>
                        
                        <motion.div className="about-stats" variants={itemVariants}>
                            <div className="stat-item">
                                <span className="stat-number">10+</span>
                                <span className="stat-label">Projects</span>
                            </div>
                            <div className="stat-item">
                                <span className="stat-number">3+</span>
                                <span className="stat-label">Years Experience</span>
                            </div>
                            <div className="stat-item">
                                <span className="stat-number">10+</span>
                                <span className="stat-label">Technologies</span>
                            </div>
                        </motion.div>
                        
                        <motion.div className="hero-btns" variants={itemVariants}>
                            <motion.button
                                className="btn btn-primary"
                                onClick={() => handleScrollToSection('#contact')}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                aria-label="Contact me for opportunities"
                            >
                                <i className="fas fa-handshake" aria-hidden="true"></i>
                                Hire Me
                            </motion.button>
                            
                            <motion.button
                                className="btn btn-secondary"
                                onClick={handleDownloadCV}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                aria-label="Download my resume"
                            >
                                <i className="fas fa-download" aria-hidden="true"></i>
                                Download CV
                            </motion.button>
                        </motion.div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default About;
