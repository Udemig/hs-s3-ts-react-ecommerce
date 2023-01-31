import {configureStore} from "@reduxjs/toolkit"

import authSlice from './authSlice'
import categorySlice from './categorySlice'
import cartSlice from './cartSlice'

const store = configureStore({
  reducer: {
    auth: authSlice,
    category: categorySlice,
    cart: cartSlice
  }
})

const state = store.getState()

export type RootStateType = typeof state

export default store

