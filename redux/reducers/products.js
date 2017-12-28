import {ADD_PRODUCT, FETCHING_PRODUCTS, SET_PRODUCTS} from "../actions/products";

export const productsListReducer = (state = [], action) => {
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

export const productsLoadingReducer = (state = false, action) => {
    const { type } = action;
    if (type === FETCHING_PRODUCTS) {
        return true;
    }
    if (type === SET_PRODUCTS) {
        return false;
    }
    return state;
};

export const productsReducer = (state = { list: [], loading: false }, action) => {
    const { list, loading } = state;
    return {
        list: productsListReducer(list, action),
        loading: productsLoadingReducer(loading, action)
    };
};
