import { API_BASE_URL, API_TARGET_URL } from '../../config/constant'

const init = {
    [API_BASE_URL]: {
        target: API_TARGET_URL,
        changeOrigin: true,
        rewrite: (path) => path.replace(new RegExp(`^${API_BASE_URL}`), '')
    }
}

export default init
