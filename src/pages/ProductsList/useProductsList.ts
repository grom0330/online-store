import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'

import { getProducts } from 'dummyjson-api'
import { useProductsStore } from 'store/products'
import useCartStore from 'store/cart'

const useProductsList = () => {
  const [searchParams] = useSearchParams()

  const s = useProductsStore((state) => state)
  const productsInCart = useCartStore((state) => state.items)
  const addToCart = useCartStore((state) => state.addItem)
  const removeFromCart = useCartStore((state) => state.removeItem)

  useEffect(() => {
    const fetchProducts = async () => {
      s.setState({ status: 'loading' })

      try {
        const data = await getProducts(searchParams.toString())
        s.setState({ status: 'ok', products: data.products })
      } catch (e) {
        s.setState({
          status: 'error',
          error: e instanceof Error ? e.message : 'Something went wrong.'
        })
      }
    }

    fetchProducts()
  }, [searchParams])

  return {
    ...s,
    productsInCart,
    addToCart,
    removeFromCart
  }
}

export default useProductsList
