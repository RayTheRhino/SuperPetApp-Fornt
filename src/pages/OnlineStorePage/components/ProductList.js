import React, { useContext } from 'react';
import Product from './Product';
import ProductForm from './ProductForm';
import { CartContext } from './CartContext';
import './ProductList.css'; // Import the CSS file for styling

const ProductList = () => {
    const { products, addToCart } = useContext(CartContext);

    return (
        <div className="product-list-container">
            <ProductForm />
            <div className="product-list-grid">
                {products.map((product) => (
                    <Product key={product.id} product={product} addToCart={addToCart} />
                ))}
            </div>
        </div>
    );
};

export default ProductList;
