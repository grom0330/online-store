import create from 'zustand'

import { Product } from 'dummyjson-api/models'

type ProductsState =
  | { status: 'loading'; products?: Product[] }
  | { status: 'ok'; products: Product[] }
  | { status: 'error'; error: string }
  | { status: 'fetching'; products: Product[] }

type Handlers = {
  setState(data: ProductsState): void
}

export const useProductsStore = create<ProductsState & Handlers>()((set) => ({
  status: 'loading',
  products: [],
  setState: (newState: ProductsState) => set(() => newState)
}))
