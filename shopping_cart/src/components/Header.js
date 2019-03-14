import React, { Component } from "react";

export default class Header extends Component{
    constructor(props){
        super(props);
        
        this.searchingFor=this.searchingFor.bind(this);
        this.handleTextChange=this.handleTextChange.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);
        this.clearCart = this.clearCart.bind(this);
        this.onSelectionChanged=this.onSelectionChanged.bind(this)
        this.state = {
            showCart: false,
            mobileSearch: false,
            searchTerm : "",
            totalAmount :0,
            totalItems : 0,
            isCleared : false
          };
    }
    componentDidMount(){
      this.setState({totalAmount : this.props.totalAmount , 
                      totalItems : this.props.totalItems});
    }
    componentWillReceiveProps(nextProps){
      this.setState({totalAmount : nextProps.totalAmount + this.state.totalAmount,
                      totalItems : nextProps.totalItems + this.state.totalItems});
      
    }
    componentDidUpdate(){}
    searchingFor(term) {
        return function(x) {
          return x.name.toLowerCase().includes(term.toLowerCase()) || !term;
        };
      }
    handleTextChange(e){
        this.setState({searchTerm:e.target.value})
        var actualProducts = this.props.actualProducts;
        var searchedProducts = actualProducts.filter(this.searchingFor(e.target.value))
        this.props.searchedProducts(searchedProducts);
    }
    onSelectionChanged (e){
      var actualProducts = this.props.actualProducts;
      var searchedProducts = this.props.searchFilterProducts;
      var filteredProducts = [];
      if(searchedProducts.length>0)
      {
        if(e.target.id === "low-high")
        filteredProducts = searchedProducts.sort((a, b) => (a.price - b.price));
      else
        filteredProducts = searchedProducts.sort((a, b) => (b.price - a.price));
      }
      else if(actualProducts.length>0){
      if(e.target.id === "low-high")
        filteredProducts = actualProducts.sort((a, b) => (a.price - b.price));
      else
        filteredProducts = actualProducts.sort((a, b) => (b.price - a.price));
      }
      this.props.filteredProducts(filteredProducts);
    }
    handleSubmit = e => {
        e.preventDefault();
        var actualProducts = this.props.actualProducts;
        this.props.searchedProducts(actualProducts.filter(this.searchingFor(this.state.searchTerm)));

      };

    clearCart(e){
      e.preventDefault();
      this.setState(
        {
          totalAmount : 0, totalItems : 0,
          isCleared: true
        },
        function() {
          setTimeout(() => {
            this.setState({
              isCleared: false,
              
            });
          }, 500);
        }
      );
    }  

    render(){
        return(
            <header>
                <div className="container">
                    <div className="brand">
                    <img
                    className="logo"
                    src="https://res.cloudinary.com/sivadass/image/upload/v1493547373/dummy-logo/Veggy.png"
                    alt="Veggy Brand Logo"
                    />
                    </div>

                    <div className="search">
                     <form 
                        action="#"
                        method="get"
                        className={
                            this.state.mobileSearch ? "search-form active" : "search-form"
                        } >
                        <input
                            type="search"
                            ref="searchBox"
                            placeholder="Search for Vegetables and Fruits"
                            className="search-keyword"
                            onChange={this.handleTextChange} />
                        <button
                            className="search-button"
                            type="submit"
                            onClick={this.handleSubmit} />
                        <div >
                            <input type="radio" id="low-high" name="selector" onChange = {this.onSelectionChanged}/>
                            <label for="low-high">Low-High</label>
                            <br/>
                            <input type="radio" id="high-low" name="selector" onChange ={this.onSelectionChanged}/>
                            <label for="high-low">High-Low</label>
                        </div>
                        </form>
                    </div>
                    <div className="cart">
                    <div className="cart-info">
                      <table>
                        <tbody>
                          <tr>
                            <td>No. of items</td>
                            <td>:</td>
                            <td>
                              <strong>{this.state.totalItems}</strong>
                            </td>
                          </tr>
                          <tr>
                            <td>Sub Total</td>
                            <td>:</td>
                            <td>
                              <strong>{this.state.totalAmount}</strong>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <button
                      className={!this.state.isCleared ? "" : "cleared"}
                      type="submit"
                      onClick={this.clearCart}>
                      {!this.state.isCleared ? "CLEAR CART" : "✔ CLEARED"}</button>
                    </div>
                </div>
            </header>
        )
    }
}
