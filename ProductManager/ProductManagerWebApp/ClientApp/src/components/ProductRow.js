import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class ProductRow extends Component {
    handleClick(id) {
        // Add redirection here
        console.log(id);
    }

    render() {
        return (
            <tr onClick={() => this.handleClick(this.props.product.id)}>
                <td>
                    <Link to={`/products/${this.props.product.id}`}>
                        {this.props.product.id}
                    </Link>
                </td>
                <td>
                    <Link to={`/products/${this.props.product.id}`}>
                        {this.props.product.name}
                    </Link>
                </td>
                <td>{this.props.product.category}</td>
                <td>{this.props.product.active ? "true" : "false"}</td>
                <td>{this.props.product.price}</td>
            </tr>
        )
    }
}

export default ProductRow;