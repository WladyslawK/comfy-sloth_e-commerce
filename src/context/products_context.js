import axios from 'axios'
import React, { useContext, useEffect, useReducer } from 'react'
import reducer, {
  closeSidebarAC,
  openSidebarAC,
  productsLoadingBeginAC,
  setProductsAC
} from '../reducers/products_reducer'
import { products_url as url } from '../utils/constants'
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

const initialState = {
  isSidebarOpen: false,
  products_loading: false,
  products_error: false,
  products: [],
  feature_products: [],
}

const ProductsContext = React.createContext({})

export const ProductsProvider = ({ children }) => {

  const [state, dispatch] = useReducer(reducer, initialState)

  const openSideBar = () => dispatch(openSidebarAC())
  const closeSideBar = () => dispatch(closeSidebarAC())

  const fetchProducts = async (url) => {
    dispatch(productsLoadingBeginAC())
    try {
      const response = await  axios.get(url)
      console.log(response)
      dispatch(setProductsAC(response.data))
    }catch(e){

    }

  }

  useEffect(() => {
    fetchProducts(url)
  }, [])

  return (
    <ProductsContext.Provider value={{...state, openSideBar, closeSideBar}} >
      {children}
    </ProductsContext.Provider>
  )
}
// make sure use
export const useProductsContext = () => {
  return useContext(ProductsContext)
}
