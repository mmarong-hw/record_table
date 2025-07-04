import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import dotenv from 'dotenv'

dotenv.config() // .env 파일을 process.env에 주입

export default defineConfig({
  plugins: [react()],
  define: {
    STORAGE: JSON.stringify(process.env.STORAGE),
  }
})