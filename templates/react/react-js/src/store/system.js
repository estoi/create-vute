import { makeAutoObservable } from 'mobx'

class System {
    loading = false

    constructor() {
        makeAutoObservable(this)
    }


    setLoading = (loading) => {
        this.loading = loading
    }
}

export default new System()