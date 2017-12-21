// @flow
/* eslint-disable jsx-a11y/click-events-have-key-events,
jsx-a11y/no-noninteractive-element-interactions */
import React from 'react';
import { type Category, type Product } from '../types';
import { Route } from 'react-router';
import { Link } from 'react-router-dom';
import s from './Sidebar.styl';
import AddProduct from '../containers/AddProduct';

const CategoryLink = ({ path, category, changeCategory }) => {
    const { id, name } = category;
    return (
        <Route path={path} children={({ location }) => {
            const active = location.pathname + location.search === path;
            return (
                <h2 onClick={() => changeCategory(id)} className={active ? s.active : ''}>
                    <Link to={path}>{name}</Link>
                </h2>
            )
        }}/>
    );
};

const Sidebar = ({
  categories,
  changeCategory,
  addProduct,
}: {
  categories: Category[],
  changeCategory: (selectedCategory: ?number) => void,
  addProduct: (product: Product) => void,
}) => {
    return (
        <ul className={s.sidebar}>
            <li>
                <button onClick={() => changeCategory(null)}>
                    All
                </button>
            </li>
            {categories.map(category => (
                <li key={category.id}>
                    <CategoryLink path={`/products?category=${category.id}`} category={category} changeCategory={changeCategory} />
                </li>))}
            <AddProduct addProduct={addProduct} categories={categories} />
        </ul>
    );
};

export default Sidebar;
