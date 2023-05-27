import React, { useState, useContext } from 'react';
import { CartContext } from './CartContext';

const ProductForm = () => {
    const { addProduct } = useContext(CartContext);
    const [product, setProduct] = useState({ name: '', price: '', image: '' });

    const handleChange = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        addProduct(product);
        setProduct({ name: '', price: '', image: '' });
    };

    return (
        <div className="product-form">
            <h2>Add Product</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    placeholder="Product Name"
                    value={product.name}
                    onChange={handleChange}
                    required
                />
                <input
                    type="number"
                    name="price"
                    placeholder="Product Price"
                    value={product.price}
                    onChange={handleChange}
                    required
                />
                <input
                    type="url"
                    name="image"
                    placeholder="Product Image URL"
                    value={product.image}
                    onChange={handleChange}
                    required
                />
                <button type="submit">Add</button>
            </form>
        </div>
    );
};

export default ProductForm;
