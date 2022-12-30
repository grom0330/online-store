import { useState } from 'react'
import { Link } from 'react-router-dom'
import shallow from 'zustand/shallow'

import { Product } from 'dummyjson-api/models'
import useCartStore from 'store/cart'

export default function ProductCard(p: Product) {
  const [add, remove, isInCart] = useCartStore((s) => [s.add, s.remove, s.isInCart], shallow)

  const [inCart, setInCart] = useState(isInCart(p.id))

  const handleAdd = () => {
    add({ id: p.id, price: p.price })
    setInCart(isInCart(p.id))
  }

  const handleRemove = () => {
    remove(p.id)
    setInCart(isInCart(p.id))
  }

  return (
    <div>
      <div className="group relative mb-2">
        <div className="min-h-80 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:aspect-none lg:h-80">
          <img
            src={p.thumbnail}
            alt="Front of men&#039;s Basic Tee in black."
            className="h-full w-full object-cover object-center lg:h-full lg:w-full"
          />
        </div>

        <div className="mt-4 flex justify-between">
          <div>
            <h3 className="text-sm text-gray-700">
              <Link to={`product-details/${p.id}`}>
                <span aria-hidden="true" className="absolute inset-0"></span>
                {p.title}
              </Link>
            </h3>
            <p className="mt-1 text-sm text-gray-500">{p.category}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900">${p.price}</p>
            <p className="text-sm font-light text-gray-900">{p.discountPercentage}%</p>
          </div>
        </div>
      </div>

      {!inCart && <Button text="Add to Cart" onClick={handleAdd} />}

      {inCart && <Button text="Remove from Cart" onClick={handleRemove} />}
    </div>
  )
}

function Button(p: { text: string; onClick(): void }) {
  return (
    <button
      className="px-4 py-1 block ml-auto text-sm text-purple-600 font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2"
      onClick={p.onClick}
    >
      {p.text}
    </button>
  )
}
