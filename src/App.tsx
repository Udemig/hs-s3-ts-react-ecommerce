import React from 'react'
import Header from "./components/header"
import {BrowserRouter, Route, Routes} from "react-router-dom"
import Footer from "./components/footer"
import HomePage from "./pages/home-page"
import {useDispatch, useSelector} from "react-redux"
import {RootStateType} from "./redux/store"
import useApi from "./hooks/useApi"
import {CartType, CategoryType} from "./types"
import {AxiosResponse} from "axios"
import {CategoryStateType, setCategories} from "./redux/categorySlice"
import CategoryDetailsPage from "./pages/category-details-page"
import ProductDetailsPage from "./pages/product-details-page"
import {setCart} from "./redux/cartSlice"
import CartPage from "./pages/cart-page"
import LoginPage from "./pages/login-page"
import RegisterPage from "./pages/register-page"



function App() {
  const dispatch = useDispatch()
  const authState = useSelector((state: RootStateType) => {
    return state.auth
  })
  const categoryState = useSelector((state: RootStateType) => state.category)
  const cartState = useSelector((state: RootStateType) => state.cart)
  const api = useApi()

  console.log('>> Cat State', categoryState)

  if (categoryState.initialized === false) {
    const params = {page: 1, itemsPerPage: 30}

    api.get<CategoryType[]>('shop/taxons', {params})
      .then((response: AxiosResponse<CategoryType[]>) => {
        console.log('>> API Data:', response.data)

        const dispatchData = setCategories(response.data)
        console.log('>> Dispatch Data:', dispatchData)
        dispatch(dispatchData)

        // Ayrıca dispatch fonksiyonunu kendimiz de bu şekilde çağırabiliriz.
        // `type` property'sini doğru şekilde set etmemiz gerekiyor aksi halde
        // state'te hiçbir değişiklik olmaz.
        //
        //dispatch({
        //  type: 'bilmemne',
        //  payload: {
        //    foo: 'foo',
        //    bar:'bar'
        //  }
        //})

      })
  }

  if (cartState.initialized === false) {
    const cartToken = localStorage.getItem('cartToken')
    if (cartToken) {

      // mevcut tokena ait olan sepeti al
      api.get<CartType>('shop/orders/' + cartToken)
        .then((response: AxiosResponse<CartType>) => {
          dispatch(setCart(response.data))
        })

    } else {

      // yeni sepet oluştur
      api.post<CartType>('shop/orders', {localeCode: "en_US"})
        .then((response: AxiosResponse<CartType>) => {
          dispatch(setCart(response.data))
        })

    }
  }


  return (
    <>
      <BrowserRouter>

        <Header/>


        <Routes>
          <Route index element={<HomePage/>}/>

          <Route path={'category-details/:category_code'} element={<CategoryDetailsPage/>}/>
          <Route path={'product-details/:product_code'} element={<ProductDetailsPage/>}/>
          <Route path={'cart'} element={<CartPage/>}/>


          <Route path={'auth/login'} element={<LoginPage/>}/>
          <Route path={'auth/register'} element={<RegisterPage/>}/>

        </Routes>


        <Footer/>
      </BrowserRouter>
    </>
  )
}

export default App
