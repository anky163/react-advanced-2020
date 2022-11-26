import React, { useState, useEffect, useReducer } from 'react'

import { Navbar, Header, Footer, Item } from './HtmlElements'

import { getData } from './getData'
import { reducer } from './reducer';

import './index.css'

const url = 'https://course-api.com/react-useReducer-cart-project';

const defaultData = {
  items: [],
  totalAmount: 0,
  totalPrice: 0,
};

const Cart = () => {
  // console.log('rendering');

  const [bag, dispatch] = useReducer(reducer, defaultData);

  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    document.title = `Yotsuba's bag (${ bag.totalAmount })`;
  }, [bag.totalAmount]);

  useEffect(() => {
    getData({ url, dispatch, setIsLoading, setIsError, setError });
  }, []);
  
  if (isLoading) {
    return <h1 className='loading'>loading...</h1>
  }

  if (isError) {
    return <h1 className='loading'>{ error }</h1>
  }

  return (
    <main>
      <Navbar totalAmount={ bag.totalAmount } />
      
      <section className="cart">
        <Header totalAmount={ bag.totalAmount } />
                
        <div>
          { bag.items.map(item => <Item key={ item.id } item={ item } dispatch={ dispatch } />) }
        </div>
        
        <Footer totalAmount={ bag.totalAmount } totalPrice={ bag.totalPrice } dispatch={ dispatch } />
      </section>
    </main> 
  )
}

export default Cart
