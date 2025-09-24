import React from 'react';
import { motion } from 'framer-motion';
const Experience = () => {
    const experiences = [
        {
            id: 1,
            title: "Software Developer",
            company: "Pragma Infotech",
            period: "June 2024 - Feb 2025",
            type: "work",
            description: "Utilized a range of programming languages including HTML, PHP, Flutter, and JavaScript to drive the development and maintenance of web applications. Engaged in debugging and troubleshooting issues to ensure optimal application performance.",
            achievements: [
                "Developed and maintained 5+ web applications using Php, Flutter, and JavaScript",
                "Improved application performance by 30% through optimization",
                "Collaborated with cross-functional teams on agile development",
                "Implemented responsive design for mobile-first applications"
            ],
            skills: ["HTML", "PHP", "Flutter", "JavaScript", "Debugging", "Performance Optimization"],
            icon: "fas fa-briefcase",
            color: "#be7b2aff"
        },
        {
            id: 2,
            title: "E-Yantra Innovation Competition - Regional Finalist",
            company: "IIT Bombay",
            period: "2023-2024",
            type: "competition",
            description: "Regional Finalist. Designed an AI-powered robotic weed cutter using Python and IoT to reduce herbicide use by 40% through precision weed identification.",
            achievements: [
                "Achieved Regional Finalist status among 1000+ teams",
                "Developed AI model with 92% accuracy in weed detection",
                "Reduced herbicide usage by 40% through precision targeting",
                "Presented solution to industry experts and researchers"
            ],
            skills: ["Python", "OpenCV", "TensorFlow", "IoT", "AI/ML", "Robotics"],
            icon: "fas fa-trophy",
            color: "#be7b2aff"
        },
        {
            id: 3,
            title: "E-Yantra Innovation Competition - Health Tech",
            company: "IIT Bombay",
            period: "2024-2025",
            type: "competition",
            description: "Designed and developed Inner Voice, a smartwatch-based health monitoring system focused on mental wellness, integrating wearable hardware with mobile and web applications.",
            achievements: [
                "Created comprehensive health monitoring ecosystem",
                "Integrated hardware sensors with mobile applications",
                "Developed real-time data visualization dashboard",
                "Focused on mental wellness and preventive healthcare"
            ],
            skills: ["Arduino", "Flutter", "React.js", "IoT", "Hardware Integration", "Health Tech"],
            icon: "fas fa-heart",
            color: "#be7b2aff"
        },
        {
            id: 4,
            title: "Master's in Information Technology",
            company: "University",
            period: "2023 - Present",
            type: "education",
            description: "Pursuing advanced studies in Information Technology with focus on software development, AI/ML, and modern web technologies. Maintaining strong academic performance while working on practical projects.",
            achievements: [
                "Specialized coursework in Data Structures and Algorithms",
                "Advanced studies in Machine Learning and AI",
                "Modern web development frameworks and technologies",
                "Research in innovative technology applications"
            ],
            skills: ["Data Structures", "Algorithms", "AI/ML", "Research", "Academic Excellence"],
            icon: "fas fa-graduation-cap",
            color: "#be7b2aff"
        }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                delayChildren: 0.2,
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { x: -50, opacity: 0 },
        visible: {
            x: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 15
            }
        }
    };

    const timelineVariants = {
        hidden: { scaleY: 0 },
        visible: {
            scaleY: 1,
            transition: {
                duration: 1,
                ease: "easeInOut"
            }
        }
    };
    
    return (
        <section id="experience" className="experience">
            <div className="container">
                <motion.h2 
                    className="section-title"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    Experience & Education
                </motion.h2>
                
                <div className="timeline-container">
                    <motion.div 
                        className="timeline-line"
                        variants={timelineVariants}
                        initial="hidden"
                        animate="visible"
                    />
                    
                    <motion.div 
                        className="timeline"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        {experiences.map((exp, index) => (
                            <motion.div 
                                key={exp.id} 
                                className={`timeline-item ${exp.type}`}
                                variants={itemVariants}
                                whileHover={{ scale: 1.02 }}
                                transition={{ duration: 0.2 }}
                            >
                                <motion.div 
                                    className="timeline-marker"
                                    style={{ backgroundColor: exp.color }}
                                    whileHover={{ scale: 1.2 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <i className={exp.icon} style={{ color: 'white' }} aria-hidden="true" />
                                </motion.div>
                                
                                <motion.div 
                                    className="timeline-content"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.2 + 0.3, duration: 0.5 }}
                                >
                                    <div className="experience-header">
                                        <motion.h3
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: index * 0.2 + 0.4 }}
                                        >
                                            {exp.title}
                                        </motion.h3>
                                        
                                        <motion.div 
                                            className="experience-meta"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: index * 0.2 + 0.5 }}
                                        >
                                            <span className="company" style={{ color: exp.color }}>
                                                {exp.company}
                                            </span>
                                            <span className="period">{exp.period}</span>
                                        </motion.div>
                                    </div>
                                    
                                    <motion.p
                                        className="experience-description"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: index * 0.2 + 0.6 }}
                                    >
                                        {exp.description}
                                    </motion.p>
                                    
                                    <motion.div 
                                        className="achievements"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: index * 0.2 + 0.7 }}
                                    >
                                        <h4>Key Achievements:</h4>
                                        <ul>
                                            {exp.achievements.map((achievement, achIndex) => (
                                                <motion.li 
                                                    key={achIndex}
                                                    initial={{ opacity: 0, x: -20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: index * 0.2 + 0.8 + achIndex * 0.1 }}
                                                >
                                                    <motion.span 
                                                        className="achievement-bullet"
                                                        style={{ backgroundColor: exp.color }}
                                                        whileHover={{ scale: 1.2 }}
                                                    />
                                                    {achievement}
                                                </motion.li>
                                            ))}
                                        </ul>
                                    </motion.div>
                                    
                                    <motion.div 
                                        className="experience-skills"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: index * 0.2 + 1 }}
                                    >
                                        {exp.skills.map((skill, skillIndex) => (
                                            <motion.span 
                                                key={skill}
                                                className="skill-tag"
                                                style={{ borderColor: exp.color, color: exp.color }}
                                                initial={{ opacity: 0, scale: 0 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                transition={{ delay: index * 0.2 + 1.1 + skillIndex * 0.05 }}
                                                whileHover={{ 
                                                    backgroundColor: exp.color,
                                                    color: 'white',
                                                    scale: 1.05
                                                }}
                                            >
                                                {skill}
                                            </motion.span>
                                        ))}
                                    </motion.div>
                                </motion.div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Experience;
