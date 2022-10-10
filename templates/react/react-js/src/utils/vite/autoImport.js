/**
 * @name AutoImportDeps
 * @description 按需加载，自动引入
 */
import AutoImport from 'unplugin-auto-import/vite'

export const AutoImportDeps = () => {
    return AutoImport({
        imports: [
            'react',
            'react-router-dom',
            'mobx',
            {
                'react-use': []
            }
        ],
        dirs: ['src/store']
    })
}
