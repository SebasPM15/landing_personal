'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { motion, AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'

const navItems = [
    { name: 'Inicio', href: '#home' },
    { name: 'Sobre mí', href: '#about' },
    { name: 'Habilidades', href: '#skills' },
    { name: 'Proyectos', href: '#projects' },
    { name: 'Contacto', href: '#contact' },
]

export const Header = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)
    const pathname = usePathname()

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <header className={`fixed w-full top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[#131b23]/95 backdrop-blur-md shadow-lg' : 'bg-[#131b23]/90 backdrop-blur-sm'}`}>
            <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
                <div className="flex h-20 items-center justify-between">
                    {/* Logo */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, type: 'spring' }}
                        className="flex items-center"
                    >
                        <Link
                            href="/"
                            className="text-2xl font-bold text-white hover:text-primary transition-colors flex items-center"
                            aria-label="Inicio"
                        >
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-red-600">MP</span>
                            <span className="text-white">.</span>
                        </Link>
                    </motion.div>

                    {/* Navegación desktop */}
                    <nav className="hidden md:flex items-center space-x-1">
                        {navItems.map((item, index) => (
                            <motion.div
                                key={item.name}
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ 
                                    duration: 0.4, 
                                    delay: 0.1 + index * 0.1,
                                    type: 'spring',
                                    stiffness: 300,
                                    damping: 15
                                }}
                                whileHover={{ y: -2 }}
                            >
                                <Link
                                    href={item.href}
                                    className={`relative px-4 py-2 text-sm font-medium transition-colors ${pathname === item.href ? 'text-white' : 'text-gray-300 hover:text-white'}`}
                                >
                                    {item.name}
                                    <span className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 h-0.5 w-4/5 ${pathname === item.href ? 'bg-gradient-to-r from-red-400 to-red-600' : 'bg-transparent'} group-hover:bg-gradient-to-r from-red-400 to-red-600 transition-all duration-300`} />
                                </Link>
                            </motion.div>
                        ))}
                    </nav>

                    {/* Botón menú móvil */}
                    <motion.button
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, type: 'spring' }}
                        type="button"
                        className="md:hidden p-2 text-gray-300 hover:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-[#131b23]"
                        onClick={() => setMobileMenuOpen(true)}
                        aria-label="Abrir menú"
                        whileTap={{ scale: 0.9 }}
                    >
                        <Bars3Icon className="h-7 w-7" />
                    </motion.button>
                </div>
            </div>

            {/* Menú móvil */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 bg-[#131b23]/95 backdrop-blur-lg md:hidden"
                    >
                        <div className="flex h-20 items-center justify-between px-6">
                            <Link
                                href="/"
                                className="text-2xl font-bold text-white hover:text-primary transition-colors"
                                onClick={() => setMobileMenuOpen(false)}
                                aria-label="Inicio"
                            >
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-red-600">MP</span>
                                <span className="text-white">.</span>
                            </Link>
                            <button
                                type="button"
                                className="p-2 text-gray-300 hover:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-[#131b23]"
                                onClick={() => setMobileMenuOpen(false)}
                                aria-label="Cerrar menú"
                            >
                                <XMarkIcon className="h-7 w-7" />
                            </button>
                        </div>

                        <motion.div
                            initial={{ y: -20 }}
                            animate={{ y: 0 }}
                            className="px-6 py-8 space-y-2"
                        >
                            {navItems.map((item, index) => (
                                <motion.div
                                    key={item.name}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ 
                                        delay: 0.1 + index * 0.1,
                                        type: 'spring',
                                        stiffness: 200,
                                        damping: 15
                                    }}
                                    whileHover={{ x: 5 }}
                                >
                                    <Link
                                        href={item.href}
                                        className={`block py-4 text-xl font-medium transition-colors border-b ${pathname === item.href ? 'text-white border-white/20' : 'text-gray-300 border-white/10 hover:text-white'}`}
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        {item.name}
                                    </Link>
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    )
}