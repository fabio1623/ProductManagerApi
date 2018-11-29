import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { actionCreators } from '../store/ProductStore';
import { bindActionCreators } from 'redux';

class ProductDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            category: "",
            active: false,
            price: ""
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillMount() {
        let productId = this.props.match.params.id;
        this.props.getProductDetails(productId);
    }

    handleChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleSubmit(event) {
        event.preventDefault();
    }

    renderForm(product) {
        if (product) {
            return (
                <div>
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <label>Name*</label>
                            <input
                                required
                                name="name"
                                type="text"
                                defaultValue={product.name}
                                onChange={this.handleChange}
                                placeholder="Enter Product Name"
                                className="form-control" />
                        </div>
                        <div className="form-group">
                            <label>Category*</label>
                            <input
                                required
                                name="category"
                                type="text"
                                defaultValue={product.category}
                                onChange={this.handleChange}
                                placeholder="Enter Product Category"
                                className="form-control" />
                        </div>
                        <div className="checkbox">
                            <label>
                                <input 
                                name="active"
                                checked={product.active}
                                onChange={this.handleChange}
                                type="checkbox" /> Active?
                            </label>
                        </div>
                        <div className="form-group">
                            <label>Price</label>
                            <input
                                name="price"
                                type="number"
                                defaultValue={product.price}
                                onChange={this.handleChange}
                                placeholder="Enter Product Price"
                                className="form-control" />
                        </div>
                        <br />
                        {/* <button type="submit" className="btn btn-primary">Save</button> */}
                        <Link className="btn btn-primary" to="/">Save</Link>
                        <Link className="btn btn-primary" to="/">Back</Link>
                    </form>
                </div>
            );
        }
    }

    render() {
        return (
            <div>
                <h1>Product details</h1>
                {this.renderForm(this.props.product)}
            </div>
        );
    }
}

export default connect(
    state => state.product,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(ProductDetails);