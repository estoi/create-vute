import { defineStore } from 'pinia'
import piniaStore from '/@/store'

export const usePublicStore = defineStore('system', {
    persist: true,
    state: () => ({
        loading: false
    }),
    actions: {
        setLoading(loading) {
            this.loading = loading
        }
    }
})

export function useAppOutsideStore() {
    return usePublicStore(piniaStore)
}
