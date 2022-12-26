import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import { Product } from 'dummyjson-api/models'
import { getProducts } from 'dummyjson-api'

type IState =
  | { status: 'loading'; products?: Product[] }
  | { status: 'ok'; products: Product[] }
  | { status: 'error'; error: string }
  | { status: 'fetching'; products: Product[] }

const DEFAULT_STATE: IState = {
  status: 'loading',
  products: []
}

const useProductsList = () => {
  const [searchParams] = useSearchParams()
  const [state, setState] = useState<IState>(DEFAULT_STATE)

  useEffect(() => {
    const fetchProducts = async () => {
      setState({ status: 'loading' })

      try {
        const data = await getProducts(searchParams.toString())
        setState({ status: 'ok', products: data.products })
      } catch (e) {
        setState({
          status: 'error',
          error: e instanceof Error ? e.message : 'Something went wrong.'
        })
      }
    }

    fetchProducts()
  }, [searchParams])

  return state
}

export default useProductsList
