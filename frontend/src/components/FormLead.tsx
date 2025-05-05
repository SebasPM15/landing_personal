'use client'

import { useForm } from 'react-hook-form'
import { AnimatePresence, motion } from 'framer-motion'
import { FiAlertTriangle, FiCheckCircle, FiSend } from 'react-icons/fi'
import { useState } from 'react'
import { createLead } from '@/services/api'

type FormData = {
    name: string
    email: string
    phone?: string
    message?: string
}

export const FormLead = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<FormData>({
        mode: 'onBlur',
    })

    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState(false)

    const onSubmit = async (data: FormData) => {
        setIsLoading(true)
        setError(null)
        setSuccess(false)

        try {
            await createLead(data)
            setSuccess(true)
            reset()
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Ocurrió un error al enviar el mensaje')
        } finally {
            setIsLoading(false)
        }
    }

    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                ease: "easeOut"
            }
        }
    }

    const inputVariants = {
        focus: {
            boxShadow: "0 0 0 2px rgba(239, 68, 68, 0.5)",
            borderColor: "rgba(239, 68, 68, 0.5)"
        }
    }

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300 p-8"
        >
            <h3 className="text-2xl font-bold text-white mb-6">Envíame un mensaje</h3>

            <AnimatePresence>
                {error && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="mb-6 p-4 bg-red-500/10 text-red-400 rounded-lg flex items-start border border-red-500/20"
                    >
                        <FiAlertTriangle className="h-5 w-5 mr-3 mt-0.5 flex-shrink-0" />
                        <span>{error}</span>
                    </motion.div>
                )}

                {success && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="mb-6 p-4 bg-green-500/10 text-green-400 rounded-lg flex items-start border border-green-500/20"
                    >
                        <FiCheckCircle className="h-5 w-5 mr-3 mt-0.5 flex-shrink-0" />
                        <span>¡Gracias por tu mensaje! Me pondré en contacto contigo pronto.</span>
                    </motion.div>
                )}
            </AnimatePresence>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                        Nombre completo <span className="text-red-500">*</span>
                    </label>
                    <motion.input
                        id="name"
                        type="text"
                        {...register('name', { required: 'Este campo es obligatorio' })}
                        className={`w-full px-4 py-3 bg-white/5 text-white border ${errors.name ? 'border-red-500/50' : 'border-white/10'} rounded-lg focus:outline-none`}
                        whileFocus="focus"
                        variants={inputVariants}
                        placeholder="Tu nombre"
                    />
                    {errors.name && (
                        <motion.p 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="mt-2 text-sm text-red-400"
                        >
                            {errors.name.message}
                        </motion.p>
                    )}
                </div>

                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                        Correo electrónico <span className="text-red-500">*</span>
                    </label>
                    <motion.input
                        id="email"
                        type="email"
                        {...register('email', {
                            required: 'Este campo es obligatorio',
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: 'Ingresa un correo electrónico válido',
                            },
                        })}
                        className={`w-full px-4 py-3 bg-white/5 text-white border ${errors.email ? 'border-red-500/50' : 'border-white/10'} rounded-lg focus:outline-none`}
                        whileFocus="focus"
                        variants={inputVariants}
                        placeholder="tu@email.com"
                    />
                    {errors.email && (
                        <motion.p 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="mt-2 text-sm text-red-400"
                        >
                            {errors.email.message}
                        </motion.p>
                    )}
                </div>

                <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
                        Teléfono
                    </label>
                    <motion.input
                        id="phone"
                        type="tel"
                        {...register('phone')}
                        className="w-full px-4 py-3 bg-white/5 text-white border border-white/10 rounded-lg focus:outline-none"
                        whileFocus="focus"
                        variants={inputVariants}
                        placeholder="+593 123456789"
                    />
                </div>

                <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                        Mensaje
                    </label>
                    <motion.textarea
                        id="message"
                        rows={4}
                        {...register('message')}
                        className="w-full px-4 py-3 bg-white/5 text-white border border-white/10 rounded-lg focus:outline-none"
                        whileFocus="focus"
                        variants={inputVariants}
                        placeholder="Cuéntame sobre tu proyecto..."
                    />
                </div>

                <div className="pt-2">
                    <motion.button
                        type="submit"
                        disabled={isLoading}
                        className="w-full flex items-center justify-center gap-2 py-3 px-6 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-[#131b23] disabled:opacity-50 disabled:cursor-not-allowed"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        {isLoading ? (
                            <>
                                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Enviando...
                            </>
                        ) : (
                            <>
                                <FiSend className="h-5 w-5" />
                                Enviar mensaje
                            </>
                        )}
                    </motion.button>
                </div>
            </form>
        </motion.div>
    )
}