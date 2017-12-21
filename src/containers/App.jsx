// @flow
import React from 'react';
import { Route, Redirect, Switch } from 'react-router';
import { Link } from 'react-router-dom';
import axios, { type $AxiosXHR } from 'axios';
import Grid from '../components/Grid';
import Item from '../components/Item';
import Sidebar from '../components/Sidebar';
import { store } from '../../redux/store';
import { type Product, type Category } from '../types';
import s from './App.css';
import type {ContextRouter} from "../../flow-typed/npm/react-router_v4.x.x";
import {setProducts} from "../../redux/actions/products";
import { setCategories } from "../../redux/actions/categories";
import {addToCart, removeFromCart} from "../../redux/actions/cart";
import {Cart} from "../components/Cart.jsx";

type Props = {};

type State = {
  products: Product[],
  categories: Category[],
  selectedCategory: ?number,
  loading: boolean,
};

export default class App extends React.Component<Props, State> {
  static fetchProducts() {
      return axios.get('http://develop.plataforma5.la:3000/api/products')
          .then((res: $AxiosXHR<Product[]>) => res.data);
  }

  static fetchCategories() {
      return axios.get('http://develop.plataforma5.la:3000/api/categories')
          .then((res: $AxiosXHR<Category[]>) => res.data);
  }
  state = {
    cart: store.getState().cart,
    products: store.getState().products,
    categories: store.getState().categories,
    selectedCategory: null,
    loading: true,
  };

  componentWillMount() {
      this.subscription = store.subscribe(() => {
          const { products, categories, cart } = store.getState();
          this.setState({ products, categories, cart });
      });
  }

  componentDidMount() {
    Promise.all([App.fetchProducts(), App.fetchCategories()])
      .then(([products, categories]) => {
          store.dispatch(setProducts(products));
          store.dispatch(setCategories(categories));
      })
      .then(() => this.setState({ loading: false }));
  }

  componentWillUnmount() {
      this.subscription();
  }

  changeCategory = (selectedCategory: ?number) => {
    this.setState({
      selectedCategory,
    });
  };

  addProduct = (product: Product) => {
    store.dispatch(addProduct(product));
  };

  addProductToCart = (product: Product) => {
     store.dispatch(addToCart(product));
  };

  removeProductFromCart = (product: Product) => {
     store.dispatch(removeFromCart(product));
  };

  render() {
      const { products, categories, cart } = this.state;
      return (
          this.state.loading ?
              <div>Loading...</div>
              :
              <div className={s.layout}>
                  <div>
                      <Link to="/cart">Go to Cart</Link>
                  </div>
                  <div>
                      <Sidebar
                          addProduct={this.addProduct}
                          categories={categories}
                          changeCategory={this.changeCategory}
                      />
                  </div>
                  <div>
                      <Switch>
                          <Route path="/products/:id" render={({ match: { params: { id } } }) => {
                              const product = id ? products.find(p => String(p.id) === id) : null;
                              return product ?
                                  <Item key={id} product={product} addToCart={this.addProductToCart} />
                                  :
                                  <h4>No products with that ID</h4>
                          }} />
                          <Route
                              path="/products"
                              render={({ location, ...rest }: ContextRouter) =>
                                  <Grid
                                      addToCart={this.addProductToCart}
                                      products={products}
                                      selectedCategory={Number((new URLSearchParams(location.search)).get('category'))}
                                      location={location}
                                      {...rest}
                                  />
                              }
                          />
                          <Route path="/cart" render={() => <Cart cart={cart} removeFromCart={this.removeProductFromCart} />} />
                          <Redirect exact from="/" to="/products"/>
                          <Route component={() => <h4>404 - Route not found</h4>} />
                      </Switch>
                  </div>
              </div>
      );
  }
}
