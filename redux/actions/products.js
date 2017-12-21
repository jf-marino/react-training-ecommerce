
// Action Type
export const SET_PRODUCTS = 'SET_PRODUCTS';
export const ADD_PRODUCT = 'ADD_PRODUCT';

export const setProducts = (products = []) => {
    return {
        type: SET_PRODUCTS,
        products
    };
};

export const addProduct = product => {
    return {
        type: ADD_PRODUCT,
        product
    };
};
