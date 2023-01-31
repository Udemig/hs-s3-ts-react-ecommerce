import {createSlice, PayloadAction} from "@reduxjs/toolkit"
import {CartType, CategoryType} from "../types"

export type CartStateType = {
  cart: CartType | null,
  initialized: boolean
}

const initialState: CartStateType = {
  cart: null,
  initialized: false
}

export const cartSlice = createSlice({
  name: "cartSlice",
  initialState,
  reducers: {
    setCart: (state: CartStateType, action: PayloadAction<CartType>) => {
      console.log('>> Set Cart Action', action)

      localStorage.setItem('cartToken', action.payload.tokenValue)

      state.cart = action.payload
      state.initialized = true
    },

    refreshCart: (state: CartStateType) => {
      state.initialized = false
    },

    removeCart: (state: CartStateType) => {
      localStorage.removeItem('cartToken')

      state.cart = null
      state.initialized = false
    }
  }
})

export const {setCart, removeCart, refreshCart} = cartSlice.actions
export default cartSlice.reducer
