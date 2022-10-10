import { Suspense } from 'react'
import { useRoutes } from 'react-router-dom'
import nprogress from 'nprogress'

import routes from '~react-pages'

function App() {
    useState(nprogress.start())

    useEffect(() => {
        nprogress.done()
        return () => nprogress.start()
    })

    return <Suspense>{useRoutes(routes)}</Suspense>
}

export default App
