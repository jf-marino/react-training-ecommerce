import {ADD_PRODUCT, SET_PRODUCTS} from "../actions/products";

export const productsReducer = (state = [], action) => {
    const { type } = action;
    if (type === SET_PRODUCTS) {
        const { products } = action;
        return products || state.products;
    }
    if (type === ADD_PRODUCT) {
        const { product } = action;
        return [
            ...state,
            product
        ];
    }
    return state;
};