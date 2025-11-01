import React from 'react';
import { motion } from 'framer-motion';
const Skills = () => {
    const skillsData = {
        "Programming Languages": {
            skills: ["Java", "C", "C++", "C#", "JavaScript", "HTML/CSS", "MySQL", "DBMS", "Flutter", "Kotlin", "PHP", "Python"],
            icon: "fas fa-code",
            color: "var(--primary-brand)"
        },
        "Frameworks & Tools": {
            skills: [".NET", "Figma", "VS Code", "Android Studio", "Arduino Uno", "GitHub", "Docker", "Git"],
            icon: "fas fa-tools",
            color: "var(--primary-brand)"
        },
        "Soft Skills": {
            skills: ["Problem-Solving & Critical Thinking", "Adaptability & Flexibility", "Team Collaboration", "Effective Communication", "Time Management", "Leadership"],
            icon: "fas fa-users",
            color: "var(--primary-brand)"
        },
        "Operating Systems": {
            skills: ["Unix/Linux", "Windows", "macOS"],
            icon: "fas fa-desktop",
            color: "var(--primary-brand)"
        },
        
        "Full Stack Technologies": {
            skills: ["MERN Stack (MongoDB, Express.js, React.js, Node.js)", "REST APIs",    ],
            icon: "fas fa-layer-group",
            color: "var(--primary-brand)"
        },
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
        }
    };

    const skillItemVariants = {
        hidden: { x: -20, opacity: 0 },
        visible: {
            x: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 200,
                damping: 20
            }
        }
    };
    
    return (
        <section id="skills" className="skills">
            <div className="container">
                <motion.h2 
                    className="section-title"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    Skills & Technologies
                </motion.h2>
                
                <motion.div 
                    className="skills-container"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {Object.entries(skillsData).map(([category, data], categoryIndex) => (
                        <motion.div 
                            key={category} 
                            className="skill-category"
                            variants={cardVariants}
                            whileHover={{ 
                                scale: 1.02,
                                transition: { duration: 0.2 }
                            }}
                        >
                            <motion.h3
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: categoryIndex * 0.1 + 0.3, duration: 0.5 }}
                            >
                                <motion.i 
                                    className={data.icon}
                                    style={{ color: data.color }}
                                    whileHover={{ rotate: 360 }}
                                    transition={{ duration: 0.5 }}
                                    aria-hidden="true"
                                />
                                {category}
                            </motion.h3>
                            
                            <motion.ul 
                                className="skill-list"
                                variants={{
                                    hidden: { opacity: 0 },
                                    visible: {
                                        opacity: 1,
                                        transition: {
                                            delayChildren: categoryIndex * 0.1 + 0.4,
                                            staggerChildren: 0.05
                                        }
                                    }
                                }}
                                initial="hidden"
                                animate="visible"
                            >
                                {data.skills.map((skill, skillIndex) => (
                                    <motion.li 
                                        key={skill}
                                        variants={skillItemVariants}
                                        whileHover={{ 
                                            x: 5,
                                            backgroundColor: `rgba(var(--primary-brand), 0.1)`, /* Use new theme variable */
                                            transition: { duration: 0.2 }
                                        }}
                                        className="skill-item"
                                    >
                                        <motion.span
                                            className="skill-bullet"
                                            style={{ backgroundColor: data.color }}
                                            whileHover={{ scale: 1.2 }}
                                            transition={{ duration: 0.2 }}
                                        />
                                        <span className="skill-name">{skill}</span>
                                        
                                        {/* Skill proficiency indicator */}
                                        <motion.div 
                                            className="skill-level"
                                            initial={{ width: 0 }}
                                            animate={{ 
                                                width: `${Math.random() * 30 + 70}%` // Random between 70-100%
                                            }}
                                            transition={{ 
                                                delay: categoryIndex * 0.1 + skillIndex * 0.05 + 0.5,
                                                duration: 0.8,
                                                ease: "easeOut"
                                            }}
                                            style={{ backgroundColor: data.color }}
                                        />
                                    </motion.li>
                                ))}
                            </motion.ul>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Skills;
