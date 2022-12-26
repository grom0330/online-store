import { useEffect, useState } from 'react'

import { Product } from 'dummyjson-api/models'
import { getProducts } from 'dummyjson-api'

type IState =
  | { status: 'ok'; products: Product[] }
  | { status: 'failed'; error: string }
  | { status: 'loading'; products?: Product[] }

const DEFAULT_STATE: IState = {
  status: 'loading',
  products: []
}

const useApp = () => {
  const [state, setState] = useState<IState>(DEFAULT_STATE)

  useEffect(() => {
    const fetchProducts = async () => {
      setState({ status: 'loading' })

      try {
        const data = await getProducts()
        setState({ status: 'ok', products: data.products })
      } catch (e) {
        setState({
          status: 'failed',
          error: e instanceof Error ? e.message : 'Something went wrong.'
        })
      }
    }

    fetchProducts()
  }, [])

  return state
}

export default useApp
