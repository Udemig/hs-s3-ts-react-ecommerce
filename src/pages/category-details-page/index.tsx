import {useParams} from "react-router-dom"
import useApi from "../../hooks/useApi"
import {ProductType} from "../../types"
import {AxiosResponse} from "axios"
import {useEffect, useState} from "react"
import Breadcrumb, {BreadcrumbItemType} from "../../components/breadcrumb"
import ProductItem from "./components/product-item"


export type RouteParamsType = {
  category_code: string
}

export type OrderingType = 'asc' | 'desc'


function CategoryDetailsPage() {
  const routeParams = useParams<RouteParamsType>()
  console.log('>>> ROUTE PARAMS', routeParams)

  const [products, setProducts] = useState<ProductType[]>([])
  const [initialized, setInitialized] = useState<boolean>(false)

  const [orderByCreatedAt, setOrderByCreatedAt] = useState<OrderingType>('asc')
  const [orderByPrice, setOrderByPrice] = useState<OrderingType>('asc')

  const [page, setPage] = useState<number>(1)
  const [itemsPerPage, setItemsPerPage] = useState<number>(5)

  const api = useApi()

  useEffect(() => {
    setProducts([])
    setPage(1)

    setOrderByCreatedAt('asc')
    setOrderByPrice('asc')

    setInitialized(false)
  }, [routeParams.category_code])

  if (initialized === false) {
    console.log('Component initialized olmadı, apiye istek atılıyor.')

    // TODO Buradaki bilgileri detaylandır.
    const params = {
      'productTaxons.taxon.code': routeParams.category_code,
      'order[createdAt]': orderByCreatedAt,
      'order[price]': orderByPrice,
      page,
      itemsPerPage
    }
    api.get<ProductType[]>('shop/products', {params})
      .then((response: AxiosResponse<ProductType[]>) => {
        console.log('>> Shop Products Response', response)
        setProducts(response.data)
        setInitialized(true)
      })

    return (<div>LOADING...</div>)
  }

  console.log('Products bilgisi alındı: ', products)

  const breadcrumbItems: BreadcrumbItemType[] = [
    {title: 'Home', url: '/'},
    {title: routeParams.category_code as string},
  ]
  /*
  title: string
  routeParams.category_code :  string | undefined
  string = string | undefined
  */

  return (
    <>
      <Breadcrumb items={breadcrumbItems}/>

      <div className="content">
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-md-3 col-sm-4 col-xs-12">
              <div className="cssmenu">
                <ul>
                  <li className="has-sub active"><a href="#">CATEGORY</a>
                    <ul style={{display: 'block'}}>
                      <li><a href="#">Smart Phones</a></li>
                      <li><a href="#">Cell Phones</a></li>
                      <li className="last"><a href="#">Android Phones</a></li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-9 col-md-9 col-sm-8 col-xs-12">
              <div className="row">
                <div className="col-lg-4 col-md-4 col-sm-6 col-xs-12 mb10 ">
                  <div className="select-option form-group">
                    <select
                      onChange={(event) => {
                        setOrderByCreatedAt(event.target.value as OrderingType)
                        setInitialized(false)
                      }}
                      className="form-control"
                      defaultValue={orderByCreatedAt}
                    >
                      <option value="asc">Ascending Date</option>
                      <option value="desc">Descending Date</option>
                    </select>
                  </div>
                </div>
                <div className="col-lg-4 col-md-4 col-sm-6 col-xs-12 mb10 ">
                  <div className="select-option form-group">
                    <select
                      onChange={(event) => {
                        setOrderByPrice(event.target.value as OrderingType)
                        setInitialized(false)
                      }}
                      className="form-control"
                      defaultValue={orderByPrice}
                    >
                      <option value="asc">Low Price</option>
                      <option value="desc">High Price</option>
                    </select>
                  </div>
                </div>
                <div className="col-lg-4 col-md-4 col-sm-6 col-xs-12 mb10 ">
                  <div className="select-option form-group">
                    <select
                      onChange={(event) => {
                        setItemsPerPage(parseInt(event.target.value))
                        setInitialized(false)
                      }}
                      className="form-control"
                      defaultValue={itemsPerPage}
                    >
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="5">5</option>
                      <option value="10">10</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="row">
                {products.map((item: ProductType, index) => {
                  return (
                    <div
                      key={index}
                      className="col-lg-4 col-md-4 col-sm-6 col-xs-12 mb30"
                    >
                      <ProductItem productDetails={item}/>
                    </div>
                  )
                })}

              </div>
              <div className="row">
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                  <div className="st-pagination">
                    <ul className="pagination">
                      {
                        page <= 1
                          ? (<></>)
                          : (
                            <li>
                              <a
                                onClick={() => {
                                  if (page <= 1) {
                                    return
                                  }

                                  setPage((prevPage) => prevPage - 1)
                                  setInitialized(false)
                                }}
                              >
                              <span aria-hidden="true">
                                Previous
                              </span>
                              </a>
                            </li>
                          )
                      }

                      <li className="active">
                        <a>
                          {page}
                        </a>
                      </li>
                      {
                        products.length === 0
                          ? (<></>)
                          : (
                            <li>
                              <a
                                onClick={() => {
                                  if (products.length === 0) {
                                    return
                                  }

                                  setPage((prevPage) => prevPage + 1)
                                  setInitialized(false)
                                }}
                              >
                              <span aria-hidden="true">
                                Next
                              </span>
                              </a>
                            </li>
                          )
                      }
                    </ul>
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

export default CategoryDetailsPage
