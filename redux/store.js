import { createStore } from 'redux';
import { reducer } from './reducers';

export const store = createStore(
    reducer,
    {
        products: [],
        categories: [],
        cart: []
    },
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(), // magia para que funcione la extensión de redux del google Chrome.
);