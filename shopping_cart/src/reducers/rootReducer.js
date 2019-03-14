import {getProductsReducer} from "./ProductsReducer"
import { searchProductsReducer} from "./SearchReducer"
import {addProductsToCartReducer} from "./AddToCartReducer"
import {filterProductsPriceReducer} from "./FilterReducer"
import {combineReducers} from "redux";

const rootReducer = combineReducers({
  getProductsReducer,
  searchProductsReducer,
  filterProductsPriceReducer,
  addProductsToCartReducer,
})

export default rootReducer;