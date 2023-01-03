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
      filter: (data) => {
        let filtered = get().cashe

        if (data.search) {
          filtered = filtered.filter((p) => {
            const search = (data.search as string).toLowerCase()
            return (
              p.title.toLowerCase().includes(search) ||
              p.description.toLowerCase().includes(search) ||
              p.price.toString().includes(search) ||
              p.stock.toString().includes(search) ||
              p.rating.toString().includes(search) ||
              p.discountPercentage.toString().includes(search) ||
              p.brand.toLowerCase().includes(search) ||
              p.category.toLowerCase().includes(search)
            )
          })
        }

        if (data.sort) {
          const [field, direction] = (data.sort as string).split('-')

          filtered = [...filtered].sort((a, b) => {
            const aValue = a[field as keyof Product] as number
            const bValue = b[field as keyof Product] as number

            if (direction === 'asc') {
              return aValue - bValue
            }
            if (direction === 'desc') {
              return bValue - aValue
            }
            return 0
          })
        }

        set({ products: filtered })
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
