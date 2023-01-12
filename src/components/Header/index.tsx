import { Link } from 'react-router-dom'
import shallow from 'zustand/shallow'
import { ShoppingBagIcon, ShoppingCartIcon } from '@heroicons/react/24/outline'

import { ROUTES } from '../../constants'
import useCartStore from 'store/cart'

export function Header() {
  const [count, total] = useCartStore((s) => [s.count, s.total], shallow)

  return (
    <header className="mx-auto max-w-2xl py-2 px-2 sm:py-5 sm:px-4 lg:max-w-7xl lg:px-6 flex justify-between items-center border-b-1 border-b">
      <Link to={ROUTES.base} className="flex items-center gap-2">
        <ShoppingBagIcon width={24} height={24} />

        <h1 className="text-purple-600 text-3xl font-bold tracking-tighter">Online Store</h1>
      </Link>

      <div className="flex gap-2">
        <div className="items-center text-1xl font-normal">
          Total: <span className="text-purple-600">${total}</span>
        </div>

        <Link to="cart" className="flex items-center">
          <ShoppingCartIcon width={24} height={24} />

          <div className="text-purple-600 text-1xl font-normal">{count}</div>
        </Link>
      </div>
    </header>
  )
}
