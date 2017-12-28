// @flow
/* eslint-disable react/jsx-filename-extension */

import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter} from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import { AppContainer } from './containers/App';

const appDiv = document.getElementById('app');

if (appDiv) render(
    <BrowserRouter>
        <Provider store={store}>
            <AppContainer />
        </Provider>
    </BrowserRouter>
    , appDiv);
