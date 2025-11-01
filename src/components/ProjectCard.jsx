import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import toast from 'react-hot-toast';
import 'react-lazy-load-image-component/src/effects/blur.css';

const ProjectCard = ({ project, hoveredProject, setHoveredProject, handleLinkClick, cardVariants }) => {
    const [currentImageError, setCurrentImageError] = useState(false);

    return (
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
                {project.image && (
                    <LazyLoadImage
                        src={project.image}
                        alt={`${project.title} screenshot`}
                        effect="blur"
                        threshold={100}
                        className="project-image"
                        style={{ display: currentImageError ? 'none' : 'block' }}
                        onError={() => setCurrentImageError(true)}
                    />
                )}
                
                <motion.div 
                    className="project-icon-container"
                    style={{ 
                        display: (!project.image || currentImageError) ? 'flex' : 'none'
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
    );
};

export default ProjectCard;
