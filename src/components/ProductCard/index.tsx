import { useState, memo } from 'react'
import { Link } from 'react-router-dom'
import shallow from 'zustand/shallow'

import { Product } from 'dummyjson-api/models'
import useCart from 'store/cart'

function ProductCard(p: Product) {
  const [add, remove, isInCart] = useCart((s) => [s.add, s.remove, s.isInCart], shallow)

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
        <div className="min-h-60 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:aspect-none lg:h-60">
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

        <div className="flex bg-white items-center absolute top-2 left-2 rounded">
          <svg
            aria-hidden="true"
            className="w-5 h-5 text-yellow-400"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Rating star</title>
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
          </svg>
          <p className="ml-1 px-1 font-bold text-gray-900 rounded">{p.rating}</p>
        </div>
      </div>

      {!inCart && <Button text="Add to Cart" onClick={handleAdd} />}

      {inCart && <Button text="Remove from Cart" onClick={handleRemove} />}
    </div>
  )
}

export default memo(ProductCard)

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
