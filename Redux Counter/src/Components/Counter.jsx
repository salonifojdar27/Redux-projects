

import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement } from '../features/counterSlice';

function Counter() {
    const count = useSelector((state) => state.counter.value);
    const dispatch = useDispatch();

    return (
        <div style={{ textAlign: 'center' }}>
            <h2>Redux Toolkit Counter</h2>
            <h1>{count}</h1>

            <button onClick={() => dispatch(increment())}>+1</button>
            <button onClick={() => dispatch(decrement())}>-1</button>

            <br /><br />


        </div>
    );
}

export default Counter;