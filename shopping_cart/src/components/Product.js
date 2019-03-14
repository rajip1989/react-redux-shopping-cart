import React, { Component } from "react";
import Counter from "./Counter";

class Product extends Component {
  constructor(props) {
    super(props);
    this.addToCart = this.addToCart.bind(this);
    this.counterRef = React.createRef();
    this.state = {
      quickViewProdcut: {},
      isAdded: false,
      totalAmount : 0,
      totalItems : 0
    };
  }
  addToCart(e){
    var sumAmount = (this.counterRef.current.state.value * this.props.price);
    this.props.addToCart(this.counterRef.current.state.value, sumAmount);
    this.props.resetQuantity(1);
    this.setState(
          {
            isAdded: true
          },
          function() {
            setTimeout(() => {
              this.setState({
                isAdded: false,
                
              });
            }, 500);
          }
        );

        
  }
  
  quickView(image, name, price, id) {
    this.setState(
      {
        quickViewProdcut: {
          image: image,
          name: name,
          price: price,
          id: id
        }
      },
      function() {
        this.props.openModal(this.state.quickViewProdcut);
      }
    );
  }
  render() {
    let image = this.props.image;
    let name = this.props.name;
    let price = this.props.price;
    let id = this.props.id;
    let quantity = this.props.productQuantity;
    return (
      <div className="product">
        <div className="product-image">
          <img
            src={image}
            alt={this.props.name}
            onClick={this.quickView.bind(
              this,
              image,
              name,
              price,
              id,
              quantity
            )}
          />
        </div>
        <h4 className="product-name">{this.props.name}</h4>
        <p className="product-price">{this.props.price}</p>
        <Counter
          productQuantity={quantity}
          updateQuantity={this.props.updateQuantity}
          ref = {this.counterRef}
        />
        <div className="product-action">
          <button
            className={!this.state.isAdded ? "" : "added"}
            type="button"
            onClick={this.addToCart}
          >
            {!this.state.isAdded ? "ADD TO CART" : "✔ ADDED"}
          </button>
        </div>
      </div>
    );
  }
}

export default Product;
