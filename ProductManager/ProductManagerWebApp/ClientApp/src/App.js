import React from 'react';
import { Route } from 'react-router';
import Layout from './components/Layout';
import Home from './components/Home';
import Counter from './components/Counter';
import FetchData from './components/FetchData';

import ProductList from './components/ProductList';
import ProductDetails from './components/ProductDetails';

export default () => (
  <div className="container">
    <Route exact path='/' component={ProductList} />
    <Route path='/products/:id' component={ProductDetails} />
    {/* <Route exact path='/' component={Home} />
    <Route path='/counter' component={Counter} />
    <Route path='/fetchdata/:startDateIndex?' component={FetchData} /> */}
  </div>
);
