import { useCallback } from 'react'

import { Product } from 'dummyjson-api/models'

type Props = {
  data: Product
  inCart: boolean
  onAddToCart: (data: Pick<Product, 'id' | 'price'>) => void
  onRemoveFromCart: (id: number) => void
}

export default function ProductCard(p: Props) {
  const handleAdd = useCallback(() => {
    p.onAddToCart({ id: p.data.id, price: p.data.price })
  }, [p.data.id, p.data.price])

  const handleRemove = useCallback(() => {
    p.onRemoveFromCart(p.data.id)
  }, [p.data.id])

  return (
    <div>
      <div className="group relative mb-2">
        <div className="min-h-80 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:aspect-none lg:h-80">
          <img
            src={p.data.thumbnail}
            alt="Front of men&#039;s Basic Tee in black."
            className="h-full w-full object-cover object-center lg:h-full lg:w-full"
          />
        </div>

        <div className="mt-4 flex justify-between">
          <div>
            <h3 className="text-sm text-gray-700">
              <a href="#">
                <span aria-hidden="true" className="absolute inset-0"></span>
                {p.data.title}
              </a>
            </h3>
            <p className="mt-1 text-sm text-gray-500">{p.data.category}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900">${p.data.price}</p>
            <p className="text-sm font-light text-gray-900">{p.data.discountPercentage}%</p>
          </div>
        </div>
      </div>

      {!p.inCart && (
        <button
          className="px-4 py-1 block ml-auto text-sm text-purple-600 font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2"
          onClick={handleAdd}
        >
          Add to Cart
        </button>
      )}

      {p.inCart && (
        <button
          className="px-4 py-1 block ml-auto text-sm text-purple-600 font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2"
          onClick={handleRemove}
        >
          Remove from Cart
        </button>
      )}
    </div>
  )
}
