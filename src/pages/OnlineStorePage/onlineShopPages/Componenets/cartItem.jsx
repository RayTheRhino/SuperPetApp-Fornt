import React from 'react'
import './cartItem.css'

export const CartItem = (props) => {
    const {id, productName, price, productImage} = props.data;
  return (
    <div className='cartItem'>
        <img src={productImage}/>
        <div className='description'>
            <p>
                <b>{productName}</b>
            </p>
            <p>
                ₪{price}
            </p>
            <div className='countHandler'>
                <button> - </button>
                
                <button> + </button>
            </div>
        </div>
    </div>
  )
}
