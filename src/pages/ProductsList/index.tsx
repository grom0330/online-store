import { useState } from 'react'

import PageTitle from 'components/PageTitle'
import Filters from 'components/Filters'
import Controls from 'components/Controls'
import ProductCard from 'components/ProductCard'

import useProducts from 'store/products'
import { useSearchParams } from 'react-router-dom'

function ProductsList() {
  const products = useProducts((s) => s.products)
  const [search] = useSearchParams()

  const [isFilterVisible, setFilterVisible] = useState(false)

  const handleToggleFilter = () => {
    setFilterVisible((state) => !state)
  }

  const productsLayoutClass =
    search.get('sm') === 'true' ? 'grid-cols-1' : 'sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-2'

  return (
    <div className="mx-auto max-w-2xl py-5 px-2 sm:py-10 sm:px-4 lg:max-w-7xl lg:px-6">
      <PageTitle text="Products List" />

      <div className="grid grid-cols-5 grid-rows-1 gap-2">
        <aside aria-label="Sidebar">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill={isFilterVisible ? 'currentColor' : 'none'}
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 lg:hidden cursor-pointer"
            onClick={handleToggleFilter}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z"
            />
          </svg>

          <div
            className={`px-3 py-2 rounded bg-gray-100 absolute z-10 ${
              isFilterVisible ? '' : 'hidden'
            } lg:visible lg:block lg:relative`}
          >
            <Filters />
          </div>
        </aside>

        <div className="col-span-5 lg:col-span-4">
          <Controls />

          <main className={`grid gap-y-8 gap-x-2 ${productsLayoutClass}`}>
            {products.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}

            {products.length === 0 && <p>No products found</p>}
          </main>
        </div>
      </div>
    </div>
  )
}

export default ProductsList
