/**
 * @name AutoRegistryComponents
 * @description 自动引入组件
 */
import Components from 'unplugin-vue-components/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'

export const AutoRegistryComponents = () => {
    return Components({
        dirs: ['src/components'],
        resolvers: [NaiveUiResolver()],
        extensions: ['vue'],
        deep: true,
        directoryAsNamespace: false,
        globalNamespaces: [],
        directives: true,
        importPathTransform: (v) => v,
        allowOverrides: false,
        include: [/\.vue$/, /\.vue\?vue/],
        exclude: [/[\\/]node_modules[\\/]/, /[\\/]\.git[\\/]/, /[\\/]\.nuxt[\\/]/]
    })
}
