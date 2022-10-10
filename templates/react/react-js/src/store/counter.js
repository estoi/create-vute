import { makeAutoObservable } from 'mobx'

class Counter {
    num = 0

    constructor() {
        makeAutoObservable(this)
    }

    add = () => {
        this.num++
    }

    reduce = () => {
        this.num--
    }
}

export default new Counter()