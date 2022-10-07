/**
 * @name AutoRegistryComponents
 * @description 自动引入组件
 */
import Components from 'unplugin-vue-components/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'

export const AutoRegistryComponents = () => {
    return Components({
        dirs: ['src/components'],
        resolvers: [AntDesignVueResolver()],
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
