// @flow
import * as React from 'react';
import Item from './Item';
import { Link } from 'react-router-dom';
import { type Product } from '../types';
import s from './Grid.css';
import type {ContextRouter} from "../../flow-typed/npm/react-router_v4.x.x";

const Grid = ({
  products,
  selectedCategory,
  match,
  addToCart
}: {
  products: Product[],
  selectedCategory: ?number,
  match: ContextRouter,
  addToCart: Function
}) => (
  <div className={s.grid}>
    {products
        .filter(product => !selectedCategory || product.categoryId === selectedCategory)
        .map(product =>
          <Link key={product.id} to={`${match.url}/${product.id}`}>
            <Item product={product} addToCart={addToCart} />
          </Link>
        )}
  </div>
);

export default Grid;
