const requestProducts = 'REQUEST_PRODUCTS';
const receiveProducts = 'RECEIVE_PRODUCTS';
const requestProductDetails = 'REQUEST_PRODUCTS_DETAILS';
const receiveProductDetails = 'RECEIVE_PRODUCTS_DETAILS';
const updateProduct = 'UPDATE_PRODUCT';
const initialState = {
    products: [],
    product: null,
    isLoading: false
};

export const actionCreators = {
    getProducts: any => async (dispatch, getState) => {

        dispatch({ type: requestProducts });

        const url = `https://localhost:44313/product-api/products`;
        const response = await fetch(url);
        const products = await response.json();

        dispatch({ type: receiveProducts, products });
    },

    getProductDetails: productId => async (dispatch, getState) => {
        if (productId === getState().productId) {
            // Don't issue a duplicate request (we already have or are loading the requested data)
            return;
        }

        dispatch({ type: requestProductDetails });

        const url = `https://localhost:44313/product-api/products/${productId}`;
        const response = await fetch(url);
        const product = await response.json();

        dispatch({ type: receiveProductDetails, product });
    },

    updateProduct: product => async (dispatch, getState) => {
        dispatch({ type: updateProduct, id: product.id, product: product });
        
        const url = `https://localhost:44313/product-api/products/${product.id}`;
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({product})
        });
    }
};

export const reducer = (state, action) => {
    state = state || initialState;

    if (action.type === requestProducts) {
        return {
            ...state,
            isLoading: true
        };
    }

    if (action.type === receiveProducts) {
        return {
            ...state,
            products: action.products,
            isLoading: false
        };
    }

    if (action.type === requestProductDetails) {
        return {
            ...state,
            isLoading: true
        }
    }

    if (action.type === receiveProductDetails) {
        return {
            ...state,
            product: action.product,
            isLoading: false
        };
    }

    return state;
};