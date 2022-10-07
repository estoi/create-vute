import vue from '@vitejs/plugin-vue'
import Inspect from 'vite-plugin-inspect'

import { ConfigPagesPlugin } from './pages'
import { ConfigProgressPlugin } from './progress'
import { ConfigCompressPlugin } from './compress'
import { ConfigRestartPlugin } from './restart'
import { AutoRegistryComponents } from './component'
import { AutoImportDeps } from './autoImport'
import { AutoImportIcons } from './icons'

export function createVitePlugins() {
    const vitePlugins = [
        // vue支持
        vue()
    ]

    // 自动生成路由
    vitePlugins.push(ConfigPagesPlugin())
    // 构建项目时显示进度条
    vitePlugins.push(ConfigProgressPlugin())
    // 压缩代码
    vitePlugins.push(ConfigCompressPlugin())
    // 自动重启
    vitePlugins.push(ConfigRestartPlugin())
    // 自动引入组件
    vitePlugins.push(AutoRegistryComponents())
    // 自动引入依赖
    vitePlugins.push(AutoImportDeps())
    vitePlugins.push(AutoImportIcons())
    vitePlugins.push(Inspect())

    return vitePlugins
}
