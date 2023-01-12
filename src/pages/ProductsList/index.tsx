import { useState } from 'react'
import { FunnelIcon } from '@heroicons/react/24/outline'
import { useSearchParams } from 'react-router-dom'

import Filters from 'components/Filters'
import Controls from 'components/Controls'
import { ProductCard } from 'components/ProductCard'

import useProducts from 'store/products'

function ProductsList() {
  const [search] = useSearchParams()
  const products = useProducts((s) => s.products)
  const [isFilterVisible, setFilterVisible] = useState(false)

  const productsLayoutClass =
    search.get('sm') === 'true' ? 'grid-cols-1' : 'sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-2'

  const filterIconClass = isFilterVisible ? '' : 'hidden'

  return (
    <div className="grid grid-cols-5 grid-rows-1 gap-2">
      <aside aria-label="Sidebar">
        <FunnelIcon
          fill={isFilterVisible ? 'currentColor' : 'none'}
          className="h-5 w-5 lg:hidden cursor-pointer"
          onClick={() => setFilterVisible((state) => !state)}
        />

        <div
          className={`px-3 py-2 rounded bg-gray-100 absolute z-10 lg:visible lg:block lg:relative ${filterIconClass}`}
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
  )
}

export default ProductsList
