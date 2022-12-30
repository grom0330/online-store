import create from 'zustand'
import { devtools, persist } from 'zustand/middleware'

import { Product } from 'dummyjson-api/models'

type CartItem = Pick<Product, 'id' | 'price'> & {
  count: number
}

type CartState = {
  items: CartItem[]
  count: number
  total: number
  add(item: Omit<CartItem, 'count'>): void
  remove(id: number): void
  isInCart(id: number): boolean
}

const useCart = create<CartState>()(
  devtools(
    persist(
      (set, get) => ({
        items: [],
        count: 0,
        total: 0,
        isInCart: (id) => get().items.some((i) => i.id === id),
        add: (item) =>
          set((prev) => {
            prev.items.push({ ...item, count: 1 })
            return { items: prev.items, count: prev.count + 1, total: prev.total + item.price }
          }),
        remove: (id) =>
          set((prev) => {
            const addedItem = prev.items.find((i) => i.id === id)

            if (!addedItem) return prev

            prev.items = prev.items.filter((i) => i.id !== addedItem.id)

            return { items: prev.items, count: prev.count - 1, total: prev.total - addedItem.price }
          })
      }),
      {
        name: 'RSS-OnlineStore-Storage'
      }
    ),
    { name: 'RSS-CartStore' }
  )
)

export default useCart
