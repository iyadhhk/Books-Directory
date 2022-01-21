import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { decrement, increment } from './counterSlice';
import { getBookList } from '../../bookSlice';
// import styles from './Counter.module.css';

const Counter = () => {
  // const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div>
      <div>
        {/* <button aria-label='Increment value' onClick={() => dispatch(increment())}>
          Increment
        </button>
        <span>{count}</span> */}
        <button
          className='btn btn-dark'
          aria-label='Decrement value'
          onClick={() => dispatch(getBookList())}>
          Decrement
        </button>
      </div>
    </div>
  );
};

export default Counter;
