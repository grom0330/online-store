import create from 'zustand'
import { devtools } from 'zustand/middleware'

import { Product } from 'dummyjson-api/models'

type ProductsState =
  | { status: 'loading'; products?: Product[] }
  | { status: 'ok'; products: Product[] }
  | { status: 'error'; error: string }
  | { status: 'fetching'; products: Product[] }

type Handlers = {
  setState(data: ProductsState): void
}

export const useProductsStore = create<ProductsState & Handlers>()(
  devtools(
    (set) => ({
      status: 'loading',
      products: [],
      setState: (newState) => set(() => newState)
    }),
    { name: 'RSS-ProductsStore' }
  )
)
