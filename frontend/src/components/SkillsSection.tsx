"use client";

import { motion, useScroll, useTransform } from 'framer-motion';
import {
    SiTypescript,
    SiAngular,
    SiNextdotjs,
    SiFlutter,
    SiDotnet,
    SiSpring,
    SiMysql,
    SiDocker,
    SiSharp,
    SiReact,
    SiNodedotjs,
    SiPostgresql,
    SiGit,
    SiFirebase
} from 'react-icons/si';
import { FaJava } from 'react-icons/fa';
import { useRef } from 'react';

const skills = [
    { name: 'Java', icon: <FaJava className="w-full h-full" />, category: 'Lenguajes', color: 'from-[#007396] to-[#007396]/80' },
    { name: 'C#', icon: <SiSharp className="w-full h-full" />, category: 'Lenguajes', color: 'from-[#239120] to-[#239120]/80' },
    { name: 'TypeScript', icon: <SiTypescript className="w-full h-full" />, category: 'Lenguajes', color: 'from-[#3178C6] to-[#3178C6]/80' },
    { name: 'Angular', icon: <SiAngular className="w-full h-full" />, category: 'Frontend', color: 'from-[#DD0031] to-[#DD0031]/80' },
    { name: 'Next.js', icon: <SiNextdotjs className="w-full h-full" />, category: 'Frontend', color: 'from-gray-900 to-gray-700' },
    { name: 'React', icon: <SiReact className="w-full h-full" />, category: 'Frontend', color: 'from-[#61DAFB] to-[#61DAFB]/80' },
    { name: 'Flutter', icon: <SiFlutter className="w-full h-full" />, category: 'Mobile', color: 'from-[#02569B] to-[#02569B]/80' },
    { name: '.NET', icon: <SiDotnet className="w-full h-full" />, category: 'Backend', color: 'from-[#512BD4] to-[#512BD4]/80' },
    { name: 'Node.js', icon: <SiNodedotjs className="w-full h-full" />, category: 'Backend', color: 'from-[#339933] to-[#339933]/80' },
    { name: 'Spring Boot', icon: <SiSpring className="w-full h-full" />, category: 'Backend', color: 'from-[#6DB33F] to-[#6DB33F]/80' },
    { name: 'MySQL', icon: <SiMysql className="w-full h-full" />, category: 'Bases de Datos', color: 'from-[#4479A1] to-[#4479A1]/80' },
    { name: 'PostgreSQL', icon: <SiPostgresql className="w-full h-full" />, category: 'Bases de Datos', color: 'from-[#336791] to-[#336791]/80' },
    { name: 'Firebase', icon: <SiFirebase className="w-full h-full" />, category: 'Servicios', color: 'from-[#FFCA28] to-[#FFCA28]/80' },
    { name: 'Docker', icon: <SiDocker className="w-full h-full" />, category: 'DevOps', color: 'from-[#2496ED] to-[#2496ED]/80' },
    { name: 'Git', icon: <SiGit className="w-full h-full" />, category: 'Herramientas', color: 'from-[#F05032] to-[#F05032]/80' },
];

const groupedSkills = skills.reduce((acc, skill) => {
    acc[skill.category] = acc[skill.category] || [];
    acc[skill.category].push(skill);
    return acc;
}, {} as Record<string, typeof skills>);

export const SkillsSection = () => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start end', 'end start']
    });

    // Efectos de paralaje
    const yText = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
    const opacityBg = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.3
            }
        }
    };

    const itemVariants = {
        hidden: { y: 30, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: 'spring',
                stiffness: 120,
                damping: 12,
                mass: 0.5
            }
        },
        hover: {
            y: -5,
            scale: 1.05,
            transition: { duration: 0.2 }
        }
    };

    const categoryVariants = {
        hidden: { x: -50, opacity: 0 },
        visible: {
            x: 0,
            opacity: 1,
            transition: {
                type: 'spring',
                stiffness: 100,
                damping: 10
            }
        }
    };

    return (
        <section
            ref={ref}
            id="skills"
            className="relative py-24 overflow-hidden bg-gradient-to-b from-[#131b23] to-[#1a2632] border-b-2 border-white"
        >
            {/* Elementos decorativos de fondo */}
            <motion.div 
                className="absolute inset-0"
                style={{ opacity: opacityBg }}
            >
                <div className="absolute inset-0 bg-[url('/images/grid-pattern.svg')] opacity-5" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary-dark/10 to-transparent" />
            </motion.div>

            <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={containerVariants}
                    className="text-center mb-20"
                    style={{ y: yText }}
                >
                    <motion.h2
                        variants={itemVariants}
                        className="text-4xl md:text-5xl font-bold text-white mb-4"
                    >
                        Mis <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-red-600">Habilidades</span>
                    </motion.h2>
                    <motion.p
                        variants={itemVariants}
                        className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
                    >
                        Tecnologías que domino para crear soluciones innovadoras y escalables
                    </motion.p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {Object.entries(groupedSkills).map(([category, skillsInCategory]) => (
                        <motion.div 
                            key={category}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={categoryVariants}
                            className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300"
                        >
                            <motion.h3
                                variants={itemVariants}
                                className="text-2xl font-semibold text-white mb-6 pb-2 border-b border-white/10"
                            >
                                {category}
                            </motion.h3>
                            <motion.div
                                variants={containerVariants}
                                className="grid grid-cols-2 sm:grid-cols-3 gap-4"
                            >
                                {skillsInCategory.map((skill) => (
                                    <motion.div
                                        key={skill.name}
                                        variants={itemVariants}
                                        whileHover="hover"
                                        className="group relative overflow-hidden h-24 rounded-xl p-1"
                                    >
                                        <div className={`absolute inset-0 bg-gradient-to-br ${skill.color} rounded-xl opacity-80 group-hover:opacity-100 transition-opacity duration-300`} />
                                        <div className="relative h-full flex flex-col items-center justify-center p-4">
                                            <div className="w-8 h-8 mb-2 group-hover:scale-110 transition-transform duration-300 text-white">
                                                {skill.icon}
                                            </div>
                                            <h4 className="text-sm font-semibold text-white text-center group-hover:text-white transition-colors duration-300">
                                                {skill.name}
                                            </h4>
                                        </div>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};