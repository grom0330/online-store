import create from 'zustand'
import { devtools } from 'zustand/middleware'
import qs from 'query-string'

import { getProducts } from 'dummyjson-api'
import { Product } from 'dummyjson-api/models'
import { search, sort, filterByCategory, filterByBrand, getProductsMeta } from 'helpers'

type State = {
  status: 'loading' | 'ok' | 'error'
  error: string
  cashe: Product[]
  products: Product[]
  categories: string[]
  brands: string[]
  priceRange: { min: number; max: number }
  stockRange: { min: number; max: number }
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
      priceRange: { min: 0, max: 0 },
      stockRange: { min: 0, max: 0 },
      filter: (data) => {
        let result = get().cashe

        if (data.search) {
          result = search(result, data.search as string)
        }

        if (data.sort) {
          result = sort(result, data.sort as string)
        }

        if (data.category) {
          result = filterByCategory(result, data.category as string[])
        }

        if (data.brand) {
          result = filterByBrand(result, data.brand as string[])
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
