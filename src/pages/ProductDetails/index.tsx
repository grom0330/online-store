import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { StarIcon } from '@heroicons/react/20/solid'

import useCart from 'store/cart'
import useProducts from 'store/products'

export default function ProductDetails() {
  const { id } = useParams()

  const product = useProducts((s) => s.byId[Number(id)])
  const cart = useCart()

  const [mainImgIdx, setMainImgIdx] = useState(0)

  if (!product) {
    return <p>Product not found.</p>
  }

  return (
    <>
      <nav aria-label="Breadcrumb" className="mb-3">
        <ol role="list" className="flex space-x-2">
          <LiCategory text="store" to="/" />
          <LiCategory text={product.category} />
          <LiCategory text={product.brand} />
          <li className="text-sm font-medium text-gray-500 hover:text-gray-600">{product.title}</li>
        </ol>
      </nav>

      <div className="grid grid-cols-1 gap-2">
        <img className="h-80 object-cover" src={product.images[mainImgIdx]} />
        <div className="flex gap-2">
          {product.images.map((imgSrc, idx) => {
            // if (imgSrc.includes('thumbnail')) return null

            return (
              <img
                key={idx}
                src={imgSrc}
                className="h-20 w-20 object-cover object-center cursor-pointer"
                onClick={() => setMainImgIdx(idx)}
              />
            )
          })}
        </div>
      </div>

      <div className="max-w-2xl pt-10 pb-16 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:pt-16 lg:pb-24">
        <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            {product.title}
          </h1>
        </div>

        <div className="mt-4 lg:row-span-3 lg:mt-0">
          <h2 className="sr-only">Product information</h2>
          <p className="text-3xl tracking-tight text-gray-900">${product.price}</p>
          {/* Reviews */}
          <div className="mt-4">
            <div className="flex items-center">
              <div className="flex items-center">
                {[0, 1, 2, 3, 4].map((rating) => (
                  <StarIcon
                    key={rating}
                    className={classNames(
                      Math.round(product.rating) > rating ? 'text-purple-600' : 'text-gray-200',
                      'h-5 w-5 flex-shrink-0'
                    )}
                    aria-hidden="true"
                  />
                ))}
              </div>
              <div className="ml-2">{product.rating}</div>
            </div>
          </div>

          {!cart.byId[product.id] && (
            <Button
              text="Add to Cart"
              onClick={() => cart.add({ id: product.id, price: product.price })}
            />
          )}

          {!!cart.byId[product.id] && (
            <Button text="Remove from Cart" onClick={() => cart.remove(product.id)} />
          )}

          <button
            type="submit"
            className="mt-4 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 py-3 px-8 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Buy now
          </button>
        </div>

        {/* Description and details */}
        <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pt-6 lg:pr-8">
          <div>
            <h3 className="sr-only">Description</h3>

            <div className="space-y-6">
              <p className="text-base text-gray-900">{product.description}</p>
            </div>
          </div>

          <div className="mt-10">
            <h3 className="text-lg font-medium text-gray-900">Highlights</h3>

            <div className="mt-4">
              <ol role="list" className=" space-y-2 text-base">
                <li className="text-gray-400">
                  Discount Percentage:{' '}
                  <span className="text-gray-700">{product.discountPercentage}%</span>
                </li>
                <li className="text-gray-400">
                  Stock: <span className="text-gray-700">{product.stock}</span>
                </li>
                <li className="text-gray-400">
                  Brand: <span className="text-gray-700">{product.brand}</span>
                </li>
                <li className="text-gray-400">
                  Category: <span className="text-gray-700">{product.category}</span>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

function LiCategory(p: { text: string; to?: string }) {
  return (
    <li>
      <div className="flex items-center">
        {!p.to && (
          <div className="mr-2 text-sm font-medium text-gray-900">{p.text.toLowerCase()}</div>
        )}

        {p.to !== undefined && (
          <Link to={p.to} className="mr-2 text-sm font-medium text-gray-900">
            {p.text.toLowerCase()}
          </Link>
        )}

        <svg
          width={16}
          height={20}
          viewBox="0 0 16 20"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          className="h-5 w-4 text-gray-300"
        >
          <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
        </svg>
      </div>
    </li>
  )
}

function Button(p: { text: string; onClick(): void }) {
  return (
    <button
      type="submit"
      className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 py-3 px-8 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      onClick={p.onClick}
    >
      {p.text}
    </button>
  )
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}
