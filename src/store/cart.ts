import create from 'zustand'
import { devtools, persist } from 'zustand/middleware'

import { Product } from 'dummyjson-api/models'

type CartItem = Pick<Product, 'id' | 'price'> & {
  count: number
}

type CartState = {
  count: number
  total: number
  ids: number[]
  byId: { [id: number]: CartItem }
  increase(id: number): void
  decrease(id: number): void
  add(item: Omit<CartItem, 'count'>): void
  remove(id: number): void
}

const useCart = create<CartState>()(
  devtools(
    persist(
      (set, get) => ({
        count: 0,
        total: 0,
        ids: [],
        byId: {},
        increase: (id) =>
          set((prev) => {
            prev.byId[id].count += 1
            return {
              byId: prev.byId,
              count: prev.count + 1,
              total: prev.total + prev.byId[id].price
            }
          }),
        decrease: (id) => {
          if (get().byId[id].count === 1) {
            get().remove(id)
          } else {
            get().byId[id].count -= 1

            set({
              byId: get().byId,
              count: get().count - 1,
              total: get().total - get().byId[id].price
            })
          }
        },
        add: (item) =>
          set((prev) => {
            prev.byId[item.id] = { ...item, count: 1 }

            return {
              ids: Object.keys(prev.byId).map(Number),
              byId: prev.byId,
              count: prev.count + 1,
              total: prev.total + item.price
            }
          }),
        remove: (id) =>
          set((prev) => {
            const addedItem = prev.byId[id]

            if (!addedItem) return prev

            delete prev.byId[addedItem.id]

            return {
              ids: Object.keys(prev.byId).map(Number),
              byId: prev.byId,
              count: prev.count - addedItem.count,
              total: prev.total - addedItem.price * addedItem.count
            }
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
