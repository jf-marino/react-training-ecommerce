import {ADD_TO_CART, REMOVE_FROM_CART, SET_PRODUCT_QUANTITY} from "../actions/cart";

const getIndex = (state, product) => {
    return state.findIndex(tuple => tuple.product.id === product.id);
};

export const cartReducer = (state = [], action) => {
    const { type } = action;
    if (type === ADD_TO_CART) {
        const { product } = action;
        const index = getIndex(state, product);
        if (index >= 0) {
            return [
                ...state.slice(0, index),
                {
                    product,
                    quantity: state[index].quantity + 1
                },
                ...state.slice(index + 1, state.length)
            ];
        } else {
            return [
                ...state,
                { product, quantity: 1 }
            ]
        }
    }

    if (type === REMOVE_FROM_CART) {
        const { product } = action;
        const index = getIndex(state, product);
        if (index >= 0) {
            return [
                ...state.slice(0, index),
                ...state.slice(index + 1, state.length)
            ];
        }
    }

    if (type === SET_PRODUCT_QUANTITY) {
        const { product, quantity } = action;
        const index = getIndex(state, product);
        if (index >= 0) {
            return [
                ...state.slice(0, index),
                {
                    product,
                    quantity: quantity
                },
                ...state.slice(index + 1, state.length)
            ];
        }
    }

    return state;
};
