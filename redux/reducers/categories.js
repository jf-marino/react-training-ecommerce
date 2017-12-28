import {FETCHING_CATEGORIES, SET_CATEGORIES} from "../actions/categories";

export const categoriesListReducer = (state = [], action) => {
    const { type } = action;
    if (type === SET_CATEGORIES) {
        const { categories } = action;
        return categories || state.categories;
    }
    return state;
};

export const categoriesLoadingReducer = (state = false, action) => {
    const { type } = action;
    if (type === FETCHING_CATEGORIES) {
        return true;
    }
    if (type === SET_CATEGORIES) {
        return false;
    }
    return state;
};

export const categoriesReducer = (state = { list: [], loading: false }, action) => {
    const { list, loading } = state;
    return {
        list: categoriesListReducer(list, action),
        loading: categoriesLoadingReducer(loading, action)
    };
};
