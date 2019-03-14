import React , {Component} from 'react';
import { connect } from 'react-redux';
import Header from "../components/Header";
import "../scss/style.scss";
import {searchProducts} from "../actions/actions"
import {filterProducts} from "../actions/actions"
import { isNull } from 'util';

class HeaderContainer extends Component{
    constructor(props){
        super(props);
        this.state= {
            tempProducts:[],
            searchStateProducts:[],
            totalItems: 0,
            totalAmount: 0}
    }
    componentWillReceiveProps(nextProps){
        this.setState({tempProducts : nextProps.state.getProductsReducer[0]});
        if(nextProps.state.searchProductsReducer.length > 0)
        {
            var currentState=nextProps.state.searchProductsReducer.length;
            this.setState({searchStateProducts : nextProps.state.searchProductsReducer[currentState-1]});
        }
        if(!isNull(nextProps.state.addProductsToCartReducer)){
        if(nextProps.state.addProductsToCartReducer.length>0)
        {
            this.setState({totalItems : nextProps.state.addProductsToCartReducer[0], 
                            totalAmount : nextProps.state.addProductsToCartReducer[1]});
        }
        nextProps.state.addProductsToCartReducer[0]=0;
        nextProps.state.addProductsToCartReducer[1] = 0;
      }
    }
    componentDidUpdate(){ }
    
    render(){
        return(
            <Header actualProducts = {this.state.tempProducts} 
            searchFilterProducts = {this.state.searchStateProducts}
            searchedProducts ={this.props.sp}  
            filteredProducts = {this.props.priceFilter}
            totalItems={this.state.totalItems}
            totalAmount={this.state.totalAmount}
            />
        );
    }
}

const mapStateToProps = state => ({
state
})

const mapDispatchToProps = dispatch => {
    return {
        sp: (prods) => {
        dispatch(searchProducts(prods));
      },
      priceFilter: (prods) => {
          dispatch(filterProducts(prods));
      }
    };
  };

export default connect(mapStateToProps,mapDispatchToProps)(HeaderContainer); 