import create from 'zustand'
import { devtools } from 'zustand/middleware'
import qs from 'query-string'

import { getProducts } from 'dummyjson-api'
import { Product } from 'dummyjson-api/models'
import { search, sort, getProductsMeta } from 'helpers'

type State = {
  status: 'loading' | 'ok' | 'error'
  error: string
  cashe: Product[]
  products: Product[]
  categories: string[]
  brands: string[]
  priceRange: [number, number]
  stockRange: [number, number]
  filter(data: qs.ParsedQuery): void
  fetch(): Promise<void>
}

const useProducts = create<State>()(
  devtools(
    (set, get) => ({
      status: 'loading',
      error: '',
      cashe: [],
      products: [],
      categories: [],
      brands: [],
      priceRange: [0, 0],
      stockRange: [0, 0],
      filter: (data) => {
        let result = get().cashe

        if (data.search) {
          result = search(result, data.search as string)
        }

        if (data.sort) {
          result = sort(result, data.sort as string)
        }

        set({ products: result })
      },
      fetch: async () => {
        set({ status: 'loading' })

        try {
          const resp = await getProducts()
          const meta = getProductsMeta(resp.products)

          set({ status: 'ok', cashe: resp.products, products: resp.products, ...meta })
        } catch (e) {
          set({
            status: 'error',
            error: e instanceof Error ? e.message : 'Something went wrong.'
          })
        }
      }
    }),
    { name: 'RSS-ProductsStore' }
  )
)

export default useProducts
