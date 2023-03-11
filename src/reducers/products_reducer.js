import {
  SIDEBAR_OPEN,
  SIDEBAR_CLOSE,
  GET_PRODUCTS_BEGIN,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_ERROR,
  GET_SINGLE_PRODUCT_BEGIN,
  GET_SINGLE_PRODUCT_SUCCESS,
  GET_SINGLE_PRODUCT_ERROR,
} from '../actions'

const products_reducer = (state, action) => {
  switch (action.type) {
    case SIDEBAR_OPEN:
      return {...state, isSidebarOpen: true}
    case SIDEBAR_CLOSE:
      return {...state, isSidebarOpen: false}
    case GET_PRODUCTS_BEGIN:
      return {...state, products_loading: true}
    case GET_PRODUCTS_SUCCESS:{
      const feature_products = action.payload.products.filter(product => product.shipping === true)
      return {...state, products_loading: false, feature_products}
    }
    case GET_PRODUCTS_ERROR:
      return {...state, products_error: true, products_loading: false}

    case GET_SINGLE_PRODUCT_BEGIN:
      return {...state, single_product_loading: true}

    case GET_SINGLE_PRODUCT_SUCCESS:
      return {...state, single_product: action.payload.product}
    case GET_SINGLE_PRODUCT_ERROR:
      return {...state, single_product_error: true}

      throw new Error(`No Matching "${action.type}" - action type`)
  }
}


export const openSidebarAC = () => ({type: SIDEBAR_OPEN})
export const closeSidebarAC = () => ({type: SIDEBAR_CLOSE})
export const setProductsAC = (data) => ({type: GET_PRODUCTS_SUCCESS, payload: {products: data}})
export const productsLoadingBeginAC = () => ({type: GET_PRODUCTS_BEGIN})
export const productsErrorAC = () => ({type: GET_PRODUCTS_ERROR})

export const getSingleProductBeginAC = () => ({type: GET_SINGLE_PRODUCT_BEGIN})
export const getSingleProductSuccessAC = (product) => ({type: GET_SINGLE_PRODUCT_SUCCESS, payload: {product}})
export const getSingleProductErrorAC = () => ({type: GET_SINGLE_PRODUCT_ERROR})





export default products_reducer
