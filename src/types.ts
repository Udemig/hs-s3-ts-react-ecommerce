export type CategoryType = {
  id: number,
  code: string,
  children: string[],
  name: string,
  slug: string,
  description: string
}


export type ProductImageType = {
  id: number,
  type: string,
  path: string
}


export type ProductType = {
  id: number,
  code: string,
  variants: string[],
  images: ProductImageType[],

  averageRating: number,

  productTaxons: string[],
  reviews: string[],
  options: string[],
  mainTaxon: string,
  shortDescription: string,
  name: string,
  description: string,
  slug: string,

  createdAt: string,
  updatedAt: string,
}


export type ProductVariantType = {
  id: number
  code: string
  inStock: boolean
  name: string
  optionValues: any[]
  originalPrice: number
  price: number
  product: string
}


export type AddressType = {
  firstName: string,
  lastName: string,
  countryCode: string,
  provinceName: string,
  street: string,
  city: string,
  postcode: string
}


export type PaymentType = {
  id: number,
  method: string
}


export type CartItemType = {
  id: number,
  variant: string,
  productName: string,
  quantity: number,
  unitPrice: number,
  originalUnitPrice: number,
  discountedUnitPrice: number,
  total: number,
  subtotal: number
}


export type CartType = {
  id: number,
  customer: string,
  channel: string,
  shippingAddress: AddressType,
  billingAddress: AddressType,
  payments: PaymentType[],
  shipments: PaymentType[],
  currencyCode: string,
  localeCode: string,
  checkoutState: string,
  paymentState: string,
  shippingState: string,
  tokenValue: string,
  number: string,
  notes: string,
  items: CartItemType[],
  state: string,
  itemsTotal: number,
  total: number,
  taxTotal: number,
  shippingTotal: number,
  orderPromotionTotal: number
}



