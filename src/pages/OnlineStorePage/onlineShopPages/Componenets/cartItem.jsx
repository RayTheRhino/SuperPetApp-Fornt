import React,{useContext} from 'react'
import { ShopContext } from '../Context/ShopContext';
import './cartItem.css'

export const CartItem = (props) => {
    const {id, productName, price, productImage} = props.data;
    const {cartItems, addToCart, removeFromCart, updateCartItemCount} = useContext(ShopContext);
  return (
    <div className='cartItem'>
        <img src={productImage}/>
        <div className='description'>
            <p>
                <b>{productName}</b>
            </p>
            <p className='pricec'>
                ₪{price}
            </p>
            <div className='countHandler'>
                <button id='minus' onClick={() => removeFromCart(id)}>-</button>
                <input  value={cartItems[id]} onChange={(e)=> updateCartItemCount(Number(e.target.value), id)}/>
                <button id='plus' onClick={() => addToCart(id)}>+</button>
            </div>
        </div>
    </div>
  )
}
