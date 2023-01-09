import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { CartLocationState } from 'pages/Cart/useCartPage'

import useCart from 'store/cart'
import useProducts from 'store/products'

export default function useProductDetailsPage() {
  const { id } = useParams()

  const navigate = useNavigate()

  const product = useProducts((s) => s.byId[Number(id)])

  const cart = useCart()

  const [mainImgIdx, setMainImgIdx] = useState(0)

  const handleAddProduct = () => {
    cart.add({ id: product.id, price: product.price })
  }

  const handleRemoveProduct = () => {
    cart.remove(product.id)
  }

  const handleBuyNow = () => {
    if (!product) return

    if (!cart.byId[product.id]) {
      cart.add({ id: product.id, price: product.price })
    }

    navigate('/cart', { state: { shouldOpenCheckoutModal: true } as CartLocationState })
  }

  return {
    product,
    cart,
    mainImgIdx,
    setMainImgIdx,
    handleAddProduct,
    handleRemoveProduct,
    handleBuyNow
  }
}
