import { Link, useSearchParams } from 'react-router-dom'
import { StarIcon } from '@heroicons/react/20/solid'
import qs from 'query-string'

import PageTitle from 'components/PageTitle'
import useProducts from 'store/products'
import useCart from 'store/cart'
import Pagination from 'components/Pagination'
import CheckoutModel from 'components/CheckoutModal'
import { useState } from 'react'

export type CartProps = {
  p: boolean
}

export default function Cart({ p }: CartProps) {
  const [searchParams, setSearchParams] = useSearchParams()
  const cart = useCart()
  const products = useProducts((s) => s.byId)
  const [modal, setModal] = useState(p)

  const handleCheckout = () => {
    setModal(true)
  }

  function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
  }

  const handleLimitChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let query = qs.parse(searchParams.toString())
    query = { ...query, limit: e.target.value, page: '1' }
    const params = qs.stringify(query, { skipEmptyString: true, skipNull: true })
    setSearchParams(params)
  }

  const handlePageChange = (idx: number) => {
    let query = qs.parse(searchParams.toString(), { parseNumbers: true })
    query = { ...query, page: idx }
    const params = qs.stringify(query, { skipEmptyString: true, skipNull: true })
    setSearchParams(params)
  }

  const pageLimit = Number(searchParams.get('limit')) || 3
  const currentPage = Number(searchParams.get('page')) || 1
  const itemsOnPage = cart.ids.slice(
    (currentPage - 1) * pageLimit,
    (currentPage - 1) * pageLimit + pageLimit
  )

  //

  const [discount, setDiscount] = useState(0)
  const [discountArr, setDiscountArr] = useState<number[]>([])
  const [discountBool, setDiscountBool] = useState(-1)
  const discountPromo = ['RSS', 'EPM']
  const discountText = ['Rolling Scopes School', 'EPAM Systems']
  const discountPercent = [10, 10]

  const handleDiscount = (e: React.ChangeEvent<HTMLInputElement>) => {
    let i = -1
    discountPromo.map((item, index) => {
      if (item == e.target.value) {
        i = index
      }
    })
    if (i !== -1) setDiscountBool(i)
    else setDiscountBool(-1)
  }

  const handleDiscountAdd = () => {
    setDiscountArr((prev) => [...prev, discountBool])
    setDiscount((prev) => prev + discountPercent[discountBool === -1 ? 0 : discountBool])
  }

  const handleDiscountDelete = (item: number) => {
    setDiscountArr((prev) => prev.filter((elem) => item !== elem))
    setDiscount((prev) => prev - discountPercent[discountBool === -1 ? 0 : discountBool])
    if (discount == 0) return 1
  }

  return (
    <>
      <CheckoutModel p={modal} total={cart.total} />
      <PageTitle text="Cart" />

      <div className="pointer-events-auto">
        <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl lg:grid lg:grid-cols-2">
          <div className="flex-1 overflow-y-auto py-6 px-4 sm:px-6">
            <div className="flex items-center justify-between border-b pb-2 mb-2">
              <p className="text-lg font-medium text-gray-900" id="slide-over-title">
                Products
              </p>
              <div>
                <span className="pr-1 text-sm text-gray-700">Items on page:</span>
                <input
                  type="number"
                  name="limit"
                  min="1"
                  max={cart.ids.length}
                  onChange={handleLimitChange}
                  defaultValue={pageLimit}
                  className="pl-2 pr-0 py-0 m-0 w-10 text-gray-700 text-sm border-gray-700"
                />
              </div>
            </div>

            <div className="mb-8">
              <div className="flow-root">
                <ul role="list" className="divide-y divide-gray-200">
                  {cart.count === 0 && <h2>Cart is empty</h2>}

                  {itemsOnPage.map((id) => (
                    <li key={id} className="flex py-6">
                      <div className="mr-2 text-gray-500">{cart.ids.indexOf(id) + 1}</div>

                      <Link
                        to={`/product-details/${id}`}
                        className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200"
                      >
                        <img
                          src={products[id].thumbnail}
                          alt={products[id].title}
                          className="h-full w-full object-cover object-center"
                        />
                      </Link>

                      <div className="ml-4 flex flex-1 flex-col">
                        <div>
                          <div className="flex justify-between text-base font-medium text-gray-900">
                            <h3>
                              <Link to={`/product-details/${id}`}>{products[id].title}</Link>
                            </h3>
                            <p className="ml-4">${products[id].price * cart.byId[id].count}</p>
                          </div>

                          <div className="flex justify-between text-base font-medium text-gray-900">
                            <p className="mt-1 text-sm text-gray-500">{products[id].category}</p>
                            <p className="mt-1 text-sm text-gray-500">
                              {products[id].discountPercentage}%
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center mt-2">
                          {[0, 1, 2, 3, 4].map((rating) => (
                            <StarIcon
                              key={rating}
                              className={classNames(
                                Math.round(products[id].rating) > rating
                                  ? 'text-purple-600'
                                  : 'text-gray-200',
                                'h-5 w-5 flex-shrink-0'
                              )}
                              aria-hidden="true"
                            />
                          ))}
                        </div>

                        <p className="my-2">{products[id].description}</p>

                        <p className="text-gray-500 my-1">Stock: {products[id].stock}</p>

                        <div className="flex flex-1 items-end justify-between text-sm">
                          <div className="flex">
                            <button
                              className="bg-purple-200 w-5 h-5 hover:bg-purple-300"
                              onClick={() => cart.decrease(id)}
                            >
                              -
                            </button>
                            <p className="text-gray-500 mx-1">Qty {cart.byId[id].count}</p>
                            <button
                              className="bg-purple-200 w-5 h-5 hover:bg-purple-300"
                              disabled={cart.byId[id].count >= products[id].stock}
                              onClick={() => {
                                cart.increase(id)
                              }}
                            >
                              +
                            </button>
                          </div>

                          <div className="flex">
                            <button
                              type="button"
                              className="font-medium text-indigo-600 hover:text-indigo-500"
                              onClick={() => cart.remove(id)}
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <Pagination
              length={cart.ids.length}
              limit={pageLimit}
              current={currentPage}
              onChange={handlePageChange}
            />
          </div>

          <div className="flex flex-col border-t border-gray-200 py-6 px-4 sm:px-6 lg:border-none">
            <p className="text-lg font-medium text-gray-900" id="slide-over-title">
              Order summary
            </p>
            <div className="flex border-b justify-between text-base font-medium text-gray-900 py-2">
              <p>Products</p>
              <p>{cart.count}</p>
            </div>
            <div className="flex justify-between text-base font-medium text-gray-900 py-2">
              <p className={discountArr.length !== 0 ? 'line-through' : ''}>Subtotal</p>
              <p className={discountArr.length !== 0 ? 'line-through' : ''}>${cart.total}</p>
            </div>
            <div
              className={
                discountArr.length !== 0
                  ? 'flex justify-between text-base font-medium text-gray-900 py-2'
                  : 'hidden'
              }
            >
              <p>Subtotal</p>
              <p>${cart.total - cart.total * (discount / 100)}</p>
            </div>

            <div
              className={
                discountArr.length !== 0
                  ? 'flex self-center w-4/6 flex-col border-solid first-letter border-violet-900 border-2 py-2 my-2'
                  : 'hidden'
              }
            >
              <div className="flex grow-0 justify-center text-xl font-medium text-gray-900 py-2">
                Applied codes
              </div>

              {discountArr.map((item, index) => (
                <div
                  className="flex justify-center text-base font-medium text-gray-500 py-1"
                  key={index}
                >
                  {discountText[index]} - {discountPercent[index]}% {' - '}
                  <button
                    onClick={() => handleDiscountDelete(item)}
                    className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-2 mx-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center text-base font-medium text-gray-900 py-2">
              <p className="mt-0.5 text-sm text-gray-500">
                Shipping and taxes calculated at checkout
              </p>
              <input
                onChange={(e) => handleDiscount(e)}
                type="text"
                placeholder="Enter promo code: RSS"
              />
            </div>

            <div className="py-2">
              {discountPromo.map((item, index) => (
                <div
                  className={
                    discountBool === index && !discountArr.includes(index)
                      ? 'flex justify-end text-base font-medium text-gray-500 py-1'
                      : 'hidden'
                  }
                  key={index}
                >
                  {discountText[index]} - {discountPercent[index]}% {' - '}
                  <button
                    onClick={() => handleDiscountAdd()}
                    className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-2 mx-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                  >
                    Add
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-6">
              <a
                onClick={handleCheckout}
                href="#"
                className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
              >
                Checkout
              </a>
            </div>
            <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
              <p>
                or&nbsp;
                <Link to="/" className="font-medium text-indigo-600 hover:text-indigo-500">
                  Continue Shopping
                  <span aria-hidden="true"> &rarr;</span>
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
