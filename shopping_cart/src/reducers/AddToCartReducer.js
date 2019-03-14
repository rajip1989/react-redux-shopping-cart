export const addProductsToCartReducer = (state = [],action) => {
    switch(action.type){
        case "ADD_TO_CART" : {
            return [action.noOfItems, action.totalAmount]
        }
        default :
        return state
    }
}

export default addProductsToCartReducer;
