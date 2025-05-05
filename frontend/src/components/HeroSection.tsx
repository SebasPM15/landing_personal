'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'
import { useRef } from 'react'
import Image from 'next/image'

export const HeroSection = () => {
    const ref = useRef(null)
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start start', 'end start']
    })

    // Efectos de paralaje
    const yText = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])
    const yBg = useTransform(scrollYProgress, [0, 1], ['0%', '20%'])

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3
            }
        }
    }

    const itemVariants = {
        hidden: { y: 40, opacity: 0 },
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
    }

    const buttonVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: 'spring',
                stiffness: 150,
                damping: 15,
                delay: 0.5
            }
        },
        hover: {
            scale: 1.05,
            transition: { duration: 0.2 }
        },
        tap: {
            scale: 0.95
        }
    }

    return (
        <section
            ref={ref}
            className="relative bg-[#131b23] h-screen min-h-[600px] flex items-center justify-center overflow-hidden border-b-2 border-white"
        >
            {/* Fondo dinámico */}
            <motion.div
                className="absolute inset-0 bg-gradient-to-br from-primary to-primary-dark"
                style={{ y: yBg }}
            >
                <div className="absolute inset-0 bg-[url('/images/grid-pattern.svg')] opacity-10" />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-primary-dark/80" />
            </motion.div>

            {/* Contenido principal con efecto de paralaje */}
            <motion.div
                style={{ y: yText }}
                className="relative z-10 w-full"
            >
                <div className="mx-auto max-w-7xl px-6 lg:px-8 flex flex-col items-center">
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={containerVariants}
                        className="text-center flex flex-col items-center"
                    >
                        {/* Logo - Ajustado para mantener proporciones */}
                        <motion.div
                            variants={itemVariants}
                            className="mb-8 w-40 h-40 md:w-48 md:h-48 relative"
                        >
                            <Image
                                src="/Mateo_Logo.png"
                                alt="Logo Mateo Pilco Dev"
                                fill
                                className="object-contain"
                                priority
                                quality={100}
                                sizes="(max-width: 768px) 160px, 192px"
                            />
                        </motion.div>

                        {/* Título con efecto de gradiente mejorado */}
                        <motion.h1
                            variants={itemVariants}
                            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight tracking-tighter text-white"
                        >
                            Hola, soy <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-red-500 to-red-600">Mateo Pilco</span>
                        </motion.h1>

                        {/* Subtítulo */}
                        <motion.p
                            variants={itemVariants}
                            className="text-xl md:text-2xl max-w-3xl mx-auto mb-8 text-gray-300 font-light"
                        >
                            <span className="font-medium text-white">Ingeniero de Software en formación</span> | <span className="font-medium text-white">Full Stack Developer</span> | <span className="font-medium text-white">JavaScript | React | Node.js | Next.js</span>
                        </motion.p>

                        {/* Botones con animaciones mejoradas */}
                        <motion.div
                            variants={containerVariants}
                            className="flex flex-col sm:flex-row justify-center gap-4 w-full max-w-md"
                        >
                            <motion.div variants={itemVariants} className="w-full sm:w-auto">
                                <Link href="#contact" className="block w-full">
                                    <motion.button
                                        variants={buttonVariants}
                                        whileHover="hover"
                                        whileTap="tap"
                                        className="w-full px-8 py-4 rounded-lg font-bold bg-white text-gray-900 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary-dark transition-all duration-300"
                                        aria-label="Contactar a Mateo Pilco"
                                    >
                                        Contáctame
                                    </motion.button>
                                </Link>
                            </motion.div>

                            <motion.div variants={itemVariants} className="w-full sm:w-auto">
                                <Link href="#projects" className="block w-full">
                                    <motion.button
                                        variants={buttonVariants}
                                        whileHover="hover"
                                        whileTap="tap"
                                        className="w-full px-8 py-4 rounded-lg font-bold border-2 border-white text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary-dark transition-all duration-300"
                                        aria-label="Ver proyectos de Mateo Pilco"
                                    >
                                        Mis Proyectos
                                    </motion.button>
                                </Link>
                            </motion.div>
                        </motion.div>
                    </motion.div>
                </div>
            </motion.div>

            {/* Indicador de scroll */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5 }}
                className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            >
                <div className="animate-bounce w-6 h-10 border-2 border-white rounded-full flex justify-center">
                    <div className="w-1 h-2 bg-white rounded-full mt-2" />
                </div>
            </motion.div>
        </section>
    )
}