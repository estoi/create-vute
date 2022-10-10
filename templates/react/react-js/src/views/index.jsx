import { observer } from 'mobx-react'

import './index.less'

const Home = () => {
    return (
        <div className='wrapper'>
            <Link to='/about'>About</Link>
            <div>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;mobx：
                <button onClick={() => counter.reduce()}>-</button>
                {counter.num}
                <button onClick={() => counter.add()}>+</button>
            </div>
        </div>
    )
}

export default observer(Home)
