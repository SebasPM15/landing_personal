"use client";

import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';

export const AboutSection = () => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start end', 'end start']
    });

    // Efectos de paralaje para elementos de fondo
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
        }
    };

    const imageVariants = {
        hidden: { x: -50, opacity: 0 },
        visible: {
            x: 0,
            opacity: 1,
            transition: {
                type: 'spring',
                stiffness: 100,
                damping: 10,
                delay: 0.4
            }
        },
        hover: {
            scale: 1.02,
            transition: { duration: 0.3 }
        }
    };

    const buttonVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: 'spring',
                stiffness: 150,
                damping: 15,
                delay: 0.6
            }
        },
        hover: {
            scale: 1.05,
            transition: { duration: 0.2 }
        },
        tap: {
            scale: 0.95
        }
    };

    return (
        <section
            ref={ref}
            id="about"
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
                <div className="grid md:grid-cols-2 gap-16 items-center">
                    {/* Imagen con efecto de hover */}
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={containerVariants}
                        className="flex justify-center"
                    >
                        <motion.div
                            variants={imageVariants}
                            whileHover="hover"
                            className="relative w-full max-w-md h-80 md:h-96 rounded-2xl overflow-hidden shadow-2xl border-4 border-white/20 hover:border-primary/50 transition-all duration-300"
                        >
                            <Image
                                src="/Mateo_animado.jpg"
                                alt="Mateo Pilco - Ingeniero de Software"
                                fill
                                className="object-cover"
                                priority
                                sizes="(max-width: 768px) 100vw, 50vw"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-primary/10 via-transparent to-transparent" />
                        </motion.div>
                    </motion.div>

                    {/* Contenido */}
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={containerVariants}
                        className="space-y-8"
                    >
                        <motion.h2
                            variants={itemVariants}
                            className="text-4xl md:text-5xl font-bold text-white"
                        >
                            Conoce <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-red-600">sobre mí</span>
                        </motion.h2>

                        <motion.p
                            variants={itemVariants}
                            className="text-lg text-gray-300 leading-relaxed"
                        >
                            Soy <span className="font-semibold text-white">Mateo Pilco</span>, estudiante de <span className="font-semibold text-white">Ingeniería de Software</span> en la <Link href="https://www.epn.edu.ec" target="_blank" className="text-primary-400 hover:underline hover:text-primary-300 transition-colors">Escuela Politécnica Nacional</Link>. Me apasiona construir soluciones tecnológicas que impacten positivamente, combinando lógica, diseño y experiencia de usuario.
                        </motion.p>

                        <motion.p
                            variants={itemVariants}
                            className="text-lg text-gray-300 leading-relaxed"
                        >
                            Como <span className="font-semibold text-white">desarrollador Full Stack</span>, trabajo con tecnologías modernas como <span className="font-semibold text-white">JavaScript, React, Node.js, Next.js y Flutter</span>. Me encanta integrar interfaces intuitivas con backends robustos, aprovechando bases de datos relacionales, APIs y servicios cloud.
                        </motion.p>

                        <motion.div
                            variants={containerVariants}
                            className="space-y-5 pt-2"
                        >
                            <motion.div variants={itemVariants} className="flex items-start">
                                <div className="bg-gradient-to-br from-red-500 to-red-600 text-white rounded-full p-2 mr-4 flex-shrink-0">
                                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                    </svg>
                                </div>
                                <p className="text-gray-300 flex-1">
                                    Desarrollo <span className="font-semibold text-white">proyectos completos</span>, desde la idea hasta la implementación, incluyendo web apps, móviles, dashboards interactivos, y sistemas con análisis predictivo basado en IA.
                                </p>
                            </motion.div>

                            <motion.div variants={itemVariants} className="flex items-start">
                                <div className="bg-gradient-to-br from-red-500 to-red-600 text-white rounded-full p-2 mr-4 flex-shrink-0">
                                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                    </svg>
                                </div>
                                <p className="text-gray-300 flex-1">
                                    Me enfoco en <span className="font-semibold text-white">código limpio y mantenible</span>, buenas prácticas de arquitectura, control de versiones y automatización de flujos para proyectos escalables.
                                </p>
                            </motion.div>

                            <motion.div variants={itemVariants} className="flex items-start">
                                <div className="bg-gradient-to-br from-red-500 to-red-600 text-white rounded-full p-2 mr-4 flex-shrink-0">
                                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                                    </svg>
                                </div>
                                <p className="text-gray-300 flex-1">
                                    Me apasiona el <span className="font-semibold text-white">fútbol ⚽</span>, los <span className="font-semibold text-white">videojuegos 🎮</span>, y aprender constantemente sobre nuevas tecnologías, frameworks y herramientas para crear proyectos útiles y reales.
                                </p>
                            </motion.div>
                        </motion.div>

                        <motion.div
                            variants={itemVariants}
                            className="pt-6 flex flex-col sm:flex-row gap-4"
                        >
                            <motion.div
                                variants={buttonVariants}
                                whileHover="hover"
                                whileTap="tap"
                            >
                                <Link
                                    href="#projects"
                                    className="inline-block bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-8 py-3 rounded-lg font-bold transition-all duration-200 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-900"
                                    aria-label="Ver proyectos de Mateo Pilco"
                                >
                                    Ver mis proyectos
                                </Link>
                            </motion.div>
                            <motion.div
                                variants={buttonVariants}
                                whileHover="hover"
                                whileTap="tap"
                            >
                                <Link
                                    href="#contact"
                                    className="inline-block border-2 border-white/30 hover:border-white/50 text-white px-8 py-3 rounded-lg font-bold transition-all duration-200 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-900"
                                    aria-label="Contactar a Mateo Pilco"
                                >
                                    Contáctame
                                </Link>
                            </motion.div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};