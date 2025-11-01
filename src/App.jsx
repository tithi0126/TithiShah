import React, { Suspense, lazy, useState, useEffect, useCallback } from 'react';
import { Toaster } from 'react-hot-toast';
import ErrorBoundary from './components/ErrorBoundary';
import LoadingSpinner from './components/LoadingSpinner';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocalStorage } from './hooks/useLocalStorage';

// Lazy load components for better performance
const Header = lazy(() => import('./components/Header'));
const Hero = lazy(() => import('./components/Hero'));
const About = lazy(() => import('./components/About'));
const Skills = lazy(() => import('./components/Skills'));
const Projects = lazy(() => import('./components/Projects'));
const Experience = lazy(() => import('./components/Experience'));
const Contact = lazy(() => import('./components/Contact'));
const Certificates = lazy(() => import('./components/Certificates'));
const Hobby = lazy(() => import('./components/Hobby'));
const Footer = lazy(() => import('./components/Footer'));

const App = () => {
    const [theme, setTheme] = useLocalStorage('theme', 'light'); // 'light' or 'dark'

    const toggleTheme = useCallback(() => {
        setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
    }, [setTheme]);

    // Apply theme to document body
    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        // Update meta theme-color for mobile browsers
        const metaThemeColor = document.querySelector('meta[name="theme-color"]');
        if (metaThemeColor) {
            metaThemeColor.setAttribute('content', getComputedStyle(document.documentElement).getPropertyValue('--background-primary').trim());
        }
    }, [theme]);

    // Loading fallback component
    const LoadingFallback = ({ children }) => (
        <div className="flex items-center justify-center py-8" role="status" aria-label="Loading section">
            <LoadingSpinner size="medium" />
            <span className="sr-only">Loading {children}...</span>
        </div>
    );

    const pageVariants = {
        initial: { opacity: 0, y: 20 },
        in: { opacity: 1, y: 0 },
        out: { opacity: 0, y: -20 }
    };

    const pageTransition = {
        type: 'tween',
        ease: 'anticipate',
        duration: 0.5
    };

    // Intersection Observer for fade-in effect on sections
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('fade-in');
                    } else {
                        entry.target.classList.remove('fade-in'); // Optional: remove fade-in when out of view
                    }
                });
            },
            {
                root: null, // viewport
                rootMargin: '0px',
                threshold: 0.1, // Trigger when 10% of the item is visible
            }
        );

        // Observe all sections
        document.querySelectorAll('main section').forEach((section) => {
            observer.observe(section);
        });

        return () => {
            document.querySelectorAll('main section').forEach((section) => {
                observer.unobserve(section);
            });
        };
    }, []);
    
    return (
        <ErrorBoundary>
            <motion.div
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={pageTransition}
            >
                {/* Skip to main content link for accessibility */}
                <a href="#main-content" className="skip-to-main">
                    Skip to main content
                </a>
                
                <Suspense fallback={<LoadingFallback>Navigation</LoadingFallback>}>
                    <Header currentTheme={theme} toggleTheme={toggleTheme} />
                </Suspense>

                <main id="main-content" role="main">
                    <Suspense fallback={<LoadingFallback>Hero section</LoadingFallback>}>
                        <Hero />
                    </Suspense>
                    
                    <Suspense fallback={<LoadingFallback>About section</LoadingFallback>}>
                        <About />
                    </Suspense>
                    
                    <Suspense fallback={<LoadingFallback>Skills section</LoadingFallback>}>
                        <Skills />
                    </Suspense>
                    
                    <Suspense fallback={<LoadingFallback>Projects section</LoadingFallback>}>
                        <Projects />
                    </Suspense>
                    
                    <Suspense fallback={<LoadingFallback>Experience section</LoadingFallback>}>
                        <Experience />
                    </Suspense>
                    
                    <Suspense fallback={<LoadingFallback>Certificates section</LoadingFallback>}>
                        <Certificates />
                    </Suspense>

                    <Suspense fallback={<LoadingFallback>Hobby section</LoadingFallback>}>
                        <Hobby />
                    </Suspense>

                    <Suspense fallback={<LoadingFallback>Contact section</LoadingFallback>}>
                        <Contact />
                    </Suspense>
                    
                    
                </main>

                <Suspense fallback={<LoadingFallback>Footer</LoadingFallback>}>
                    <Footer />
                </Suspense>

                {/* Toast notifications */}
                <Toaster
                    position="top-right"
                    toastOptions={{
                        duration: 4000,
                        style: {
                            background: 'var(--background-secondary)',
                            color: 'var(--text-primary)',
                            border: '1px solid var(--surface-accent)',
                        },
                        success: {
                            iconTheme: {
                                primary: 'var(--primary-brand)',
                                secondary: 'var(--white)',
                            },
                        },
                        error: {
                            iconTheme: {
                                primary: 'var(--text-primary)', /* Using text-primary for error for now */
                                secondary: 'var(--white)',
                            },
                        },
                    }}
                />
            </motion.div>
        </ErrorBoundary>
    );
};

export default App;
