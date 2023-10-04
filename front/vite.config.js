import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default ({ mode }) => {
    Object.assign(process.env, loadEnv(mode, process.cwd()))

    return defineConfig({
        plugins: [react()],
        server: {
            port: process.env.VITE_PORT,
            host: '0.0.0.0',
        },
    })
}
