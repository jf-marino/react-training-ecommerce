import { combineReducers } from "redux";
import { productsReducer } from "./products";
import { categoriesReducer } from "./categories";
import { cartReducer } from "./cart";


export const reducer = combineReducers({
    products: productsReducer,
    categories: categoriesReducer,
    cart: cartReducer
});

