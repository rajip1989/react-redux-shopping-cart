import React from "react";
import Product from "./Product";

const Products = ({product , productQuantity, updateQuantity , resetQuantity , addToCart , openModal}) => (
 
<Product
            key={product.id}
            price={product.price}
            name={product.name}
            image={product.image}
            id={product.id}
            productQuantity={productQuantity}
            updateQuantity={updateQuantity}
            resetQuantity = {resetQuantity}
            addToCart = {addToCart}
            openModal={openModal}
          />
)

export default Products;
