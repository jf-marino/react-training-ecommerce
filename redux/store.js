import { createStore, applyMiddleware, compose } from 'redux';
import { reducer } from './reducers';
import thunk from 'redux-thunk';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middlewares = composeEnhancers(applyMiddleware(thunk));

export const store = createStore(
    reducer,
    {
        products: { loading: false, list: [] },
        categories: { loading: false, list: [] },
        cart: []
    },
    middlewares
);