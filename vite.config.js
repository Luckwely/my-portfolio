import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'

const pagesBasePath = process.env.VITE_BASE_PATH || ''

export default defineConfig({
  base: pagesBasePath ? `${pagesBasePath.replace(/\/+$/, '')}/` : '/',
  plugins: [vue(), tailwindcss()],
})
