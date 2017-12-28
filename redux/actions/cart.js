

export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const SET_PRODUCT_QUANTITY = 'SET_PRODUCT_QUANTITY';

export const addToCart = product => {
    return {
        type: ADD_TO_CART,
        product
    };
};

export const removeFromCart = product => {
    return {
        type: REMOVE_FROM_CART,
        product
    }
};

export const setProductQuantity = (product, quantity) => {
    return {
        type: SET_PRODUCT_QUANTITY,
        product,
        quantity
    };
};