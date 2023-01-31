export type ProductContainerPropsType = {
  title: string,
  count: 1 | 2 | 3 | 4 | 6,
  products: any[]
}

function ProductContainer(props: ProductContainerPropsType) {

  let width = 12
  if (props.count === 1) {
    width = 12
  } else if (props.count === 2) {
    width = 6
  } else if (props.count === 3) {
    width = 4
  } else if (props.count === 4) {
    width = 3
  } else if (props.count === 6) {
    width = 2
  }

  let components: any[] = []

  for (let i = 0; i < props.count; i++) {
    components.push(
      <div className={`col-lg-${width} col-md-${width} col-sm-6 col-xs-12`} key={i}>
        <div className="product-block">
          <div className="product-img"><img
            src="https://ecommerce-template.udemig.dev/images/product_img_1.png" alt=""/></div>
          <div className="product-content">
            <h5><a href="#" className="product-title">Google Pixel <strong>(128GB, Black)</strong></a></h5>
            <div className="product-meta"><a href="#" className="product-price">$1100</a>
              <a href="#" className="discounted-price">$1400</a>
              <span className="offer-price">20%off</span>
            </div>
            <div className="shopping-btn">
              <a href="#" className="product-btn btn-like"><i className="fa fa-heart"></i></a>
              <a href="#" className="product-btn btn-cart"><i className="fa fa-shopping-cart"></i></a>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <div className="box">
            <div className="box-head">
              <h3 className="head-title">
                {props.title}
              </h3>
            </div>
            <div className="box-body">
              <div className="row">

                {components}

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductContainer

