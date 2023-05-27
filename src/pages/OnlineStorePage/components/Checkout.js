import React, { useContext, useState } from 'react';
import { CartContext } from './CartContext';

const Checkout = () => {
    const { cartItems, emptyCart } = useContext(CartContext);
    const [shippingInfo, setShippingInfo] = useState({
        name: '',
        address: '',
        city: '',
        zip: '',
        country: '',
    });
    const [paymentInfo, setPaymentInfo] = useState({
        cardNumber: '',
        cardHolder: '',
        expirationDate: '',
        cvv: '',
    });

    const handleShippingInputChange = (e) => {
        setShippingInfo({
            ...shippingInfo,
            [e.target.name]: e.target.value,
        });
    };

    const handlePaymentInputChange = (e) => {
        setPaymentInfo({
            ...paymentInfo,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Process the order, save the data, etc.
        // Reset the form and empty the cart
        setShippingInfo({
            name: '',
            address: '',
            city: '',
            zip: '',
            country: '',
        });
        setPaymentInfo({
            cardNumber: '',
            cardHolder: '',
            expirationDate: '',
            cvv: '',
        });
        emptyCart();
        // Redirect or show success message to the user
    };

    return (
        <div className="checkout">
            <h2>Checkout</h2>
            <form onSubmit={handleSubmit}>
                <h3>Shipping Information</h3>
                <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    value={shippingInfo.name}
                    onChange={handleShippingInputChange}
                    required
                />
                <input
                    type="text"
                    name="address"
                    placeholder="Address"
                    value={shippingInfo.address}
                    onChange={handleShippingInputChange}
                    required
                />
                <input
                    type="text"
                    name="city"
                    placeholder="City"
                    value={shippingInfo.city}
                    onChange={handleShippingInputChange}
                    required
                />
                <input
                    type="text"
                    name="zip"
                    placeholder="Zip Code"
                    value={shippingInfo.zip}
                    onChange={handleShippingInputChange}
                    required
                />
                <input
                    type="text"
                    name="country"
                    placeholder="Country"
                    value={shippingInfo.country}
                    onChange={handleShippingInputChange}
                    required
                />

                <h3>Payment Information</h3>
                <input
                    type="text"
                    name="cardNumber"
                    placeholder="Card Number"
                    value={paymentInfo.cardNumber}
                    onChange={handlePaymentInputChange}
                    required
                />
                <input
                    type="text"
                    name="cardHolder"
                    placeholder="Card Holder"
                    value={paymentInfo.cardHolder}
                    onChange={handlePaymentInputChange}
                    required
                />
                <input
                    type="text"
                    name="expirationDate"
                    placeholder="Expiration Date"
                    value={paymentInfo.expirationDate}
                    onChange={handlePaymentInputChange}
                    required
                />
                <input
                    type="text"
                    name="cvv"
                    placeholder="CVV"
                    value={paymentInfo.cvv}
                    onChange={handlePaymentInputChange}
                    required
                />

                <button type="submit">Place Order</button>
            </form>
        </div>
    );
};

export default Checkout;
