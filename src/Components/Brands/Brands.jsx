import React, { useContext } from 'react';
import styles from './Brands.module.css';
import { CounterContext } from '../../Context/Counter';

export default function Brands() {
  let {counter,increase}= useContext(CounterContext)
  
  return <>
    <h1>Brands
    {counter}
    </h1>
    <button className='btn btn-primary' onClick={increase}>
      Click
    </button>
    
  </>
}
