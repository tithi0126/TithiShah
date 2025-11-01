import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Header = ({ currentTheme, toggleTheme }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isDesktop, setIsDesktop] = useState(window.innerWidth > 768); // New state for desktop view
    
    const toggleMenu = useCallback(() => {
        setIsMenuOpen(prev => !prev);
    }, []);

    const closeMenu = useCallback(() => {
        setIsMenuOpen(false);
    }, []);

    // Handle scroll effect for header
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Handle window resize to determine desktop/mobile view
    useEffect(() => {
        const handleResize = () => {
            setIsDesktop(window.innerWidth > 768);
            if (window.innerWidth > 768 && isMenuOpen) {
                setIsMenuOpen(false); // Close menu if resized to desktop
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [isMenuOpen]);

    // Handle escape key to close menu
    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape') {
                setIsMenuOpen(false);
            }
        };

        if (isMenuOpen) {
            document.addEventListener('keydown', handleEscape);
            document.body.style.overflow = 'hidden'; // Prevent scroll when menu is open
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = 'unset';
        };
    }, [isMenuOpen]);

    // Smooth scroll to section
    const scrollToSection = useCallback((e, targetId) => {
        e.preventDefault();
        closeMenu();
        
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const headerHeight = 80;
            const elementPosition = targetElement.offsetTop - headerHeight;
            
            window.scrollTo({
                top: elementPosition,
                behavior: 'smooth'
            });
        }
    }, [closeMenu]);

    const navigationItems = [
        { href: '#home', label: 'Home' },
        { href: '#about', label: 'About' },
        { href: '#skills', label: 'Skills' },
        { href: '#projects', label: 'Projects' },
        { href: '#experience', label: 'Experience' },
        { href: '#certificates', label: 'Certificates' },
        { href: '#hobby', label: 'Hobby' },
        { href: '#contact', label: 'Contact' }
        
    ];

    const menuVariants = {
        closed: {
            opacity: 0,
            x: '100%', // Slide out to the right
            transition: {
                duration: 0.3
            }
        },
        open: {
            opacity: 1,
            x: '0%', // Slide in
            transition: {
                duration: 0.3
            }
        }
    };
    
    return (
        <motion.header 
            className={`header ${isScrolled ? 'scrolled' : ''}`}
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="container">
                <nav className="nav-container" role="navigation" aria-label="Main navigation">
                    <motion.div 
                        className="logo"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <a href="#home" onClick={(e) => scrollToSection(e, '#home')}>
                            Tithi Shah
                        </a>
                    </motion.div>
                    
                    {isDesktop ? ( // Render desktop nav links directly
                        <ul id="nav-menu" className="nav-links">
                            {navigationItems.map((item) => (
                                <li key={item.href}>
                                    <a 
                                        href={item.href} 
                                        onClick={(e) => scrollToSection(e, item.href)}
                                        className="nav-link"
                                    >
                                        {item.label}
                                    </a>
                                </li>
                            ))}
                            <li>
                                {/* <button 
                                    className="btn-icon theme-toggle-btn"
                                    onClick={toggleTheme}
                                    aria-label={currentTheme === 'light' ? 'Switch to dark theme' : 'Switch to light theme'}
                                >
                                    <motion.i 
                                        className={`fas ${currentTheme === 'light' ? 'fa-moon' : 'fa-sun'}`}
                                        key={currentTheme}
                                        initial={{ scale: 0.8, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        exit={{ scale: 0.8, opacity: 0 }}
                                        transition={{ duration: 0.2 }}
                                    />
                                </button> */}
                            </li>
                        </ul>
                    ) : ( // Render mobile nav links with animation
                        <AnimatePresence>
                            {isMenuOpen && (
                                <motion.ul 
                                    id="nav-menu"
                                    className={`nav-links ${isMenuOpen ? 'active' : ''}`}
                                    variants={menuVariants}
                                    initial="closed"
                                    animate="open"
                                    exit="closed"
                                >
                                    {navigationItems.map((item, index) => (
                                        <motion.li 
                                            key={item.href}
                                            initial={{ opacity: 0, y: -20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: index * 0.1 }}
                                        >
                                            <a 
                                                href={item.href} 
                                                onClick={(e) => scrollToSection(e, item.href)}
                                                className="nav-link"
                                            >
                                                {item.label}
                                            </a>
                                        </motion.li>
                                    ))}
                                    <motion.li
                                        initial={{ opacity: 0, y: -20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: navigationItems.length * 0.1 }}
                                    >
                                        <button 
                                            className="btn-icon theme-toggle-btn"
                                            onClick={toggleTheme}
                                            aria-label={currentTheme === 'light' ? 'Switch to dark theme' : 'Switch to light theme'}
                                        >
                                            <motion.i 
                                                className={`fas ${currentTheme === 'light' ? 'fa-moon' : 'fa-sun'}`}
                                                key={currentTheme}
                                                initial={{ scale: 0.8, opacity: 0 }}
                                                animate={{ scale: 1, opacity: 1 }}
                                                exit={{ scale: 0.8, opacity: 0 }}
                                                transition={{ duration: 0.2 }}
                                            />
                                        </button>
                                    </motion.li>
                                </motion.ul>
                            )}
                        </AnimatePresence>
                    )}
                    
                    {!isDesktop && ( // Only show mobile menu button on non-desktop
                            <button 
                                className="mobile-menu-btn"
                                onClick={toggleMenu}
                                aria-expanded={isMenuOpen}
                                aria-controls="nav-menu"
                                aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
                            >
                                <motion.i 
                                    className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'}`}
                                    animate={{ rotate: isMenuOpen ? 180 : 0 }}
                                    transition={{ duration: 0.3 }}
                                />
                            </button>
                        )}
                </nav>
            </div>
            
            {/* Mobile menu overlay */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        className="mobile-menu-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={closeMenu}
                        aria-hidden="true"
                    />
                )}
            </AnimatePresence>
        </motion.header>
    );
};

export default Header;
