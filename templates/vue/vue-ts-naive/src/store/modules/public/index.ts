import { defineStore } from 'pinia'
import piniaStore from '/@/store/index'
import { PublicState } from './types'

export const usePublicStore = defineStore('system', {
    persist: true,
    state: (): PublicState => ({
        loading: false,
        theme: null
    }),
    actions: {
        setLoading(loading: boolean) {
            this.loading = loading
        },
        setTheme(theme) {
            this.theme = theme
        }
    }
})

export function useAppOutsideStore() {
    return usePublicStore(piniaStore)
}
