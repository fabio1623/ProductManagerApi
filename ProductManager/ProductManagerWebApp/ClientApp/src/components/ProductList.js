import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import ProductRow from './ProductRow';

import { actionCreators } from '../store/ProductStore';

class ProductList extends Component {
    componentDidMount() {
        this.props.getProducts();
    }

    renderTable(props) {
        return (
            <table className="table table-striped table-bordered table-hover">
                <thead>
                    <tr>
                        <th>id^</th>
                        <th>name^</th>
                        <th>category^</th>
                        <th>active</th>
                        <th>price</th>
                    </tr>
                </thead>
                <tbody>
                    {props.products.map(product =>
                        <ProductRow key={product.id} product={product} />
                    )}
                </tbody>
            </table>
        );
    }

    renderLoadingAnimation(props) {
        return <p className='clearfix text-center'>
            {props.isLoading ?
            <span>Loading...</span> : []}
        </p>;
    }

    renderSignInButton() {
        return (
        <div className="navbar-fixed-top">
            <button
                type="button"
                className="btn btn-primary pull-right">
                Sign In
            </button>
        </div>
        );
    }

    renderFooter() {
        return <div className="navbar-fixed-bottom">
            <button
                type="button"
                className="btn btn-link pull-left">
                About
            </button>
            <button
                type="button"
                className="btn btn-link pull-left">
                Business
            </button>

            <button
                type="button"
                className="btn btn-link pull-right">
                Settings
            </button>
            <button
                type="button"
                className="btn btn-link pull-right">
                Privacy & Terms
            </button>
        </div>;
    }

    render() {
        return (
            <div>
                {this.renderSignInButton()}
                <h1>Products List</h1>
                {this.renderTable(this.props)}
                {this.renderLoadingAnimation(this.props)}
                {this.renderFooter()}
            </div>
        );
    }
}

export default connect(
    state => state.products,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(ProductList);