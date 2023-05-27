import React, { useContext } from 'react';
import { CartContext } from './CartContext';
import Product from './Product';

const Cart = () => {
    const { cartItems, removeFromCart } = useContext(CartContext);

    return (
        <div className="cart">
            <h2>Your Cart</h2>
            {cartItems.length === 0 ? (
                <p>No items in the cart.</p>
            ) : (
                <ul>
                    {cartItems.map((item) => (
                        <Product key={item.id} item={item} removeFromCart={removeFromCart} />
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Cart;
