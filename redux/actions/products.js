import axios from 'axios';

// Action Type
export const SET_PRODUCTS = 'SET_PRODUCTS';
export const ADD_PRODUCT = 'ADD_PRODUCT';
export const FETCHING_PRODUCTS = 'FETCHING_PRODUCTS';

export const setProducts = (products = []) => ({
    type: SET_PRODUCTS,
    products
});

export const addProduct = product => ({
    type: ADD_PRODUCT,
    product
});

export const fetchingProducts = () => ({
    type: FETCHING_PRODUCTS
});

export const fetchProducts = () => {
    return dispatch => {
        dispatch(fetchingProducts());
        axios.get('http://develop.plataforma5.la:3000/api/products')
             .then(res => res.data)
             .then(products => dispatch(setProducts(products)));
    }
};
