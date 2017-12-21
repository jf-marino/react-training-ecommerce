import React from 'react';

export const Cart = ({ cart, removeFromCart }) => {
    return (
        <div>
            <h3>Products in the Cart</h3>
            <ul>
                {cart.map(({ product, quantity }) => {
                    return (
                        <li key={product.id}>
                            <h5>Product: {product.name}</h5>
                            <h5>Quantity: {quantity}</h5>
                            <button onClick={() => removeFromCart(product)}>Remove from Cart</button>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};
