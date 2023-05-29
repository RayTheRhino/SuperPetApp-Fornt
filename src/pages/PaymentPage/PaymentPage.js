import React from "react";
import { FaCreditCard, FaCalendarAlt, FaLock } from "react-icons/fa";
import './PaymentPage.css';

function PaymentPage() {
  const handlePaymentSubmit = (event) => {
    event.preventDefault();

    // Perform payment processing logic here
    // Send the payment details to your payment gateway or service

    // Show a success message or redirect to a success page
    alert("Payment successful!");
  };

  return (
    <div className="payment-container">
      <h2 className="payment-heading">Payment Page</h2>
      <form className="payment-form" onSubmit={handlePaymentSubmit}>
            <div className="payment-field">
            <FaCreditCard className="payment-icon" />
            <input type="text" defaultValue="1234 5678 9012 3456" readOnly />
            </div>
            <div className="payment-field">
            <FaCalendarAlt className="payment-icon" />
            <input type="text" defaultValue="12/23" readOnly />
            </div>
            <div className="payment-field">
            <FaLock className="payment-icon" />
            <input type="text" defaultValue="123" readOnly />
            </div>
            <button className="payment-button" type="submit">
            Pay Now
            </button>
      </form>
    </div>
  );
}

export default PaymentPage;
