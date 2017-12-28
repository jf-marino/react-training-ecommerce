// @flow
/* eslint-disable jsx-a11y/click-events-have-key-events,
jsx-a11y/no-noninteractive-element-interactions */
import React from 'react';
import { type Category, type Product } from '../types';
import { Route } from 'react-router';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import AddProduct from '../containers/AddProduct';
import { addProduct } from "../../redux/actions/products";

import s from './Sidebar.styl';
import {fetchCategories} from "../../redux/actions/categories";

const CategoryLink = ({ path, category }) => {
    const { name } = category;
    return (
        <Route path={path} children={({ location }) => {
            const active = location.pathname + location.search === path;
            return (
                <h2 className={active ? s.active : ''}>
                    <Link to={path}>{name}</Link>
                </h2>
            )
        }}/>
    );
};

export class Sidebar extends React.Component {
    componentWillMount() {
        const { fetchCategories } = this.props;
        fetchCategories();
    }

    render() {
        const { categories, addProduct } = this.props;
        return (
            <ul className={s.sidebar}>
                <li>
                    <Link to={`/products`}>
                        All
                    </Link>
                </li>
                {categories.map(category => (
                    <li key={category.id}>
                        <CategoryLink path={`/products?category=${category.id}`} category={category} />
                    </li>))}
                <AddProduct addProduct={addProduct} categories={categories} />
            </ul>
        );
    }
}

const mapStateToProps = state => ({
    categories: state.categories.list,
    loading: state.categories.loading
});

const mapDispatchToProps = dispatch => ({
    fetchCategories: () => dispatch(fetchCategories()),
    addProduct: (product) => dispatch(addProduct(product))
});

export const SidebarContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(Sidebar));
