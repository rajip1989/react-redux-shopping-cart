export const getProductsReducer = (state = [],action) => {
    switch(action.type){
        case "GET_PRODUCTS" : {
            return  [...state, action.products]
        }
        
        default :
        return state
    }
}

export default getProductsReducer;
