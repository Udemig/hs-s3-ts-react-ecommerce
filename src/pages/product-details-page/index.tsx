import {useParams} from "react-router-dom"
import Breadcrumb, {BreadcrumbItemType} from "../../components/breadcrumb"
import styles from './index.module.css'
import {ChangeEvent, useState} from "react"
import {CartType, ProductImageType, ProductType, ProductVariantType} from "../../types"
import useApi from "../../hooks/useApi"
import {AxiosResponse} from "axios"
import ImageGallery, {ReactImageGalleryItem} from 'react-image-gallery'
import {useDispatch, useSelector} from "react-redux"
import {CartStateType, setCart} from "../../redux/cartSlice"
import {RootStateType} from "../../redux/store"
import ProductPrice from "../category-details-page/components/product-price"

export type RouteParamsType = {
  product_code: string
}


export default function ProductDetailsPage() {
  const routeParams = useParams<RouteParamsType>()
  const cartState: CartStateType = useSelector((state: RootStateType) => state.cart)

  const api = useApi()

  const [product, setProduct] = useState<ProductType | null>(null)
  const [variants, setVariants] = useState<ProductVariantType[]>([])
  const [initialized, setInitialized] = useState<boolean>(false)

  //const [selectedVariant, setSelectedVariant] = useState<ProductVariantType | null>(null)
  const [selectedVariantCode, setSelectedVariantCode] = useState<string | null>(null)

  const dispatch = useDispatch()

  function onFormSubmit(event: any) {
    event.preventDefault()

    const formData = new FormData(event.target)
    const formValues: any = Object.fromEntries(formData.entries())

    formValues.quantity = parseInt(formValues.quantity)

    console.log('>> FORM VALUES', formValues)
    const tokenValue = cartState.cart?.tokenValue

    api.post<CartType>(`shop/orders/${tokenValue}/items`, formValues)
      .then((response: AxiosResponse<CartType>) => {
        console.log('>> ADD ITEM TO CART RESPONSE', response)

        dispatch(setCart(response.data))
      })

  }


  // bu bölge senkron

  if (initialized === false) {
    // immediate call function
    (async () => {
      // bu bölge asenkron bölge oluyor

      const productResponse: AxiosResponse<ProductType> = await api.get<ProductType>('shop/products/' + routeParams.product_code)

      console.log('>> Product Response', productResponse.data)

      // döngüsel olarak sırayla istek atıp cevap beklemek çok vakit kaybettirir
      //for (let i = 0; i < productResponse.data.variants.length; i++) {
      //  let variant = productResponse.data.variants[i]
      //  variant = variant.substring('/api/v2/'.length)
      //  let variantResponse = await api.get<ProductVariantType>(variant)
      //  console.log('>> Variant Response', variantResponse.data)
      //}

      let promises: Promise<any>[] = productResponse.data.variants.map((variant: string) => {
        variant = variant.substring('/api/v2/'.length)
        return api.get<ProductVariantType>(variant)
      })
      let promiseValues: AxiosResponse<ProductVariantType>[] = await Promise.all(promises)
      console.log('>> VARIANT PROMISE VALUES', promiseValues)
      const apiVariants: ProductVariantType[] = promiseValues.map((item: AxiosResponse) => item.data)

      setProduct(productResponse.data)
      setVariants(apiVariants)
      setSelectedVariantCode(apiVariants[0].code)

      // bu bölgede await ile istediğim kadar api çağrısı yapabilirim

      setInitialized(true)
    })()

    return <div>
      LOADING...
    </div>
  }

  const selectedVariant: ProductVariantType | undefined = variants.find(
    (item: ProductVariantType) => item.code === selectedVariantCode
  )

  console.log('>>> PRODUCT', product)
  console.log('>>> VARIANTS', variants)

  // Örnek ürün variant bilgisi:
  // /api/v2/shop/product-variants/Ribbed_copper_slim_fit_Tee-variant-0

  const images: ReactImageGalleryItem[] = []
  product?.images.map((item: ProductImageType, index) => {
    images.push({
      original: 'https://ecommerce-api.udemig.dev' + item.path,
      thumbnail: 'https://ecommerce-api.udemig.dev' + item.path,
    })
  })


  const breadcrumbItems: BreadcrumbItemType[] = [
    {title: 'Home', url: '/'},
    {title: 'Category', url: '/category-details'},
    {title: routeParams.product_code as string}
  ]

  return (
    <>
      <Breadcrumb items={breadcrumbItems}/>

      <div className="content">

        <div className="container">
          <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <div className="box">
                <div className="box-body">
                  <div className="row">

                    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">

                      <ImageGallery items={images}/>

                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                      <div className="product-single">
                        <h2>
                          {product?.name}
                        </h2>
                        <div className="product-rating">
                          <span><i className="fa fa-star"></i></span>
                          <span><i className="fa fa-star"></i></span>
                          <span><i className="fa fa-star"></i></span>
                          <span><i className="fa fa-star"></i></span>
                          <span><i className="fa fa-star-o"></i></span>
                          <span className="text-secondary">&nbsp;(4.8 Review Stars)</span>
                        </div>
                        <p className={"product-price " + styles.product_price}>

                          <ProductPrice variant={selectedVariant as ProductVariantType}/>

                        </p>
                        <p>
                          {product?.shortDescription}
                        </p>

                        <form onSubmit={onFormSubmit}>

                          <div className={'row'}>
                            <div className={'col-lg-2'}>
                              <div className="product-quantity">
                                <h5>Quantity</h5>
                                <div className="quantity mb20">
                                  <input
                                    type="number"
                                    className="input-text qty text"
                                    step="1" min="1" max="6"
                                    name="quantity" defaultValue="1" pattern="[0-9]*"/>
                                </div>
                              </div>
                            </div>
                            <div className={'col-lg-4'}>
                              <div className="product-quantity">
                                <h5>
                                  Variants
                                </h5>

                                <div className="quantity mb20">
                                  <select
                                    name={'productVariant'}
                                    className="input-text full-width"
                                    onChange={(event: ChangeEvent<HTMLSelectElement>) => {
                                      setSelectedVariantCode(event.target.value as string)
                                    }}
                                  >
                                    {variants.map((variant: ProductVariantType, index) => {
                                      return <option
                                        key={index}
                                        value={variant.code}
                                      >
                                        {
                                          variant.name
                                            ? variant.name
                                            : variant.code
                                        }
                                      </option>
                                    })}
                                  </select>
                                </div>
                              </div>
                            </div>

                          </div>


                          <button type="submit" className="btn btn-default">
                            <i className="fa fa-shopping-cart"/>
                            &nbsp;
                            Add to cart
                          </button>

                        </form>

                      </div>
                    </div>
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
