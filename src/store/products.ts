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

          // TODO: refactor
          const categories = [...new Set(resp.products.map((p) => p.category))]
          const brands = [...new Set(resp.products.map((p) => p.brand))]
          const prices = resp.products.map((p) => p.price)
          const stocks = resp.products.map((p) => p.stock)

          set({
            status: 'ok',
            cashe: resp.products,
            products: resp.products,
            categories,
            brands,
            priceRange: [Math.min(...prices), Math.max(...prices)],
            stockRange: [Math.min(...stocks), Math.max(...stocks)]
          })
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
