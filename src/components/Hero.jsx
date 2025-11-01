import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
const Hero = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                delayChildren: 0.3,
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { y: 50, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 10
            }
        }
    };

    const buttonVariants = {
        hover: {
            scale: 1.05,
            transition: {
                type: "spring",
                stiffness: 400,
                damping: 10
            }
        },
        tap: {
            scale: 0.95
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
    
    return (
        <section id="home" className="hero">
            <div className="container">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="hero-content"
                >
                    <motion.div variants={itemVariants} className="hero-greeting">
                        <span className="hero-greeting-text">Hello, I'm</span>
                    </motion.div>
                    
                    <motion.h1 variants={itemVariants} className="hero-title">
                        <span className="hero-name">Tithi Shah</span>
                        <br />
                        <span className="hero-role">Full-Stack Developer</span>
                    </motion.h1>
                    
                    <motion.p variants={itemVariants} className="hero-description">
                        Passionate about solving complex problems through code. 
                        Strong foundation in data structures, algorithms, and Linux environments.
                        I build scalable web applications with modern technologies.
                    </motion.p>
                    
                    <motion.div variants={itemVariants} className="hero-stats">
                        <div className="stat-item">
                            <span className="stat-number">3+</span>
                            <span className="stat-label">Years Experience</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-number">10+</span>
                            <span className="stat-label">Projects Completed</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-number">10+</span>
                            <span className="stat-label">Technologies</span>
                        </div>
                    </motion.div>
                    
                    <motion.div variants={itemVariants} className="hero-btns">
                        <motion.button
                            className="btn btn-primary"
                            variants={buttonVariants}
                            whileHover="hover"
                            whileTap="tap"
                            onClick={() => handleScrollToSection('#projects')}
                            aria-label="View my work and projects"
                        >
                            <i className="fas fa-code" aria-hidden="true"></i>
                            View My Work
                        </motion.button>
                        
                        <motion.button
                            className="btn btn-secondary"
                            variants={buttonVariants}
                            whileHover="hover"
                            whileTap="tap"
                            onClick={() => handleScrollToSection('#contact')}
                            aria-label="Get in touch with me"
                        >
                            <i className="fas fa-envelope" aria-hidden="true"></i>
                            Get In Touch
                        </motion.button>
                    </motion.div>
                    
                    <motion.div 
                        variants={itemVariants} 
                        className="hero-social"
                        role="complementary"
                        aria-label="Social media links"
                    >
                        <motion.a
                            href="https://github.com/tithi0126"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="social-link"
                            whileHover={{ scale: 1.2, rotate: 5 }}
                            whileTap={{ scale: 0.9 }}
                            aria-label="Visit my GitHub profile"
                        >
                            <i className="fab fa-github" aria-hidden="true"></i>
                        </motion.a>
                        
                        <motion.a
                            href="https://www.linkedin.com/in/tithishah01"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="social-link"
                            whileHover={{ scale: 1.2, rotate: -5 }}
                            whileTap={{ scale: 0.9 }}
                            aria-label="Visit my LinkedIn profile"
                        >
                            <i className="fab fa-linkedin" aria-hidden="true"></i>
                        </motion.a>
                    </motion.div>
                </motion.div>
                
                {/* Animated background elements */}
                <div className="hero-bg-elements" aria-hidden="true">
                    <motion.div
                        className="floating-element element-1"
                        animate={{
                            y: [-20, 20, -20],
                            rotate: [0, 10, 0]
                        }}
                        transition={{
                            duration: 6,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    />
                    <motion.div
                        className="floating-element element-2"
                        animate={{
                            y: [20, -20, 20],
                            rotate: [0, -10, 0]
                        }}
                        transition={{
                            duration: 8,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    />
                </div>
            </div>
        </section>
    );
};

export default Hero;
