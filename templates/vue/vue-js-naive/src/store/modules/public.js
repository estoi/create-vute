import { defineStore } from 'pinia'
import piniaStore from '/@/store'

export const usePublicStore = defineStore('system', {
    persist: true,
    state: () => ({
        loading: false,
        theme: null
    }),
    actions: {
        setLoading(loading) {
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
