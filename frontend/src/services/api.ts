import axios from 'axios'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3500'

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 10000, // 10 segundos timeout
})

export const createLead = async (leadData: {
    name: string
    email: string
    phone?: string
    message?: string
}) => {
    try {
        const response = await api.post('/leads', leadData)
        return response.data
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(
                error.response?.data?.message || 'Error al enviar el formulario'
            )
        }
        throw new Error('Error desconocido al enviar el formulario')
    }
}

export const getLeads = async () => {
    try {
        const response = await api.get('/leads')
        return response.data
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(
                error.response?.data?.message || 'Error al obtener los leads'
            )
        }
        throw new Error('Error desconocido al obtener los leads')
    }
}