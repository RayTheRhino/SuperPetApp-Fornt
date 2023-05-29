import React, { useContext } from 'react'
import { PRODUCTS } from '../products'
import { ShopContext } from './Context/ShopContext'
import { CartItem } from './Componenets/cartItem'


const CartPage = () => {
  const {cartItems} = useContext(ShopContext);
  return (
    <div className='cart'>
      <div>
        <h1> Cart : </h1>
      </div>
      <div className='cartItems'>
        {PRODUCTS.map((product)=>{
          if(cartItems[product.id] !== 0 ){
            return <CartItem data = {product}/>
          }
        })}
      </div>
    </div>
  )
}

export default CartPage