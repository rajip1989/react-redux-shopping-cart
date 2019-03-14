export const filterProductsPriceReducer = (state = [],action) => {
    switch(action.type){
        case "FILTER_PRODUCTS": {
            return  [...state, action.products]   
        }
        
        default :
        return state
    }
}

export default filterProductsPriceReducer;