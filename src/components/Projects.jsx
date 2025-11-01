import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import toast from 'react-hot-toast';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { image } from 'framer-motion/client';
import projectsData from '../data/projectsData'; // Import project data
import ProjectCard from './ProjectCard'; // Import the new ProjectCard component

const Projects = () => {
    const [filter, setFilter] = useState('all');
    const [hoveredProject, setHoveredProject] = useState(null);
    const [showPrivate, setShowPrivate] = useState(false); // New state for toggling private projects

    const projects = projectsData; // Use imported project data

    const categories = [
        { id: 'all', label: 'All Projects', icon: 'fas fa-th' },
        { id: 'mobile', label: 'Mobile Apps', icon: 'fas fa-mobile-alt' },
        { id: 'web', label: 'Web Apps', icon: 'fas fa-globe' },
        { id: 'ai', label: 'AI/ML', icon: 'fas fa-brain' },
        { id: 'iot', label: 'IoT', icon: 'fas fa-microchip' }
    ];

    const filteredProjects = projects.filter(project => {
        const matchesCategory = filter === 'all' || (Array.isArray(project.category) ? project.category.includes(filter) : project.category === filter);
        const matchesVisibility = showPrivate || project.visibility === 'public';
        return matchesCategory && matchesVisibility;
    });

    const handleLinkClick = (url, type) => {
        if (url === '#') {
            toast.error(`${type} link coming soon!`);
            return;
        }
        window.open(url, '_blank', 'noopener,noreferrer');
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

    const filterVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.3
            }
        }
    };
    
    return (
        <section id="projects" className="projects">
            <div className="container">
                <motion.h2 
                    className="section-title"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    My Projects
                </motion.h2>

                {/* Project Filters */}
                <motion.div 
                    className="project-filters"
                    variants={filterVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {categories.map((category) => (
                        <motion.button
                            key={category.id}
                            className={`filter-btn ${filter === category.id ? 'active' : ''}`}
                            onClick={() => setFilter(category.id)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            aria-label={`Filter by ${category.label}`}
                        >
                            <i className={category.icon} aria-hidden="true" />
                            {category.label}
                        </motion.button>
                    ))}
                    <motion.button
                        className={`filter-btn ${showPrivate ? 'active' : ''}`}
                        onClick={() => setShowPrivate(!showPrivate)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        aria-label="Toggle private projects"
                    >
                        <i className={`fas ${showPrivate ? 'fa-eye' : 'fa-eye-slash'}`} aria-hidden="true" />
                        {showPrivate ? 'Hide Private' : 'Show Private'}
                    </motion.button>
                </motion.div>

                {/* GitHub Repo Legend */}
                <motion.div
                    className="repo-legend"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7, duration: 0.6 }}
                >
                    <span className="legend-item">
                        <i className="fab fa-github public-repo-icon" aria-hidden="true" /> Public Repository
                    </span>
                    <span className="legend-item">
                        <i className="fab fa-github private-repo-icon" aria-hidden="true" /> Private Repository
                    </span>
                </motion.div>
                
                <AnimatePresence mode="wait">
                    <motion.div 
                        key={filter}
                        className="projects-grid"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                    >
                        {filteredProjects.map((project) => (
                            <ProjectCard 
                                key={project.id}
                                project={project}
                                hoveredProject={hoveredProject}
                                setHoveredProject={setHoveredProject}
                                handleLinkClick={handleLinkClick}
                                cardVariants={cardVariants}
                            />
                        ))}
                    </motion.div>
                </AnimatePresence>
                
                {filteredProjects.length === 0 && (
                    <motion.div 
                        className="no-projects"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <i className="fas fa-search" aria-hidden="true" />
                        <p>No projects found in this category.</p>
                    </motion.div>
                )}
            </div>
        </section>
    );
};

export default Projects;
