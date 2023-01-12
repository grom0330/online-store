import { Link } from 'react-router-dom'

import Rating from 'components/Rating'
import useProductDetailsPage from './useProductDetailsPate'

export default function ProductDetails() {
  const p = useProductDetailsPage()

  if (!p.product) {
    return <p>Product not found.</p>
  }

  return (
    <>
      <nav aria-label="Breadcrumb" className="mb-3">
        <ol role="list" className="flex space-x-2">
          <Li>
            <Link to="/" className="mr-2 text-sm font-medium text-gray-900">
              store
            </Link>
          </Li>
          <Li>
            <div className="mr-2 text-sm font-medium text-gray-900">
              {p.product.category.toLowerCase()}
            </div>
          </Li>
          <Li>
            <div className="mr-2 text-sm font-medium text-gray-900">
              {p.product.brand.toLowerCase()}
            </div>
          </Li>
          <li className="text-sm font-medium text-gray-500 hover:text-gray-600">
            {p.product.title}
          </li>
        </ol>
      </nav>

      <div className="grid grid-cols-1 gap-2">
        <div className="flex justify-center">
          <img className="h-80 object-cover" src={p.product.images[p.mainImgIdx]} />
        </div>
        <div className="flex gap-2 justify-center">
          {p.product.images.map((imgSrc, idx) => {
            return (
              <img
                key={idx}
                src={imgSrc}
                className="h-20 w-20 object-cover object-center cursor-pointer"
                onClick={() => p.setMainImgIdx(idx)}
              />
            )
          })}
        </div>
      </div>

      <div className="max-w-2xl pt-10 pb-16 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:pt-16 lg:pb-24">
        <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            {p.product.title}
          </h1>
        </div>

        <div className="mt-4 lg:row-span-3 lg:mt-0">
          <h2 className="sr-only">Product information</h2>
          <p className="text-3xl tracking-tight text-gray-900">${p.product.price}</p>

          <div className="mt-4">
            <Rating value={p.product.rating} />
          </div>

          {!p.cart.byId[p.product.id] && <Button text="Add to Cart" onClick={p.handleAddProduct} />}

          {!!p.cart.byId[p.product.id] && (
            <Button text="Remove from Cart" onClick={p.handleRemoveProduct} />
          )}

          <button
            onClick={p.handleBuyNow}
            className="mt-4 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 py-3 px-8 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Buy now
          </button>
        </div>

        <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pt-6 lg:pr-8">
          <div>
            <h3 className="sr-only">Description</h3>

            <div className="space-y-6">
              <p className="text-base text-gray-900">{p.product.description}</p>
            </div>
          </div>

          <div className="mt-10">
            <h3 className="text-lg font-medium text-gray-900">Highlights</h3>

            <div className="mt-4">
              <ol role="list" className=" space-y-2 text-base">
                <li className="text-gray-400">
                  Discount Percentage:{' '}
                  <span className="text-gray-700">{p.product.discountPercentage}%</span>
                </li>
                <li className="text-gray-400">
                  Stock: <span className="text-gray-700">{p.product.stock}</span>
                </li>
                <li className="text-gray-400">
                  Brand: <span className="text-gray-700">{p.product.brand}</span>
                </li>
                <li className="text-gray-400">
                  Category: <span className="text-gray-700">{p.product.category}</span>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

function Li(p: { children: React.ReactNode }) {
  return (
    <li>
      <div className="flex items-center">
        {p.children}
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
