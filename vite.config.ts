import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
    plugins: [
        tailwindcss(),
        react()
    ],
    server: {
        proxy: {
            '/public': {
                target: 'http://localhost:8080',
                changeOrigin: true,
            },
            '/categories': {
                target: 'http://localhost:8080',
                changeOrigin: true,
            },
            '/transactions': {
                target: 'http://localhost:8080',
                changeOrigin: true,
            }
        }
    }
})
