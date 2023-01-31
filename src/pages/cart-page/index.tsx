import Breadcrumb, {BreadcrumbItemType} from "../../components/breadcrumb"
import {Link} from "react-router-dom"
import {useDispatch, useSelector} from "react-redux"
import {RootStateType} from "../../redux/store"
import {CartItemType, CartType} from "../../types"
import {ChangeEvent, useContext} from "react"
import useApi from "../../hooks/useApi"
import {AxiosResponse} from "axios"
import {refreshCart, setCart} from "../../redux/cartSlice"
import {AppLoadingContext} from "../../components/app-loading"

export default function CartPage() {
  const cartState = useSelector((state: RootStateType) => state.cart)
  const api = useApi()
  const dispatch = useDispatch()
  const appLoadingContextData = useContext(AppLoadingContext)

  const totalQuantity: number | undefined = cartState.cart?.items.reduce(
    (currentValue, item: CartItemType) => {
      return currentValue + item.quantity
    },
    0
  )

  function handleItemDelete(item: CartItemType) {
    // /api/v2/shop/orders/{tokenValue}/items/{itemId}
    console.log('>> Handle Item Delete called')

    appLoadingContextData.setLoading(true)

    api.delete(`shop/orders/${cartState.cart?.tokenValue}/items/${item.id}`)
      .then(() => {
        dispatch(refreshCart())

        appLoadingContextData.setLoading(false)
      })

  }

  function handleQuantityChange(item: CartItemType, quantity: number) {
    // /api/v2/shop/orders/{tokenValue}/items/{orderItemId}

    console.log('>> Handle Quantity Change called')

    appLoadingContextData.setLoading(true)

    const patchData = {quantity}
    api.patch<CartType>(
      `shop/orders/${cartState.cart?.tokenValue}/items/${item.id}`,
      patchData,
      {
        headers: {
          "Content-Type": "application/merge-patch+json"
        }
      }
    )
      .then((response: AxiosResponse<CartType>) => {
        console.log('>> RESP', response)

        dispatch(setCart(response.data))

        appLoadingContextData.setLoading(false)
      })
  }


  const breadcrumbItems: BreadcrumbItemType[] = [
    {title: 'Home', url: '/'},
    {title: 'Cart'},
  ]

  return (
    <>
      <Breadcrumb items={breadcrumbItems}/>

      <div className="space-medium">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 col-md-8 col-sm-8 col-xs-12">
              <div className="box">
                <div className="box-head">
                  <h3 className="head-title">
                    My Cart
                    &nbsp;
                    ({cartState.cart?.items.length})
                  </h3>
                </div>
                <div className="box-body">
                  <div className="table-responsive">
                    <div className="cart">
                      <table className="table table-bordered ">
                        <thead>
                        <tr>
                          <th>
                            <span>Item</span></th>
                          <th>
                            <span>Price</span></th>
                          <th>
                            <span>Quantity</span></th>
                          <th>
                            <span>Total</span></th>
                          <th>
                          </th>
                        </tr>
                        </thead>
                        <tbody>

                        {
                          cartState.cart?.items.map((item: CartItemType, index) => {
                            return (
                              <tr>
                                <td>
                                  <span>
                                    <a href="#">
                                      {item.productName}
                                    </a>
                                  </span>
                                </td>
                                <td>
                                  ${item.unitPrice}
                                </td>
                                <td>
                                  <div className="product-quantity">
                                    <div className="quantity">

                                      <input
                                        type="number"
                                        className="input-text qty text"
                                        step="1" min="1" max="10"
                                        defaultValue={item.quantity}
                                        onChange={(event: ChangeEvent<HTMLInputElement>) => {
                                          const quantity = parseInt(event.target.value as string)
                                          console.log('>> Quantity', quantity)

                                          handleQuantityChange(item, quantity)
                                        }}
                                        name="quantity" title="Qty"
                                        pattern="[0-9]*"
                                      />

                                    </div>
                                  </div>
                                </td>
                                <td>
                                  ${item.total}
                                </td>
                                <th scope="row">

                                  <a
                                    onClick={() => {
                                      handleItemDelete(item)
                                    }}
                                    className="btn-close">
                                    <i className="fa fa-times-circle-o"></i>
                                  </a>

                                </th>
                              </tr>
                            )
                          })
                        }


                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
              <Link to={'/'} className="btn-link">
                <i className="fa fa-angle-left"></i>
                back to shopping
              </Link>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
              <div className="box mb30">
                <div className="box-head">
                  <h3 className="head-title">Price Details</h3>
                </div>
                <div className="box-body">
                  <div className=" table-responsive">
                    <div className="pay-amount ">
                      <table className="table mb20">
                        <tbody>
                        <tr>
                          <th>
                            <span>Price ({totalQuantity} items)</span></th>
                          <td>
                            ${cartState.cart?.total}
                          </td>
                        </tr>
                        <tr>
                          <th>
                            <span>Delivery Charges</span></th>
                          <td>
                            <strong className="text-green">Free</strong>
                          </td>
                        </tr>
                        </tbody>
                        <tbody>
                        <tr>
                          <th>
                            <span className="mb0" style={{fontWeight: "700"}}>
                              Amount Payable
                            </span>
                          </th>
                          <td style={{fontWeight: "700", color: "#1c1e1e"}}>
                            ${cartState.cart?.total}
                            <br/>
                            ${cartState.cart?.itemsTotal}
                            <br/>
                            ${cartState.cart?.taxTotal}
                          </td>
                        </tr>
                        </tbody>
                      </table>
                    </div>
                    <button className="btn btn-primary btn-block">Proceed To Checkout</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}



