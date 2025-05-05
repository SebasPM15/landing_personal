"use client";

import { motion, useScroll, useTransform } from 'framer-motion';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { HeroSection } from '@/components/HeroSection';
import { SkillsSection } from '@/components/SkillsSection';
import { ProjectsSection } from '@/components/ProjectsSection';
import { FormLead } from '@/components/FormLead';
import { AboutSection } from '@/components/AboutSection';
import { useRef } from 'react';
import { FiMail, FiPhone, FiMapPin, FiLink, FiGithub, FiLinkedin, FiInstagram } from 'react-icons/fi';

export default function Home() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  });

  // Efectos de paralaje para el fondo
  const yBg = useTransform(scrollYProgress, [0, 1], ['0%', '10%']);
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
        stiffness: 100,
        damping: 10
      }
    }
  };

  const contactItemVariants = {
    hidden: { x: -30, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 10
      }
    },
    hover: {
      x: 5,
      transition: { duration: 0.2 }
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#131b23]">
      <Header />
      
      <main className="flex-grow">
        {/* Sección Hero */}
        <HeroSection />
        
        {/* Sección Sobre Mí */}
        <AboutSection />
        
        {/* Sección Habilidades */}
        <SkillsSection />
        
        {/* Sección Proyectos */}
        <ProjectsSection />
        
        {/* Sección Contacto */}
        <section 
          ref={ref}
          id="contact" 
          className="relative py-24 overflow-hidden bg-gradient-to-b from-[#1a2632] to-[#131b23]"
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
              className="text-center mb-16"
            >
              <motion.h2
                variants={itemVariants}
                className="text-4xl md:text-5xl font-bold text-white mb-4"
              >
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-red-600">Contáctame</span>
              </motion.h2>
              <motion.p
                variants={itemVariants}
                className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
              >
                ¿Interesado en trabajar juntos o tienes alguna pregunta? Envíame un mensaje.
              </motion.p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-12 items-start">
              <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={containerVariants}
                className="space-y-8"
              >
                <motion.div variants={contactItemVariants} className="flex items-start">
                  <div className="bg-gradient-to-br from-red-500 to-red-600 text-white rounded-full p-3 mr-4 flex-shrink-0">
                    <FiMail className="text-lg" />
                  </div>
                  <div>
                    <h3 className="font-medium text-white mb-1">Correo electrónico</h3>
                    <a 
                      href="mailto:mateo.pilco.dev@gmail.com" 
                      className="text-gray-300 hover:text-white transition-colors"
                    >
                      mateo.pilco.dev@gmail.com
                    </a>
                  </div>
                </motion.div>
                
                <motion.div variants={contactItemVariants} className="flex items-start">
                  <div className="bg-gradient-to-br from-red-500 to-red-600 text-white rounded-full p-3 mr-4 flex-shrink-0">
                    <FiPhone className="text-lg" />
                  </div>
                  <div>
                    <h3 className="font-medium text-white mb-1">Teléfono</h3>
                    <a 
                      href="tel:+593995291560" 
                      className="text-gray-300 hover:text-white transition-colors"
                    >
                      (+593) 0995291560
                    </a>
                  </div>
                </motion.div>
                
                <motion.div variants={contactItemVariants} className="flex items-start">
                  <div className="bg-gradient-to-br from-red-500 to-red-600 text-white rounded-full p-3 mr-4 flex-shrink-0">
                    <FiMapPin className="text-lg" />
                  </div>
                  <div>
                    <h3 className="font-medium text-white mb-1">Ubicación</h3>
                    <p className="text-gray-300">Quito, Ecuador</p>
                  </div>
                </motion.div>
                
                <motion.div variants={contactItemVariants} className="flex items-start">
                  <div className="bg-gradient-to-br from-red-500 to-red-600 text-white rounded-full p-3 mr-4 flex-shrink-0">
                    <FiLink className="text-lg" />
                  </div>
                  <div>
                    <h3 className="font-medium text-white mb-3">Redes Sociales</h3>
                    <div className="flex gap-4">
                      <motion.a 
                        href="https://github.com/SebasPM15" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-gray-300 hover:text-white transition-colors flex items-center gap-2"
                        whileHover={{ x: 5 }}
                      >
                        <FiGithub className="text-xl" />
                      </motion.a>
                      <motion.a 
                        href="https://www.linkedin.com/in/mateo-pilco-1703611a9/" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-gray-300 hover:text-white transition-colors flex items-center gap-2"
                        whileHover={{ x: 5 }}
                      >
                        <FiLinkedin className="text-xl" />
                      </motion.a>
                      <motion.a 
                        href="https://www.instagram.com/mateo_pilco/" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-gray-300 hover:text-white transition-colors flex items-center gap-2"
                        whileHover={{ x: 5 }}
                      >
                        <FiInstagram className="text-xl" />
                      </motion.a>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
              
              {/* Formulario de Contacto */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={{
                  hidden: { y: 50, opacity: 0 },
                  visible: {
                    y: 0,
                    opacity: 1,
                    transition: {
                      type: 'spring',
                      stiffness: 100,
                      damping: 10
                    }
                  }
                }}
                className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300 p-8"
              >
                <FormLead />
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}