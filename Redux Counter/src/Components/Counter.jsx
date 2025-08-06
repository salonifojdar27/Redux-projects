

import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement } from '../features/counterSlice';

function Counter() {
    const count = useSelector((state) => state.counter.value);
    const dispatch = useDispatch();

    return (
        <div className='counter-container'>
            <h2>Redux Counter</h2>
            <h1>{count}</h1>
            <button onClick={() => dispatch(increment())}>+1</button>
            <button disabled={count === 0} onClick={() => dispatch(decrement())}>-1</button>

        </div>
    );
}

export default Counter;