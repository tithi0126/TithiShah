import React from 'react';
import { motion } from 'framer-motion';
const Footer = () => {
    const currentYear = new Date().getFullYear();

    const socialLinks = [
        {
            name: 'LinkedIn',
            url: 'https://www.linkedin.com/in/tithishah01',
            icon: 'fab fa-linkedin',
            color: 'var(--primary-brand)',
            hoverColor: 'var(--text-primary)'
        },
        {
            name: 'GitHub',
            url: 'https://github.com/tithi0126',
            icon: 'fab fa-github',
            color: 'var(--primary-brand)',
            hoverColor: 'var(--text-primary)'
        },
        {
            name: 'Email',
            url: 'mailto:tithishah26@gmail.com',
            icon: 'fas fa-envelope',
            color: 'var(--primary-brand)',
            hoverColor: 'var(--text-primary)'
        },
        {
            name: 'Phone',
            url: 'tel:+919825600097',
            icon: 'fas fa-phone',
            color: 'var(--primary-brand)',
            hoverColor: 'var(--text-primary)'
        }
    ];

    const quickLinks = [
        { name: 'About', href: '#about' },
        { name: 'Skills', href: '#skills' },
        { name: 'Projects', href: '#projects' },
        { name: 'Experience', href: '#experience' },
        { name: 'Contact', href: '#contact' }
    ];

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

    const containerVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                delayChildren: 0.2,
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5 }
        }
    };
    
    return (
        <motion.footer 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <div className="container">
                <div className="footer-main">
                    <motion.div className="footer-section footer-brand" variants={itemVariants}>
                        <motion.div 
                            className="footer-logo"
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.3 }}
                        >
                            Tithi Shah
                        </motion.div>
                        <p className="footer-tagline">
                            Software Developer passionate about creating innovative solutions 
                            that solve real-world problems through clean, efficient code.
                        </p>
                        <div className="footer-contact-info">
                            <div className="contact-item">
                                <i className="fas fa-map-marker-alt" aria-hidden="true" />
                                <span>Surat, Gujarat, India</span>
                            </div><br></br>
                            <div className="contact-item">
                                <i className="fas fa-envelope" aria-hidden="true" />
                                <a href="mailto:tithishah26@gmail.com">tithishah26@gmail.com</a>
                            </div>
                        </div>
                    </motion.div>
                    <motion.div className="footer-section footer-links" variants={itemVariants}>
                        <h4>Quick Links</h4>
                        <ul className="footer-nav">
                            {quickLinks.map((link) => (
                                <motion.li 
                                    key={link.name}
                                    whileHover={{ x: 5 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <a 
                                        href={link.href}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            handleScrollToSection(link.href);
                                        }}
                                        className="footer-link"
                                    >
                                        <i className="fas fa-chevron-right" aria-hidden="true" />
                                        {link.name}
                                    </a>
                                </motion.li>
                            ))}
                        </ul>
                    </motion.div>

                    <motion.div className="footer-section footer-social" variants={itemVariants}>
                        <h4>Connect With Me</h4>
                        <p className="social-description">
                            Let's connect and explore opportunities together!
                        </p>
                        <div className="social-links">
                            {socialLinks.map((social) => (
                                <motion.a
                                    key={social.name}
                                    href={social.url}
                                    target={social.url.startsWith('mailto:') || social.url.startsWith('tel:') ? '_self' : '_blank'}
                                    rel={social.url.startsWith('http') ? 'noopener noreferrer' : undefined}
                                    className="social-link"
                                    whileHover={{ 
                                        scale: 1.2,
                                        rotate: 5,
                                        backgroundColor: 'var(--primary-brand)' /* Use primary brand for hover background */
                                    }}
                                    whileTap={{ scale: 0.9 }}
                                    initial={{ backgroundColor: 'transparent', color: 'var(--primary-brand)', border: '1px solid var(--primary-brand)' }} /* Initial style for social links */
                                    aria-label={`Visit my ${social.name}`}
                                >
                                    <i className={social.icon} aria-hidden="true" />
                                </motion.a>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div className="footer-section footer-newsletter" variants={itemVariants}>
                        <h4>Stay Updated</h4>
                        <p>Get notified about my latest projects and achievements.</p>
                        <br></br>
                        <motion.button
                            className="newsletter-btn"
                            onClick={() => handleScrollToSection('#contact')}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <i className="fas fa-bell" aria-hidden="true" />
                            Get In Touch
                        </motion.button>
                    </motion.div>
                </div>

                <motion.div 
                    className="footer-bottom"
                    variants={itemVariants}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8, duration: 0.5 }}
                >
                    <div className="footer-divider" />
                    <div className="footer-copyright">
                        <div className="copyright-text">
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 1, duration: 0.5 }}
                            >
                                © {currentYear} <strong>Tithi Shah</strong>. All Rights Reserved.
                            </motion.p>
                            {/* <motion.p 
                                className="built-with"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 1.2, duration: 0.5 }}
                            >
                                Built with ❤️ using React, Vite & modern web technologies
                            </motion.p> */}
                        </div>
                        
                        <motion.div 
                            className="scroll-to-top"
                            whileHover={{ scale: 1.1, y: -2 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1.4, duration: 0.5 }}
                            role="button"
                            tabIndex={0}
                            aria-label="Scroll to top"
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                    e.preventDefault();
                                    window.scrollTo({ top: 0, behavior: 'smooth' });
                                }
                            }}
                        >
                            <i className="fas fa-chevron-up" aria-hidden="true" />
                        </motion.div>
                    </div>
                </motion.div>
            </div>
            
            {/* Animated background elements */}
            <div className="footer-bg-elements" aria-hidden="true">
                <motion.div
                    className="bg-circle circle-1"
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.1, 0.2, 0.1]
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
                <motion.div
                    className="bg-circle circle-2"
                    animate={{
                        scale: [1.2, 1, 1.2],
                        opacity: [0.2, 0.1, 0.2]
                    }}
                    transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
            </div>
        </motion.footer>
    );
};

export default Footer;
