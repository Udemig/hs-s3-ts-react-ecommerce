import {ProductVariantType} from "../../../../types"

export type ProductPricePropsType = {
  variant: ProductVariantType
}


export default function ProductPrice(props: ProductPricePropsType) {
  if (props.variant.price === props.variant.originalPrice) {
    return (
      <a className="product-price">
        ${props.variant.price}
      </a>
    )
  } else {
    let discountRate: number = (props.variant.originalPrice - props.variant.price) / props.variant.originalPrice
    discountRate = 100 * discountRate

    return (
      <>
        <a className="product-price">
          ${props.variant.price}
        </a>
        <a className="discounted-price">
          ${props.variant.originalPrice}
        </a>
        <span className="offer-price">
          {discountRate.toFixed(1)}% off
        </span>
      </>
    )
  }
}

