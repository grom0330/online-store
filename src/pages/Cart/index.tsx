import { Link } from 'react-router-dom'

import PageTitle from 'components/PageTitle'
import Pagination from 'components/Pagination'
import CheckoutModal from 'components/CheckoutModal'
import useCartPage from './useCartPage'
import Rating from 'components/Rating'

export default function Cart() {
  const p = useCartPage()

  return (
    <>
      <PageTitle text="Cart" />

      <div className="pointer-events-auto">
        <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl lg:grid lg:grid-cols-2">
          <div className="flex-1 overflow-y-auto py-6 px-4 sm:px-6">
            <div className="flex items-center justify-between border-b pb-2 mb-2">
              <p className="text-lg font-medium text-gray-900" id="slide-over-title">
                Products
              </p>

              {p.cart.ids.length > 0 && (
                <div>
                  <span className="pr-1 text-sm text-gray-700">Items on page:</span>
                  <input
                    type="number"
                    name="limit"
                    min="1"
                    max={p.cart.ids.length}
                    onChange={p.handleLimitChange}
                    defaultValue={p.pageLimit}
                    className="pl-2 pr-0 py-0 m-0 w-10 text-gray-700 text-sm border-gray-700"
                  />
                </div>
              )}
            </div>

            <div className="mb-8">
              <div className="flow-root">
                <ul role="list" className="divide-y divide-gray-200">
                  {p.cart.count === 0 && <h2>Cart is empty</h2>}

                  {p.itemsOnPage.map((id) => (
                    <li key={id} className="flex py-6">
                      <div className="mr-2 text-gray-500">{p.cart.ids.indexOf(id) + 1}</div>

                      <Link
                        to={`/product-details/${id}`}
                        className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200"
                      >
                        <img
                          src={p.products[id].thumbnail}
                          alt={p.products[id].title}
                          className="h-full w-full object-cover object-center"
                        />
                      </Link>

                      <div className="ml-4 flex flex-1 flex-col">
                        <div>
                          <div className="flex justify-between text-base font-medium text-gray-900">
                            <h3>
                              <Link to={`/product-details/${id}`}>{p.products[id].title}</Link>
                            </h3>
                            <p className="ml-4">${p.products[id].price * p.cart.byId[id].count}</p>
                          </div>

                          <div className="flex justify-between text-base font-medium text-gray-900">
                            <p className="mt-1 text-sm text-gray-500">{p.products[id].category}</p>
                            <p className="mt-1 text-sm text-gray-500">
                              {p.products[id].discountPercentage}%
                            </p>
                          </div>

                          <div className="flex justify-between text-base font-medium text-gray-900">
                            <p className="mt-1 text-sm text-gray-500">{p.products[id].brand}</p>
                          </div>
                        </div>

                        <Rating value={p.products[id].rating} />

                        <p className="mt-4 mb-2">{p.products[id].description}</p>

                        <p className="text-gray-500 my-1">Stock: {p.products[id].stock}</p>

                        <div className="flex flex-1 items-end justify-between text-sm">
                          <div className="flex">
                            <button
                              className="bg-purple-200 w-5 h-5 hover:bg-purple-300"
                              onClick={() => p.cart.decrease(id)}
                            >
                              -
                            </button>
                            <p className="text-gray-500 mx-1">Qty {p.cart.byId[id].count}</p>
                            <button
                              className="bg-purple-200 w-5 h-5 hover:bg-purple-300"
                              disabled={p.cart.byId[id].count >= p.products[id].stock}
                              onClick={() => {
                                p.cart.increase(id)
                              }}
                            >
                              +
                            </button>
                          </div>

                          <div className="flex">
                            <button
                              type="button"
                              className="font-medium text-indigo-600 hover:text-indigo-500"
                              onClick={() => p.cart.remove(id)}
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

            {p.cart.count !== 0 && (
              <Pagination
                length={p.cart.ids.length}
                limit={p.pageLimit}
                current={p.currentPage}
                onChange={p.handlePageChange}
              />
            )}
          </div>

          <div className="border-t border-gray-200 py-6 px-4 sm:px-6 lg:border-none">
            <p className="text-lg font-medium text-gray-900" id="slide-over-title">
              Order summary
            </p>
            <div className="flex border-b justify-between text-base font-medium text-gray-900 py-2">
              <p>Products</p>
              <p>{p.cart.count}</p>
            </div>
            <div className="flex justify-between text-base font-medium text-gray-900 py-2">
              <p>Subtotal</p>
              <p>${p.cart.total}</p>
            </div>

            <div className="flex justify-between text-base font-medium text-gray-900 py-2">
              <p className="mt-0.5 text-sm text-gray-500">
                Shipping and taxes calculated at checkout.
              </p>
              <input type="text" placeholder="Enter promo code: RSS" />
            </div>

            <div className="mt-6">
              <a
                onClick={p.handleCheckout}
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

      <CheckoutModal p={p.isCheckoutModalVisible} total={p.cart.total} />
    </>
  )
}
