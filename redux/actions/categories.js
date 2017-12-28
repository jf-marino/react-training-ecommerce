import axios from 'axios';

export const SET_CATEGORIES = 'SET_CATEGORIES';
export const FETCHING_CATEGORIES = 'FETCHING_CATEGORIES';

export const setCategories = (categories = []) => ({
    type: SET_CATEGORIES,
    categories
});

export const fetchingCategories = () => ({
    type: FETCHING_CATEGORIES
});

export const fetchCategories = () => {
    return dispatch => {
        dispatch(fetchingCategories());
        axios.get('http://develop.plataforma5.la:3000/api/categories')
            .then(res => res.data)
            .then(categories => dispatch(setCategories(categories)));
    }
};
