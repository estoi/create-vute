import { defineConfig } from 'vite'
import { resolve } from 'node:path'
import { createVitePlugins } from '/@/utils/vite'
import proxy from '/@/utils/vite/proxy'
import { VITE_PORT, VITE_OPEN_PROXY } from './src/config/constant'

function pathResolve(dir) {
    return resolve(process.cwd(), '.', dir)
}

// https://vitejs.dev/config/
export default defineConfig(() => ({
    resolve: {
        alias: [
            {
                find: /\/@\//,
                replacement: pathResolve('src') + '/'
            }
        ]
    },
    plugins: createVitePlugins(),
    css: {
        preprocessorOptions: {
            less: {
                javascriptEnabled: true
            }
        }
    },
    clearScreen: false,
    server: {
        open: true,
        cors: true,
        port: VITE_PORT,
        strictPort: true,
        proxy: VITE_OPEN_PROXY && proxy
    }
}))
