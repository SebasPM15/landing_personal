"use client";

import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';
import { FiGithub, FiExternalLink } from 'react-icons/fi';

const projects = [
    {
        title: "Portafolio Next.js",
        description: "Mi portafolio personal desarrollado con Next.js, Tailwind CSS y animaciones con Framer Motion.",
        technologies: ["Next.js", "Tailwind CSS", "Framer Motion"],
        githubUrl: "https://github.com/SebasPM15/Portafolio-NextJS",
        demoUrl: "#",
        image: "/muyPronto.jpg"
    },
    {
        title: "Aplicación Bancaria",
        description: "Sistema bancario completo desarrollado con .NET 9.0 en el backend y Angular 17 en el frontend.",
        technologies: [".NET 9.0", "Angular 17", "SQL Server"],
        githubUrl: "https://github.com/MateoPm15/banco-app-pasantia",
        demoUrl: "#",
        image: "/muyPronto.jpg"
    },
    {
        title: "App de Tareas Flutter",
        description: "Aplicación móvil de lista de tareas con persistencia de datos en SQLite y diseño intuitivo.",
        technologies: ["Flutter", "Dart", "SQLite"],
        githubUrl: "https://github.com/SebasPM15/App-Lista-Tareas",
        demoUrl: "#",
        image: "/muyPronto.jpg"
    }
];

export const ProjectsSection = () => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start end', 'end start']
    });

    // Efectos de paralaje
    const yText = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
    const yBg = useTransform(scrollYProgress, [0, 1], ['0%', '10%']);
    const opacityBg = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3
            }
        }
    };

    const itemVariants = {
        hidden: { y: 50, opacity: 0 },
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
            y: -10,
            transition: { duration: 0.3 }
        }
    };

    const projectVariants = {
        hidden: { scale: 0.95, opacity: 0 },
        visible: {
            scale: 1,
            opacity: 1,
            transition: {
                type: 'spring',
                stiffness: 100,
                damping: 10
            }
        },
        hover: {
            scale: 1.02,
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
        }
    };

    return (
        <section
            ref={ref}
            id="projects"
            className="relative py-24 overflow-hidden bg-gradient-to-b from-[#131b23] to-[#1a2632] border-b-2 border-white"
        >
            {/* Elementos decorativos de fondo */}
            <motion.div 
                className="absolute inset-0"
                style={{ y: yBg, opacity: opacityBg }}
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
                        Mis <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-red-600">Proyectos</span>
                    </motion.h2>
                    <motion.p
                        variants={itemVariants}
                        className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
                    >
                        Algunos de mis trabajos más destacados y recientes
                    </motion.p>
                </motion.div>

                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={containerVariants}
                    className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    {projects.map((project, index) => (
                        <motion.div
                            key={index}
                            variants={projectVariants}
                            whileHover="hover"
                            className="bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 hover:border-white/20 transition-all duration-300"
                        >
                            <div className="relative h-60 overflow-hidden">
                                <Image
                                    src={project.image}
                                    alt={project.title}
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                            </div>
                            <div className="p-6">
                                <motion.h3
                                    variants={itemVariants}
                                    className="text-xl font-bold text-white mb-3"
                                >
                                    {project.title}
                                </motion.h3>
                                <motion.p
                                    variants={itemVariants}
                                    className="text-gray-300 mb-4"
                                >
                                    {project.description}
                                </motion.p>
                                <motion.div
                                    variants={containerVariants}
                                    className="flex flex-wrap gap-2 mb-6"
                                >
                                    {project.technologies.map((tech, i) => (
                                        <motion.span
                                            key={i}
                                            variants={itemVariants}
                                            className="bg-white/10 text-white text-xs px-3 py-1 rounded-full"
                                        >
                                            {tech}
                                        </motion.span>
                                    ))}
                                </motion.div>
                                <motion.div
                                    variants={containerVariants}
                                    className="flex gap-4"
                                >
                                    <motion.a
                                        variants={itemVariants}
                                        href={project.githubUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="flex items-center gap-2 text-white bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg transition-all duration-200"
                                    >
                                        <FiGithub className="text-lg" />
                                        Código
                                    </motion.a>
                                    <motion.a
                                        variants={itemVariants}
                                        href={project.demoUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="flex items-center gap-2 text-white bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 px-4 py-2 rounded-lg transition-all duration-200"
                                    >
                                        <FiExternalLink className="text-lg" />
                                        Demo
                                    </motion.a>
                                </motion.div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};