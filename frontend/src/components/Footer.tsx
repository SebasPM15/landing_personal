"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';
import { FiMail, FiPhone, FiMapPin, FiGithub, FiLinkedin, FiInstagram } from 'react-icons/fi';

const navigation = [
    { name: 'Inicio', href: '#home' },
    { name: 'Sobre mí', href: '#about' },
    { name: 'Habilidades', href: '#skills' },
    { name: 'Proyectos', href: '#projects' },
    { name: 'Contacto', href: '#contact' },
];

const contactInfo = [
    { text: 'mateo.pilco.dev@gmail.com', type: 'email', icon: <FiMail className="w-5 h-5" /> },
    { text: '(+593) 0995291560', type: 'phone', icon: <FiPhone className="w-5 h-5" /> },
    { text: 'Quito, Ecuador', type: 'address', icon: <FiMapPin className="w-5 h-5" /> },
];

const socialLinks = [
    { name: 'GitHub', url: 'https://github.com/SebasPM15', icon: <FiGithub className="w-5 h-5" /> },
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/mateo-pilco-1703611a9/', icon: <FiLinkedin className="w-5 h-5" /> },
    { name: 'Instagram', url: 'https://www.instagram.com/mateo_pilco/', icon: <FiInstagram className="w-5 h-5" /> },
];

export const Footer = () => {
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
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: 'spring',
                stiffness: 100,
                damping: 10
            }
        }
    };

    return (
        <footer className="relative bg-[#131b23] text-white pt-20 pb-12 overflow-hidden">
            {/* Elementos decorativos de fondo */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0 bg-[url('/images/grid-pattern.svg')]" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary-dark/10 to-transparent" />
            </div>

            <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    variants={containerVariants}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12"
                >
                    {/* Columna 1: Información personal */}
                    <motion.div variants={itemVariants}>
                        <h3 className="text-xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-red-600">
                            Mateo Pilco
                        </h3>
                        <p className="text-gray-400 mb-4">
                            Ingeniero de Software y Desarrollador Full Stack especializado en crear soluciones digitales innovadoras.
                        </p>
                        <div className="flex space-x-4">
                            {socialLinks.map((social, index) => (
                                <motion.a
                                    key={index}
                                    href={social.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-400 hover:text-white transition-colors"
                                    whileHover={{ y: -3 }}
                                >
                                    {social.icon}
                                </motion.a>
                            ))}
                        </div>
                    </motion.div>

                    {/* Columna 2: Enlaces rápidos */}
                    <motion.div variants={itemVariants}>
                        <h4 className="text-lg font-semibold mb-6 text-white">Enlaces</h4>
                        <ul className="space-y-3">
                            {navigation.map((item) => (
                                <motion.li 
                                    key={item.name}
                                    whileHover={{ x: 5 }}
                                >
                                    <Link
                                        href={item.href}
                                        className="text-gray-400 hover:text-white transition-colors flex items-center"
                                    >
                                        <span className="w-2 h-2 bg-red-500 rounded-full mr-3"></span>
                                        {item.name}
                                    </Link>
                                </motion.li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Columna 3: Contacto */}
                    <motion.div variants={itemVariants}>
                        <h4 className="text-lg font-semibold mb-6 text-white">Contacto</h4>
                        <ul className="space-y-4">
                            {contactInfo.map((item, index) => (
                                <motion.li 
                                    key={index} 
                                    className="text-gray-400 flex items-start"
                                    whileHover={{ x: 5 }}
                                >
                                    <span className="text-red-500 mr-3 mt-0.5">{item.icon}</span>
                                    {item.type === 'email' ? (
                                        <a href={`mailto:${item.text}`} className="hover:text-white transition-colors">
                                            {item.text}
                                        </a>
                                    ) : item.type === 'phone' ? (
                                        <a href={`tel:${item.text.replace(/\D/g, '')}`} className="hover:text-white transition-colors">
                                            {item.text}
                                        </a>
                                    ) : (
                                        <span>{item.text}</span>
                                    )}
                                </motion.li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Columna 4: Derechos reservados para móviles */}
                    <motion.div 
                        variants={itemVariants}
                        className="md:hidden"
                    >
                        <p className="text-gray-500 text-sm">
                            &copy; {new Date().getFullYear()} Mateo Pilco. Todos los derechos reservados.
                        </p>
                    </motion.div>
                </motion.div>

                {/* Derechos reservados para desktop */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                    className="mt-16 pt-8 border-t border-white/10 text-center text-gray-500 hidden md:block"
                >
                    <p>&copy; {new Date().getFullYear()} Mateo Pilco. Todos los derechos reservados.</p>
                </motion.div>
            </div>
        </footer>
    );
};