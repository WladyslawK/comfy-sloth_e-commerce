import axios from 'axios'
import React, {useContext, useEffect, useReducer} from 'react'
import reducer, {
    closeSidebarAC, getSingleProductBeginAC, getSingleProductErrorAC, getSingleProductSuccessAC,
    openSidebarAC, productsErrorAC,
    productsLoadingBeginAC,
    setProductsAC
} from '../reducers/products_reducer'
import {products_url as url, single_product_url} from '../utils/constants'
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
    single_product_loading: false,
    single_product_error: false,
    single_product: {}
}

const ProductsContext = React.createContext({})

export const ProductsProvider = ({children}) => {

    const [state, dispatch] = useReducer(reducer, initialState)

    const openSideBar = () => dispatch(openSidebarAC())
    const closeSideBar = () => dispatch(closeSidebarAC())

    const fetchProducts = async (url) => {
        dispatch(productsLoadingBeginAC())
        try {
            const response = await axios.get(url)
            console.log(response)
            dispatch(setProductsAC(response.data))
        } catch (e) {
            dispatch(productsErrorAC())
        }
    }

    const fetchSingleProduct = async (url) => {
        dispatch(getSingleProductBeginAC())
        try {
            const response = await axios.get(url)
            if (response.data) {
                dispatch(getSingleProductSuccessAC(response.data))
            }
        } catch (e) {
            dispatch(getSingleProductErrorAC())
        }
    }

    useEffect(() => {
        fetchProducts(url)
    }, [])

    return (
        <ProductsContext.Provider value={{...state, openSideBar, closeSideBar, fetchSingleProduct}}>
            {children}
        </ProductsContext.Provider>
    )
}
// make sure use
export const useProductsContext = () => {
    return useContext(ProductsContext)
}
