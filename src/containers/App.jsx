// @flow
import React from 'react';
import { Route, Redirect, Switch } from 'react-router';
import { Link } from 'react-router-dom';
import s from './App.css';

import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { fetchProducts, addProduct } from "../../redux/actions/products";
import { addToCart, removeFromCart } from "../../redux/actions/cart";

import Grid from '../components/Grid';
import Item from '../components/Item';
import { SidebarContainer } from '../components/Sidebar';
import { Cart } from "../components/Cart.jsx";

import { type Product, type Category } from '../types';
import type { ContextRouter } from "../../flow-typed/npm/react-router_v4.x.x";

type Props = {};

type State = {};

export class App extends React.Component<Props, State> {

  componentWillMount() {
      const { fetchProducts } = this.props;
      fetchProducts();
  }

  render() {
      const { products, loading, cart, addProduct, addToCart, removeFromCart } = this.props;
      return (
          loading ?
              <div>Loading...</div>
              :
              <div className={s.layout}>
                  <div>
                      <SidebarContainer/>
                  </div>
                  <div>
                      <div>
                          <Link to="/cart">Go to Cart</Link>
                      </div>
                      <Switch>
                          <Route path="/products/:id" render={({ match: { params: { id } } }) => {
                              const product = id ? products.find(p => String(p.id) === id) : null;
                              return product ?
                                  <Item key={id} product={product} addToCart={addToCart} />
                                  :
                                  <h4>No products with that ID</h4>
                          }} />
                          <Route
                              path="/products"
                              render={({ location, ...rest }: ContextRouter) =>
                                  <Grid
                                      addToCart={addToCart}
                                      products={products}
                                      selectedCategory={Number((new URLSearchParams(location.search)).get('category'))}
                                      location={location}
                                      {...rest}
                                  />
                              }
                          />
                          <Route path="/cart" render={() => <Cart cart={cart} removeFromCart={removeFromCart} />} />
                          <Redirect exact from="/" to="/products"/>
                          <Route component={() => <h4>404 - Route not found</h4>} />
                      </Switch>
                  </div>
              </div>
      );
  }
}

const mapStateToProps = state => ({
    products: state.products.list,
    loading: state.products.loading,
    cart: state.cart
});

const mapDispatchToProps = dispatch => ({
    fetchProducts: () => dispatch(fetchProducts()),
    addProduct: (product) => dispatch(addProduct(product)),
    addToCart: (product) => dispatch(addToCart(product)),
    removeFromCart: (product) => dispatch(removeFromCart(product))
});

export const AppContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
