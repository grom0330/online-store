import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'

import { getProducts } from 'dummyjson-api'
import { useProductsStore } from 'store/products'

const useProductsList = () => {
  const [searchParams] = useSearchParams()

  const s = useProductsStore((state) => state)

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

  return s
}

export default useProductsList
