export const searchProductsReducer = (state = [],action) => {
    switch(action.type){
        case "SEARCH_PRODUCTS": {
            return  [...state, action.products]   
        }
        default :
        return state
    }
}

export default searchProductsReducer;