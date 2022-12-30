import create from 'zustand'
import { devtools } from 'zustand/middleware'
import qs from 'query-string'

import { getProducts } from 'dummyjson-api'
import { Product } from 'dummyjson-api/models'

type State = {
  status: 'loading' | 'ok' | 'error'
  error: string
  cashe: Product[]
  products: Product[]
  filter(data: qs.ParsedQuery<string>): void
  fetch(): Promise<void>
}

const useProducts = create<State>()(
  devtools(
    (set, get) => ({
      status: 'loading',
      error: '',
      cashe: [],
      products: [],
      filter: (data) => {
        if (data.search) {
          const filtered = get().cashe.filter((p) => {
            const search = (data.search as string).toLowerCase()
            return (
              p.title.toLowerCase().includes(search) ||
              p.description.toLowerCase().includes(search) ||
              p.price.toString().includes(search) ||
              p.stock.toString().includes(search) ||
              p.discountPercentage.toString().includes(search) ||
              p.brand.toLowerCase().includes(search) ||
              p.category.toLowerCase().includes(search)
            )
          })

          set({ products: filtered })
        } else {
          set({ products: get().cashe })
        }
      },
      fetch: async () => {
        set({ status: 'loading' })

        try {
          const resp = await getProducts()

          set({ status: 'ok', cashe: resp.products, products: resp.products })
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
