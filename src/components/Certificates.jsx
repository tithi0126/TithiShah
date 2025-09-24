import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCertificates } from '../hooks/useCertificates';
import toast from 'react-hot-toast';

const Certificates = () => {
    const { 
        filteredCertificates, 
        categoriesWithCounts, 
        selectedCategory, 
        setSelectedCategory, 
        searchTerm, 
        setSearchTerm,
        allCertificates 
    } = useCertificates();

    const handleCertificateView = (file, name) => {
        window.open(file, '_blank', 'noopener,noreferrer');
    };

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

    const cardVariants = {
        hidden: { y: 50, opacity: 0, scale: 0.9 },
        visible: {
            y: 0,
            opacity: 1,
            scale: 1,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 15
            }
        },
        exit: {
            y: -50,
            opacity: 0,
            scale: 0.9,
            transition: {
                duration: 0.3
            }
        }
    };
    
    return (
        <section id="certificates" className="certificates">
            <div className="container">
                <motion.h2 
                    className="section-title"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    Certificates & Achievements
                </motion.h2>

                {/* Search and Filter Controls */}
                <motion.div 
                    className="certificates-controls"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                >
                    <div className="search-container">
                        <motion.div 
                            className="search-input-container"
                            whileFocus={{ scale: 1.02 }}
                        >
                            <i className="fas fa-search search-icon" aria-hidden="true" />
                            <input
                                type="text"
                                placeholder="Search certificates, issuers, or skills..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="search-input"
                                aria-label="Search certificates"
                            />
                            {searchTerm && (
                                <motion.button
                                    className="clear-search"
                                    onClick={() => setSearchTerm('')}
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    aria-label="Clear search"
                                >
                                    <i className="fas fa-times" aria-hidden="true" />
                                </motion.button>
                            )}
                        </motion.div>
                    </div>

                    <div className="category-filters">
                        {categoriesWithCounts.map((category) => (
                            <motion.button
                                key={category.id}
                                className={`category-btn ${selectedCategory === category.id ? 'active' : ''}`}
                                onClick={() => setSelectedCategory(category.id)}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                aria-label={`Filter by ${category.label}`}
                            >
                                <i className={category.icon} aria-hidden="true" />
                                {category.label}
                                <span className="count-badge">{category.count}</span>
                            </motion.button>
                        ))}
                    </div>
                </motion.div>

                {/* Certificates Grid */}
                <AnimatePresence mode="wait">
                    <motion.div 
                        key={`${selectedCategory}-${searchTerm}`}
                        className="certificates-grid"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                    >
                        {filteredCertificates.map((cert) => (
                            <motion.div 
                                key={cert.id}
                                className={`certificate-card ${cert.featured ? 'featured' : ''} ${cert.verified ? 'verified' : ''}`}
                                variants={cardVariants}
                                layout
                                whileHover={{ 
                                    y: -5,
                                    transition: { duration: 0.3 }
                                }}
                            >
                                <div className="certificate-header">
                                    <motion.h3
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.2 }}
                                    >
                                        {cert.name}
                                    </motion.h3>
                                    
                                    <motion.div 
                                        className="certificate-meta"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.3 }}
                                    >
                                        <span className="issuer">
                                            <i className="fas fa-university" aria-hidden="true" />
                                            {cert.issuer}
                                        </span>
                                        <span className="date">
                                            <i className="fas fa-calendar" aria-hidden="true" />
                                            {cert.date}
                                        </span>
                                        {cert.verified && (
                                            <span className="verified-badge">
                                                <i className="fas fa-check-circle" aria-hidden="true" />
                                                Verified
                                            </span>
                                        )}
                                    </motion.div>
                                </div>
                                
                                <motion.div 
                                    className="certificate-skills"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.4 }}
                                >
                                    {cert.skills.map((skill, index) => (
                                        <motion.span 
                                            key={skill}
                                            className="skill-tag"
                                            initial={{ opacity: 0, scale: 0 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ delay: 0.4 + index * 0.1 }}
                                            whileHover={{ scale: 1.1 }}
                                        >
                                            {skill}
                                        </motion.span>
                                    ))}
                                </motion.div>
                                
                                <motion.button
                                    className="view-certificate-btn"
                                    onClick={() => handleCertificateView(cert.file, cert.name)}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.5 }}
                                    aria-label={`View ${cert.name} certificate`}
                                >
                                    <i className="fas fa-external-link-alt" aria-hidden="true" />
                                    View Certificate
                                </motion.button>
                            </motion.div>
                        ))}
                    </motion.div>
                </AnimatePresence>
                
                {/* No Results Message */}
                {filteredCertificates.length === 0 && (
                    <motion.div 
                        className="no-certificates"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <i className="fas fa-search" aria-hidden="true" />
                        <h3>No certificates found</h3>
                        <p>Try adjusting your search terms or filters.</p>
                        <motion.button
                            className="btn btn-secondary"
                            onClick={() => {
                                setSearchTerm('');
                                setSelectedCategory('all');
                            }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <i className="fas fa-refresh" aria-hidden="true" />
                            Reset Filters
                        </motion.button>
                    </motion.div>
                )}

                {/* Summary Stats */}
                <motion.div 
                    className="certificates-summary"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.6 }}
                >
                    <div className="summary-item">
                        <span className="summary-number">{allCertificates.length}</span>
                        <span className="summary-label">Total Certificates</span>
                    </div>
                    <div className="summary-item">
                        <span className="summary-number">{allCertificates.filter(c => c.verified).length}</span>
                        <span className="summary-label">Verified</span>
                    </div>
                    <div className="summary-item">
                        <span className="summary-number">{new Set(allCertificates.map(c => c.issuer)).size}</span>
                        <span className="summary-label">Institutions</span>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Certificates;
