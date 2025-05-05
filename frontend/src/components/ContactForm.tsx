'use client'

import { useForm } from 'react-hook-form'
import { ExclamationTriangleIcon, CheckCircleIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'
import { createLead } from '@/services/api'
import { motion } from 'framer-motion'

type FormData = {
    name: string
    email: string
    phone?: string
    message?: string
}

export const ContactForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
        reset
    } = useForm<FormData>({
        mode: 'onBlur',
        defaultValues: {
            name: '',
            email: '',
            phone: '',
            message: ''
        }
    })

    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState(false)

    const onSubmit = async (data: FormData) => {
        setIsLoading(true)
        setError(null)
        setSuccess(false)

        try {
            await createLead({
                name: data.name.trim(),
                email: data.email.trim(),
                phone: data.phone?.trim(),
                message: data.message?.trim()
            })

            setSuccess(true)
            reset()

            // Resetear el estado de éxito después de 5 segundos
            setTimeout(() => {
                setSuccess(false)
            }, 5000)
        } catch (err) {
            console.error('Error submitting form:', err)
            setError(
                err instanceof Error ?
                    err.message :
                    'Ocurrió un error al enviar el mensaje. Por favor intenta nuevamente.'
            )
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="w-full"
        >
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Envíame un mensaje</h3>

            {/* Mensaje de error */}
            {error && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="mb-6 p-4 bg-red-50 text-red-700 rounded-lg flex items-start border border-red-200"
                >
                    <ExclamationTriangleIcon className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                    <span>{error}</span>
                </motion.div>
            )}

            {/* Mensaje de éxito */}
            {success && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="mb-6 p-4 bg-green-50 text-green-700 rounded-lg flex items-start border border-green-200"
                >
                    <CheckCircleIcon className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                    <div>
                        <p className="font-medium">¡Mensaje enviado con éxito!</p>
                        <p className="text-sm mt-1">Me pondré en contacto contigo pronto.</p>
                    </div>
                </motion.div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                {/* Campo Nombre */}
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1.5">
                        Nombre completo <span className="text-red-500">*</span>
                    </label>
                    <input
                        id="name"
                        type="text"
                        {...register('name', {
                            required: 'Por favor ingresa tu nombre',
                            minLength: {
                                value: 2,
                                message: 'El nombre debe tener al menos 2 caracteres'
                            },
                            maxLength: {
                                value: 50,
                                message: 'El nombre no puede exceder los 50 caracteres'
                            }
                        })}
                        className={`w-full px-4 py-3 border ${errors.name ? 'border-red-300 focus:ring-red-200' : 'border-gray-300 focus:ring-primary/50'
                            } rounded-lg focus:ring-2 focus:outline-none transition-colors`}
                        disabled={isLoading}
                    />
                    {errors.name && (
                        <p className="mt-1.5 text-sm text-red-600">{errors.name.message}</p>
                    )}
                </div>

                {/* Campo Email */}
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">
                        Correo electrónico <span className="text-red-500">*</span>
                    </label>
                    <input
                        id="email"
                        type="email"
                        {...register('email', {
                            required: 'Por favor ingresa tu correo electrónico',
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: 'Ingresa un correo electrónico válido'
                            }
                        })}
                        className={`w-full px-4 py-3 border ${errors.email ? 'border-red-300 focus:ring-red-200' : 'border-gray-300 focus:ring-primary/50'
                            } rounded-lg focus:ring-2 focus:outline-none transition-colors`}
                        disabled={isLoading}
                    />
                    {errors.email && (
                        <p className="mt-1.5 text-sm text-red-600">{errors.email.message}</p>
                    )}
                </div>

                {/* Campo Teléfono */}
                <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1.5">
                        Teléfono (opcional)
                    </label>
                    <input
                        id="phone"
                        type="tel"
                        {...register('phone', {
                            pattern: {
                                value: /^[0-9+\-\s]+$/,
                                message: 'Ingresa un número de teléfono válido'
                            }
                        })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/50 focus:outline-none transition-colors"
                        disabled={isLoading}
                    />
                    {errors.phone && (
                        <p className="mt-1.5 text-sm text-red-600">{errors.phone.message}</p>
                    )}
                </div>

                {/* Campo Mensaje */}
                <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1.5">
                        Mensaje (opcional)
                    </label>
                    <textarea
                        id="message"
                        rows={4}
                        {...register('message', {
                            maxLength: {
                                value: 500,
                                message: 'El mensaje no puede exceder los 500 caracteres'
                            }
                        })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/50 focus:outline-none transition-colors"
                        disabled={isLoading}
                    />
                    {errors.message && (
                        <p className="mt-1.5 text-sm text-red-600">{errors.message.message}</p>
                    )}
                </div>

                {/* Botón de envío */}
                <div className="pt-2">
                    <button
                        type="submit"
                        disabled={isLoading || !isValid}
                        className={`w-full py-3.5 px-6 font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 ${isLoading || !isValid
                                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                : 'bg-primary hover:bg-primary-dark text-white focus:ring-primary/50'
                            }`}
                    >
                        {isLoading ? (
                            <span className="flex items-center justify-center">
                                <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Enviando...
                            </span>
                        ) : (
                            'Enviar mensaje'
                        )}
                    </button>
                </div>
            </form>
        </motion.div>
    )
}