import { memo } from 'react'
import { Link } from 'react-router-dom'
import { StarIcon } from '@heroicons/react/20/solid'

import { Button } from 'components/Button'
import { Product } from 'dummyjson-api/models'
import useCart from 'store/cart'

import { ROUTES } from '../../constants'

function ProductCardComponent(p: Product) {
  const cart = useCart()

  return (
    <div>
      <div className="group relative mb-2">
        <div className="min-h-60 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:aspect-none lg:h-60">
          <img
            src={p.thumbnail}
            alt={p.title}
            className="h-full w-full object-cover object-center lg:h-full lg:w-full"
          />
        </div>

        <div className="mt-4 flex justify-between">
          <div>
            <h3 className="text-sm text-gray-700">
              <Link to={`${ROUTES.productDetails}/${p.id}`}>
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
          <StarIcon width={18} height={18} className="text-yellow-400" />
          <p className="ml-1 px-1 font-bold text-gray-900 rounded">{p.rating}</p>
        </div>
      </div>

      {!cart.ids.includes(p.id) && (
        <Button text="Add to Cart" onClick={() => cart.add({ id: p.id, price: p.price })} />
      )}

      {cart.ids.includes(p.id) && (
        <Button text="Remove from Cart" onClick={() => cart.remove(p.id)} />
      )}
    </div>
  )
}

export const ProductCard = memo(ProductCardComponent)
