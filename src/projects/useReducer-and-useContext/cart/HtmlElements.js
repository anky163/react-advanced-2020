import React from "react";
import { AppContext, IncreaseButton, DecreaseButton, RemoveButton, ClearButton } from "./AppContext";
import { BagIcon } from "./Icons";


export const Navbar = ({ totalAmount }) => {
  return (
    <nav>
      <div className="nav-center">
        <h3>useReducer</h3>
        
        <div className="nav-container">
          <BagIcon />

          <div className="amount-container">
            <p className="total-amount">{ totalAmount }</p>  
          </div>
        </div>
      </div>
    </nav>
  )
}


export const Header = ({ totalAmount }) => {
  return (
    <header>
      <h2>your bag</h2>
      { totalAmount === 0 && <h4 className="empty-cart">is currently empty</h4> }
    </header>
  )
}


export const Item = React.memo(({ ...props }) => {
    console.count('single item called');
    const { item, dispatch } = props;
    const { id, title, price, amount, img } = item;
    return (
      <article className='cart-item'>
        <img src={ img } alt={ title } />

        <AppContext.Provider value={ { id, dispatch } }>

            <div>
              <h4>{ title }</h4>
              <h4 className='item-price'>${ price }</h4>
              <RemoveButton />                   
            </div>

            <div>
              <IncreaseButton />
              <p className="amount">{ amount }</p>
              <DecreaseButton />  
            </div>

        </AppContext.Provider>
      </article>
    )
  }
)


export const Footer = ({ ...props }) => {
  const { totalAmount, totalPrice, dispatch } = props;
  return (
    <>
      {
        totalAmount > 0 && (
          <footer>
            <hr />
            <div className="cart-total">
              <h4>total <span>${ totalPrice.toFixed(2) }</span></h4>
            </div>

            <AppContext.Provider value={ { dispatch } } >
              <ClearButton />
            </AppContext.Provider>
          </footer>
        )
      }
    </>
  )
}