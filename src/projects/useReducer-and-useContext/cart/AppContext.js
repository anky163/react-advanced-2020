import React, { useContext } from 'react'

import { UpArrow, DownArrow } from './Icons';



export const AppContext = React.createContext();

export const IncreaseButton = () => {
  const { id, dispatch } = useContext(AppContext);
  return (
    <button className="amount-btn" onClick={ () => dispatch({ type: 'INCREASE_ITEM', payload: id }) } >
        <UpArrow />
      </button>
  )
};

export const DecreaseButton = () => {
  const { id, dispatch } = useContext(AppContext);
  return (
    <button className="amount-btn" onClick={ () => dispatch({ type: 'DECREASE_ITEM', payload: id }) } >
      <DownArrow />
    </button>
  )
};


export const RemoveButton = () => {
  const { id, dispatch } = useContext(AppContext);
  return (
    <button className='remove-btn' onClick={ () => dispatch({ type: 'REMOVE_ITEM', payload: id }) } >remove</button>
  )
};


export const ClearButton = () => {
  const { dispatch } = useContext(AppContext);
  return (
    <button className="btn clear-btn" onClick={ () => dispatch({ type: 'CLEAR_BAG' }) } >clear cart</button>
  )
};
