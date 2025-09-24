import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import toast from 'react-hot-toast';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { image } from 'framer-motion/client';

const Projects = () => {
    const [filter, setFilter] = useState('all');
    const [hoveredProject, setHoveredProject] = useState(null);
    const [showPrivate, setShowPrivate] = useState(false); // New state for toggling private projects

    const projects = [
        {
            id: 1,
            title: "FinologyX - Financial Calculator",
            description: "Mobile application offering a complete suite of financial and mathematical calculators using Flutter and MVC architecture. Features include compound interest, loan calculations, and investment planning tools.",
            fullDescription: "A comprehensive financial calculator mobile application built with Flutter, featuring over 20+ financial calculators including compound interest, EMI, SIP, tax calculators, and more. Implements clean MVC architecture with local data persistence and API integration for real-time currency conversion.",
            tags: ["Flutter", "Dart", "MVC", "API Integration", "Mobile"],
            category: "mobile",
            links: {
                live: "https://play.google.com/store/apps/details?id=com.app.finologyx",
                code: "https://github.com/tithi0126/finologyx"
            },
            image: "/Finology_logo.png",
            status: "live",
            featured: true,
            visibility: "public",
            isGithubPrivate: true // Public repo
        },
        {
            id: 2,
            title: "Inner Voice - Health Monitoring",
            description: "Smartwatch-based health monitoring system focused on mental wellness, integrating wearable hardware with mobile and web applications.",
            fullDescription: "An innovative IoT-based health monitoring system that combines smartwatch hardware with mobile and web applications. The system monitors vital signs, stress levels, and mental wellness indicators, providing real-time insights and alerts to users and healthcare providers.",
            tags: ["Arduino", "Flutter", "React.js", "REST API", "IoT", "Hardware"],
            category: ["iot", "mobile", "web"," ai"],
            links: {
                live: "#",
                code: "https://github.com/innervoicehealingconversation"
            },
            image: "/inner_voice_logo.png",
            status: "development",
            featured: true,
            visibility: "public", // Set to private for testing
            isGithubPrivate: true // Private repo
        },
        {
            id: 3,
            title: "Root Out - AI Weed Cutter",
            description: "AI-powered robotic weed cutter using Python (OpenCV, TensorFlow) and IoT to reduce herbicide use through precision weed identification.",
            fullDescription: "An AI-powered agricultural robot that uses computer vision and machine learning to identify and eliminate weeds with precision. The system reduces herbicide usage by 40% while maintaining crop health through selective weed removal. Features real-time image processing, GPS navigation, and IoT connectivity.",
            tags: ["Python", "OpenCV", "TensorFlow", "IoT", "AI/ML", "Robotics"],
            category: ["ai", "iot"],
            links: {
                live: "#",
                code: "#"
            },
            image: "/RootOut_Logo.png",
            status: "completed",
            featured: true,
            visibility: "public",
            isGithubPrivate: false // Public repo
        },
        {
            id: 4,
            title: "Rowan Decor",
            description: "Flutter-based application for home decor services with intuitive UI and seamless user experience.",
            fullDescription: "A comprehensive home decor service application built with Flutter, featuring catalog browsing, service booking, real-time chat with designers, augmented reality preview, and integrated payment gateway. Includes admin panel for service management.",
            tags: ["Flutter", "Dart", "UI/UX", "Firebase", "Payment Gateway"],
            category: "mobile",
            links: {
                live: "#",
                code: "https://github.com/rachna0206/rowan_user"
            },
            image:"/RowanDecor_Logo.jpg",
            status: "completed",
            featured: false,
            visibility: "public",
            isGithubPrivate: true // Private repo
        },
        {
            id: 5,
            title: "Borana Weaves",
            description: "Website for Borana, showcasing their services and portfolio.",
            fullDescription: "A professional website developed for Borana, providing information about their company, services, and contact details. Designed for a clean user experience and responsive across devices.",
            tags: ["Web Development", "HTML", "CSS", "JavaScript","Php"],
            category: "web",
            links: {
                live: "https://www.boranagroup.in/",
                code: "https://github.com/roshnirana-2/borana"
            },
            image: "/borana-weaves-logo.png", 
            status: "live",
            featured: false,
            visibility: "public",
            isGithubPrivate: true // Public repo
        }
    ];

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
                            <motion.div 
                                key={project.id} 
                                className={`project-card ${project.featured ? 'featured' : ''}`}
                                variants={cardVariants}
                                layout
                                whileHover={{ 
                                    y: -10,
                                    transition: { duration: 0.3 }
                                }}
                                onHoverStart={() => setHoveredProject(project.id)}
                                onHoverEnd={() => setHoveredProject(null)}
                            >
                                <div className="project-img">
                                    {project.image ? (
                                        <LazyLoadImage
                                            src={project.image}
                                            alt={`${project.title} screenshot`}
                                            effect="blur"
                                            threshold={100}
                                            className="project-image"
                                            onError={(e) => {
                                                e.target.style.display = 'none';
                                                e.target.nextSibling.style.display = 'flex';
                                            }}
                                        />
                                    ) : null}
                                    
                                    <motion.div 
                                        className="project-icon-container"
                                        style={{ 
                                            display: project.image ? 'none' : 'flex'
                                        }}
                                        animate={{
                                            scale: hoveredProject === project.id ? 1.1 : 1,
                                            rotate: hoveredProject === project.id ? 5 : 0
                                        }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <i className={project.icon} aria-hidden="true" />
                                    </motion.div>
                                    
                                </div>
                                
                                <div className="project-content">
                                    <motion.h3
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.2 }}
                                    >
                                        {project.title}
                                        
                                        {/* {project.featured && (
                                            <motion.span 
                                                className="featured-badge"
                                                animate={{ rotate: [0, 10, -10, 0] }}
                                                transition={{ duration: 2, repeat: Infinity }}
                                            >
                                                ⭐
                                            </motion.span>
                                        )} */}
                                        <br></br>
                                    </motion.h3>
                                    <br></br>
                                        <span className={`status-badge ${project.status} title-status-badge`}>
                                            {project.status === 'live'}
                                            {project.status === 'development'}
                                            {project.status === 'completed' }
                                            {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                                        </span>
                                    <motion.p
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.3 }}
                                    >
                                        {hoveredProject === project.id ? project.fullDescription : project.description}
                                    </motion.p>
                                    
                                    <motion.div 
                                        className="project-tags"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.4 }}
                                    >
                                        {project.tags.map((tag, index) => (
                                            <motion.span 
                                                key={tag} 
                                                className="tag"
                                                initial={{ opacity: 0, scale: 0 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                transition={{ delay: 0.4 + index * 0.1 }}
                                                whileHover={{ scale: 1.1 }}
                                            >
                                                {tag}
                                            </motion.span>
                                        ))}
                                    </motion.div>
                                    
                                    <motion.div 
                                        className="project-links"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.5 }}
                                    >
                                        <motion.button
                                            className="project-link"
                                            onClick={() => handleLinkClick(project.links.live, 'Live Demo')}
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            disabled={project.links.live === '#'}
                                        >
                                            <i className="fas fa-external-link-alt" aria-hidden="true" /> 
                                            Live Demo
                                        </motion.button>
                                        
                                        <motion.button
                                            className={`project-link ${project.isGithubPrivate ? 'private-repo' : 'public-repo'}`}
                                            onClick={() => handleLinkClick(project.links.code, 'Source Code')}
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            disabled={project.links.code === '#'}
                                        >
                                            <i className={`fab fa-github ${project.isGithubPrivate ? 'private-repo-icon' : 'public-repo-icon'}`} aria-hidden="true" /> 
                                            Code
                                        </motion.button>
                                    </motion.div>
                                </div>
                            </motion.div>
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
