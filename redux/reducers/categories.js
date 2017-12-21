import { SET_CATEGORIES } from "../actions/categories";

export const categoriesReducer = (state = { categories: [] }, action) => {
    const { type } = action;
    if (type === SET_CATEGORIES) {
        const { categories } = action;
        return categories || state.categories;
    }
    return state;
};
