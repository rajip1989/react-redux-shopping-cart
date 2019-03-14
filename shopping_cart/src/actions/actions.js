import axios from 'axios';

const getProducts = (products) => ( {
    type :"GET_PRODUCTS",
    products : products
})

export const getAllProducts = () => dispatch =>{
    return axios.get("https://res.cloudinary.com/sivadass/raw/upload/v1535817394/json/products.json")
    .then(response => {
        dispatch(getProducts(response.data))
    })
    .catch(error => {
        throw(error);
    });
};

export const searchProducts=(products)=>({
    type:"SEARCH_PRODUCTS",
    products: products
});

export const filterProducts=(products)=>({
    type:"FILTER_PRODUCTS",
    products: products
});

export const addItemsToCart = (noOfItems, totalAmount) => ({
    type : "ADD_TO_CART",
    noOfItems:noOfItems,
    totalAmount:totalAmount
})


