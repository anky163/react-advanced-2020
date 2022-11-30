import React from 'react'

import { Navbar, Header, Footer, Item } from './HtmlElements'

import { useFetch } from './useFetch'


import './index.css'

const url = 'https://course-api.com/react-useReducer-cart-project';

const Cart = () => {
  const { bag, dispatch, isLoading, isError, error } = useFetch(url);
  const { totalAmount, totalPrice } = bag;
  
  if (isLoading) {
    return <h1 className='loading'>loading...</h1>
  }

  if (isError) {
    return <h1 className='loading'>{ error }</h1>
  }

  return (
    <main>
      <Navbar { ...{ totalAmount } } />
      
      <section className="cart">
        <Header { ...{ totalAmount } } />
                
        <div>
          { bag.items.map(item => <Item key={ item.id } { ...{ item, dispatch } } />) }
        </div>
        
        <Footer { ...{ totalAmount, totalPrice, dispatch } } />
      </section>
    </main> 
  )
}

export default Cart
