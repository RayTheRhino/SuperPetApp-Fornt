import React, { useContext } from 'react'
import { PRODUCTS } from '../products'
import { ShopContext } from './Context/ShopContext'
import { CartItem } from './Componenets/cartItem'
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const {cartItems, getTotalCartAmount} = useContext(ShopContext);
  const totalAmount = getTotalCartAmount();
  
  const navigate = useNavigate();

  return (
    <div className='cart'>
      <div>
        <h3 id='cartTitle'> Cart : </h3>
      </div>
      <div className='cartItems'>
        {PRODUCTS.map((product)=>{
          if(cartItems[product.id] !== 0 ){
            return <CartItem data = {product}/>
          }
        })}
      </div>
      {totalAmount > 0 ?
        <div className='checkout'>
          <p>Subtotal:   ₪{totalAmount}</p>
          <button onClick={() => navigate('/onlineShop')}>Continue Shopping</button>
          <button onClick={() => navigate('/onlineShop/cart/paymentPage')}>Checkout </button>
        </div>
        : <h1> Your Cart is Empty</h1>}

    </div>
  )
}

export default CartPage
