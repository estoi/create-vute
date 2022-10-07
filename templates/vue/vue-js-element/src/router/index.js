import { createRouter, createWebHashHistory } from 'vue-router'
import routes from '~pages'
import NProgress from 'nprogress'

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

router.beforeEach(async (_to, _from, next) => {
    NProgress.start()
    next()
})

router.afterEach(() => {
    NProgress.done()
})

export default router
