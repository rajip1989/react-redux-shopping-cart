import React , {Component} from 'react'
import { connect } from 'react-redux'
import Products from '../components/Products';
import ProductsList from '../components/ProductsList';
import "../scss/style.scss";
import NoResults from "../components/NoResults"
import {addItemsToCart} from "../actions/actions"
import QuickView from "../components/QuickView"
import Footer from "../components/Footer"

class ProductsContainer extends Component{
  constructor(){
    super();
    this.updateQuantity=this.updateQuantity.bind(this);
    this.resetQuantity=this.resetQuantity.bind(this);
    this.openModal=this.openModal.bind(this);
    this.closeModal=this.closeModal.bind(this);
    this.state= { tempProducts:[],
                  quantity :1 ,
                  quickViewProduct: {},
                  modalActive: false  
                };
  }

  componentWillReceiveProps(nextProps){
    let currentState;
    if(nextProps.state.searchProductsReducer.length > 0)
    {
      currentState = nextProps.state.searchProductsReducer.length;
      this.setState({tempProducts : nextProps.state.searchProductsReducer[currentState-1]});
    }
    else if(nextProps.state.filterProductsPriceReducer.length > 0){
      currentState = nextProps.state.filterProductsPriceReducer.length;
      this.setState({tempProducts : nextProps.state.filterProductsPriceReducer[currentState-1]});
    }
    else if(nextProps.state.getProductsReducer.length === 1)
      this.setState({tempProducts : nextProps.state.getProductsReducer[0]});
  }

  componentDidUpdate(){ }
  
  updateQuantity(quantity) {
    console.log("quantity added...");
    this.setState({
      quantity: quantity,
      
    });
  }
  resetQuantity(quantity) {
    this.setState({
      quantity: quantity,
    });
  }
  // Open Modal
  openModal(product) {
    this.setState({
      quickViewProduct: product,
      modalActive: true
    });
  }
  // Close Modal
  closeModal() {
    this.setState({
      modalActive: false
    });
  }
  render(){
    var newProducts = this.state.tempProducts;

    if(newProducts.length===0)
      return <NoResults/>
    else {
      return(
      <div >
        <ProductsList>
          {newProducts.map(product =>
          <Products key={product.id} 
          product={product} 
          productQuantity = {this.state.quantity} 
          updateQuantity = {this.updateQuantity}
          resetQuantity = {this.resetQuantity}
          addToCart = {this.props.addToCart}
          openModal={this.openModal}
          />
        )}
        </ProductsList>
        <QuickView
          product={this.state.quickViewProduct}
          openModal={this.state.modalActive}
          closeModal={this.closeModal}
        />
        <Footer/>
      </div>
      )
    }
    
  }
}

const mapStateToProps = state => ({
 state,
});

const mapDispatchToProps = dispatch => {
  return {
    addToCart: (noofItems, totalAmount) => {
      dispatch(addItemsToCart(noofItems, totalAmount));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductsContainer)
